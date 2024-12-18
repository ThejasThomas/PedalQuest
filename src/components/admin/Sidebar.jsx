import React from 'react';
import { LayoutDashboard, Package, FolderTree, ClipboardList, Ticket, ImageIcon, Receipt, Users, Settings, LogOut } from 'lucide-react';

const SidebarItem = ({ icon, label, active }) => (
  <button
    className={`flex items-center w-full gap-3 px-6 py-3 text-sm transition-colors ${
      active ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export function Sidebar() {
  return (
    <div className="w-64 bg-black min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <img 
          src="/path-to-your-logo.png" 
          alt="DealQuest Logo" 
          className="h-12"
        />
      </div>
      
      <div className="flex-1 flex flex-col gap-1">
        <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
        <SidebarItem icon={<Package size={20} />} label="Products" />
        <SidebarItem icon={<FolderTree size={20} />} label="Category" />
        <SidebarItem icon={<ClipboardList size={20} />} label="Orders" />
        <SidebarItem icon={<Ticket size={20} />} label="Coupon" />
        <SidebarItem icon={<ImageIcon size={20} />} label="Banner" />
        <SidebarItem icon={<Receipt size={20} />} label="Transaction" />
        <SidebarItem icon={<Users size={20} />} label="Customers" />
        <SidebarItem icon={<Settings size={20} />} label="Settings" />
      </div>

      <button className="flex items-center gap-3 px-6 py-3 text-sm text-red-500 hover:bg-white/5 transition-colors">
        <LogOut size={20} />
        <span>Log-out</span>
      </button>
    </div>
  );
}

