import React from 'react';
import { Edit, Eye, Trash } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: "Helmets",
    sold: 10,
    added: "24 Jun 2023",
  },
  {
    id: 2,
    name: "Jackets",
    sold: 10,
    added: "24 Jun 2023",
  },
  {
    id: 3,
    name: "Boots",
    sold: 10,
    added: "24 Jun 2023",
  },
  {
    id: 4,
    name: "Gloves",
    sold: 10,
    added: "24 Jun 2023",
  },
  {
    id: 5,
    name: "Knee Pad",
    sold: 10,
    added: "24 Jun 2023",
  }
];

export function CategoryTable() {
  return (
    <div className="bg-white/5 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="text-gray-400 text-sm">
            <th className="px-4 py-3 text-left">
              <input type="checkbox" className="rounded bg-gray-700" />
            </th>
            <th className="px-4 py-3 text-left">Category Name</th>
            <th className="px-4 py-3 text-left">Sold</th>
            <th className="px-4 py-3 text-left">Added</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-t border-white/10">
              <td className="px-4 py-3">
                <input type="checkbox" className="rounded bg-gray-700" />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-lg"></div>
                  <span className="text-white">{category.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-gray-300">{category.sold}</td>
              <td className="px-4 py-3 text-gray-300">{category.added}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                    <Edit size={16} className="text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                    <Eye size={16} className="text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                    <Trash size={16} className="text-gray-400" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

