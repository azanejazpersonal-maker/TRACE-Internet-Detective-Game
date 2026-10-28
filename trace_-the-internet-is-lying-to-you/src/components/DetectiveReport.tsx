/**
 * Digital Detective Report Component for TRACE
 * Girls Who Code HHS Hackathon 2026
 * 
 * Simple English and clean black/white themes.
 */

import React from 'react';
import { useGame } from '../context/GameContext';
import { generateDetectiveReport } from '../utils/scoring';
import { 
  Award, 
  ShieldCheck, 
  Scale, 
  RotateCcw, 
  BookOpen, 
  AlertCircle,
  FileText,
  ArrowRight,
  Instagram,
  ExternalLink,
  User
} from 'lucide-react';
import { sound } from '../utils/audio';

export const DetectiveReport: React.FC = () => {
  const { history, replayCaseById, goToScreen, openAbout, settings } = useGame();
  const isWhite = settings.theme === 'white';

  const report = generateDetectiveReport(history);

  const handlePrintSummary = () => {
    sound.playClick();
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className={`max-w-3xl mx-auto px-4 py-8 space-y-6 transition-colors ${
      isWhite ? 'text-zinc-900' : 'text-zinc-100'
    }`}>
      {/* Top Report Dossier Header */}
      <div className={`border rounded-lg p-6 sm:p-8 transition-colors ${
        isWhite ? 'bg-white border-zinc-300 shadow-sm' : 'bg-[#141416] border-zinc-700'
      }`}>
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 mb-5 ${
          isWhite ? 'border-zinc-200' : 'border-zinc-800'
        }`}>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>FINAL INVESTIGATION REPORT</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">
              Your Detective Scorecard
            </h1>
            <p className="text-xs text-zinc-500 mt-1 font-mono">
              Girls Who Code HHS Hackathon 2026
            </p>
          </div>

          {/* Big Score Block */}
          <div className={`p-4 rounded-lg border text-right shrink-0 ${
            isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-[#0B0B0C] border-zinc-800'
          }`}>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
              Total Score
            </span>
            <div className="text-3xl font-mono font-extrabold">
              {report.totalScore}
              <span className="text-sm font-normal text-zinc-500"> / 400</span>
            </div>
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-0.5">
              {report.badgeLevel}
            </div>
          </div>
        </div>

        {/* Assigned Rank */}
        <div className={`p-4 rounded border mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
        }`}>
          <div>
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">
              Your Detective Rank:
            </span>
            <h2 className="text-xl font-bold">
              {report.rankTitle}
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            {history.completedCaseIds.length} of 3 Cases + Rapid Blitz Completed
          </span>
        </div>

        {/* 3 Metric Gauges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className={`p-4 rounded border ${
            isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900/60 border-zinc-800'
          }`}>
            <div className="flex items-center justify-between text-xs font-mono mb-1">
              <span>Clues Checked</span>
              <span className="font-bold">{report.evidenceThoroughnessPct}%</span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden mb-2 ${
              isWhite ? 'bg-zinc-200' : 'bg-zinc-800'
            }`}>
              <div 
                className={`h-full ${isWhite ? 'bg-zinc-900' : 'bg-white'}`}
                style={{ width: `${report.evidenceThoroughnessPct}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-500">
              How thoroughly you read the documents and lab results.
            </p>
          </div>

          <div className={`p-4 rounded border ${
            isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900/60 border-zinc-800'
          }`}>
            <div className="flex items-center justify-between text-xs font-mono mb-1">
              <span>Right Decisions</span>
              <span className="font-bold">{report.decisionAccuracyPct}%</span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden mb-2 ${
              isWhite ? 'bg-zinc-200' : 'bg-zinc-800'
            }`}>
              <div 
                className={`h-full ${isWhite ? 'bg-zinc-900' : 'bg-white'}`}
                style={{ width: `${report.decisionAccuracyPct}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-500">
              How well you prevented scams and avoided spreading panic.
            </p>
          </div>

          <div className={`p-4 rounded border ${
            isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900/60 border-zinc-800'
          }`}>
            <div className="flex items-center justify-between text-xs font-mono mb-1">
              <span>Good Reasons</span>
              <span className="font-bold">{report.reasoningRigorPct}%</span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden mb-2 ${
              isWhite ? 'bg-zinc-200' : 'bg-zinc-800'
            }`}>
              <div 
                className={`h-full ${isWhite ? 'bg-zinc-900' : 'bg-white'}`}
                style={{ width: `${report.reasoningRigorPct}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-500">
              How well you based your choices on real facts instead of likes.
            </p>
          </div>
        </div>

        {/* Confidence Trap Insight */}
        <div className={`p-4 rounded border mb-6 flex items-start gap-3 ${
          isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
        }`}>
          <Scale className="w-5 h-5 shrink-0 mt-0.5 text-zinc-500" />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider block mb-1">
              Your Confidence Check: {report.calibrationRating}
            </span>
            <p className={`text-xs sm:text-sm leading-relaxed ${isWhite ? 'text-zinc-700' : 'text-zinc-300'}`}>
              {report.calibrationInsight}
            </p>
          </div>
        </div>

        {/* Strengths & Growth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded border ${
            isWhite ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950' : 'bg-emerald-950/20 border-emerald-800 text-emerald-200'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider block mb-2">
              What You Did Really Well
            </span>
            <ul className="text-xs space-y-1.5 list-disc pl-4">
              {report.strengths.map((str, i) => (
                <li key={i}>{str}</li>
              ))}
            </ul>
          </div>

          <div className={`p-4 rounded border ${
            isWhite ? 'bg-amber-50/50 border-amber-200 text-amber-950' : 'bg-amber-950/20 border-amber-800 text-amber-200'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider block mb-2">
              Things to Watch Out For
            </span>
            <ul className="text-xs space-y-1.5 list-disc pl-4">
              {report.growthAreas.map((gro, i) => (
                <li key={i}>{gro}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Replay Cases */}
      <div className={`border rounded-lg p-6 ${
        isWhite ? 'bg-white border-zinc-200' : 'bg-[#141416] border-zinc-800'
      }`}>
        <h2 className="text-base font-bold mb-1">
          Want to Replay a Case?
        </h2>
        <p className="text-xs text-zinc-500 mb-4">
          Try a different choice or see all the clues you missed.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => replayCaseById('CASE 1')}
            className={`p-3.5 rounded border text-left transition cursor-pointer ${
              isWhite ? 'bg-zinc-50 border-zinc-200 hover:border-zinc-400' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600'
            }`}
          >
            <div className="text-[10px] font-mono text-zinc-500 font-bold mb-1">CASE 1</div>
            <div className="font-bold text-sm mb-1">The Poisoned Tap Water</div>
            <div className="text-xs text-zinc-500">Score: {history.caseScores['CASE 1']?.totalScore || 0}/100</div>
          </button>

          <button
            onClick={() => replayCaseById('CASE 2')}
            className={`p-3.5 rounded border text-left transition cursor-pointer ${
              isWhite ? 'bg-zinc-50 border-zinc-200 hover:border-zinc-400' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600'
            }`}
          >
            <div className="text-[10px] font-mono text-zinc-500 font-bold mb-1">CASE 2</div>
            <div className="font-bold text-sm mb-1">The Fake Flood Charity</div>
            <div className="text-xs text-zinc-500">Score: {history.caseScores['CASE 2']?.totalScore || 0}/100</div>
          </button>

          <button
            onClick={() => replayCaseById('CASE 3')}
            className={`p-3.5 rounded border text-left transition cursor-pointer ${
              isWhite ? 'bg-zinc-50 border-zinc-200 hover:border-zinc-400' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600'
            }`}
          >
            <div className="text-[10px] font-mono text-zinc-500 font-bold mb-1">CASE 3</div>
            <div className="font-bold text-sm mb-1">The Principal's Voice Note</div>
            <div className="text-xs text-zinc-500">Score: {history.caseScores['CASE 3']?.totalScore || 0}/100</div>
          </button>
        </div>
      </div>

      {/* 5 Rules for the Real World */}
      <div className={`border rounded-lg p-6 sm:p-8 space-y-4 ${
        isWhite ? 'bg-white border-zinc-200' : 'bg-[#141416] border-zinc-800'
      }`}>
        <div className="flex items-center gap-2 border-b pb-3">
          <BookOpen className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-bold">
            5 Simple Habits for Spotting Fakes in Real Life
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className={`p-3.5 rounded border ${
            isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
          }`}>
            <strong className="block mb-1">1. Check the Source First</strong>
            <p className={isWhite ? 'text-zinc-600' : 'text-zinc-400'}>
              Before sharing scary news, check your real city website or real local news station.
            </p>
          </div>

          <div className={`p-3.5 rounded border ${
            isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
          }`}>
            <strong className="block mb-1">2. Never Send CashApp to Random Charities</strong>
            <p className={isWhite ? 'text-zinc-600' : 'text-zinc-400'}>
              Always go directly to the real charity website (like redcross.org) instead of clicking urgent social media links.
            </p>
          </div>

          <div className={`p-3.5 rounded border ${
            isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
          }`}>
            <strong className="block mb-1">3. AI Can Clone Any Voice in Seconds</strong>
            <p className={isWhite ? 'text-zinc-600' : 'text-zinc-400'}>
              If a friend or boss calls asking for money or passwords, hang up and call them back on their saved number.
            </p>
          </div>

          <div className={`p-3.5 rounded border ${
            isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
          }`}>
            <strong className="block mb-1">4. Likes Do NOT Equal Truth</strong>
            <p className={isWhite ? 'text-zinc-600' : 'text-zinc-400'}>
              100,000 views or a blue checkmark just means a post traveled fast, not that it is accurate.
            </p>
          </div>

          <div className={`md:col-span-2 p-3.5 rounded border ${
            isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
          }`}>
            <strong className="block mb-1">5. Say "I Don't Know Yet"</strong>
            <p className={isWhite ? 'text-zinc-600' : 'text-zinc-400'}>
              It is always smarter to wait for real proof than to rush and spread panic.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-3 border-t text-[11px] text-zinc-500 font-mono flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            TRACE is an educational game for the Girls Who Code HHS Hackathon 2026. All scenarios, agencies, and accounts are completely fictional.
          </span>
        </div>
      </div>

      {/* Creator Shoutout: Azan Ejaz (15 y/o) */}
      <div className={`border rounded-lg p-5 sm:p-6 transition ${
        isWhite ? 'bg-white border-zinc-200' : 'bg-[#141416] border-zinc-800'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
              isWhite ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-950'
            }`}>
              AE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">Azan Ejaz (15 y/o)</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                  isWhite ? 'bg-purple-100 text-purple-800' : 'bg-purple-950/60 text-purple-300'
                }`}>
                  Created by Vibecoding
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
                15 years old · Passionate about building apps and games.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={openAbout}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${
                isWhite 
                  ? 'border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-800' 
                  : 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>About Creator</span>
            </button>

            <a
              href="https://www.instagram.com/azanejaz_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-bold text-xs shadow-xs hover:opacity-95 transition cursor-pointer"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@azanejaz_</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-6 ${
        isWhite ? 'border-zinc-200' : 'border-zinc-800'
      }`}>
        <button
          onClick={handlePrintSummary}
          className={`flex items-center gap-2 px-4 py-2.5 rounded border text-xs font-semibold transition cursor-pointer ${
            isWhite ? 'border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-900' : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Print / Save Scorecard</span>
        </button>

        <button
          onClick={() => goToScreen('TITLE')}
          className={`flex items-center gap-2 px-6 py-3 rounded font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer ${
            isWhite ? 'bg-zinc-900 hover:bg-zinc-800 text-white' : 'bg-white hover:bg-zinc-200 text-zinc-950'
          }`}
        >
          <span>Return to Title Screen</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
