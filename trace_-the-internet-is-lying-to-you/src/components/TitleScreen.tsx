/**
 * Title Screen Component for TRACE: The Internet Is Lying to You
 * Girls Who Code HHS Hackathon 2026
 * 
 * Simple, clear, human language explaining exactly what the game is.
 * Supports stark black and paper white themes.
 */

import React from 'react';
import { useGame } from '../context/GameContext';
import { 
  ArrowRight, 
  HelpCircle, 
  Sliders, 
  Search, 
  AlertTriangle, 
  FileText, 
  CheckCircle2, 
  Award,
  Sun,
  Moon,
  User,
  Instagram,
  ExternalLink
} from 'lucide-react';

export const TitleScreen: React.FC = () => {
  const { startNewCampaign, openTutorial, openAbout, openSettings, toggleTheme, settings, history } = useGame();
  const isWhite = settings.theme === 'white';

  return (
    <div className={`min-h-[calc(100vh-65px)] flex flex-col justify-between px-4 sm:px-8 py-8 transition-colors ${
      isWhite ? 'bg-[#F8F9FA] text-zinc-900' : 'bg-[#0E0E10] text-zinc-100'
    }`}>
      <div className="max-w-4xl mx-auto w-full my-auto py-4 space-y-10">
        
        {/* Top Tag & Hackathon Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border transition-colors">
            <span className={`w-2 h-2 rounded-full ${isWhite ? 'bg-zinc-900' : 'bg-white'}`} />
            <span>Girls Who Code HHS Hackathon 2026</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
            TRACE
          </h1>
          <p className="text-lg sm:text-2xl font-bold max-w-2xl mx-auto leading-snug">
            Can you spot fake news, charity scams, and AI clones before you hit share?
          </p>
          <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed ${
            isWhite ? 'text-zinc-600' : 'text-zinc-400'
          }`}>
            A 5-minute interactive detective game. Test your skills on 3 viral cases, inspect real clues, and find out if you can avoid getting tricked.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-xl mx-auto">
          <button
            onClick={startNewCampaign}
            className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-bold text-sm tracking-wide transition shadow-sm cursor-pointer ${
              isWhite 
                ? 'bg-zinc-900 hover:bg-zinc-800 text-white' 
                : 'bg-white hover:bg-zinc-200 text-zinc-950'
            }`}
          >
            <span>START PLAYING (CASE 1)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={openTutorial}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg border font-semibold text-sm transition cursor-pointer ${
              isWhite 
                ? 'border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-900' 
                : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>HOW TO PLAY</span>
          </button>

          <button
            onClick={openAbout}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg border font-semibold text-sm transition cursor-pointer ${
              isWhite 
                ? 'border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-900' 
                : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-100'
            }`}
          >
            <User className="w-4 h-4 text-emerald-500" />
            <span>ABOUT AZAN (15 Y/O)</span>
          </button>

          <button
            onClick={toggleTheme}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-3.5 py-3.5 rounded-lg border text-sm font-medium transition cursor-pointer ${
              isWhite 
                ? 'border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800' 
                : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200'
            }`}
            title="Toggle Black / White Theme"
          >
            {isWhite ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            <span className="sm:hidden">{isWhite ? 'Dark Theme' : 'Light Theme'}</span>
          </button>
        </div>

        {/* Previous Best Score badge */}
        {history.completedCaseIds.length > 0 && (
          <div className="text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded border text-xs font-medium ${
              isWhite ? 'border-zinc-200 bg-white text-zinc-800' : 'border-zinc-800 bg-zinc-900 text-zinc-200'
            }`}>
              <Award className="w-4 h-4 text-amber-500" />
              <span>Your Best Score: <strong>{history.bestOverallScore} pts</strong></span>
              <span>·</span>
              <span>{history.completedCaseIds.length} of 3 cases solved</span>
            </div>
          </div>
        )}

        {/* CLEAR EXPLANATION: How the game works in simple steps */}
        <div className={`p-6 rounded-lg border transition-colors ${
          isWhite ? 'bg-white border-zinc-200 shadow-xs' : 'bg-[#141416] border-zinc-800'
        }`}>
          <h2 className="text-xs font-mono uppercase tracking-wider text-center font-bold mb-6">
            HOW THIS GAME WORKS IN 3 SIMPLE STEPS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isWhite ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-white'
                }`}>
                  1
                </span>
                <h3 className="font-bold text-base">See a Viral Post</h3>
              </div>
              <p className={`text-xs leading-relaxed ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
                You are shown a viral social media post with thousands of shares — like a city emergency, a flood charity asking for money, or a voice message from a school principal.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isWhite ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-white'
                }`}>
                  2
                </span>
                <h3 className="font-bold text-base">Make Your First Guess</h3>
              </div>
              <p className={`text-xs leading-relaxed ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
                Before you see the clues, guess if you think it's real or fake. We test if you fall into the "Confidence Trap" of believing posts just because they look urgent or have lots of likes.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isWhite ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-white'
                }`}>
                  3
                </span>
                <h3 className="font-bold text-base">Inspect Real Clues</h3>
              </div>
              <p className={`text-xs leading-relaxed ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
                Click into 5 real clues: reverse-image search old photos, check government registries, and trace where money really goes. Then make your final choice: Share, Flag, or Wait!
              </p>
            </div>
          </div>
        </div>

        {/* The 3 Cases Preview */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-center font-bold">
            THE 3 CASES YOU WILL SOLVE
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className={`p-4 rounded border text-left ${
              isWhite ? 'bg-white border-zinc-200' : 'bg-[#141416] border-zinc-800'
            }`}>
              <div className="text-[11px] font-mono font-bold uppercase mb-1">Case 1</div>
              <h3 className="font-bold text-sm mb-1">The Poisoned Tap Water</h3>
              <p className={`text-xs leading-relaxed ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
                A scary post says city tap water is toxic. People are emptying store shelves. Is it a real emergency or an exaggerated rumor?
              </p>
            </div>

            <div className={`p-4 rounded border text-left ${
              isWhite ? 'bg-white border-zinc-200' : 'bg-[#141416] border-zinc-800'
            }`}>
              <div className="text-[11px] font-mono font-bold uppercase mb-1">Case 2</div>
              <h3 className="font-bold text-sm mb-1">The Fake Flood Charity</h3>
              <p className={`text-xs leading-relaxed ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
                A sad flood fundraiser has raised $45,000 in hours with a ticking countdown timer. Is it a real charity or a scammer?
              </p>
            </div>

            <div className={`p-4 rounded border text-left ${
              isWhite ? 'bg-white border-zinc-200' : 'bg-[#141416] border-zinc-800'
            }`}>
              <div className="text-[11px] font-mono font-bold uppercase mb-1">Case 3</div>
              <h3 className="font-bold text-sm mb-1">The Principal's Voice Note</h3>
              <p className={`text-xs leading-relaxed ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
                Teachers receive a voice note that sounds just like their principal demanding private student records. Is it her, or an AI voice clone?
              </p>
            </div>
          </div>
        </div>

        {/* Creator Section: Azan Ejaz (15 y/o) */}
        <div className={`p-5 sm:p-6 rounded-xl border transition ${
          isWhite ? 'bg-white border-zinc-200 shadow-xs' : 'bg-[#141416] border-zinc-800'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                isWhite ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-950'
              }`}>
                AE
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base">Azan Ejaz (15 y/o)</h3>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                    isWhite ? 'bg-purple-100 text-purple-800' : 'bg-purple-950/60 text-purple-300'
                  }`}>
                    Created by Vibecoding
                  </span>
                </div>
                <p className={`text-xs mt-0.5 leading-relaxed ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  15 years old · Passionate about building apps and games. Created for the Girls Who Code HHS Hackathon 2026.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={openAbout}
                className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg border text-xs font-bold transition cursor-pointer ${
                  isWhite 
                    ? 'border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-800' 
                    : 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                }`}
              >
                Read Bio
              </button>

              <a
                href="https://www.instagram.com/azanejaz_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-bold text-xs shadow-xs hover:opacity-95 transition cursor-pointer"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@azanejaz_</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Clean Footer */}
      <footer className={`max-w-4xl mx-auto w-full pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
        isWhite ? 'border-zinc-200 text-zinc-500' : 'border-zinc-800 text-zinc-500'
      }`}>
        <div>Educational Game for Girls Who Code HHS Hackathon 2026</div>
        <div>No signups · No ads · Free & Playable in your browser</div>
      </footer>
    </div>
  );
};
