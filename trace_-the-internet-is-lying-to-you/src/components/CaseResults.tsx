/**
 * Case Results & Confidence Trap Comparison Component for TRACE (Stage E)
 * Girls Who Code HHS Hackathon 2026
 * 
 * Simple English and clean black/white themes.
 */

import React from 'react';
import { useGame } from '../context/GameContext';
import { 
  Award, 
  CheckCircle, 
  Scale, 
  ArrowRight, 
  RotateCcw, 
  Lightbulb,
  ShieldCheck 
} from 'lucide-react';
import { sound } from '../utils/audio';

export const CaseResults: React.FC = () => {
  const { 
    currentCase, 
    currentCaseScore, 
    pendingDecision, 
    advanceFromResults, 
    replayCaseById,
    settings 
  } = useGame();

  const isWhite = settings.theme === 'white';

  if (!currentCaseScore) return null;

  const { calibrationAnalysis, decisionFeedback, reasoningFeedback } = currentCaseScore;
  const initialChoiceLabel = calibrationAnalysis.initialChoice.replace('_', ' ');

  return (
    <div className={`max-w-3xl mx-auto px-4 py-8 space-y-6 transition-colors ${
      isWhite ? 'text-zinc-900' : 'text-zinc-100'
    }`}>
      {/* Top Banner: Score Card */}
      <div className={`border rounded-lg p-6 transition-colors ${
        isWhite ? 'bg-white border-zinc-200 shadow-sm' : 'bg-[#141416] border-zinc-800'
      }`}>
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 mb-5 ${
          isWhite ? 'border-zinc-200' : 'border-zinc-800'
        }`}>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-zinc-500">
              {currentCase.id} · CASE REPORT
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
              {currentCase.title}
            </h1>
          </div>

          {/* Score Card */}
          <div className={`flex items-center gap-3 px-5 py-3 rounded-lg border shrink-0 ${
            isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
          }`}>
            <Award className="w-8 h-8 text-amber-500" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                CASE SCORE
              </div>
              <div className="text-3xl font-mono font-extrabold">
                {currentCaseScore.totalScore}
                <span className="text-sm font-normal text-zinc-500"> / 100</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Points Categories in Simple Words */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className={`p-3 rounded border ${
            isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900/60 border-zinc-800'
          }`}>
            <span className="text-[10px] font-mono text-zinc-500 block uppercase">
              Clues Checked
            </span>
            <div className="text-xl font-mono font-bold">
              {currentCaseScore.evidenceScore}
              <span className="text-xs text-zinc-500 font-normal"> / 30</span>
            </div>
          </div>

          <div className={`p-3 rounded border ${
            isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900/60 border-zinc-800'
          }`}>
            <span className="text-[10px] font-mono text-zinc-500 block uppercase">
              Your Decision
            </span>
            <div className="text-xl font-mono font-bold">
              {currentCaseScore.decisionScore}
              <span className="text-xs text-zinc-500 font-normal"> / 30</span>
            </div>
          </div>

          <div className={`p-3 rounded border ${
            isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900/60 border-zinc-800'
          }`}>
            <span className="text-[10px] font-mono text-zinc-500 block uppercase">
              Your Reasoning
            </span>
            <div className="text-xl font-mono font-bold">
              {currentCaseScore.reasoningScore}
              <span className="text-xs text-zinc-500 font-normal"> / 25</span>
            </div>
          </div>

          <div className={`p-3 rounded border ${
            isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900/60 border-zinc-800'
          }`}>
            <span className="text-[10px] font-mono text-zinc-500 block uppercase">
              Confidence Check
            </span>
            <div className="text-xl font-mono font-bold">
              {currentCaseScore.calibrationScore}
              <span className="text-xs text-zinc-500 font-normal"> / 15</span>
            </div>
          </div>
        </div>
      </div>

      {/* SIGNATURE MOMENT: THE CONFIDENCE TRAP COMPARISON */}
      <div className={`border rounded-lg p-6 sm:p-8 transition-colors ${
        isWhite ? 'bg-white border-zinc-300 shadow-sm' : 'bg-[#141416] border-zinc-700'
      }`}>
        <div className={`flex items-center gap-2.5 border-b pb-4 mb-6 ${
          isWhite ? 'border-zinc-200' : 'border-zinc-800'
        }`}>
          <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-sm ${
            isWhite ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-white'
          }`}>
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
              THE CONFIDENCE CHECK
            </span>
            <h2 className="text-xl font-bold">
              Your First Impression vs. The Real Proof
            </h2>
          </div>
        </div>

        {/* Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className={`p-4 rounded-lg border ${
            isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
          }`}>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">
              BEFORE SEEING CLUES:
            </span>
            <div className="text-lg font-bold capitalize mb-2">
              "{initialChoiceLabel}"
            </div>
            <div className="text-xs font-mono text-zinc-500 mb-2">
              How sure you were: <strong>{calibrationAnalysis.initialConfidence}%</strong>
            </div>
            <p className={`text-xs leading-relaxed ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
              Your first hunch based on likes, views, and scary words.
            </p>
          </div>

          <div className={`p-4 rounded-lg border ${
            isWhite ? 'bg-zinc-100 border-zinc-300 text-zinc-900' : 'bg-zinc-800 border-zinc-600 text-white'
          }`}>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">
              AFTER CHECKING CLUES:
            </span>
            <div className="text-lg font-bold mb-2">
              {pendingDecision === 'FLAG'
                ? 'Flagged as Fake / Scam'
                : pendingDecision === 'INVESTIGATE_FURTHER'
                ? 'Waited for Official Proof'
                : 'Shared as Fact'}
            </div>
            <div className="text-xs font-mono text-zinc-500 mb-2">
              Final Truth: <strong>Proved Fake by Official Records</strong>
            </div>
            <p className={`text-xs leading-relaxed ${isWhite ? 'text-zinc-700' : 'text-zinc-300'}`}>
              Based on real lab results, registries, and official sources.
            </p>
          </div>
        </div>

        {/* Calibration Analysis Text */}
        <div className={`p-4 rounded border flex items-start gap-3 ${
          isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
        }`}>
          <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider block mb-1">
              {calibrationAnalysis.label}
            </span>
            <p className={`text-xs sm:text-sm leading-relaxed ${isWhite ? 'text-zinc-700' : 'text-zinc-300'}`}>
              {calibrationAnalysis.description}
            </p>
          </div>
        </div>
      </div>

      {/* What Really Happened Summary */}
      <div className={`border rounded-lg p-6 space-y-4 ${
        isWhite ? 'bg-white border-zinc-200' : 'bg-[#141416] border-zinc-800'
      }`}>
        <h2 className="text-lg font-bold">
          What Really Happened in This Case
        </h2>
        <p className={`text-xs sm:text-sm leading-relaxed p-4 rounded border ${
          isWhite ? 'bg-zinc-50 border-zinc-200 text-zinc-800' : 'bg-[#0B0B0C] border-zinc-800 text-zinc-200'
        }`}>
          {currentCase.caseConclusionText}
        </p>

        {/* Why your choice mattered */}
        <div className="pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
            Why Your Choice Mattered
          </h3>
          <p className={`text-xs sm:text-sm leading-relaxed ${isWhite ? 'text-zinc-700' : 'text-zinc-300'}`}>
            {decisionFeedback.feedbackDetail}
          </p>
        </div>
      </div>

      {/* REAL WORLD TAKEAWAY */}
      <div className={`border rounded-lg p-6 sm:p-8 space-y-3 ${
        isWhite ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950' : 'bg-emerald-950/20 border-emerald-800 text-emerald-200'
      }`}>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-lg font-bold">
            TAKE THIS INTO THE REAL WORLD
          </h2>
        </div>

        <h3 className="font-bold text-base">
          {currentCase.realWorldTakeaway.ruleTitle}
        </h3>
        <p className="text-xs sm:text-sm leading-relaxed">
          {currentCase.realWorldTakeaway.explanation}
        </p>

        <div className={`p-3.5 rounded border text-xs sm:text-sm leading-relaxed ${
          isWhite ? 'bg-white border-emerald-300' : 'bg-zinc-900 border-emerald-700'
        }`}>
          <strong>What you should do:</strong> {currentCase.realWorldTakeaway.actionableHabit}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-6 ${
        isWhite ? 'border-zinc-200' : 'border-zinc-800'
      }`}>
        <button
          onClick={() => replayCaseById(currentCase.id)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded border text-xs font-semibold transition cursor-pointer ${
            isWhite ? 'border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-900' : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Replay {currentCase.id}</span>
        </button>

        <button
          onClick={advanceFromResults}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer ${
            isWhite 
              ? 'bg-zinc-900 hover:bg-zinc-800 text-white' 
              : 'bg-white hover:bg-zinc-200 text-zinc-950'
          }`}
        >
          <span>
            {currentCase.caseNumber < 3
              ? `Go to Case ${currentCase.caseNumber + 1}`
              : 'Play 60-Second Blitz Challenge'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
