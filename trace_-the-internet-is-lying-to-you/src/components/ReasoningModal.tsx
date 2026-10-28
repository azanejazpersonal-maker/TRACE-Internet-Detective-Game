/**
 * Reasoning Defense Stage Component for TRACE (Stage D: Explain Your Reasoning)
 * Girls Who Code HHS Hackathon 2026
 * 
 * Simple English and clean black/white themes.
 */

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { ReasoningOption } from '../types/game';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2 
} from 'lucide-react';
import { sound } from '../utils/audio';

export const ReasoningModal: React.FC = () => {
  const { currentCase, pendingDecision, submitReasoning, goToScreen, settings } = useGame();
  const [selectedOption, setSelectedOption] = useState<ReasoningOption | null>(null);
  const isWhite = settings.theme === 'white';

  const handleSelect = (option: ReasoningOption) => {
    sound.playClick();
    setSelectedOption(option);
  };

  const handleConfirm = () => {
    if (!selectedOption) return;
    submitReasoning(selectedOption);
  };

  const decisionLabel = pendingDecision === 'SHARE' 
    ? 'SHARE TO PUBLIC' 
    : pendingDecision === 'FLAG' 
    ? 'FLAG AS FAKE / REPORT' 
    : 'WAIT FOR MORE PROOF';

  return (
    <div className={`max-w-2xl mx-auto px-4 py-8 transition-colors ${
      isWhite ? 'text-zinc-900' : 'text-zinc-100'
    }`}>
      <div className={`border rounded-lg p-6 sm:p-8 transition-colors ${
        isWhite ? 'bg-white border-zinc-200 shadow-sm' : 'bg-[#141416] border-zinc-800'
      }`}>
        {/* Header */}
        <div className={`border-b pb-4 mb-6 ${
          isWhite ? 'border-zinc-200' : 'border-zinc-800'
        }`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">
              STAGE 4 · EXPLAIN YOUR REASON
            </span>
            <button
              onClick={() => goToScreen('DECISION')}
              className={`flex items-center gap-1 text-xs font-mono cursor-pointer underline underline-offset-4 ${
                isWhite ? 'text-zinc-600 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Change Decision</span>
            </button>
          </div>
          <h1 className="text-2xl font-bold">
            Why did you make this choice?
          </h1>
          <p className={`text-xs mt-1 ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
            Good detectives don't just guess — they have proof to back up their decisions.
          </p>
        </div>

        {/* Selected Verdict Recap */}
        <div className={`p-3 rounded border flex items-center justify-between text-xs mb-6 ${
          isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-[#0B0B0C] border-zinc-800'
        }`}>
          <div>
            <span className="text-zinc-500 font-mono text-[11px] uppercase block">
              Your Choice:
            </span>
            <strong className="font-bold text-sm">
              {decisionLabel}
            </strong>
          </div>
          <span className="font-mono text-zinc-500 text-[11px]">
            {currentCase.id}
          </span>
        </div>

        {/* Reasoning Selection Options */}
        <div className="space-y-3 mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
            Select the best explanation:
          </label>

          {currentCase.reasoningOptions.map(opt => {
            const isSelected = selectedOption?.id === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`w-full p-4 rounded-lg border text-left transition-all flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? (isWhite ? 'border-zinc-900 bg-zinc-100 ring-2 ring-zinc-900 text-zinc-900' : 'border-white bg-zinc-800 ring-2 ring-white text-white')
                    : (isWhite ? 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700' : 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 text-zinc-300')
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isSelected ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-zinc-400 dark:border-zinc-600" />
                  )}
                </div>
                <div className="text-xs sm:text-sm leading-relaxed">
                  {opt.statement}
                </div>
              </button>
            );
          })}
        </div>

        {/* Confirm and Reveal Results */}
        <button
          onClick={handleConfirm}
          disabled={!selectedOption}
          className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded font-bold text-xs uppercase tracking-wider transition shadow-sm ${
            selectedOption
              ? (isWhite ? 'bg-zinc-900 hover:bg-zinc-800 text-white cursor-pointer' : 'bg-white hover:bg-zinc-200 text-zinc-950 cursor-pointer')
              : 'bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed'
          }`}
        >
          <span>See Score & Case Debrief</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
