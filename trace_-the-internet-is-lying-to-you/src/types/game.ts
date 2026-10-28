/**
 * Types for TRACE: The Internet Is Lying to You
 * Girls Who Code HHS Hackathon 2026
 */

export type ScreenMode = 
  | 'TITLE'
  | 'TUTORIAL'
  | 'CASE_BRIEFING'
  | 'CONFIDENCE_TRAP'
  | 'INVESTIGATION'
  | 'DECISION'
  | 'REASONING'
  | 'CASE_RESULTS'
  | 'FINAL_CHALLENGE'
  | 'DETECTIVE_REPORT'
  | 'SETTINGS'
  | 'ABOUT';

export type AssessmentChoice = 'likely_trustworthy' | 'unsure' | 'likely_untrustworthy';
export type ConfidenceLevel = 50 | 75 | 95;

export interface InitialAssessment {
  choice: AssessmentChoice;
  confidence: ConfidenceLevel;
  timestamp: number;
}

export type DecisionType = 'SHARE' | 'FLAG' | 'INVESTIGATE_FURTHER';

export type EvidenceType = 
  | 'VIRAL_POST'
  | 'OFFICIAL_ANNOUNCEMENT'
  | 'ACCOUNT_HISTORY'
  | 'TIMELINE_LOG'
  | 'FOLLOWUP_REPORT'
  | 'DONATION_PAGE'
  | 'ORGANIZATION_ID'
  | 'IMAGE_PROVENANCE'
  | 'PAYMENT_REGISTRY'
  | 'VERIFICATION_PROTOCOL'
  | 'AUDIO_TRANSCRIPT'
  | 'SENDER_TELEMETRY'
  | 'MUNICIPAL_RECORD';

export interface EvidenceItem {
  id: string;
  refNumber: string; // e.g. "EVD-01"
  title: string;
  type: EvidenceType;
  typeLabel: string;
  summary: string;
  content: string; // Detailed document / report / transcript text
  establishes: string[]; // List of facts established
  doesNotEstablish: string[]; // Critical limitations
  investigativeInquiry: string; // Key question investigator should ask
  sourceOrg?: string;
  timestampStr?: string;
  metadata?: Record<string, string>;
}

export interface ReasoningOption {
  id: string;
  statement: string;
  isCorrect: boolean;
  scoreWeight: number; // 0 to 25
  critique: string; // Educational critique why this is sound or flawed
}

export interface SocialPostTip {
  authorName: string;
  authorHandle: string;
  authorAvatarText: string;
  isVerifiedBadge: boolean; // Note: teach that badges can be purchased or misleading
  accountAge: string;
  timeAgo: string;
  mainClaim: string;
  postBody: string;
  attachedMediaNotice?: string;
  engagement: {
    views: string;
    shares: string;
    likes: string;
    replies: string;
  };
  urgencyWarning?: string;
}

export interface CaseData {
  id: string; // "TR-001", "TR-002", "TR-003"
  caseNumber: number; // 1, 2, 3
  title: string;
  subtitle: string;
  category: string;
  briefingHeadline: string;
  scenarioOverview: string;
  tip: SocialPostTip;
  evidenceItems: EvidenceItem[];
  correctDecision: DecisionType;
  acceptableAlternative?: DecisionType;
  reasoningOptions: ReasoningOption[];
  caseConclusionText: string;
  realWorldTakeaway: {
    ruleTitle: string;
    explanation: string;
    actionableHabit: string;
    checklistTip: string;
  };
}

export interface CaseScoreResult {
  evidenceScore: number;      // max 30
  decisionScore: number;      // max 30
  reasoningScore: number;     // max 25
  calibrationScore: number;   // max 15
  totalScore: number;         // max 100
  calibrationAnalysis: {
    label: string;
    description: string;
    isOverconfident: boolean;
    isAppropriatelyCalibrated: boolean;
    initialChoice: AssessmentChoice;
    initialConfidence: ConfidenceLevel;
    finalDecision: DecisionType;
  };
  decisionFeedback: {
    isOptimal: boolean;
    feedbackTitle: string;
    feedbackDetail: string;
    evidenceSupported: string[];
    evidenceInsufficient: string[];
  };
  reasoningFeedback: {
    chosenStatement: string;
    critique: string;
  };
}

export interface FinalChallengePost {
  id: string;
  headline: string;
  author: string;
  postContent: string;
  evidenceSnippet: string;
  category: 'CONTRADICTED' | 'SUPPORTED' | 'INSUFFICIENT';
  correctDecision: DecisionType;
  explanation: string;
}

export interface UserSettings {
  soundEnabled: boolean;
  reducedMotion: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  theme: 'black' | 'white';
}


export interface PlayerHistory {
  completedCaseIds: string[];
  caseScores: Record<string, CaseScoreResult>;
  finalChallengeScore: number;
  finalChallengeCompleted: boolean;
  bestOverallScore: number;
  totalTimeSpentSeconds: number;
}
