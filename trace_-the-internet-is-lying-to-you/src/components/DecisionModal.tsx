/**
 * Decision Stage Component for TRACE (Stage C: Make a Decision)
 * Girls Who Code HHS Hackathon 2026
 * 
 * Simple English and clean black/white themes.
 */

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { DecisionType } from '../types/game';
import { 
  Share2, 
  Flag, 
  Search, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import { sound } from '../utils/audio';

export const DecisionModal: React.FC = () => {
  const { currentCase, submitDecision, goToScreen, settings } = useGame();
  const [selectedDecision, setSelectedDecision] = useState<DecisionType | null>(null);
  const isWhite = settings.theme === 'white';

  const handleSelect = (decision: DecisionType) => {
    sound.playClick();
    setSelectedDecision(decision);
  };

  const handleConfirm = () => {
    if (!selectedDecision) return;
    submitDecision(selectedDecision);
  };

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
              STAGE 3 · YOUR FINAL CALL
            </span>
            <button
              onClick={() => goToScreen('INVESTIGATION')}
              className={`flex items-center gap-1 text-xs font-mono cursor-pointer underline underline-offset-4 ${
                isWhite ? 'text-zinc-600 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Clues</span>
            </button>
          </div>
          <h1 className="text-2xl font-bold">
            What will you do with this post?
          </h1>
          <p className={`text-xs mt-1 ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
            Think about what happens in real life when people share unverified posts.
          </p>
        </div>

        {/* Claim Recap */}
        <div className={`p-3.5 rounded border text-xs mb-6 ${
          isWhite ? 'bg-zinc-50 border-zinc-200 text-zinc-800' : 'bg-[#0B0B0C] border-zinc-800 text-zinc-200'
        }`}>
          <strong>The Claim:</strong> "{currentCase.tip.mainClaim}"
        </div>

        {/* 3 Choices */}
        <div className="space-y-3 mb-6">
          {/* 1. SHARE */}
          <button
            type="button"
            onClick={() => handleSelect('SHARE')}
            className={`w-full p-4 rounded-lg border text-left transition-all cursor-pointer ${
              selectedDecision === 'SHARE'
                ? (isWhite ? 'border-zinc-900 bg-zinc-100 ring-2 ring-zinc-900' : 'border-white bg-zinc-800 ring-2 ring-white')
                : (isWhite ? 'border-zinc-200 bg-white hover:bg-zinc-50' : 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800')
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded flex items-center justify-center shrink-0 ${
                isWhite ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-white'
              }`}>
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-sm sm:text-base mb-0.5">
                  SHARE TO THE PUBLIC
                </div>
                <p className={`text-xs leading-relaxed ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  Tell your friends and followers this post is real, safe, and true.
                </p>
              </div>
            </div>
          </button>

          {/* 2. FLAG */}
          <button
            type="button"
            onClick={() => handleSelect('FLAG')}
            className={`w-full p-4 rounded-lg border text-left transition-all cursor-pointer ${
              selectedDecision === 'FLAG'
                ? (isWhite ? 'border-zinc-900 bg-zinc-100 ring-2 ring-zinc-900' : 'border-white bg-zinc-800 ring-2 ring-white')
                : (isWhite ? 'border-zinc-200 bg-white hover:bg-zinc-50' : 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800')
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded flex items-center justify-center shrink-0 ${
                isWhite ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-white'
              }`}>
                <Flag className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-sm sm:text-base mb-0.5">
                  FLAG AS FAKE / REPORT SCAM
                </div>
                <p className={`text-xs leading-relaxed ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  Mark as misleading, fake, or a scam. Warn others not to believe or share it.
                </p>
              </div>
            </div>
          </button>

          {/* 3. INVESTIGATE FURTHER */}
          <button
            type="button"
            onClick={() => handleSelect('INVESTIGATE_FURTHER')}
            className={`w-full p-4 rounded-lg border text-left transition-all cursor-pointer ${
              selectedDecision === 'INVESTIGATE_FURTHER'
                ? (isWhite ? 'border-zinc-900 bg-zinc-100 ring-2 ring-zinc-900' : 'border-white bg-zinc-800 ring-2 ring-white')
                : (isWhite ? 'border-zinc-200 bg-white hover:bg-zinc-50' : 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800')
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded flex items-center justify-center shrink-0 ${
                isWhite ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-white'
              }`}>
                <Search className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-sm sm:text-base mb-0.5">
                  WAIT FOR MORE PROOF
                </div>
                <p className={`text-xs leading-relaxed ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  Do not share it yet, but wait until official reports arrive to confirm or deny it.
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Submit */}
        <button
          onClick={handleConfirm}
          disabled={!selectedDecision}
          className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded font-bold text-xs uppercase tracking-wider transition shadow-sm ${
            selectedDecision
              ? (isWhite ? 'bg-zinc-900 hover:bg-zinc-800 text-white cursor-pointer' : 'bg-white hover:bg-zinc-200 text-zinc-950 cursor-pointer')
              : 'bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed'
          }`}
        >
          <span>Confirm Choice & Explain Why</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
