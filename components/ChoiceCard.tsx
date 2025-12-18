
import React from 'react';
import { Choice } from '../types';
import { ChoiceIcons } from '../constants';

interface ChoiceCardProps {
  choice: Choice;
  isSelected: boolean;
  onSelect: (choice: Choice) => void;
  disabled: boolean;
  color: string;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({ choice, isSelected, onSelect, disabled, color }) => {
  if (!choice) return null;

  return (
    <button
      onClick={() => onSelect(choice)}
      disabled={disabled}
      className={`
        relative group transition-all duration-300 transform 
        w-24 h-24 sm:w-32 sm:h-32 rounded-xl flex flex-col items-center justify-center
        border-2 
        ${isSelected 
          ? `bg-slate-900 border-${color}-400 scale-110 neon-border-${color}` 
          : 'bg-slate-900/50 border-slate-700 hover:border-slate-500 hover:scale-105'}
        ${disabled && !isSelected ? 'opacity-40 grayscale' : 'opacity-100'}
      `}
      style={{
        boxShadow: isSelected ? `0 0 20px ${color === 'cyan' ? '#06b6d4' : color === 'magenta' ? '#d946ef' : '#39ff14'}` : 'none'
      }}
    >
      <div className={`w-1/2 h-1/2 mb-2 transition-colors duration-300 ${isSelected ? `text-${color}-400` : 'text-slate-400 group-hover:text-slate-200'}`}>
        {ChoiceIcons[choice]}
      </div>
      <span className={`text-xs font-bold tracking-widest font-orbitron transition-colors duration-300 ${isSelected ? `text-${color}-400` : 'text-slate-500 group-hover:text-slate-300'}`}>
        {choice}
      </span>
      
      {isSelected && (
        <div className={`absolute -inset-1 rounded-xl blur-md opacity-50 bg-${color}-500 -z-10 animate-pulse`} />
      )}
    </button>
  );
};

export default ChoiceCard;
