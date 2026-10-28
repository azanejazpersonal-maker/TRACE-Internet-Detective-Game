/**
 * Deterministic scoring & feedback engine for TRACE
 * Girls Who Code HHS Hackathon 2026
 * 
 * Written in simple, clear, everyday English.
 */

import { 
  CaseData, 
  CaseScoreResult, 
  DecisionType, 
  InitialAssessment, 
  ReasoningOption, 
  PlayerHistory 
} from '../types/game';

export function calculateCaseScore(
  caseData: CaseData,
  inspectedEvidenceIds: string[],
  initialAssessment: InitialAssessment | null,
  decision: DecisionType,
  reasoning: ReasoningOption | null
): CaseScoreResult {
  // 1. Evidence Investigation (max 30 pts)
  const totalEvidenceCount = caseData.evidenceItems.length;
  const inspectedCount = inspectedEvidenceIds.length;
  const evidenceScore = Math.min(30, Math.round((inspectedCount / totalEvidenceCount) * 30));

  // 2. Appropriate Decision (max 30 pts)
  let decisionScore = 0;
  let isOptimal = false;
  if (decision === caseData.correctDecision) {
    decisionScore = 30;
    isOptimal = true;
  } else if (caseData.acceptableAlternative && decision === caseData.acceptableAlternative) {
    decisionScore = 22;
  } else {
    decisionScore = 0;
  }

  // 3. Evidence-Based Reasoning (max 25 pts)
  const reasoningScore = reasoning ? reasoning.scoreWeight : 0;

  // 4. Calibration & Overconfidence Trap (max 15 pts)
  let calibrationScore = 10;
  let isOverconfident = false;
  let isAppropriatelyCalibrated = true;
  let calibrationLabel = 'Thoughtful Judgment';
  let calibrationDesc = 'You balanced your first hunch with real clues before making a choice.';

  if (initialAssessment) {
    const isDeceptiveCase = caseData.correctDecision === 'FLAG';

    if (isDeceptiveCase) {
      if (initialAssessment.choice === 'likely_trustworthy') {
        if (initialAssessment.confidence >= 75) {
          isOverconfident = true;
          isAppropriatelyCalibrated = false;
          if (decision === 'FLAG' || decision === 'INVESTIGATE_FURTHER') {
            // Player fell for the trap initially, but changed mind after seeing clues!
            calibrationScore = 12;
            calibrationLabel = 'Changed Your Mind When You Saw the Proof';
            calibrationDesc = 'You trusted the post at first, but once you looked at the real clues, you were smart enough to change your mind. That is how real detectives think!';
          } else {
            // Player stayed fooled
            calibrationScore = 0;
            calibrationLabel = 'Fell for the Confidence Trap';
            calibrationDesc = 'You were very sure the post was real at first (75-95% confidence), and you stayed fooled even though the clues proved it was fake.';
          }
        } else {
          // 50% confidence
          calibrationScore = 12;
          calibrationLabel = 'Smart Caution';
          calibrationDesc = 'You thought it might be real at first, but kept your confidence low until you checked the real facts.';
        }
      } else if (initialAssessment.choice === 'unsure') {
        calibrationScore = 15;
        calibrationLabel = 'Wisely Admitted You Were Unsure';
        calibrationDesc = 'Saying "I am not sure yet" before seeing the proof is a superpower online. You refused to jump to conclusions!';
      } else {
        // initial likely_untrustworthy
        calibrationScore = 15;
        calibrationLabel = 'Sharp Instinct';
        calibrationDesc = 'You spotted the warning signs right away and backed it up with real facts.';
      }
    }
  }

  const totalScore = evidenceScore + decisionScore + reasoningScore + calibrationScore;

  // Decision Feedback in simple words
  let feedbackTitle = 'What Your Choice Did';
  let feedbackDetail = '';
  const evidenceSupported: string[] = [];
  const evidenceInsufficient: string[] = [];

  if (decision === 'FLAG') {
    feedbackTitle = 'Flagged as Fake / Scam (Best Choice!)';
    feedbackDetail = 'You stopped a fake post from spreading! Your choice protected people from panic, financial scams, or private data leaks.';
  } else if (decision === 'INVESTIGATE_FURTHER') {
    feedbackTitle = 'Waited for More Facts (Safe Choice)';
    feedbackDetail = 'You kept the post in quarantine instead of sharing it right away. Waiting for real proof kept people safe.';
  } else {
    feedbackTitle = 'Shared to the Public (Dangerous Choice)';
    feedbackDetail = 'Sharing this post helped spread a lie. It caused unnecessary panic or risked people getting scammed.';
  }

  caseData.evidenceItems.forEach(item => {
    if (inspectedEvidenceIds.includes(item.id)) {
      evidenceSupported.push(`${item.refNumber}: ${item.title}`);
    } else {
      evidenceInsufficient.push(`${item.refNumber}: ${item.title} (You missed this clue)`);
    }
  });

  return {
    evidenceScore,
    decisionScore,
    reasoningScore,
    calibrationScore,
    totalScore,
    calibrationAnalysis: {
      label: calibrationLabel,
      description: calibrationDesc,
      isOverconfident,
      isAppropriatelyCalibrated,
      initialChoice: initialAssessment?.choice || 'unsure',
      initialConfidence: initialAssessment?.confidence || 50,
      finalDecision: decision,
    },
    decisionFeedback: {
      isOptimal,
      feedbackTitle,
      feedbackDetail,
      evidenceSupported,
      evidenceInsufficient,
    },
    reasoningFeedback: {
      chosenStatement: reasoning?.statement || 'No explanation selected.',
      critique: reasoning?.critique || 'Clear reasons matter when checking facts.',
    },
  };
}

export interface DetectiveReportData {
  totalScore: number;
  rankTitle: string;
  badgeLevel: string;
  evidenceThoroughnessPct: number;
  decisionAccuracyPct: number;
  reasoningRigorPct: number;
  calibrationRating: string;
  calibrationInsight: string;
  strengths: string[];
  growthAreas: string[];
}

export function generateDetectiveReport(history: PlayerHistory): DetectiveReportData {
  const scores = Object.values(history.caseScores);
  const caseCount = scores.length;

  let totalCasePts = 0;
  let totalEvidencePts = 0;
  let totalDecisionPts = 0;
  let totalReasoningPts = 0;
  let totalCalibrationPts = 0;
  let overconfidentCount = 0;

  scores.forEach(s => {
    totalCasePts += s.totalScore;
    totalEvidencePts += s.evidenceScore;
    totalDecisionPts += s.decisionScore;
    totalReasoningPts += s.reasoningScore;
    totalCalibrationPts += s.calibrationScore;
    if (s.calibrationAnalysis.isOverconfident) {
      overconfidentCount++;
    }
  });

  const grandTotal = totalCasePts + (history.finalChallengeScore || 0);
  const maxPossible = (caseCount * 100) + 100;
  const overallPercentage = maxPossible > 0 ? (grandTotal / maxPossible) * 100 : 0;

  let rankTitle = 'Master Internet Detective';
  let badgeLevel = 'Top Fact-Checker';

  if (overallPercentage >= 90) {
    rankTitle = 'Chief Internet Detective';
    badgeLevel = 'Master Detective (Top 5%)';
  } else if (overallPercentage >= 75) {
    rankTitle = 'Senior Fact-Checker';
    badgeLevel = 'Sharp Investigator';
  } else if (overallPercentage >= 55) {
    rankTitle = 'Junior Fact-Checker';
    badgeLevel = 'Apprentice Detective';
  } else {
    rankTitle = 'Beginner Detective in Training';
    badgeLevel = 'Learning the Ropes';
  }

  const evidenceThoroughnessPct = caseCount > 0 ? Math.round((totalEvidencePts / (caseCount * 30)) * 100) : 0;
  const decisionAccuracyPct = caseCount > 0 ? Math.round((totalDecisionPts / (caseCount * 30)) * 100) : 0;
  const reasoningRigorPct = caseCount > 0 ? Math.round((totalReasoningPts / (caseCount * 25)) * 100) : 0;

  let calibrationRating = 'Very Well Calibrated';
  let calibrationInsight = 'You did not jump to quick conclusions. You waited to see real clues before deciding what was true.';

  if (overconfidentCount >= 2) {
    calibrationRating = 'Prone to First-Impression Traps';
    calibrationInsight = 'You often trusted viral posts right away just because they had lots of likes, drama, or emergency warnings.';
  } else if (overconfidentCount === 1) {
    calibrationRating = 'Learned from First Impressions';
    calibrationInsight = 'You got tricked by the drama once at first, but you were smart enough to change your mind when you saw the proof.';
  }

  const strengths: string[] = [];
  const growthAreas: string[] = [];

  if (evidenceThoroughnessPct >= 80) {
    strengths.push('Checked All the Clues: You looked at every document and photo before making up your mind.');
  } else {
    growthAreas.push('Check More Clues: Don\'t make a quick choice until you read all the available facts.');
  }

  if (decisionAccuracyPct >= 80) {
    strengths.push('Stopped Fake News: You refused to share panic posts, fake charities, and voice scams.');
  } else {
    growthAreas.push('Think Twice Before Sharing: Remember that hitting "Share" on a fake emergency spreads panic.');
  }

  if (reasoningRigorPct >= 80) {
    strengths.push('Logical Thinking: You picked real proof instead of falling for high like counts.');
  } else {
    growthAreas.push('Ignore Like Counts: Lots of likes and retweets does NOT mean a post is true.');
  }

  if (strengths.length === 0) {
    strengths.push('Curious Mind: You completed tricky online cases and learned how real online scams work.');
  }
  if (growthAreas.length === 0) {
    growthAreas.push('Stay Alert: Keep using these 5 habits whenever you scroll social media in real life.');
  }

  return {
    totalScore: grandTotal,
    rankTitle,
    badgeLevel,
    evidenceThoroughnessPct,
    decisionAccuracyPct,
    reasoningRigorPct,
    calibrationRating,
    calibrationInsight,
    strengths,
    growthAreas,
  };
}
