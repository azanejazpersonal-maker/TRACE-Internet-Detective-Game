/**
 * LocalStorage persistence utility for TRACE
 */

import { UserSettings, PlayerHistory } from '../types/game';

const SETTINGS_KEY = 'trace_investigation_settings_v1';
const HISTORY_KEY = 'trace_investigation_history_v1';

export const DEFAULT_SETTINGS: UserSettings = {
  soundEnabled: true,
  reducedMotion: false,
  fontSize: 'normal',
  theme: 'black',
};


export const DEFAULT_HISTORY: PlayerHistory = {
  completedCaseIds: [],
  caseScores: {},
  finalChallengeScore: 0,
  finalChallengeCompleted: false,
  bestOverallScore: 0,
  totalTimeSpentSeconds: 0,
};

export function loadSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: UserSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {}
}

export function loadHistory(): PlayerHistory {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return DEFAULT_HISTORY;
    return { ...DEFAULT_HISTORY, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_HISTORY;
  }
}

export function saveHistory(history: PlayerHistory): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {}
}

export function clearGameProgress(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {}
}
