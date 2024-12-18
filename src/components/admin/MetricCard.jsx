import React from 'react';

export function MetricCard({ title, value, subtitle, progress, color }) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-2xl font-semibold mt-1">₹{value}</h3>
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          </div>
          <div className="relative h-16 w-16">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-gray-200"
                strokeWidth="2"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className={`stroke-current ${color}`}
                strokeWidth="2"
                strokeDasharray={100}
                strokeDashoffset={100 - progress}
                transform="rotate(-90 18 18)"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

