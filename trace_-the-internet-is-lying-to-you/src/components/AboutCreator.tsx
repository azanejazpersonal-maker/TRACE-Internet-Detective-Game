/**
 * About Creator Component for TRACE
 * Azan Ejaz (15 y/o) · Passionate about building apps & games
 * Created by Vibecoding
 * Girls Who Code HHS Hackathon 2026
 */

import React from 'react';
import { useGame } from '../context/GameContext';
import { 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  Gamepad2, 
  ArrowRight,
  Instagram,
  Terminal,
  Zap
} from 'lucide-react';
import { sound } from '../utils/audio';

export const AboutCreator: React.FC = () => {
  const { goToScreen, previousScreen, startNewCampaign, settings } = useGame();
  const isWhite = settings.theme === 'white';

  const handleBack = () => {
    sound.playClick();
    goToScreen(previousScreen === 'ABOUT' ? 'TITLE' : previousScreen);
  };

  return (
    <div className={`min-h-[calc(100vh-65px)] px-4 sm:px-8 py-8 transition-colors ${
      isWhite ? 'bg-[#F8F9FA] text-zinc-900' : 'bg-[#0E0E10] text-zinc-100'
    }`}>
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-bold transition cursor-pointer ${
              isWhite 
                ? 'border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800' 
                : 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <span className={`text-xs font-mono uppercase tracking-wider ${
            isWhite ? 'text-zinc-500' : 'text-zinc-500'
          }`}>
            About the Creator
          </span>
        </div>

        {/* Hero Card */}
        <div className={`p-6 sm:p-8 rounded-2xl border transition shadow-sm ${
          isWhite 
            ? 'bg-white border-zinc-200' 
            : 'bg-[#141416] border-zinc-800'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-zinc-200 dark:border-zinc-800">
            {/* Avatar / Initials */}
            <div className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center font-black text-2xl shrink-0 shadow-inner ${
              isWhite 
                ? 'bg-zinc-900 text-white' 
                : 'bg-white text-zinc-950'
            }`}>
              <span>AE</span>
              <span className="text-[10px] font-mono tracking-widest font-normal uppercase opacity-75 mt-0.5">15 Y/O</span>
            </div>

            {/* Profile Info */}
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  isWhite ? 'bg-zinc-100 border-zinc-300 text-zinc-800' : 'bg-zinc-800 border-zinc-700 text-zinc-200'
                }`}>
                  15 Years Old
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${
                  isWhite ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-purple-950/50 border-purple-800 text-purple-300'
                }`}>
                  <Zap className="w-3 h-3 text-purple-500" />
                  Created by Vibecoding
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Azan Ejaz
              </h1>

              <p className={`text-sm sm:text-base leading-relaxed ${
                isWhite ? 'text-zinc-600' : 'text-zinc-400'
              }`}>
                Hey! I'm Azan Ejaz, a 15-year-old passionate about building apps, games, and creative projects.
              </p>
            </div>
          </div>

          {/* Vibecoding & Project Card */}
          <div className="py-6 space-y-4">
            <div className={`p-4 rounded-xl border ${
              isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900/60 border-zinc-800'
            }`}>
              <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>Created by Vibecoding</span>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
                This entire game, <strong>TRACE: The Internet Is Lying to You</strong>, was brought to life through <strong>vibecoding</strong> — combining creative vision, game design ideas, and iterative AI guidance to build a complete interactive investigation experience from scratch.
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${
              isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900/60 border-zinc-800'
            }`}>
              <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                <Gamepad2 className="w-4 h-4 text-emerald-500" />
                <span>Passionate About Building Apps & Games</span>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
                I love turning fresh ideas into playable games and functional web apps. TRACE was created for the <em>Girls Who Code HHS Hackathon 2026</em> to help people learn how to spot fake news, donation scams, and AI audio clones before hitting share.
              </p>
            </div>
          </div>

          {/* Instagram Account Section */}
          <div className="pt-2">
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold mb-3 text-zinc-400">
              My Instagram
            </h2>

            <a
              href="https://www.instagram.com/azanejaz_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Azan Ejaz Instagram account azanejaz_ in a new tab"
              className={`group flex items-center justify-between p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
                isWhite 
                  ? 'bg-zinc-50 border-zinc-300 hover:border-zinc-900 hover:bg-zinc-100 text-zinc-900 shadow-xs' 
                  : 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-500 hover:bg-zinc-800 text-zinc-100'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base group-hover:underline">
                      @azanejaz_
                    </span>
                    <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded font-bold ${
                      isWhite ? 'bg-zinc-200 text-zinc-800' : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      Instagram
                    </span>
                  </div>
                  <p className={`text-xs ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    Click here to open my account on Instagram: azanejaz_
                  </p>
                </div>
              </div>

              <div className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg border transition ${
                isWhite 
                  ? 'bg-white border-zinc-300 group-hover:bg-zinc-900 group-hover:text-white' 
                  : 'bg-zinc-800 border-zinc-700 group-hover:bg-white group-hover:text-zinc-950'
              }`}>
                <span>Open Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={startNewCampaign}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition cursor-pointer ${
              isWhite 
                ? 'bg-zinc-900 hover:bg-zinc-800 text-white' 
                : 'bg-white hover:bg-zinc-200 text-zinc-950'
            }`}
          >
            <span>Play TRACE (Case 1)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="https://www.instagram.com/azanejaz_"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-lg border font-bold text-xs transition cursor-pointer ${
              isWhite 
                ? 'border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800' 
                : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200'
            }`}
          >
            <Instagram className="w-4 h-4 text-rose-500" />
            <span>Follow @azanejaz_</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>

      </div>
    </div>
  );
};
