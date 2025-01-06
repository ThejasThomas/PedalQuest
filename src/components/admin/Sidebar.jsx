import React from 'react';
import { LayoutGrid, Package, List, ShoppingCart, Ticket, Image, FileText, Users, Settings, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function Sidebar() {
  const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: List, label: 'Category', path: '/admin/category' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: Ticket, label: 'Coupon', path: '/admin/coupon' },
    { icon: Image, label: 'Banner', path: '/admin/banner' },
    { icon: FileText, label: 'Transaction', path: '/admin/transaction' },
    { icon: Users, label: 'Customers', path: '/admin/customer' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
    { icon: LogOut, label: 'Logout', path: '/admin/logout' },
  ];

  return (
    <aside className="w-64 bg-black text-gray-300 min-h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-lg font-bold text-white">PedalQuest</h1>
      </div>
      <nav className="flex-1 px-4">
        <div className="text-sm uppercase text-gray-500 mb-4">Menu</div>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
