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
  uptime: number; // 0-100%
  restockEfficiency: number; // 0-100 score
  salesPerformance: number; // 0-100 score relative to target
  customerSat: number; // 0-100 CSAT score
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
  uptime: number;
  restockEfficiency: number;
  salesPerformance: number;
  customerSat: number;
  summary: string;
}