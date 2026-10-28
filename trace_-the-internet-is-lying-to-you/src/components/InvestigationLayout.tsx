/**
 * Investigation Layout Component for TRACE (Stage B: Check the Clues)
 * Girls Who Code HHS Hackathon 2026
 * 
 * Simple, clear English and clean black/white themes.
 */

import React from 'react';
import { useGame } from '../context/GameContext';
import { EvidenceModal } from './EvidenceModal';
import { 
  Folder, 
  CheckCircle2, 
  ArrowRight, 
  Scale, 
  Search,
  ExternalLink
} from 'lucide-react';
import { sound } from '../utils/audio';

export const InvestigationLayout: React.FC = () => {
  const { 
    currentCase, 
    inspectedEvidenceIds, 
    initialAssessment, 
    openEvidenceItem, 
    proceedToDecision,
    settings
  } = useGame();

  const isWhite = settings.theme === 'white';
  const totalCount = currentCase.evidenceItems.length;
  const inspectedCount = inspectedEvidenceIds.length;
  const allInspected = inspectedCount === totalCount;
  const canProceed = inspectedCount >= 2;

  const handleProceed = () => {
    sound.playClick();
    proceedToDecision();
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 lg:px-8 py-8 transition-colors ${
      isWhite ? 'text-zinc-900' : 'text-zinc-100'
    }`}>
      {/* Evidence Modal Dialog */}
      <EvidenceModal />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Post Summary & Progress */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          <div className={`border rounded-lg p-5 transition-colors ${
            isWhite ? 'bg-white border-zinc-200 shadow-sm' : 'bg-[#141416] border-zinc-800'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 mb-4 ${
              isWhite ? 'border-zinc-200' : 'border-zinc-800'
            }`}>
              <span className="font-mono text-xs uppercase tracking-wider font-bold">
                {currentCase.id} · DETECTIVE WORKSPACE
              </span>
              <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                isWhite ? 'bg-zinc-100 text-zinc-700' : 'bg-zinc-800 text-zinc-300'
              }`}>
                ACTIVE
              </span>
            </div>

            <h1 className="text-lg font-bold mb-1">
              {currentCase.title}
            </h1>
            <p className={`text-xs mb-4 ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
              {currentCase.subtitle}
            </p>

            {/* Claim Summary */}
            <div className={`p-3 rounded border mb-4 ${
              isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-[#0B0B0C] border-zinc-800'
            }`}>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">
                The Claim:
              </span>
              <p className={`text-xs leading-relaxed italic ${isWhite ? 'text-zinc-800' : 'text-zinc-200'}`}>
                "{currentCase.tip.mainClaim}"
              </p>
            </div>

            {/* First Guess Stamp */}
            {initialAssessment && (
              <div className={`p-3 rounded border mb-4 text-xs ${
                isWhite ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
              }`}>
                <div className="flex items-center gap-1.5 mb-1 text-zinc-500 font-mono text-[11px]">
                  <Scale className="w-3.5 h-3.5" />
                  <span className="font-bold uppercase tracking-wider">YOUR FIRST GUESS:</span>
                </div>
                <div>
                  Guess: <strong className="capitalize">{initialAssessment.choice.replace('_', ' ')}</strong>
                </div>
                <div className="text-zinc-500">
                  Confidence: <strong>{initialAssessment.confidence}%</strong>
                </div>
              </div>
            )}

            {/* Clues Checked Progress */}
            <div className={`space-y-2 pt-2 border-t ${
              isWhite ? 'border-zinc-200' : 'border-zinc-800'
            }`}>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">CLUES CHECKED</span>
                <span className="font-bold">{inspectedCount} of {totalCount}</span>
              </div>
              <div className={`w-full h-2 rounded-full overflow-hidden ${
                isWhite ? 'bg-zinc-100' : 'bg-zinc-800'
              }`}>
                <div 
                  className={`h-full transition-all duration-300 ${
                    isWhite ? 'bg-zinc-900' : 'bg-white'
                  }`}
                  style={{ width: `${(inspectedCount / totalCount) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-zinc-500">
                {allInspected 
                  ? '✓ All 5 clues checked! You are ready to make a decision.' 
                  : `Check ${totalCount - inspectedCount} more clue(s) to get the full story.`}
              </p>
            </div>
          </div>

          {/* Decision Button */}
          <div className={`border rounded-lg p-5 space-y-3 transition-colors ${
            isWhite ? 'bg-white border-zinc-200 shadow-sm' : 'bg-[#141416] border-zinc-800'
          }`}>
            <div>
              <h2 className="text-sm font-bold mb-1">
                Ready to Make Your Call?
              </h2>
              <p className={`text-xs leading-relaxed ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
                Once you have looked at the clues, decide whether to Share the post, Flag it as fake, or Wait for more proof.
              </p>
            </div>

            <button
              onClick={handleProceed}
              disabled={!canProceed}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded text-xs font-bold uppercase tracking-wider transition shadow-sm ${
                canProceed
                  ? (isWhite ? 'bg-zinc-900 hover:bg-zinc-800 text-white cursor-pointer' : 'bg-white hover:bg-zinc-200 text-zinc-950 cursor-pointer')
                  : 'bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed'
              }`}
            >
              <span>Make Final Decision</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {!canProceed && (
              <p className="text-[11px] text-amber-600 dark:text-amber-400 text-center">
                Please look at at least 2 clues first!
              </p>
            )}
          </div>
        </aside>

        {/* Right Column: The 5 Clues */}
        <main className="lg:col-span-8 space-y-4">
          <div className={`flex items-center justify-between border-b pb-3 ${
            isWhite ? 'border-zinc-200' : 'border-zinc-800'
          }`}>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500">
                <Folder className="w-4 h-4" />
                <span>CASE CLUES</span>
              </div>
              <h2 className="text-xl font-bold">
                Click a Clue to Inspect It
              </h2>
            </div>
            <span className="text-xs text-zinc-500 hidden sm:inline">
              5 clues available
            </span>
          </div>

          <div className="space-y-3">
            {currentCase.evidenceItems.map(item => {
              const isInspected = inspectedEvidenceIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => openEvidenceItem(item)}
                  className={`p-5 rounded-lg border transition-all cursor-pointer ${
                    isInspected
                      ? (isWhite ? 'bg-white border-zinc-200 hover:border-zinc-400' : 'bg-[#141416] border-zinc-800 hover:border-zinc-600')
                      : (isWhite ? 'bg-zinc-50 border-zinc-300 hover:border-zinc-900 shadow-xs' : 'bg-[#18181B] border-zinc-700 hover:border-white')
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openEvidenceItem(item);
                    }
                  }}
                  aria-label={`Inspect ${item.refNumber}: ${item.title}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                          isWhite ? 'bg-zinc-100 text-zinc-800' : 'bg-zinc-800 text-zinc-200'
                        }`}>
                          {item.refNumber}
                        </span>
                        <span className="text-zinc-400">·</span>
                        <span className="text-xs uppercase font-mono text-zinc-500">
                          {item.typeLabel}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold">
                        {item.title}
                      </h3>
                    </div>

                    <div className="shrink-0">
                      {isInspected ? (
                        <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded ${
                          isWhite ? 'bg-zinc-100 text-zinc-700' : 'bg-zinc-800 text-zinc-300'
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>CHECKED</span>
                        </span>
                      ) : (
                        <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded font-bold ${
                          isWhite ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-950'
                        }`}>
                          <span>CHECK THIS CLUE</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-3 ${
                    isWhite ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    {item.summary}
                  </p>

                  <div className={`flex items-center justify-between text-xs font-mono border-t pt-2.5 ${
                    isWhite ? 'border-zinc-200 text-zinc-500' : 'border-zinc-800 text-zinc-400'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5" />
                      <span>{isInspected ? 'Read again' : 'Open clue details'}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};
