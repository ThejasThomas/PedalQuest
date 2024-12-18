import React from 'react';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  datasets: [
    {
      label: 'Profit',
      data: [65, 45, 50, 55, 45, 40, 50, 60, 45],
      backgroundColor: '#10B981',
    },
    {
      label: 'Loss',
      data: [40, 35, 30, 45, 35, 25, 30, 35, 30],
      backgroundColor: '#E5E7EB',
    }
  ],
};

export function RevenueChart() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Total Revenue</h2>
        <div>
          <span className="text-green-500 text-sm font-normal">
            ₹50,23780
            <span className="text-green-500 ml-1 text-xs">
              ↑ 5% from last month
            </span>
          </span>
        </div>
      </div>
      <Bar options={options} data={data} height={200} />
    </div>
  );
}

