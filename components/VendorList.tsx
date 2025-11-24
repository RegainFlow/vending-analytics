import React from 'react';
import { Vendor, VendorStatus } from '../types';
import { GlassCard } from './GlassCard';
import { RiskBadge } from './RiskBadge';
import { Icons } from './Icons';

interface VendorListProps {
  vendors: Vendor[];
  onSelectVendor: (vendor: Vendor) => void;
}

export const VendorList: React.FC<VendorListProps> = ({ vendors, onSelectVendor }) => {
  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-primary">Active Subcontractors</h2>
        <div className="flex gap-2">
           <div className="relative">
             <input 
               type="text" 
               placeholder="Search vendors..." 
               className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all w-64 placeholder-text-secondary"
             />
             <Icons.Search className="absolute left-3 top-2.5 text-text-secondary" size={16} />
           </div>
           <button className="bg-primary-alpha15 text-primary border border-primary hover:bg-primary-alpha25 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-glow-subtle flex items-center gap-2">
              <span>+ New Vendor</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {vendors.map((vendor) => (
          <GlassCard 
            key={vendor.id} 
            hoverEffect={true} 
            onClick={() => onSelectVendor(vendor)}
            className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-text-secondary">
                 <Icons.Building size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{vendor.name}</h3>
                <p className="text-sm text-text-secondary font-mono">{vendor.type}</p>
              </div>
            </div>

            <div className="flex items-center gap-8 flex-1 justify-end md:justify-center">
               <div className="text-center">
                 <p className="text-xs text-text-secondary uppercase tracking-widest mb-1">Status</p>
                 <span className={`text-sm font-bold ${
                   vendor.status === VendorStatus.APPROVED ? 'text-green-400' : 
                   vendor.status === VendorStatus.REJECTED ? 'text-red-400' : 'text-yellow-400'
                 }`}>
                   {vendor.status}
                 </span>
               </div>
               
               <div className="text-center">
                 <p className="text-xs text-text-secondary uppercase tracking-widest mb-1">Score</p>
                 <span className={`text-xl font-bold font-mono ${
                    vendor.overallScore >= 80 ? 'text-primary' : vendor.overallScore >= 60 ? 'text-yellow-400' : 'text-red-400'
                 }`}>
                   {vendor.overallScore}
                 </span>
               </div>

               <div className="text-center min-w-[80px]">
                 <p className="text-xs text-text-secondary uppercase tracking-widest mb-1">Risk</p>
                 <RiskBadge level={vendor.riskLevel} />
               </div>
            </div>
            
            <div className="md:w-10 flex justify-end text-text-secondary">
              <Icons.ArrowRight size={20} />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};