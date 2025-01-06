import React from 'react';
import { Sidebar } from '../../../components/admin/Sidebar';
// import { Header } from '../../components/admin/Header';
import { Outlet } from 'react-router-dom';

export function AdminLayout( ) {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
    <div className='admin-content'>
      <Outlet/>

    </div>
      
    </div>
  );
}

