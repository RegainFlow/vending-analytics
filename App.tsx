import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { VendorList } from './components/VendorList';
import { ScorecardDetail } from './components/ScorecardDetail';
import { Vendor, RiskLevel, VendorStatus } from './types';
import { QAApprovals } from './components/QAApprovals';
import { RiskAnalytics } from './components/RiskAnalytics';
import { NewVendorModal } from './components/NewVendorModal';

// Mock Data
const MOCK_VENDORS: Vendor[] = [
  {
    id: 'V-1001',
    name: 'FreshSnack Solutions',
    type: 'Snack & Food',
    status: VendorStatus.APPROVED,
    riskLevel: RiskLevel.LOW,
    overallScore: 94,
    description: 'Premier provider of healthy snack options and refrigerated food units. Services 50+ corporate campuses. Excellent restocking times with <1% stockout rate. Machines are IoT-enabled for real-time telemetry.',
    metrics: { uptime: 99, restockEfficiency: 95, salesPerformance: 92, customerSat: 98 },
    lastAuditDate: '2023-11-15'
  },
  {
    id: 'V-1042',
    name: 'Caffeine Rush Vendors',
    type: 'Coffee & Hot Bev',
    status: VendorStatus.APPROVED,
    riskLevel: RiskLevel.MEDIUM,
    overallScore: 78,
    description: 'Specializes in high-end bean-to-cup machines. Coffee quality is top-tier, but machine maintenance response times have slipped in Sector 4. Revenue per unit is high, but downtime frequency is increasing.',
    metrics: { uptime: 85, restockEfficiency: 90, salesPerformance: 96, customerSat: 80 },
    lastAuditDate: '2024-01-10'
  },
  {
    id: 'V-1089',
    name: 'CoolDrinks Inc.',
    type: 'Cold Components',
    status: VendorStatus.ON_HOLD,
    riskLevel: RiskLevel.HIGH,
    overallScore: 62,
    description: 'Large scale cold beverage supplier. Currently flagged for repeated compressor failures in older units leading to product spoilage. Restock schedule is inconsistent across remote locations.',
    metrics: { uptime: 70, restockEfficiency: 65, salesPerformance: 75, customerSat: 55 },
    lastAuditDate: '2023-12-05'
  },
  {
    id: 'V-1102',
    name: 'TechVend Gadgets',
    type: 'Electronics',
    status: VendorStatus.APPROVED,
    riskLevel: RiskLevel.LOW,
    overallScore: 88,
    description: 'Airport and lobby kiosk specialist for electronics and travel accessories. High margin items. Inventory tracking is fully automated. Very low maintenance overhead.',
    metrics: { uptime: 98, restockEfficiency: 92, salesPerformance: 85, customerSat: 88 },
    lastAuditDate: '2024-02-01'
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [vendors, setVendors] = useState<Vendor[]>(MOCK_VENDORS);
  const [isNewVendorModalOpen, setIsNewVendorModalOpen] = useState(false);

  const handleVendorSelect = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setActiveTab('vendors'); // Keep highlighted context
  };

  const handleUpdateVendor = (updatedVendor: Vendor) => {
    setVendors(prev => prev.map(v => v.id === updatedVendor.id ? updatedVendor : v));
    setSelectedVendor(updatedVendor);
  };

  const handleAddVendor = (newVendor: Vendor) => {
    setVendors(prev => [...prev, newVendor]);
  };

  const renderContent = () => {
    if (selectedVendor) {
      return (
        <ScorecardDetail
          vendor={selectedVendor}
          onBack={() => setSelectedVendor(null)}
          onUpdateVendor={handleUpdateVendor}
        />
      );
    }
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard vendors={vendors} onNavigate={setActiveTab} />;
      case 'vendors':
        return (
          <VendorList
            vendors={vendors}
            onSelectVendor={handleVendorSelect}
            onAddVendor={() => setIsNewVendorModalOpen(true)}
          />
        );
      case 'qa':
        return <QAApprovals vendors={vendors} onUpdateVendor={handleUpdateVendor} />;
      case 'analytics':
        return <RiskAnalytics vendors={vendors} />;
      default:
        return <Dashboard vendors={vendors} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-main text-text-primary font-primary selection:bg-primary selection:text-black">
      <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        setSelectedVendor(null);
      }} />

      <main className="md:ml-64 p-4 md:p-8 min-h-screen relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      <NewVendorModal
        isOpen={isNewVendorModalOpen}
        onClose={() => setIsNewVendorModalOpen(false)}
        onSave={handleAddVendor}
      />
    </div>
  );
};

export default App;