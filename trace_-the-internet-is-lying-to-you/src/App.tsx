/**
 * Main Application Entry for TRACE
 * Girls Who Code HHS Hackathon 2026
 */

import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Header } from './components/Header';
import { TitleScreen } from './components/TitleScreen';
import { Tutorial } from './components/Tutorial';
import { CaseBriefing } from './components/CaseBriefing';
import { ConfidenceTrapModal } from './components/ConfidenceTrapModal';
import { InvestigationLayout } from './components/InvestigationLayout';
import { DecisionModal } from './components/DecisionModal';
import { ReasoningModal } from './components/ReasoningModal';
import { CaseResults } from './components/CaseResults';
import { FinalChallenge } from './components/FinalChallenge';
import { DetectiveReport } from './components/DetectiveReport';
import { SettingsModal } from './components/SettingsModal';
import { AboutCreator } from './components/AboutCreator';

const GameRouter: React.FC = () => {
  const { screen, settings } = useGame();

  const fontSizeClass = 
    settings.fontSize === 'large' 
      ? 'text-base sm:text-lg' 
      : settings.fontSize === 'xlarge' 
      ? 'text-lg sm:text-xl' 
      : 'text-sm sm:text-base';

  const themeClass = settings.theme === 'white' 
    ? 'theme-white bg-[#F8F9FA] text-zinc-900' 
    : 'theme-black bg-[#0E0E10] text-zinc-100';

  return (
    <div className={`min-h-screen flex flex-col ${themeClass} ${fontSizeClass} ${
      settings.reducedMotion ? 'motion-reduce' : ''
    }`}>
      {/* Top Navigation */}
      <Header />

      {/* Dynamic Screen View */}
      <main className="flex-1 flex flex-col">
        {screen === 'TITLE' && <TitleScreen />}
        {screen === 'TUTORIAL' && <Tutorial />}
        {screen === 'CASE_BRIEFING' && <CaseBriefing />}
        {screen === 'CONFIDENCE_TRAP' && <ConfidenceTrapModal />}
        {screen === 'INVESTIGATION' && <InvestigationLayout />}
        {screen === 'DECISION' && <DecisionModal />}
        {screen === 'REASONING' && <ReasoningModal />}
        {screen === 'CASE_RESULTS' && <CaseResults />}
        {screen === 'FINAL_CHALLENGE' && <FinalChallenge />}
        {screen === 'DETECTIVE_REPORT' && <DetectiveReport />}
        {screen === 'SETTINGS' && <SettingsModal />}
        {screen === 'ABOUT' && <AboutCreator />}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  );
}
