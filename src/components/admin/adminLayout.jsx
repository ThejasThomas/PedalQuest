import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function AdminLayout({ children, activePage, onNavigate }) {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col">
        <Header pageTitle={activePage.charAt(0).toUpperCase() + activePage.slice(1)} />
        
        <main className="flex-1 p-6 bg-black overflow-auto">
          <div className="bg-black/30 rounded-lg p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

