/**
 * Confidence Trap Component for TRACE (Signature Mechanic)
 * Girls Who Code HHS Hackathon 2026
 * 
 * Simple English and clean black/white themes.
 */

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { AssessmentChoice, ConfidenceLevel } from '../types/game';
import { Scale, CheckCircle2, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

export const ConfidenceTrapModal: React.FC = () => {
  const { currentCase, submitInitialAssessment, settings } = useGame();
  const [selectedChoice, setSelectedChoice] = useState<AssessmentChoice | null>(null);
  const [selectedConfidence, setSelectedConfidence] = useState<ConfidenceLevel | null>(null);
  const isWhite = settings.theme === 'white';

  const handleChoice = (choice: AssessmentChoice) => {
    sound.playClick();
    setSelectedChoice(choice);
  };

  const handleConfidence = (confidence: ConfidenceLevel) => {
    sound.playClick();
    setSelectedConfidence(confidence);
  };

  const handleSubmit = () => {
    if (!selectedChoice || !selectedConfidence) return;
    submitInitialAssessment(selectedChoice, selectedConfidence);
  };

  return (
    <div className={`max-w-2xl mx-auto px-4 py-8 transition-colors ${
      isWhite ? 'text-zinc-900' : 'text-zinc-100'
    }`}>
      <div className={`border rounded-lg p-6 sm:p-8 transition-colors ${
        isWhite ? 'bg-white border-zinc-200 shadow-sm' : 'bg-[#141416] border-zinc-800'
      }`}>
        {/* Header */}
        <div className={`flex items-center gap-2.5 border-b pb-4 mb-6 ${
          isWhite ? 'border-zinc-200' : 'border-zinc-800'
        }`}>
          <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-sm ${
            isWhite ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-white'
          }`}>
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
              THE CONFIDENCE CHECK
            </div>
            <h1 className="text-xl sm:text-2xl font-bold">
              INITIAL ASSESSMENT
            </h1>
          </div>
        </div>

        {/* Claim reminder */}
        <div className={`p-3.5 rounded border text-xs sm:text-sm mb-6 ${
          isWhite ? 'bg-zinc-50 border-zinc-200 text-zinc-700' : 'bg-zinc-900 border-zinc-800 text-zinc-300'
        }`}>
          <strong>The Claim:</strong> "{currentCase.tip.mainClaim}"
        </div>

        {/* Question 1: Trust */}
        <div className="mb-6">
          <label className="block text-sm sm:text-base font-bold mb-2">
            1. Based on what you have seen so far, how trustworthy does this claim appear?
          </label>
          <p className="text-xs text-zinc-500 mb-4">
            Be completely honest about your first gut reaction before seeing the clues.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleChoice('likely_trustworthy')}
              className={`p-4 rounded border text-left transition-all cursor-pointer ${
                selectedChoice === 'likely_trustworthy'
                  ? (isWhite ? 'border-zinc-900 bg-zinc-100 ring-2 ring-zinc-900' : 'border-white bg-zinc-800 ring-2 ring-white')
                  : (isWhite ? 'border-zinc-200 bg-white hover:bg-zinc-50' : 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800')
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm">Likely Trustworthy</span>
                {selectedChoice === 'likely_trustworthy' && (
                  <CheckCircle2 className="w-4 h-4" />
                )}
              </div>
              <p className="text-xs text-zinc-500">
                Looks real or urgent; sounds like something we should share.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleChoice('unsure')}
              className={`p-4 rounded border text-left transition-all cursor-pointer ${
                selectedChoice === 'unsure'
                  ? (isWhite ? 'border-zinc-900 bg-zinc-100 ring-2 ring-zinc-900' : 'border-white bg-zinc-800 ring-2 ring-white')
                  : (isWhite ? 'border-zinc-200 bg-white hover:bg-zinc-50' : 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800')
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm">Unsure</span>
                {selectedChoice === 'unsure' && (
                  <CheckCircle2 className="w-4 h-4" />
                )}
              </div>
              <p className="text-xs text-zinc-500">
                Not enough proof yet; could easily be true or false.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleChoice('likely_untrustworthy')}
              className={`p-4 rounded border text-left transition-all cursor-pointer ${
                selectedChoice === 'likely_untrustworthy'
                  ? (isWhite ? 'border-zinc-900 bg-zinc-100 ring-2 ring-zinc-900' : 'border-white bg-zinc-800 ring-2 ring-white')
                  : (isWhite ? 'border-zinc-200 bg-white hover:bg-zinc-50' : 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800')
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm">Likely Untrustworthy</span>
                {selectedChoice === 'likely_untrustworthy' && (
                  <CheckCircle2 className="w-4 h-4" />
                )}
              </div>
              <p className="text-xs text-zinc-500">
                Seems suspicious, over-dramatic, or fake.
              </p>
            </button>
          </div>
        </div>

        {/* Question 2: Confidence */}
        <div className="mb-8">
          <label className="block text-sm sm:text-base font-bold mb-2">
            2. How confident are you in this first guess?
          </label>
          <p className="text-xs text-zinc-500 mb-4">
            How sure do you feel about your answer right now?
          </p>

          <div className="grid grid-cols-3 gap-3">
            {[50, 75, 95].map(lvl => (
              <button
                key={lvl}
                type="button"
                onClick={() => handleConfidence(lvl as ConfidenceLevel)}
                className={`py-3 px-4 rounded border text-center transition-all cursor-pointer ${
                  selectedConfidence === lvl
                    ? (isWhite ? 'border-zinc-900 bg-zinc-100 ring-2 ring-zinc-900' : 'border-white bg-zinc-800 ring-2 ring-white')
                    : (isWhite ? 'border-zinc-200 bg-white hover:bg-zinc-50' : 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800')
                }`}
              >
                <div className="text-lg font-mono font-bold">{lvl}%</div>
                <div className="text-[11px] text-zinc-500">
                  {lvl === 50 ? 'Just a hunch' : lvl === 75 ? 'Fairly sure' : 'Almost certain'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Informational note */}
        <p className="text-xs text-zinc-500 mb-6">
          We will save your guess. After you inspect the 5 clues, we will show you if you fell for the Confidence Trap or guessed correctly.
        </p>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!selectedChoice || !selectedConfidence}
          className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded font-bold text-xs uppercase tracking-wider transition shadow-sm ${
            selectedChoice && selectedConfidence
              ? (isWhite ? 'bg-zinc-900 hover:bg-zinc-800 text-white cursor-pointer' : 'bg-white hover:bg-zinc-200 text-zinc-950 cursor-pointer')
              : 'bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed'
          }`}
        >
          <span>Unlock the 5 Clues</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
