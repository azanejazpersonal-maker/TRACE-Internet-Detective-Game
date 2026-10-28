/**
 * Global Game State Context for TRACE
 * Girls Who Code HHS Hackathon 2026
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  ScreenMode, 
  CaseData, 
  EvidenceItem, 
  AssessmentChoice, 
  ConfidenceLevel, 
  InitialAssessment, 
  DecisionType, 
  ReasoningOption, 
  CaseScoreResult, 
  UserSettings, 
  PlayerHistory 
} from '../types/game';
import { CASE_FILES } from '../data/cases';
import { sound } from '../utils/audio';
import { 
  loadSettings, 
  saveSettings, 
  loadHistory, 
  saveHistory, 
  clearGameProgress,
  DEFAULT_SETTINGS 
} from '../utils/storage';
import { calculateCaseScore } from '../utils/scoring';

interface GameContextType {
  screen: ScreenMode;
  previousScreen: ScreenMode;
  currentCaseIndex: number;
  currentCase: CaseData;
  inspectedEvidenceIds: string[];
  activeEvidenceItem: EvidenceItem | null;
  initialAssessment: InitialAssessment | null;
  pendingDecision: DecisionType | null;
  selectedReasoning: ReasoningOption | null;
  currentCaseScore: CaseScoreResult | null;
  history: PlayerHistory;
  settings: UserSettings;

  // Navigation & Actions
  goToScreen: (screen: ScreenMode) => void;
  startNewCampaign: () => void;
  openTutorial: () => void;
  openAbout: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  beginCaseBriefing: () => void;
  beginConfidenceTrap: () => void;
  submitInitialAssessment: (choice: AssessmentChoice, confidence: ConfidenceLevel) => void;
  openEvidenceItem: (item: EvidenceItem) => void;
  closeEvidenceItem: () => void;
  proceedToDecision: () => void;
  submitDecision: (decision: DecisionType) => void;
  submitReasoning: (reasoning: ReasoningOption) => void;
  advanceFromResults: () => void;
  completeFinalChallenge: (score: number) => void;
  replayCaseById: (caseId: string) => void;
  resetAllProgress: () => void;
  updateSettings: (partial: Partial<UserSettings>) => void;
  toggleMute: () => void;
  toggleTheme: () => void;
}


const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<ScreenMode>('TITLE');
  const [previousScreen, setPreviousScreen] = useState<ScreenMode>('TITLE');
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number>(0);

  // In-case investigation state
  const [inspectedEvidenceIds, setInspectedEvidenceIds] = useState<string[]>([]);
  const [activeEvidenceItem, setActiveEvidenceItem] = useState<EvidenceItem | null>(null);
  const [initialAssessment, setInitialAssessment] = useState<InitialAssessment | null>(null);
  const [pendingDecision, setPendingDecision] = useState<DecisionType | null>(null);
  const [selectedReasoning, setSelectedReasoning] = useState<ReasoningOption | null>(null);
  const [currentCaseScore, setCurrentCaseScore] = useState<CaseScoreResult | null>(null);

  // Persistent storage state
  const [history, setHistory] = useState<PlayerHistory>(loadHistory);
  const [settings, setSettings] = useState<UserSettings>(loadSettings);

  const currentCase = CASE_FILES[currentCaseIndex] || CASE_FILES[0];

  // Sync audio mute with settings
  useEffect(() => {
    sound.setMuted(!settings.soundEnabled);
  }, [settings.soundEnabled]);

  // Save history on changes
  useEffect(() => {
    saveHistory(history);
  }, [history]);

  // Save settings on changes
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const goToScreen = useCallback((newScreen: ScreenMode) => {
    sound.playClick();
    setPreviousScreen(screen);
    setScreen(newScreen);
  }, [screen]);

  const openSettings = useCallback(() => {
    sound.playClick();
    setPreviousScreen(screen);
    setScreen('SETTINGS');
  }, [screen]);

  const closeSettings = useCallback(() => {
    sound.playClick();
    setScreen(previousScreen);
  }, [previousScreen]);

  const openTutorial = useCallback(() => {
    sound.playClick();
    setScreen('TUTORIAL');
  }, []);

  const openAbout = useCallback(() => {
    sound.playClick();
    setPreviousScreen(screen);
    setScreen('ABOUT');
  }, [screen]);

  const resetCurrentCaseState = useCallback(() => {
    setInspectedEvidenceIds([]);
    setActiveEvidenceItem(null);
    setInitialAssessment(null);
    setPendingDecision(null);
    setSelectedReasoning(null);
    setCurrentCaseScore(null);
  }, []);

  const startNewCampaign = useCallback(() => {
    sound.playClick();
    setCurrentCaseIndex(0);
    resetCurrentCaseState();
    setScreen('CASE_BRIEFING');
  }, [resetCurrentCaseState]);

  const beginCaseBriefing = useCallback(() => {
    sound.playClick();
    resetCurrentCaseState();
    setScreen('CASE_BRIEFING');
  }, [resetCurrentCaseState]);

  const beginConfidenceTrap = useCallback(() => {
    sound.playAlert();
    setScreen('CONFIDENCE_TRAP');
  }, []);

  const submitInitialAssessment = useCallback((choice: AssessmentChoice, confidence: ConfidenceLevel) => {
    sound.playInspect();
    setInitialAssessment({
      choice,
      confidence,
      timestamp: Date.now(),
    });
    setScreen('INVESTIGATION');
  }, []);

  const openEvidenceItem = useCallback((item: EvidenceItem) => {
    sound.playInspect();
    setActiveEvidenceItem(item);
    setInspectedEvidenceIds(prev => {
      if (!prev.includes(item.id)) {
        return [...prev, item.id];
      }
      return prev;
    });
  }, []);

  const closeEvidenceItem = useCallback(() => {
    sound.playClick();
    setActiveEvidenceItem(null);
  }, []);

  const proceedToDecision = useCallback(() => {
    sound.playClick();
    setScreen('DECISION');
  }, []);

  const submitDecision = useCallback((decision: DecisionType) => {
    sound.playClick();
    setPendingDecision(decision);
    setScreen('REASONING');
  }, []);

  const submitReasoning = useCallback((reasoning: ReasoningOption) => {
    setSelectedReasoning(reasoning);
    const scoreResult = calculateCaseScore(
      currentCase,
      inspectedEvidenceIds,
      initialAssessment,
      pendingDecision || 'INVESTIGATE_FURTHER',
      reasoning
    );
    setCurrentCaseScore(scoreResult);

    if (scoreResult.decisionFeedback.isOptimal) {
      sound.playSuccess();
    } else {
      sound.playAlert();
    }

    // Update history
    setHistory(prev => {
      const updatedScores = { ...prev.caseScores, [currentCase.id]: scoreResult };
      const updatedCompleted = prev.completedCaseIds.includes(currentCase.id)
        ? prev.completedCaseIds
        : [...prev.completedCaseIds, currentCase.id];

      const totalSoFar = Object.values(updatedScores).reduce((acc, curr) => acc + curr.totalScore, 0);
      const best = Math.max(prev.bestOverallScore, totalSoFar);

      return {
        ...prev,
        completedCaseIds: updatedCompleted,
        caseScores: updatedScores,
        bestOverallScore: best,
      };
    });

    setScreen('CASE_RESULTS');
  }, [currentCase, inspectedEvidenceIds, initialAssessment, pendingDecision]);

  const advanceFromResults = useCallback(() => {
    sound.playClick();
    if (currentCaseIndex < CASE_FILES.length - 1) {
      // Proceed to next case
      const nextIdx = currentCaseIndex + 1;
      setCurrentCaseIndex(nextIdx);
      resetCurrentCaseState();
      setScreen('CASE_BRIEFING');
    } else {
      // All main cases completed -> unlock Final Timed Challenge!
      setScreen('FINAL_CHALLENGE');
    }
  }, [currentCaseIndex, resetCurrentCaseState]);

  const completeFinalChallenge = useCallback((challengeScore: number) => {
    sound.playSuccess();
    setHistory(prev => {
      const totalMain = Object.values(prev.caseScores).reduce((acc, c) => acc + c.totalScore, 0);
      const newTotal = totalMain + challengeScore;
      return {
        ...prev,
        finalChallengeScore: challengeScore,
        finalChallengeCompleted: true,
        bestOverallScore: Math.max(prev.bestOverallScore, newTotal),
      };
    });
    setScreen('DETECTIVE_REPORT');
  }, []);

  const replayCaseById = useCallback((caseId: string) => {
    sound.playClick();
    const idx = CASE_FILES.findIndex(c => c.id === caseId);
    if (idx !== -1) {
      setCurrentCaseIndex(idx);
      resetCurrentCaseState();
      setScreen('CASE_BRIEFING');
    }
  }, [resetCurrentCaseState]);

  const resetAllProgress = useCallback(() => {
    sound.playAlert();
    clearGameProgress();
    setHistory({
      completedCaseIds: [],
      caseScores: {},
      finalChallengeScore: 0,
      finalChallengeCompleted: false,
      bestOverallScore: 0,
      totalTimeSpentSeconds: 0,
    });
    setCurrentCaseIndex(0);
    resetCurrentCaseState();
    setScreen('TITLE');
  }, [resetCurrentCaseState]);

  const updateSettingsState = useCallback((partial: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...partial }));
  }, []);

  const toggleMute = useCallback(() => {
    setSettings(prev => {
      const next = !prev.soundEnabled;
      sound.setMuted(!next);
      return { ...prev, soundEnabled: next };
    });
  }, []);

  const toggleTheme = useCallback(() => {
    sound.playClick();
    setSettings(prev => {
      const nextTheme = prev.theme === 'black' ? 'white' : 'black';
      return { ...prev, theme: nextTheme };
    });
  }, []);

  return (
    <GameContext.Provider
      value={{
        screen,
        previousScreen,
        currentCaseIndex,
        currentCase,
        inspectedEvidenceIds,
        activeEvidenceItem,
        initialAssessment,
        pendingDecision,
        selectedReasoning,
        currentCaseScore,
        history,
        settings,
        goToScreen,
        startNewCampaign,
        openTutorial,
        openAbout,
        openSettings,
        closeSettings,
        beginCaseBriefing,
        beginConfidenceTrap,
        submitInitialAssessment,
        openEvidenceItem,
        closeEvidenceItem,
        proceedToDecision,
        submitDecision,
        submitReasoning,
        advanceFromResults,
        completeFinalChallenge,
        replayCaseById,
        resetAllProgress,
        updateSettings: updateSettingsState,
        toggleMute,
        toggleTheme,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
