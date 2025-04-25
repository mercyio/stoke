import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const tokens = ["ETH", "BTC", "SOL"];
const intervals = ["5m", "15m", "1h"];

const generateInitialCandles = (count: number, basePrice: number) => {
  const candles = [];
  let lastPrice = basePrice;
  let trend: "up" | "down" = Math.random() > 0.5 ? "up" : "down";
  let trendLength = Math.floor(Math.random() * 20) + 10;
  let trendStrength = Math.random() * 50 + 20;

  for (let i = 0; i < count; i++) {
    if (trendLength <= 0) {
      trend = Math.random() > 0.5 ? "up" : "down";
      trendLength = Math.floor(Math.random() * 20) + 10;
      trendStrength = Math.random() * 50 + 20;
    }

    const open = lastPrice;
    let close =
      trend === "up"
        ? open + Math.random() * trendStrength
        : open - Math.random() * trendStrength;

    close = +close.toFixed(2);
    const high = Math.max(open, close) + Math.random() * 15;
    const low = Math.min(open, close) - Math.random() * 15;

    candles.push({
      x: new Date(Date.now() - (count - i) * 60000),
      y: [+open.toFixed(2), +high.toFixed(2), +low.toFixed(2), close],
    });

    lastPrice = close;
    trendLength--;
  }

  return candles;
};

const MarketChart: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState("ETH");
  const [selectedInterval, setSelectedInterval] = useState("5m");
  const [candles, setCandles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let basePrice = 2500;
    if (selectedToken === "BTC") basePrice = 30000;
    if (selectedToken === "SOL") basePrice = 40;

    const initial = generateInitialCandles(500, basePrice);
    setCandles(initial);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000); // loader time

    let trend: "up" | "down" = Math.random() > 0.5 ? "up" : "down";
    let trendLength = Math.floor(Math.random() * 20) + 10;
    let trendStrength = Math.random() * 50 + 20;

    const interval = setInterval(() => {
      setCandles((prev) => {
        const last = prev[prev.length - 1];
        const newPrice = last ? last.y[3] : basePrice;

        if (trendLength <= 0) {
          trend = Math.random() > 0.5 ? "up" : "down";
          trendLength = Math.floor(Math.random() * 20) + 10;
          trendStrength = Math.random() * 50 + 20;
        }

        const open = newPrice;
        const close =
          trend === "up"
            ? open + Math.random() * trendStrength
            : open - Math.random() * trendStrength;

        const high = Math.max(open, close) + Math.random() * 15;
        const low = Math.min(open, close) - Math.random() * 15;

        const newCandle = {
          x: new Date(),
          y: [
            +open.toFixed(2),
            +high.toFixed(2),
            +low.toFixed(2),
            +close.toFixed(2),
          ],
        };

        trendLength--;

        return [...prev.slice(-499), newCandle];
      });
    }, 1500); // update every 1.5s

    return () => clearInterval(interval);
  }, [selectedToken, selectedInterval]);

  const chartOptions = {
    chart: {
      type: "candlestick",
      height: 300,
      background: "#0e0e0e",
      foreColor: "#ccc",
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 500,
        dynamicAnimation: { speed: 500 },
      },
      zoom: { enabled: false },
      crosshairs: {
        show: true,
        position: "front",
        stroke: {
          color: "#bbb",
          width: 1,
          dashArray: 10,
        },
      },
    },
    xaxis: {
      type: "datetime",
      labels: { style: { colors: "#888", fontSize: "12px" } },
      tooltip: { enabled: true },
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: { style: { colors: "#888", fontSize: "12px" } },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#00e396",
          downward: "#ff4560",
        },
        wick: { useFillColor: true },
      },
    },
    grid: {
      borderColor: "#222",
      strokeDashArray: 10,
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      x: { show: true },
      y: { formatter: (val: any) => `$${val.toFixed(2)}` },
    },
  };

  const chartSeries = [{ data: candles }];

  return (
    <div className="bg-[#111] p-4 rounded-lg shadow-lg border border-gray-800 text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Live {selectedToken} Chart</h2>
        <div className="flex gap-2 items-center">
          <select
            className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm"
            value={selectedToken}
            onChange={(e) => {
              setSelectedToken(e.target.value);
              setCandles([]);
            }}
          >
            {tokens.map((token) => (
              <option key={token} value={token}>
                {token}
              </option>
            ))}
          </select>

          <select
            className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm"
            value={selectedInterval}
            onChange={(e) => {
              setSelectedInterval(e.target.value);
              setCandles([]);
            }}
          >
            {intervals.map((intv) => (
              <option key={intv} value={intv}>
                {intv}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[500px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
        </div>
      ) : (
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="candlestick"
          height={300}
        />
      )}
    </div>
  );
};

export default MarketChart;
