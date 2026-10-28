/**
 * Header Component for TRACE
 * Girls Who Code HHS Hackathon 2026
 */

import React from 'react';
import { useGame } from '../context/GameContext';
import { ShieldCheck, Volume2, VolumeX, Settings, Home, Sun, Moon, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    screen, 
    currentCaseIndex, 
    currentCase, 
    settings, 
    toggleMute, 
    toggleTheme,
    openSettings,
    openAbout,
    goToScreen 
  } = useGame();

  const isInvestigating = ['CASE_BRIEFING', 'CONFIDENCE_TRAP', 'INVESTIGATION', 'DECISION', 'REASONING', 'CASE_RESULTS'].includes(screen);
  const isWhite = settings.theme === 'white';

  return (
    <header className={`sticky top-0 z-40 w-full border-b px-4 lg:px-8 py-3 transition-colors ${
      isWhite 
        ? 'bg-white border-zinc-200 text-zinc-900 shadow-xs' 
        : 'bg-[#121214] border-zinc-800 text-zinc-100'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => goToScreen('TITLE')}
            aria-label="Return to Main Menu"
            className="group flex items-center gap-2.5 text-left rounded transition cursor-pointer"
          >
            <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-sm ${
              isWhite ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'
            }`}>
              T
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-base group-hover:underline">
                  TRACE
                </span>
                <span className={`text-[11px] font-mono uppercase tracking-wider hidden sm:inline px-1.5 py-0.5 rounded ${
                  isWhite ? 'bg-zinc-100 text-zinc-600' : 'bg-zinc-800 text-zinc-300'
                }`}>
                  Girls Who Code 2026
                </span>
              </div>
              <p className={`text-[11px] hidden md:block ${isWhite ? 'text-zinc-500' : 'text-zinc-400'}`}>
                The Internet Detective Game
              </p>
            </div>
          </button>
        </div>

        {/* Case tracker in simple words */}
        {isInvestigating && (
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className={`px-2 py-0.5 rounded font-mono text-[11px] font-bold ${
              isWhite ? 'bg-zinc-100 text-zinc-800' : 'bg-zinc-800 text-zinc-200'
            }`}>
              CASE {currentCaseIndex + 1} OF 3
            </span>
            <span className={isWhite ? 'text-zinc-400' : 'text-zinc-600'}>·</span>
            <span className="truncate max-w-[180px] hidden sm:inline">
              {currentCase.title}
            </span>
          </div>
        )}

        {/* Quick controls */}
        <div className="flex items-center gap-2">
          {/* Theme switcher: Black vs White */}
          <button
            onClick={toggleTheme}
            aria-label={isWhite ? 'Switch to Black Theme' : 'Switch to White Theme'}
            className={`p-2 rounded border transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium ${
              isWhite 
                ? 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-800' 
                : 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200'
            }`}
            title={isWhite ? 'Switch to Black Theme' : 'Switch to White Theme'}
          >
            {isWhite ? (
              <>
                <Moon className="w-4 h-4" />
                <span className="hidden md:inline">Black</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-300" />
                <span className="hidden md:inline">White</span>
              </>
            )}
          </button>

          {/* Sound toggle */}
          <button
            onClick={toggleMute}
            aria-label={settings.soundEnabled ? 'Mute sound' : 'Unmute sound'}
            className={`p-2 rounded border transition-colors cursor-pointer ${
              isWhite 
                ? 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-800' 
                : 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200'
            }`}
            title={settings.soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
          >
            {settings.soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4 text-zinc-500" />
            )}
          </button>

          {/* Settings */}
          <button
            onClick={openSettings}
            aria-label="Open settings"
            className={`p-2 rounded border transition-colors cursor-pointer ${
              isWhite 
                ? 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-800' 
                : 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200'
            }`}
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* About Creator: Azan Ejaz */}
          <button
            onClick={openAbout}
            aria-label="About the Creator: Azan Ejaz"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-semibold transition-colors cursor-pointer ${
              screen === 'ABOUT'
                ? (isWhite ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-white bg-white text-zinc-950')
                : (isWhite ? 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-800' : 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-200')
            }`}
            title="About the Creator: Azan Ejaz (15 y/o)"
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">About</span>
          </button>

          {/* Return to menu button if not on title */}
          {screen !== 'TITLE' && (
            <button
              onClick={() => goToScreen('TITLE')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-semibold transition-colors cursor-pointer ${
                isWhite 
                  ? 'border-zinc-300 bg-zinc-100 hover:bg-zinc-200 text-zinc-900' 
                  : 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-100'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Home</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
