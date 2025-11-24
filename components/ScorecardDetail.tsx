import React, { useState } from 'react';
import { Vendor, RiskLevel } from '../types';
import { Icons } from './Icons';
import { GlassCard } from './GlassCard';
import { RiskBadge } from './RiskBadge';
import { assessVendorRisk } from '../services/geminiService';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface ScorecardDetailProps {
  vendor: Vendor;
  onBack: () => void;
  onUpdateVendor: (updatedVendor: Vendor) => void;
}

export const ScorecardDetail: React.FC<ScorecardDetailProps> = ({ vendor, onBack, onUpdateVendor }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(vendor.aiAnalysis || null);

  const radarData = [
    { subject: 'Financial', A: vendor.metrics.financialHealth, fullMark: 100 },
    { subject: 'Safety', A: vendor.metrics.safetyRecord, fullMark: 100 },
    { subject: 'Performance', A: vendor.metrics.projectPerformance, fullMark: 100 },
    { subject: 'Compliance', A: vendor.metrics.compliance, fullMark: 100 },
  ];

  const handleAiAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const result = await assessVendorRisk(vendor.name, vendor.description, "Project A: Delayed by 2 weeks due to supply. Project B: Completed on time. 1 Safety incident recorded in 2023.");
      
      const updatedVendor: Vendor = {
        ...vendor,
        metrics: {
          financialHealth: result.financialHealth,
          safetyRecord: result.safetyRecord,
          projectPerformance: result.projectPerformance,
          compliance: result.compliance
        },
        riskLevel: result.riskLevel as RiskLevel,
        overallScore: result.overallScore,
        aiAnalysis: result.summary
      };

      setAiAnalysis(result.summary);
      onUpdateVendor(updatedVendor);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="animate-fade-in space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 rounded-lg hover:bg-white/5 text-text-secondary hover:text-white transition-colors">
          <Icons.ArrowRight className="rotate-180" size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold font-primary">{vendor.name}</h1>
          <p className="text-text-secondary font-mono text-sm">ID: {vendor.id} | Type: {vendor.type}</p>
        </div>
        <div className="ml-auto flex gap-3">
          <button 
            onClick={handleAiAnalysis}
            disabled={isAnalyzing}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-lg hover:bg-purple-500/30 transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            {isAnalyzing ? (
              <Icons.Robot className="animate-spin" size={20} />
            ) : (
              <Icons.Robot size={20} />
            )}
            <span>{isAnalyzing ? 'Analyzing...' : 'AI Risk Assessment'}</span>
          </button>
          <button className="px-4 py-2 bg-primary/20 text-primary border border-primary/40 rounded-lg hover:bg-primary/30 transition-all font-bold">
            Approve Vendor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Stats & AI */}
        <div className="space-y-6 lg:col-span-2">
           <GlassCard className="flex flex-col md:flex-row gap-8 items-center justify-around">
              <div className="text-center">
                <p className="text-text-secondary text-sm uppercase tracking-widest mb-2">Risk Level</p>
                <div className="scale-125">
                   <RiskBadge level={vendor.riskLevel} />
                </div>
              </div>
              <div className="h-16 w-px bg-white/10 hidden md:block"></div>
              <div className="text-center">
                <p className="text-text-secondary text-sm uppercase tracking-widest mb-2">Overall Score</p>
                <span className="text-5xl font-mono font-bold text-white relative">
                  {vendor.overallScore}
                  <span className="text-sm absolute -top-2 -right-6 text-text-secondary">/100</span>
                </span>
              </div>
              <div className="h-16 w-px bg-white/10 hidden md:block"></div>
              <div className="text-center">
                <p className="text-text-secondary text-sm uppercase tracking-widest mb-2">Last Audit</p>
                <span className="text-lg font-bold text-white">{vendor.lastAuditDate}</span>
              </div>
           </GlassCard>

           {aiAnalysis && (
             <GlassCard className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-900/10 to-transparent">
               <div className="flex items-start gap-4">
                 <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 mt-1">
                   <Icons.Robot size={24} />
                 </div>
                 <div>
                   <h3 className="text-lg font-bold text-white mb-2">Gemini Assessment Summary</h3>
                   <p className="text-text-secondary leading-relaxed text-sm">
                     {aiAnalysis}
                   </p>
                 </div>
               </div>
             </GlassCard>
           )}

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Icons.Chart size={20} className="text-primary" />
                  Performance Metrics
                </h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={radarData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                       <XAxis type="number" domain={[0, 100]} hide />
                       <YAxis type="category" dataKey="subject" tick={{fill: '#a6a6a6', fontSize: 12}} width={80} />
                       <Tooltip 
                          contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                          itemStyle={{ color: '#fff' }}
                          cursor={{fill: 'rgba(255,255,255,0.05)'}}
                       />
                       <Bar dataKey="A" barSize={20} radius={[0, 4, 4, 0]}>
                          {radarData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.A > 80 ? '#10b981' : entry.A > 60 ? '#f59e0b' : '#ef4444'} />
                          ))}
                       </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>

              <GlassCard>
                 <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Icons.TrendUp size={20} className="text-primary" />
                  Risk Distribution
                </h3>
                <div className="h-[250px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#a6a6a6', fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="Vendor"
                        dataKey="A"
                        stroke="#00d6cb"
                        strokeWidth={2}
                        fill="#00d6cb"
                        fillOpacity={0.3}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                        itemStyle={{ color: '#00d6cb' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
           </div>
        </div>

        {/* Right Col: Details */}
        <div className="space-y-6">
          <GlassCard>
            <h3 className="text-lg font-bold text-white mb-4">Vendor Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-text-secondary uppercase mb-1">Company Description</p>
                <p className="text-sm text-white/90 leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5">
                  {vendor.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <p className="text-xs text-text-secondary uppercase mb-1">Founded</p>
                   <p className="text-sm font-mono text-white">2008</p>
                </div>
                <div>
                   <p className="text-xs text-text-secondary uppercase mb-1">Employees</p>
                   <p className="text-sm font-mono text-white">145</p>
                </div>
                <div>
                   <p className="text-xs text-text-secondary uppercase mb-1">License</p>
                   <p className="text-sm font-mono text-white">CA-98221</p>
                </div>
                <div>
                   <p className="text-xs text-text-secondary uppercase mb-1">Insured</p>
                   <p className="text-sm font-mono text-green-400 flex items-center gap-1">
                     <Icons.Check size={14} /> Yes
                   </p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
             <h3 className="text-lg font-bold text-white mb-4">Certifications</h3>
             <div className="flex flex-wrap gap-2">
               {['ISO 9001', 'OSHA 30', 'LEED Silver', 'Minority Owned'].map((cert) => (
                 <span key={cert} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-text-secondary">
                   {cert}
                 </span>
               ))}
             </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-bold text-white mb-4">Recent Projects</h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-white">Skyline Tower A</span>
                <span className="text-green-400 text-xs">Completed</span>
              </li>
              <li className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-white">Metro Station Refit</span>
                <span className="text-yellow-400 text-xs">In Progress</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-white">Harbor Logistics Center</span>
                <span className="text-text-secondary text-xs">Pending</span>
              </li>
            </ul>
          </GlassCard>
        </div>

      </div>
    </div>
  );
};