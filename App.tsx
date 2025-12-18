
import React, { useState, useEffect } from 'react';
import ChoiceCard from './components/ChoiceCard';
import ScoreBoard from './components/ScoreBoard';
import { GameState, Choice, GameResult } from './types';
import { CHOICES, WIN_LOSE_MAP, ChoiceIcons } from './constants';
import { getAITaunt } from './services/geminiService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    playerChoice: null,
    computerChoice: null,
    result: null,
    playerScore: 0,
    computerScore: 0,
    isProcessing: false,
    taunt: "INITIALIZING ARENA... READY FOR INPUT."
  });

  const [showFlash, setShowFlash] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const determineResult = (player: Choice, computer: Choice): GameResult => {
    if (!player || !computer) return null;
    if (player === computer) return 'DRAW';
    if (WIN_LOSE_MAP[player] === computer) return 'WIN';
    return 'LOSE';
  };

  const handlePlayerChoice = async (choice: Choice) => {
    if (gameState.isProcessing || !choice) return;

    setGameState(prev => ({
      ...prev,
      playerChoice: choice,
      isProcessing: true,
      result: null,
      computerChoice: null,
      taunt: "CALCULATING PROBABILITIES..."
    }));

    // Logic core "thinks"
    setTimeout(async () => {
      const computerChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
      const result = determineResult(choice, computerChoice);

      // Trigger Visual Flash Transition
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 100);

      // Fetch AI flavor text
      const aiTaunt = await getAITaunt(choice, computerChoice, result || 'DRAW');

      setGameState(prev => ({
        ...prev,
        computerChoice,
        result,
        playerScore: result === 'WIN' ? prev.playerScore + 1 : prev.playerScore,
        computerScore: result === 'LOSE' ? prev.computerScore + 1 : prev.computerScore,
        isProcessing: false,
        taunt: aiTaunt
      }));
    }, 1000);
  };

  const resetGame = () => {
    setGameState({
      playerChoice: null,
      computerChoice: null,
      result: null,
      playerScore: 0,
      computerScore: 0,
      isProcessing: false,
      taunt: "SYSTEM REBOOTED. STAND BY FOR NEW CYCLE."
    });
  };

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden transition-colors duration-1000 ${gameState.result === 'LOSE' ? 'bg-red-950/20' : 'bg-slate-950'}`}>
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600 rounded-full blur-[120px] transition-opacity duration-1000 ${gameState.result === 'WIN' ? 'opacity-40 scale-125' : 'opacity-10'}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-600 rounded-full blur-[120px] transition-opacity duration-1000 ${gameState.result === 'LOSE' ? 'opacity-40 scale-125' : 'opacity-10'}`} />
        <div className="scanline" />
      </div>

      {/* Result Burst Effect */}
      {gameState.result === 'WIN' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] bg-green-500/20 rounded-full win-burst" />
        </div>
      )}

      {/* Flash Transition */}
      {showFlash && (
        <div className="absolute inset-0 z-50 bg-white" />
      )}

      <div className="relative z-20 w-full max-w-2xl flex flex-col items-center">
        
        {/* Header Section */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black font-orbitron tracking-tighter text-slate-100 flex items-center justify-center gap-4 group">
            <span className="text-cyan-400 neon-text-cyan transition-all duration-300 group-hover:scale-105">NEON</span>
            <span className="text-magenta-400 neon-text-magenta transition-all duration-300 group-hover:scale-105">LOGIC</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-[2px] w-8 bg-cyan-500/50" />
            <p className="text-slate-500 font-orbitron text-[10px] tracking-[0.4em] uppercase">Arena Version 3.1.4</p>
            <div className="h-[2px] w-8 bg-magenta-500/50" />
          </div>
        </header>

        {/* Score Board */}
        <div className="mb-10 w-full flex justify-center">
          <ScoreBoard playerScore={gameState.playerScore} computerScore={gameState.computerScore} />
        </div>

        {/* Main Arena */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 relative">
          
          {/* Player Side */}
          <div className={`flex flex-col items-center p-8 rounded-3xl border transition-all duration-500 backdrop-blur-md ${gameState.playerChoice ? 'border-cyan-500/40 bg-cyan-900/10' : 'border-slate-800 bg-slate-900/40'}`}>
            <div className="absolute -top-3 left-1/4 px-4 py-1 bg-slate-950 border border-cyan-500/50 rounded-full">
              <span className="text-cyan-400 font-bold text-[9px] font-orbitron tracking-widest uppercase">Player_Module</span>
            </div>
            
            <div className="flex gap-4 mt-2">
              {CHOICES.map(c => (
                <ChoiceCard 
                  key={c} 
                  choice={c} 
                  isSelected={gameState.playerChoice === c} 
                  onSelect={handlePlayerChoice} 
                  disabled={gameState.isProcessing}
                  color="cyan"
                />
              ))}
            </div>
          </div>

          {/* VS Divider Overlay (Mobile Hidden) */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-slate-950 border-2 border-slate-700 rounded-full items-center justify-center z-30 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
             <span className="font-orbitron font-black text-slate-400 text-sm tracking-tighter">VS</span>
          </div>

          {/* Logic Core Side */}
          <div className={`flex flex-col items-center p-8 rounded-3xl border transition-all duration-500 backdrop-blur-md relative ${gameState.computerChoice ? 'border-magenta-500/40 bg-magenta-900/10' : 'border-slate-800 bg-slate-900/40'}`}>
            <div className="absolute -top-3 right-1/4 px-4 py-1 bg-slate-950 border border-magenta-500/50 rounded-full">
              <span className="text-magenta-400 font-bold text-[9px] font-orbitron tracking-widest uppercase">Logic_Core</span>
            </div>

            <div className="h-28 w-28 md:h-32 md:w-32 flex items-center justify-center mt-2">
              {gameState.isProcessing ? (
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-magenta-500/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-magenta-500 border-t-transparent rounded-full animate-spin neon-border-magenta" />
                  <span className="font-orbitron text-[8px] text-magenta-400 animate-pulse uppercase">Syncing</span>
                </div>
              ) : gameState.computerChoice ? (
                <div className="w-full h-full text-magenta-400 flex flex-col items-center justify-center animate-[scaleIn_0.3s_ease-out]">
                  <div className="w-2/3 h-2/3 mb-2">{ChoiceIcons[gameState.computerChoice]}</div>
                  <span className="text-[10px] font-bold font-orbitron tracking-widest uppercase opacity-80">{gameState.computerChoice}</span>
                </div>
              ) : (
                <div className="text-slate-800 text-5xl font-black font-orbitron animate-pulse">?</div>
              )}
            </div>
          </div>
        </div>

        {/* AI Console / Result Display */}
        <div className={`
          w-full p-6 rounded-2xl border transition-all duration-700 min-h-[100px] flex flex-col items-center justify-center
          bg-slate-900/60 backdrop-blur-xl relative overflow-hidden
          ${gameState.result === 'WIN' ? 'border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.15)]' : 'border-slate-800'}
          ${gameState.result === 'LOSE' ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.15)]' : ''}
          ${gameState.result === 'DRAW' ? 'border-yellow-500/30 draw-pulse' : ''}
        `}>
          {gameState.result && (
            <div className="absolute top-2 right-4 flex gap-1">
              <div className={`w-1 h-1 rounded-full ${gameState.result === 'WIN' ? 'bg-green-500 animate-ping' : 'bg-slate-700'}`} />
              <div className={`w-1 h-1 rounded-full ${gameState.result === 'DRAW' ? 'bg-yellow-500 animate-ping' : 'bg-slate-700'}`} />
              <div className={`w-1 h-1 rounded-full ${gameState.result === 'LOSE' ? 'bg-red-500 animate-ping' : 'bg-slate-700'}`} />
            </div>
          )}

          <div className="flex flex-col items-center text-center">
            {gameState.result && (
              <span className={`
                font-black font-orbitron text-3xl mb-2 tracking-[0.2em] uppercase transition-all duration-300
                ${gameState.result === 'WIN' ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]' : ''}
                ${gameState.result === 'LOSE' ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : ''}
                ${gameState.result === 'DRAW' ? 'text-slate-400' : ''}
              `}>
                {gameState.result === 'WIN' ? 'SUCCESS' : gameState.result === 'LOSE' ? 'DEFEAT' : 'NEUTRAL'}
              </span>
            )}
            <div className="flex gap-2 items-start">
               <span className="text-cyan-500 font-mono text-xs mt-1 animate-pulse">{">"}</span>
               <p className="text-sm md:text-base text-slate-300 font-mono italic leading-relaxed max-w-lg">
                 {gameState.taunt}
               </p>
            </div>
          </div>
        </div>

        {/* Controls Footer */}
        <footer className="mt-10 flex items-center gap-6">
          <button 
            onClick={resetGame}
            className="group relative px-6 py-2 rounded-lg bg-transparent border border-slate-700 text-slate-400 hover:text-white hover:border-slate-400 transition-all font-orbitron text-[10px] tracking-[0.2em] font-bold"
          >
            TERMINATE_SESSION
            <div className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 font-orbitron text-[9px] font-black tracking-widest
              ${soundEnabled ? 'border-cyan-500/50 text-cyan-400 bg-cyan-900/10' : 'border-slate-800 text-slate-600'}
            `}
          >
            <div className={`w-2 h-2 rounded-full ${soundEnabled ? 'bg-cyan-400 animate-pulse neon-border-cyan' : 'bg-slate-700'}`} />
            AUDIO_{soundEnabled ? 'ACTIVE' : 'OFFLINE'}
          </button>
        </footer>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default App;
