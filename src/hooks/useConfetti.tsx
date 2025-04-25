import { useCallback } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  ticks?: number;
  origin?: {
    x?: number;
    y?: number;
  };
  colors?: string[];
  shapes?: string[];
  scalar?: number;
  zIndex?: number;
}

function useConfetti() {
  const fireConfetti = useCallback((options: ConfettiOptions = {}) => {
    const defaults = {
      particleCount: 50,
      spread: 60,
      startVelocity: 30,
      decay: 0.9,
      gravity: 1,
      ticks: 200,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      },
      colors: ['#FFA500', '#9B5DE5', '#00F5D4', '#845EC2'],
      shapes: ['circle', 'square'],
      scalar: 1,
      zIndex: 100
    };

    confetti({
      ...defaults,
      ...options
    });
  }, []);

  return fireConfetti;
}

export default useConfetti;