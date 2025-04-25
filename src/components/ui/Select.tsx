import React from 'react';

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, className }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-white shadow-md hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-white bg-gray-800">
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
