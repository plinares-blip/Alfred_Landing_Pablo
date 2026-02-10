import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  suffix?: string;
}

export const Input: React.FC<InputProps> = ({ label, suffix, className, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-300">{label}</label>
      <div className="relative">
        <input
          className={`w-full bg-alfred-dark border border-alfred-blue/30 rounded-lg px-4 py-3 text-white focus:border-alfred-lime focus:outline-none focus:ring-1 focus:ring-alfred-lime transition-all ${className}`}
          {...props}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};
