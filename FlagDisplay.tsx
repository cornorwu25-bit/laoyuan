import React, { useState, useEffect } from 'react';
import { Country } from '../types';

interface FlagDisplayProps {
  country: Country;
  isCorrect: boolean;
}

export const FlagDisplay: React.FC<FlagDisplayProps> = ({ country, isCorrect }) => {
  const [loading, setLoading] = useState(true);
  
  // Use flagcdn.com for reliable flag images
  const flagUrl = `https://flagcdn.com/w640/${country.code.toLowerCase()}.png`;

  useEffect(() => {
    setLoading(true);
  }, [country]);

  return (
    <div className={`relative w-full aspect-[3/2] bg-gray-200 rounded-xl overflow-hidden shadow-lg border-4 ${isCorrect ? 'border-green-500' : 'border-white'} transition-colors duration-300`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      <img
        src={flagUrl}
        alt="Flag to guess"
        className={`w-full h-full object-cover transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};
