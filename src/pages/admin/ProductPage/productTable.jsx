import React from 'react';
import { Edit, Eye, Trash } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "LS2 MX437 Fast Evo Roar",
    image: "/path-to-helmet-image.jpg",
    category: "Helmet",
    stock: 10,
    price: "₹59000",
    status: "Published",
    added: "24 Jun 2023"
  },
  {
    id: 2,
    name: "Scala Leather Jacket",
    image: "/path-to-jacket-image.jpg",
    category: "Jacket",
    stock: 10,
    price: "₹59000",
    status: "Published",
    added: "24 Jun 2023"
  },
  {
    id: 3,
    name: "AGV Helmet",
    image: "/path-to-agv-image.jpg",
    category: "Helmet",
    stock: 10,
    price: "₹59000",
    status: "Published",
    added: "24 Jun 2023"
  },
  {
    id: 4,
    name: "just1 Helmet",
    image: "/path-to-just1-image.jpg",
    category: "Helmet",
    stock: 10,
    price: "₹59000",
    status: "Out of Stock",
    added: "24 Jun 2023"
  }
];

export function ProductTable() {
  return (
    <div className="bg-white/5 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="text-gray-400 text-sm">
            <th className="px-4 py-3 text-left">
              <input type="checkbox" className="rounded bg-gray-700" />
            </th>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Stock</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Added</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-white/10">
              <td className="px-4 py-3">
                <input type="checkbox" className="rounded bg-gray-700" />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <span className="text-white">{product.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-gray-300">{product.category}</td>
              <td className="px-4 py-3 text-gray-300">{product.stock}</td>
              <td className="px-4 py-3 text-gray-300">{product.price}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  product.status === "Published" 
                    ? "bg-green-500/20 text-green-500"
                    : "bg-red-500/20 text-red-500"
                }`}>
                  {product.status}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-300">{product.added}</td>
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
      
      <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
        <p className="text-sm text-gray-400">Showing 1-10 from 100</p>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                page === 1 
                  ? "bg-blue-500 text-white" 
                  : "text-gray-400 hover:bg-white/10"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

