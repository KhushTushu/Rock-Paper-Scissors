
import React, { useEffect, useState } from 'react';

interface ScoreBoardProps {
  playerScore: number;
  computerScore: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ playerScore, computerScore }) => {
  const [pAnimate, setPAnimate] = useState(false);
  const [cAnimate, setCAnimate] = useState(false);

  useEffect(() => {
    if (playerScore > 0) {
      setPAnimate(true);
      const timer = setTimeout(() => setPAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [playerScore]);

  useEffect(() => {
    if (computerScore > 0) {
      setCAnimate(true);
      const timer = setTimeout(() => setCAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [computerScore]);

  return (
    <div className="flex justify-between items-center w-full max-w-md px-8 py-4 bg-slate-900/80 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col items-center">
        <span className="text-cyan-400 font-orbitron text-[10px] tracking-widest uppercase mb-1">User_Link</span>
        <div className={`text-4xl font-black font-orbitron transition-all duration-300 ${pAnimate ? 'scale-150 text-cyan-300 brightness-150' : 'text-slate-100'}`}>
          {playerScore.toString().padStart(2, '0')}
        </div>
      </div>
      
      <div className="h-8 w-px bg-slate-700 mx-4" />
      
      <div className="flex flex-col items-center">
        <span className="text-magenta-400 font-orbitron text-[10px] tracking-widest uppercase mb-1">Logic_Core</span>
        <div className={`text-4xl font-black font-orbitron transition-all duration-300 ${cAnimate ? 'scale-150 text-magenta-300 brightness-150' : 'text-slate-100'}`}>
          {computerScore.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
