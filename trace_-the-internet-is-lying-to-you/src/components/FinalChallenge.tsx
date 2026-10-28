/**
 * Final Challenge: STOP THE SPREAD Component for TRACE
 * Girls Who Code HHS Hackathon 2026
 * 
 * Simple English and clean black/white themes.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { FINAL_CHALLENGE_POSTS } from '../data/cases';
import { DecisionType } from '../types/game';
import { 
  Timer, 
  Pause, 
  Play, 
  Share2, 
  Flag, 
  Search, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Zap
} from 'lucide-react';
import { sound } from '../utils/audio';

export const FinalChallenge: React.FC = () => {
  const { completeFinalChallenge, settings } = useGame();
  const isWhite = settings.theme === 'white';
  
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);
  const [postDecisions, setPostDecisions] = useState<Record<number, DecisionType>>({});
  const [postFeedback, setPostFeedback] = useState<Record<number, boolean>>({});
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [isChallengeEnded, setIsChallengeEnded] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused || isChallengeEnded) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimesUp();
          return 0;
        }
        if (prev <= 10) {
          sound.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, isChallengeEnded]);

  const handleTimesUp = () => {
    sound.playAlert();
    setIsChallengeEnded(true);
  };

  const handleDecision = (decision: DecisionType) => {
    sound.playClick();
    const currentPost = FINAL_CHALLENGE_POSTS[currentPostIndex];
    const isCorrect = decision === currentPost.correctDecision;

    if (isCorrect) {
      sound.playSuccess();
    } else {
      sound.playAlert();
    }

    setPostDecisions(prev => ({ ...prev, [currentPostIndex]: decision }));
    setPostFeedback(prev => ({ ...prev, [currentPostIndex]: isCorrect }));
    setShowFeedbackModal(true);
  };

  const handleNextPost = () => {
    sound.playClick();
    setShowFeedbackModal(false);

    if (currentPostIndex < FINAL_CHALLENGE_POSTS.length - 1) {
      setCurrentPostIndex(prev => prev + 1);
    } else {
      setIsChallengeEnded(true);
    }
  };

  const calculateFinalScore = () => {
    let score = 0;
    Object.entries(postFeedback).forEach(([_, isCorrect]) => {
      if (isCorrect) score += 30;
    });
    if (score > 0 && timeLeft > 0) {
      const speedBonus = Math.min(10, Math.round((timeLeft / 60) * 10));
      score += speedBonus;
    }
    return score;
  };

  const handleFinish = () => {
    const finalScore = calculateFinalScore();
    completeFinalChallenge(finalScore);
  };

  const handleRestartChallenge = () => {
    sound.playClick();
    setTimeLeft(60);
    setIsPaused(false);
    setCurrentPostIndex(0);
    setPostDecisions({});
    setPostFeedback({});
    setShowFeedbackModal(false);
    setIsChallengeEnded(false);
  };

  const currentPost = FINAL_CHALLENGE_POSTS[currentPostIndex];

  return (
    <div className={`max-w-3xl mx-auto px-4 py-8 transition-colors ${
      isWhite ? 'text-zinc-900' : 'text-zinc-100'
    }`}>
      {/* Header with Timed Status */}
      <div className={`border rounded-lg p-6 mb-6 transition-colors ${
        isWhite ? 'bg-white border-zinc-200 shadow-sm' : 'bg-[#141416] border-zinc-800'
      }`}>
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-4 ${
          isWhite ? 'border-zinc-200' : 'border-zinc-800'
        }`}>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">
              <Zap className="w-4 h-4" />
              <span>FINAL TRIAL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-0.5">
              Stop the Spread · 60-Second Challenge
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-mono font-bold text-lg ${
              timeLeft <= 10 
                ? 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-300'
                : (isWhite ? 'border-zinc-200 bg-zinc-50 text-zinc-900' : 'border-zinc-700 bg-zinc-900 text-white')
            }`}>
              <Timer className="w-5 h-5" />
              <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
            </div>

            {!isChallengeEnded && (
              <button
                onClick={() => setIsPaused(prev => !prev)}
                aria-label={isPaused ? 'Resume timer' : 'Pause timer'}
                className={`p-2.5 rounded-lg border transition cursor-pointer ${
                  isWhite ? 'border-zinc-200 bg-white hover:bg-zinc-100' : 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700'
                }`}
                title={isPaused ? 'Resume' : 'Pause'}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        <p className={`text-xs sm:text-sm leading-relaxed ${
          isWhite ? 'text-zinc-600' : 'text-zinc-400'
        }`}>
          Evaluate 3 quick posts before time runs out. Read the post and the attached fact check, then decide: <strong>SHARE</strong>, <strong>FLAG</strong>, or <strong>WAIT FOR PROOF</strong>.
        </p>

        {isPaused && (
          <div className="mt-3 p-2.5 rounded bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
            Game paused. Take your time to read, and hit resume when ready.
          </div>
        )}
      </div>

      {/* Challenge Completed View */}
      {isChallengeEnded ? (
        <div className={`border rounded-lg p-6 sm:p-8 text-center space-y-6 ${
          isWhite ? 'bg-white border-zinc-300 shadow-sm' : 'bg-[#141416] border-zinc-700'
        }`}>
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto ${
            isWhite ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-white'
          }`}>
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold block mb-1">
              CHALLENGE COMPLETE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
              All 3 Posts Evaluated!
            </h2>
            <p className={`text-xs sm:text-sm max-w-md mx-auto ${isWhite ? 'text-zinc-600' : 'text-zinc-400'}`}>
              You evaluated viral claims under time pressure using real facts.
            </p>
          </div>

          <div className={`inline-block p-4 rounded-lg border font-mono ${
            isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-[#0B0B0C] border-zinc-800'
          }`}>
            <span className="text-xs text-zinc-500 block uppercase">
              Score Earned
            </span>
            <span className="text-3xl font-extrabold">
              +{calculateFinalScore()} pts
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestartChallenge}
              className={`flex items-center gap-2 px-5 py-3 rounded border text-xs font-bold transition cursor-pointer ${
                isWhite ? 'border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-900' : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            <button
              onClick={handleFinish}
              className={`flex items-center gap-2 px-6 py-3 rounded font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer ${
                isWhite ? 'bg-zinc-900 hover:bg-zinc-800 text-white' : 'bg-white hover:bg-zinc-200 text-zinc-950'
              }`}
            >
              <span>See Full Detective Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Active Post Triage */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>POST {currentPostIndex + 1} OF {FINAL_CHALLENGE_POSTS.length}</span>
            <span>Category: {currentPost.category}</span>
          </div>

          <div className={`border rounded-lg p-6 ${
            isWhite ? 'bg-white border-zinc-200 shadow-sm' : 'bg-[#141416] border-zinc-800'
          }`}>
            <div className={`flex items-center gap-2 mb-3 pb-3 border-b text-xs text-zinc-500 ${
              isWhite ? 'border-zinc-200' : 'border-zinc-800'
            }`}>
              <span className="font-bold">{currentPost.author}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold mb-2">
              {currentPost.headline}
            </h3>

            <p className={`text-xs sm:text-sm leading-relaxed mb-4 p-3.5 rounded border ${
              isWhite ? 'bg-zinc-50 border-zinc-200 text-zinc-800' : 'bg-[#0B0B0C] border-zinc-800 text-zinc-300'
            }`}>
              "{currentPost.postContent}"
            </p>

            <div className={`p-4 rounded border mb-6 text-xs sm:text-sm leading-relaxed ${
              isWhite ? 'bg-zinc-100 border-zinc-200 text-zinc-800' : 'bg-zinc-900 border-zinc-800 text-zinc-200'
            }`}>
              <strong className="block mb-1 text-xs uppercase tracking-wider font-mono text-zinc-500">
                WHAT THE REAL FACTS SAY:
              </strong>
              {currentPost.evidenceSnippet}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleDecision('SHARE')}
                className={`flex items-center justify-center gap-2 p-3.5 rounded-lg border text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  isWhite 
                    ? 'border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-900' 
                    : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-white'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span>SHARE (It's Real)</span>
              </button>

              <button
                type="button"
                onClick={() => handleDecision('FLAG')}
                className={`flex items-center justify-center gap-2 p-3.5 rounded-lg border text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  isWhite 
                    ? 'border-red-200 bg-red-50 hover:bg-red-100 text-red-900' 
                    : 'border-red-800 bg-red-950/30 hover:bg-red-950/60 text-red-200'
                }`}
              >
                <Flag className="w-4 h-4" />
                <span>FLAG (It's Fake)</span>
              </button>

              <button
                type="button"
                onClick={() => handleDecision('INVESTIGATE_FURTHER')}
                className={`flex items-center justify-center gap-2 p-3.5 rounded-lg border text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                  isWhite 
                    ? 'border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-900' 
                    : 'border-amber-800 bg-amber-950/30 hover:bg-amber-950/60 text-amber-200'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>WAIT (Need Proof)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Immediate Decision Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className={`w-full max-w-md border rounded-lg p-6 shadow-xl space-y-4 ${
            isWhite ? 'bg-white border-zinc-300 text-zinc-900' : 'bg-[#141416] border-zinc-700 text-zinc-100'
          }`}>
            <div className="flex items-center gap-2.5">
              {postFeedback[currentPostIndex] ? (
                <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center text-red-600 dark:text-red-400">
                  <XCircle className="w-5 h-5" />
                </div>
              )}
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500">
                  Quick Result
                </span>
                <h3 className="text-base font-bold">
                  {postFeedback[currentPostIndex] ? 'You Got It Right!' : 'Not Quite!'}
                </h3>
              </div>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed ${isWhite ? 'text-zinc-700' : 'text-zinc-300'}`}>
              {currentPost.explanation}
            </p>

            <button
              onClick={handleNextPost}
              className={`w-full py-2.5 px-4 rounded font-bold text-xs uppercase tracking-wider transition cursor-pointer ${
                isWhite ? 'bg-zinc-900 hover:bg-zinc-800 text-white' : 'bg-white hover:bg-zinc-200 text-zinc-950'
              }`}
            >
              {currentPostIndex < FINAL_CHALLENGE_POSTS.length - 1 ? 'Next Post' : 'Finish Challenge'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
