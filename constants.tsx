
import React from 'react';

export const CHOICES: ('ROCK' | 'PAPER' | 'SCISSORS')[] = ['ROCK', 'PAPER', 'SCISSORS'];

export const ChoiceIcons: Record<string, React.ReactNode> = {
  ROCK: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full animate-float">
      <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" strokeDasharray="60" strokeDashoffset="60" className="animate-[dash_2s_linear_infinite]" />
      <path d="M12 22v-10" />
      <path d="M12 12l8-5" />
      <path d="M12 12L4 7" />
      <circle cx="12" cy="12" r="3" className="opacity-50" />
      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  ),
  PAPER: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full animate-float">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="8" y1="18" x2="16" y2="18" className="animate-pulse" />
      <line x1="8" y1="14" x2="16" y2="14" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
      <line x1="8" y1="10" x2="16" y2="10" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
    </svg>
  ),
  SCISSORS: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full animate-float">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" className="animate-[wiggle_1s_ease-in-out_infinite]" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); transform-origin: 8px 15px; }
          50% { transform: rotate(-5deg); transform-origin: 8px 15px; }
        }
      `}</style>
    </svg>
  ),
};

export const WIN_LOSE_MAP: Record<string, string> = {
  ROCK: 'SCISSORS',
  PAPER: 'ROCK',
  SCISSORS: 'PAPER',
};
