/**
 * Case Briefing Component for TRACE (Stage A: See the Viral Post)
 * Girls Who Code HHS Hackathon 2026
 * 
 * Simple, clear English with clean black/white themes.
 */

import React from 'react';
import { useGame } from '../context/GameContext';
import { 
  AlertCircle, 
  Share2, 
  Heart, 
  MessageCircle, 
  Eye, 
  Clock, 
  ArrowRight, 
  CheckCircle,
  FileText
} from 'lucide-react';

export const CaseBriefing: React.FC = () => {
  const { currentCase, beginConfidenceTrap, settings } = useGame();
  const { tip } = currentCase;
  const isWhite = settings.theme === 'white';

  return (
    <div className={`max-w-3xl mx-auto px-4 py-8 transition-colors ${
      isWhite ? 'text-zinc-900' : 'text-zinc-100'
    }`}>
      {/* Case Overview Card */}
      <div className={`border rounded-lg p-6 mb-8 transition-colors ${
        isWhite ? 'bg-white border-zinc-200 shadow-sm' : 'bg-[#141416] border-zinc-800'
      }`}>
        <div className={`flex items-center justify-between border-b pb-4 mb-4 ${
          isWhite ? 'border-zinc-200' : 'border-zinc-800'
        }`}>
          <div className="flex items-center gap-2">
            <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
              isWhite ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-white'
            }`}>
              {currentCase.id}
            </span>
            <span className="text-zinc-400">·</span>
            <span className="text-xs uppercase font-mono text-zinc-500">
              {currentCase.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Clock className="w-3.5 h-3.5" />
            <span>Intercepted 2 hours ago</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
          {currentCase.title}
        </h1>
        <p className={`text-sm sm:text-base font-medium mb-3 ${
          isWhite ? 'text-zinc-700' : 'text-zinc-300'
        }`}>
          {currentCase.subtitle}
        </p>
        <p className={`text-xs sm:text-sm leading-relaxed ${
          isWhite ? 'text-zinc-600' : 'text-zinc-400'
        }`}>
          {currentCase.scenarioOverview}
        </p>
      </div>

      {/* The Viral Social Media Post */}
      <div className={`border rounded-lg p-6 mb-8 relative transition-colors ${
        isWhite ? 'bg-white border-zinc-300 shadow-sm' : 'bg-[#141416] border-zinc-700'
      }`}>
        <div className={`flex items-center justify-between mb-4 pb-3 border-b ${
          isWhite ? 'border-zinc-200 text-zinc-600' : 'border-zinc-800 text-zinc-400'
        }`}>
          <span className="text-xs font-bold uppercase tracking-wider">
            VIRAL SOCIAL MEDIA POST
          </span>
          <span className="text-xs font-mono">{tip.timeAgo}</span>
        </div>

        {/* Author details */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
            isWhite ? 'bg-zinc-100 text-zinc-900 border border-zinc-300' : 'bg-zinc-800 text-white border border-zinc-700'
          }`}>
            {tip.authorAvatarText}
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-sm sm:text-base">
              <span>{tip.authorName}</span>
              {tip.isVerifiedBadge && (
                <span title="Blue Checkmark" className="text-sky-500 text-xs">
                  ✓
                </span>
              )}
            </div>
            <div className="text-xs text-zinc-500 font-mono">
              {tip.authorHandle} · {tip.accountAge}
            </div>
          </div>
        </div>

        {/* Claim Callout */}
        <div className={`p-4 rounded border mb-4 font-semibold text-sm sm:text-base leading-snug ${
          isWhite ? 'bg-red-50 border-red-200 text-red-950' : 'bg-red-950/30 border-red-800 text-red-200'
        }`}>
          {tip.mainClaim}
        </div>

        <p className={`text-xs sm:text-sm leading-relaxed mb-4 whitespace-pre-line ${
          isWhite ? 'text-zinc-700' : 'text-zinc-300'
        }`}>
          {tip.postBody}
        </p>

        {tip.attachedMediaNotice && (
          <div className={`p-3 rounded border text-xs font-mono mb-5 flex items-start gap-2 ${
            isWhite ? 'bg-zinc-50 border-zinc-200 text-zinc-700' : 'bg-zinc-900 border-zinc-800 text-zinc-300'
          }`}>
            <FileText className="w-4 h-4 shrink-0 mt-0.5 text-zinc-500" />
            <span>{tip.attachedMediaNotice}</span>
          </div>
        )}

        {/* Engagement Numbers */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-t border-b text-xs font-mono mb-4 ${
          isWhite ? 'border-zinc-200 text-zinc-600' : 'border-zinc-800 text-zinc-400'
        }`}>
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span>{tip.engagement.views} views</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5" />
            <span>{tip.engagement.shares} shares</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5" />
            <span>{tip.engagement.likes} likes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{tip.engagement.replies} replies</span>
          </div>
        </div>

        {/* Warning callout */}
        {tip.urgencyWarning && (
          <div className={`p-3 rounded border text-xs leading-relaxed ${
            isWhite ? 'bg-amber-50 border-amber-200 text-amber-950' : 'bg-amber-950/20 border-amber-800 text-amber-200'
          }`}>
            <strong>Warning Sign:</strong> {tip.urgencyWarning}
          </div>
        )}
      </div>

      {/* Action to proceed to initial assessment */}
      <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-lg border ${
        isWhite ? 'bg-zinc-100 border-zinc-300' : 'bg-zinc-900 border-zinc-800'
      }`}>
        <div>
          <h2 className="text-sm font-bold mb-0.5">
            Next: Test Your First Reaction
          </h2>
          <p className="text-xs text-zinc-500">
            Before we show you the clues, tell us what your gut says about this post.
          </p>
        </div>

        <button
          onClick={beginConfidenceTrap}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer shrink-0 ${
            isWhite 
              ? 'bg-zinc-900 hover:bg-zinc-800 text-white' 
              : 'bg-white hover:bg-zinc-200 text-zinc-950'
          }`}
        >
          <span>Make Your First Guess</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
