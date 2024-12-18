import React from 'react';
import { Search, Bell } from 'lucide-react';

export function Header({ pageTitle }) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-white/10">
      <h1 className="text-2xl font-bold text-white">{pageTitle}</h1>
      
      <div className="flex items-center gap-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 bg-white/5 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <button className="relative">
          <Bell size={20} className="text-gray-400" />
          <span className="absolute -top-1 -right-1 bg-blue-500 text-xs text-white w-4 h-4 rounded-full flex items-center justify-center">
            2
          </span>
        </button>
        
        <div className="flex items-center gap-3">
          <img
            src="/placeholder.svg?height=32&width=32"
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-sm">
            <p className="text-white">Admin User</p>
            <p className="text-gray-400 text-xs">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}

