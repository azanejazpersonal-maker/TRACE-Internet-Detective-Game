/**
 * Tutorial Component for TRACE
 * Girls Who Code HHS Hackathon 2026
 * 
 * Simple, clear, human words explaining how to play.
 */

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { 
  FileSearch, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import { sound } from '../utils/audio';

interface TutorialStep {
  stepNumber: string;
  title: string;
  instruction: string;
  tip: string;
  icon: React.ElementType;
}

const SIMPLE_STEPS: TutorialStep[] = [
  {
    stepNumber: '01',
    title: 'Look at the Viral Post',
    instruction: 'You will see a post that is going viral — like a tap water emergency, a disaster donation page, or an urgent voice message. Read what it claims and look at who posted it.',
    tip: 'Rule: Just because a post has 100,000 views or a blue checkmark does NOT mean it is true.',
    icon: FileSearch,
  },
  {
    stepNumber: '02',
    title: 'Make Your First Guess',
    instruction: 'Before opening the clues, tell us if you think it looks real, fake, or if you are unsure. Also choose how confident you feel (50%, 75%, or 95%).',
    tip: 'Rule: Admitting "I am not sure yet" is smart! Don\'t jump to conclusions before seeing proof.',
    icon: Scale,
  },
  {
    stepNumber: '03',
    title: 'Check the 5 Clues',
    instruction: 'Click on each clue in the case file. You will see reverse-image search results on photos, official city announcements, bank account traces, and audio checks.',
    tip: 'Rule: AI can clone any voice from a short video, and scammers can reuse old photos from 10 years ago. Always check real sources.',
    icon: HelpCircle,
  },
  {
    stepNumber: '04',
    title: 'Make Your Final Decision',
    instruction: 'Now choose what to do with the post:\n• SHARE (if official proof shows it is real and helpful)\n• FLAG (if it is fake, exaggerated, or a scam)\n• WAIT / INVESTIGATE FURTHER (if there is not enough proof yet)',
    tip: 'Rule: When you are not sure, holding back from sharing prevents unnecessary panic.',
    icon: AlertCircle,
  },
  {
    stepNumber: '05',
    title: 'See Your Score & Debrief',
    instruction: 'You will see your score out of 100 points, plus a side-by-side comparison showing whether your first guess was right or if you fell for the "Confidence Trap".',
    tip: 'Rule: The goal is not to distrust everything online — it is learning to pause and check before you share.',
    icon: CheckCircle2,
  },
];

export const Tutorial: React.FC = () => {
  const { startNewCampaign, settings } = useGame();
  const [currentStep, setCurrentStep] = useState(0);
  const isWhite = settings.theme === 'white';

  const step = SIMPLE_STEPS[currentStep];
  const StepIcon = step.icon;

  const handleNext = () => {
    sound.playClick();
    if (currentStep < SIMPLE_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      startNewCampaign();
    }
  };

  const handlePrev = () => {
    sound.playClick();
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className={`min-h-[calc(100vh-65px)] flex flex-col justify-center items-center px-4 py-8 transition-colors ${
      isWhite ? 'bg-[#F8F9FA] text-zinc-900' : 'bg-[#0E0E10] text-zinc-100'
    }`}>
      <div className={`w-full max-w-2xl border rounded-lg p-6 sm:p-8 relative ${
        isWhite ? 'bg-white border-zinc-200 shadow-md' : 'bg-[#141416] border-zinc-800 shadow-xl'
      }`}>
        {/* Header bar */}
        <div className={`flex items-center justify-between border-b pb-4 mb-6 ${
          isWhite ? 'border-zinc-200' : 'border-zinc-800'
        }`}>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
              isWhite ? 'bg-zinc-100 text-zinc-800' : 'bg-zinc-800 text-zinc-200'
            }`}>
              HOW TO PLAY
            </span>
            <span className="text-xs text-zinc-500">Step {currentStep + 1} of 5</span>
          </div>
          <button
            onClick={startNewCampaign}
            className={`text-xs font-medium underline underline-offset-4 cursor-pointer ${
              isWhite ? 'text-zinc-600 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Skip to Case 1
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mb-6" role="tablist">
          {SIMPLE_STEPS.map((s, idx) => (
            <button
              key={s.stepNumber}
              onClick={() => {
                sound.playClick();
                setCurrentStep(idx);
              }}
              className={`h-2 flex-1 rounded-full transition-all cursor-pointer ${
                idx === currentStep
                  ? (isWhite ? 'bg-zinc-900' : 'bg-white')
                  : idx < currentStep
                  ? (isWhite ? 'bg-zinc-300' : 'bg-zinc-700')
                  : (isWhite ? 'bg-zinc-100' : 'bg-zinc-900')
              }`}
              aria-label={`Go to step ${idx + 1}`}
            />
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded flex items-center justify-center shrink-0 ${
              isWhite ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-800 text-white'
            }`}>
              <StepIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block mb-1">
                STEP {step.stepNumber}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                {step.title}
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed whitespace-pre-line ${
                isWhite ? 'text-zinc-700' : 'text-zinc-300'
              }`}>
                {step.instruction}
              </p>
            </div>
          </div>

          {/* Simple tip card */}
          <div className={`p-4 rounded border ${
            isWhite ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-zinc-800'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider block mb-1">
              PRO TIP:
            </span>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isWhite ? 'text-zinc-700' : 'text-zinc-300'
            }`}>
              {step.tip}
            </p>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className={`flex items-center justify-between border-t pt-6 mt-8 ${
          isWhite ? 'border-zinc-200' : 'border-zinc-800'
        }`}>
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold transition cursor-pointer ${
              currentStep === 0
                ? 'opacity-30 cursor-not-allowed'
                : (isWhite ? 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200' : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700')
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded text-xs font-bold transition cursor-pointer ${
              isWhite 
                ? 'bg-zinc-900 hover:bg-zinc-800 text-white' 
                : 'bg-white hover:bg-zinc-200 text-zinc-950'
            }`}
          >
            <span>{currentStep === SIMPLE_STEPS.length - 1 ? 'Start Case 1 Now' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
