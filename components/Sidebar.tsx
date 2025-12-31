import React from 'react';
import { Icons } from './Icons';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
    { id: 'vendors', label: 'Vendors', icon: Icons.Users },
    { id: 'qa', label: 'QA Approvals', icon: Icons.Shield },
    { id: 'analytics', label: 'Risk Analytics', icon: Icons.Chart },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-[#121213] border-r border-white/10 z-20">
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-bg-main">
          <Icons.Shield size={20} />
        </div>
        <div>
          <h1 className="font-logo font-bold text-lg tracking-wide text-white">RegainFlow</h1>
          <p className="text-xs text-primary font-mono tracking-widest">VENDING ANALYTICS</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`
              w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
              ${activeTab === item.id
                ? 'bg-primary-alpha15 text-primary border border-primary-alpha25 shadow-glow-subtle'
                : 'text-text-secondary hover:text-white hover:bg-white/5'}
            `}
          >
            <item.icon size={20} className={activeTab === item.id ? 'text-primary' : ''} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-xs font-bold text-black">
              JS
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Jane Smith</p>
              <p className="text-xs text-text-secondary">Senior Risk Officer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};