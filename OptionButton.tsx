import React from 'react';
import { Country } from '../types';

interface OptionButtonProps {
  country: Country;
  isRevealed: boolean;
  isCorrect: boolean;
  isSelected: boolean;
  isDisabled: boolean; // Global disable during processing
  onClick: () => void;
}

export const OptionButton: React.FC<OptionButtonProps> = ({ 
  country, 
  isRevealed, 
  isCorrect, 
  isSelected,
  isDisabled,
  onClick 
}) => {
  let baseClasses = "w-full p-4 text-lg font-bold rounded-xl shadow-md transition-all duration-200 transform flex items-center justify-center border-2";
  
  let stateClasses = "bg-white text-gray-800 border-gray-100";
  
  // Interactive state (hover, active) only if not disabled and not revealed
  if (!isDisabled && !isRevealed) {
    stateClasses += " hover:bg-indigo-50 hover:border-indigo-200 active:scale-95 cursor-pointer";
  } else {
    stateClasses += " cursor-default";
  }

  if (isSelected && !isRevealed) {
    // Processing state (clicked but waiting for result)
    stateClasses = "bg-yellow-100 text-yellow-800 border-yellow-300 scale-95";
  }

  if (isRevealed) {
    if (isCorrect) {
      stateClasses = "bg-green-500 text-white border-green-600";
    } else if (isSelected && !isCorrect) {
      stateClasses = "bg-red-500 text-white border-red-600 shake";
    } else {
      // Unselected options fade out
      stateClasses = "bg-gray-100 text-gray-400 border-transparent opacity-50";
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isRevealed}
      className={`${baseClasses} ${stateClasses}`}
    >
      {country.name}
    </button>
  );
};
