import React from 'react';
import { Search, Bell } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-black/20 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell size={20} className="text-gray-400" />
          <span className="absolute -top-1 -right-1 bg-blue-500 text-xs text-white w-4 h-4 rounded-full flex items-center justify-center">
            2
          </span>
        </button>
        
        <div className="flex items-center gap-3">
          <img
            src="/path-to-avatar.jpg"
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-sm">
            <p className="text-white">Thejas Thomas</p>
            <p className="text-gray-400 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

