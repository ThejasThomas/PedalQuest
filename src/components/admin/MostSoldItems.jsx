import React from 'react';

const items = [
  { name: "Helmet", percentage: 70 },
  { name: "Jacket", percentage: 40 },
  { name: "Boots", percentage: 60 },
  { name: "Gloves", percentage: 80 },
  { name: "Bag", percentage: 20 },
];

export function MostSoldItems() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Most Sold Items</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.name} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span>{item.percentage}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div 
                className="h-full bg-green-500 rounded-full" 
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

