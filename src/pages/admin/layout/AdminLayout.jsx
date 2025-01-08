import React from 'react';
import { Sidebar } from '../../../components/admin/Sidebar';
// import { Header } from '../../components/admin/Header';
import { Outlet } from 'react-router-dom';

export function AdminLayout( ) {
  return (
    <div className="flex min-h-screen w-full bg-black">
      <Sidebar />
    <div className='flex-1 overflow-x-hidden'>
      <Outlet/>

    </div>
      
    </div>
  );
}

