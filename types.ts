export enum RiskLevel {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
    CRITICAL = 'Critical'
  }
  
  export enum VendorStatus {
    APPROVED = 'Approved',
    PENDING = 'Pending QA',
    REJECTED = 'Rejected',
    ON_HOLD = 'On Hold'
  }
  
  export interface ScorecardMetrics {
    financialHealth: number; // 0-100
    safetyRecord: number; // 0-100
    projectPerformance: number; // 0-100
    compliance: number; // 0-100
  }
  
  export interface Vendor {
    id: string;
    name: string;
    type: string;
    status: VendorStatus;
    riskLevel: RiskLevel;
    overallScore: number;
    description: string;
    metrics: ScorecardMetrics;
    lastAuditDate: string;
    aiAnalysis?: string;
  }
  
  export interface AiAssessmentResponse {
    riskLevel: string;
    overallScore: number;
    financialHealth: number;
    safetyRecord: number;
    projectPerformance: number;
    compliance: number;
    summary: string;
  }