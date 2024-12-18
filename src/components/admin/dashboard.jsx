import React from 'react';
import { Sidebar } from "./Sidebar";
import { MetricCard } from "./MetricCard";
import { RevenueChart } from "./RevenueChart";
import { MostSoldItems } from "./MostSoldItems";
import { LatestOrders } from "./LatestOrders";

export default function Dashboard() {




    
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <select className="px-4 py-2 border rounded-md bg-white">
            <option>28 Jan, 2021 - 28 Dec, 2021</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <MetricCard
            title="Today's Sales"
            value="100,999"
            subtitle="We have sold 123 items"
            progress={75}
            color="text-blue-500"
          />
          <MetricCard
            title="Today's Revenue"
            value="30,000"
            subtitle="Profit made so today so far"
            progress={65}
            color="text-green-500"
          />
          <MetricCard
            title="Users Count"
            value="20,390"
            subtitle="Total users signed up to ex.phones"
            progress={85}
            color="text-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <MostSoldItems />
          </div>
        </div>

        <div className="grid grid-cols-1">
          <LatestOrders />
        </div>
      </main>
    </div>
  );
}

