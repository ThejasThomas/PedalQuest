import React from 'react';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 rounded-lg p-6">
          <h3 className="text-gray-400 text-sm">Today's Sales</h3>
          <p className="text-2xl font-bold text-white mt-2">₹100,999</p>
          <p className="text-xs text-gray-400 mt-1">We have sold 123 items</p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-6">
          <h3 className="text-gray-400 text-sm">Today's Revenue</h3>
          <p className="text-2xl font-bold text-white mt-2">₹30,000</p>
          <p className="text-xs text-gray-400 mt-1">Profit made so far today</p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-6">
          <h3 className="text-gray-400 text-sm">Users Count</h3>
          <p className="text-2xl font-bold text-white mt-2">20,390</p>
          <p className="text-xs text-gray-400 mt-1">Total users signed up</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Chart</h3>
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            Chart Component Goes Here 
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Most Sold Items</h3>
          <div className="space-y-4">
            {['Helmet', 'Jacket', 'Boots', 'Gloves','Bag'].map((item, index) => (
              <div key={item} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{item}</span>
                  <span className="text-white">{(80 - index * 15)}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${80 - index * 15}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

