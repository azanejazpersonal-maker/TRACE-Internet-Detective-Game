/**
 * Evidence Inspector Modal Component for TRACE
 * Girls Who Code HHS Hackathon 2026
 * 
 * Simple English and clean black/white themes.
 */

import React from 'react';
import { useGame } from '../context/GameContext';
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  X, 
  Clock, 
  Building 
} from 'lucide-react';

export const EvidenceModal: React.FC = () => {
  const { activeEvidenceItem, closeEvidenceItem, settings } = useGame();
  const isWhite = settings.theme === 'white';

  if (!activeEvidenceItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        role="dialog" 
        aria-modal="true"
        aria-labelledby="evidence-title"
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border rounded-lg p-6 sm:p-8 transition-colors ${
          isWhite ? 'bg-white border-zinc-300 text-zinc-900 shadow-xl' : 'bg-[#141416] border-zinc-700 text-zinc-100 shadow-2xl'
        }`}
      >
        {/* Header */}
        <div className={`flex items-start justify-between gap-4 border-b pb-4 mb-5 ${
          isWhite ? 'border-zinc-200' : 'border-zinc-800'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                isWhite ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-white'
              }`}>
                {activeEvidenceItem.refNumber}
              </span>
              <span className="text-zinc-400">·</span>
              <span className="text-xs uppercase font-mono text-zinc-500">
                {activeEvidenceItem.typeLabel}
              </span>
            </div>
            <h2 id="evidence-title" className="text-xl sm:text-2xl font-bold">
              {activeEvidenceItem.title}
            </h2>
          </div>

          <button
            onClick={closeEvidenceItem}
            aria-label="Close Clue"
            className={`p-1.5 rounded border transition cursor-pointer ${
              isWhite ? 'border-zinc-200 hover:bg-zinc-100 text-zinc-600' : 'border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source metadata */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded border text-xs font-mono mb-5 ${
          isWhite ? 'bg-zinc-50 border-zinc-200 text-zinc-700' : 'bg-zinc-900 border-zinc-800 text-zinc-300'
        }`}>
          {activeEvidenceItem.sourceOrg && (
            <div className="flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-zinc-500" />
              <span>Source: {activeEvidenceItem.sourceOrg}</span>
            </div>
          )}
          {activeEvidenceItem.timestampStr && (
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>When: {activeEvidenceItem.timestampStr}</span>
            </div>
          )}
        </div>

        {/* Main Document / Content */}
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Document / Test Results</span>
          </div>
          <div className={`p-4 rounded border font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
            isWhite ? 'bg-zinc-50 border-zinc-200 text-zinc-800' : 'bg-[#0B0B0C] border-zinc-800 text-zinc-200'
          }`}>
            {activeEvidenceItem.content}
          </div>
        </div>

        {/* What this establishes vs does NOT establish */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* What it proves */}
          <div className={`p-4 rounded border ${
            isWhite ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950' : 'bg-emerald-950/20 border-emerald-800 text-emerald-200'
          }`}>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>What This Clue Proves</span>
            </div>
            <ul className="text-xs space-y-1.5 list-disc pl-4">
              {activeEvidenceItem.establishes.map((fact, idx) => (
                <li key={idx}>{fact}</li>
              ))}
            </ul>
          </div>

          {/* What it does NOT prove */}
          <div className={`p-4 rounded border ${
            isWhite ? 'bg-red-50/50 border-red-200 text-red-950' : 'bg-red-950/20 border-red-800 text-red-200'
          }`}>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2">
              <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span>What It Does NOT Prove</span>
            </div>
            <ul className="text-xs space-y-1.5 list-disc pl-4">
              {activeEvidenceItem.doesNotEstablish.map((limit, idx) => (
                <li key={idx}>{limit}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key Question */}
        <div className={`p-4 rounded border mb-6 flex items-start gap-3 ${
          isWhite ? 'bg-zinc-100 border-zinc-200 text-zinc-800' : 'bg-zinc-900 border-zinc-800 text-zinc-200'
        }`}>
          <HelpCircle className="w-4 h-4 shrink-0 mt-0.5 text-zinc-500" />
          <div className="text-xs sm:text-sm">
            <strong className="block mb-0.5">The Detective's Question:</strong>
            <p>{activeEvidenceItem.investigativeInquiry}</p>
          </div>
        </div>

        {/* Close Button */}
        <div className={`flex justify-end border-t pt-4 ${
          isWhite ? 'border-zinc-200' : 'border-zinc-800'
        }`}>
          <button
            onClick={closeEvidenceItem}
            className={`px-5 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition cursor-pointer ${
              isWhite ? 'bg-zinc-900 hover:bg-zinc-800 text-white' : 'bg-white hover:bg-zinc-200 text-zinc-950'
            }`}
          >
            Mark as Checked & Return to Clues
          </button>
        </div>
      </div>
    </div>
  );
};
