/**
 * Settings & Accessibility Modal Component for TRACE
 * Girls Who Code HHS Hackathon 2026
 *
 * Clean, simple words, clear options, and Black/White theme toggle.
 */

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { 
  Sliders, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Type, 
  Trash2, 
  X, 
  AlertTriangle,
  Sun,
  Moon
} from 'lucide-react';
import { sound } from '../utils/audio';

export const SettingsModal: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    closeSettings, 
    resetAllProgress 
  } = useGame();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const isWhite = settings.theme === 'white';

  const handleToggleSound = () => {
    const next = !settings.soundEnabled;
    updateSettings({ soundEnabled: next });
    if (next) {
      sound.playSuccess();
    }
  };

  const handleToggleReducedMotion = () => {
    sound.playClick();
    updateSettings({ reducedMotion: !settings.reducedMotion });
  };

  const handleFontSize = (size: 'normal' | 'large' | 'xlarge') => {
    sound.playClick();
    updateSettings({ fontSize: size });
  };

  const handleTheme = (theme: 'black' | 'white') => {
    sound.playClick();
    updateSettings({ theme });
  };

  const handleConfirmReset = () => {
    resetAllProgress();
    setShowResetConfirm(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className={`rounded-xl border shadow-xl p-6 sm:p-8 ${
        isWhite ? 'bg-white border-neutral-300 text-neutral-900' : 'bg-[#141416] border-neutral-800 text-neutral-100'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between border-b pb-4 mb-6 ${
          isWhite ? 'border-neutral-200' : 'border-neutral-800'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold ${
              isWhite ? 'bg-neutral-100 text-neutral-900 border border-neutral-300' : 'bg-neutral-800 text-white border border-neutral-700'
            }`}>
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider block ${
                isWhite ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                Customize Your Experience
              </span>
              <h1 className="text-xl sm:text-2xl font-black">
                Settings & Accessibility
              </h1>
            </div>
          </div>

          <button
            onClick={closeSettings}
            aria-label="Close settings"
            className={`p-2 rounded-lg border transition ${
              isWhite 
                ? 'border-neutral-200 bg-neutral-100 hover:bg-neutral-200 text-neutral-700' 
                : 'border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Setting 1: Theme (Black vs White) */}
          <div className={`p-4 rounded-xl border ${
            isWhite ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900/60 border-neutral-800'
          }`}>
            <div className="mb-3">
              <span className="text-sm font-bold flex items-center gap-2">
                {isWhite ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-neutral-300" />}
                Theme Style
              </span>
              <p className={`text-xs mt-0.5 ${isWhite ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Choose a sharp dark theme or a clean paper white theme. No glowing cyan or AI vibes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleTheme('black')}
                className={`py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 border transition ${
                  !isWhite
                    ? 'bg-black text-white border-neutral-500 ring-2 ring-neutral-400'
                    : 'bg-neutral-100 text-neutral-700 border-neutral-300 hover:bg-neutral-200'
                }`}
              >
                <Moon className="w-4 h-4" />
                Black Theme
              </button>

              <button
                type="button"
                onClick={() => handleTheme('white')}
                className={`py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 border transition ${
                  isWhite
                    ? 'bg-white text-neutral-950 border-neutral-900 ring-2 ring-neutral-900 shadow-sm'
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                White Theme
              </button>
            </div>
          </div>

          {/* Setting 2: Sound Effects */}
          <div className={`flex items-center justify-between p-4 rounded-xl border ${
            isWhite ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900/60 border-neutral-800'
          }`}>
            <div className="space-y-0.5 pr-4">
              <div className="flex items-center gap-2 text-sm font-bold">
                {settings.soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <VolumeX className="w-4 h-4 text-neutral-400" />
                )}
                <span>Sound Effects</span>
              </div>
              <p className={`text-xs ${isWhite ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Play gentle audio clicks when opening clues, making decisions, and viewing results.
              </p>
            </div>

            <button
              type="button"
              onClick={handleToggleSound}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                settings.soundEnabled 
                  ? (isWhite ? 'bg-neutral-900 justify-end' : 'bg-white justify-end') 
                  : (isWhite ? 'bg-neutral-300 justify-start' : 'bg-neutral-700 justify-start')
              }`}
              aria-label={settings.soundEnabled ? 'Disable audio' : 'Enable audio'}
            >
              <div className={`w-4 h-4 rounded-full shadow-sm ${
                settings.soundEnabled 
                  ? (isWhite ? 'bg-white' : 'bg-neutral-950') 
                  : (isWhite ? 'bg-neutral-600' : 'bg-neutral-400')
              }`} />
            </button>
          </div>

          {/* Setting 3: Reduced Motion */}
          <div className={`flex items-center justify-between p-4 rounded-xl border ${
            isWhite ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900/60 border-neutral-800'
          }`}>
            <div className="space-y-0.5 pr-4">
              <div className="flex items-center gap-2 text-sm font-bold">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Reduced Motion</span>
              </div>
              <p className={`text-xs ${isWhite ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Turn off moving animations, slide transitions, and pulsing buttons for a calmer experience.
              </p>
            </div>

            <button
              type="button"
              onClick={handleToggleReducedMotion}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                settings.reducedMotion 
                  ? (isWhite ? 'bg-neutral-900 justify-end' : 'bg-white justify-end') 
                  : (isWhite ? 'bg-neutral-300 justify-start' : 'bg-neutral-700 justify-start')
              }`}
              aria-label={settings.reducedMotion ? 'Disable reduced motion' : 'Enable reduced motion'}
            >
              <div className={`w-4 h-4 rounded-full shadow-sm ${
                settings.reducedMotion 
                  ? (isWhite ? 'bg-white' : 'bg-neutral-950') 
                  : (isWhite ? 'bg-neutral-600' : 'bg-neutral-400')
              }`} />
            </button>
          </div>

          {/* Setting 4: Text Size */}
          <div className={`p-4 rounded-xl border space-y-3 ${
            isWhite ? 'bg-neutral-50 border-neutral-200' : 'bg-neutral-900/60 border-neutral-800'
          }`}>
            <div>
              <div className="flex items-center gap-2 text-sm font-bold">
                <Type className="w-4 h-4 text-neutral-500" />
                <span>Text Size</span>
              </div>
              <p className={`text-xs mt-0.5 ${isWhite ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Make reading clues and posts easier by enlarging text across the whole game.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'large', 'xlarge'] as const).map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleFontSize(size)}
                  className={`py-2 px-3 rounded-lg border text-xs font-bold capitalize transition ${
                    settings.fontSize === size
                      ? (isWhite 
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm' 
                          : 'border-white bg-white text-neutral-950 font-black')
                      : (isWhite 
                          ? 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400' 
                          : 'border-neutral-700 bg-neutral-800 text-neutral-300 hover:border-neutral-600')
                  }`}
                >
                  {size === 'normal' ? 'Regular' : size === 'large' ? 'Large (+15%)' : 'Extra Large'}
                </button>
              ))}
            </div>
          </div>

          {/* Setting 5: Reset Progress */}
          <div className={`p-4 rounded-xl border space-y-3 ${
            isWhite 
              ? 'border-red-200 bg-red-50/50' 
              : 'border-red-950/60 bg-red-950/20'
          }`}>
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400">
                <Trash2 className="w-4 h-4" />
                <span>Reset Game Progress</span>
              </div>
              <p className={`text-xs mt-0.5 ${isWhite ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Clear your saved scores and unlocked cases to play through the game again fresh.
              </p>
            </div>

            {!showResetConfirm ? (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2 rounded-lg border border-red-300 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold transition dark:border-red-800 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/60"
              >
                Reset Saved Progress...
              </button>
            ) : (
              <div className={`p-3.5 rounded-lg border space-y-2.5 ${
                isWhite ? 'border-red-300 bg-red-100/70 text-red-900' : 'border-red-800 bg-red-950/60 text-red-200'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Are you sure? This will reset all your scores and unlocked cases.</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleConfirmReset}
                    className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs"
                  >
                    Yes, Reset Everything
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResetConfirm(false)}
                    className={`px-3.5 py-1.5 rounded-lg font-bold text-xs border ${
                      isWhite ? 'border-neutral-300 bg-white text-neutral-800' : 'border-neutral-700 bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`border-t pt-5 mt-6 flex justify-end ${
          isWhite ? 'border-neutral-200' : 'border-neutral-800'
        }`}>
          <button
            onClick={closeSettings}
            className={`px-6 py-2.5 rounded-lg font-bold text-xs tracking-wider transition ${
              isWhite 
                ? 'bg-neutral-900 hover:bg-neutral-800 text-white' 
                : 'bg-white hover:bg-neutral-200 text-neutral-950 font-black'
            }`}
          >
            Save & Return to Game
          </button>
        </div>
      </div>
    </div>
  );
};
