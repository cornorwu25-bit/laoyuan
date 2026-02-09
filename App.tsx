import React, { useState, useEffect, useCallback } from 'react';
import { FlagDisplay } from './components/FlagDisplay';
import { OptionButton } from './components/OptionButton';
import { FeedbackArea } from './components/FeedbackArea';
import { Timer } from './components/Timer';
import { Leaderboard } from './components/Leaderboard';
import { COUNTRIES, TOTAL_OPTIONS, QUESTIONS_PER_SET, SCORE_PER_QUESTION } from './constants';
import { Country, GameState, LeaderboardEntry } from './types';
import { playSound } from './utils/audio';

// Utility to shuffle array
const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const App: React.FC = () => {
  const [state, setState] = useState<GameState>({
    currentCountry: null,
    options: [],
    score: 0,
    questionIndex: 0,
    totalQuestions: QUESTIONS_PER_SET,
    startTime: 0,
    endTime: 0,
    status: 'menu',
    selectedOptionCode: null,
    history: [],
  });

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Load leaderboard on mount
  useEffect(() => {
    const saved = localStorage.getItem('flag_game_leaderboard');
    if (saved) {
      try {
        setLeaderboard(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse leaderboard', e);
      }
    }
  }, []);

  const saveToLeaderboard = (score: number, timeTaken: number) => {
    const newEntry: LeaderboardEntry = {
      date: new Date().toISOString(),
      score,
      timeTaken
    };
    
    // Append, Sort (Score DESC, Time ASC), Keep Top 20
    const newBoard = [...leaderboard, newEntry]
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.timeTaken - b.timeTaken;
      })
      .slice(0, 20);

    setLeaderboard(newBoard);
    localStorage.setItem('flag_game_leaderboard', JSON.stringify(newBoard));
  };

  const startGame = () => {
    playSound('click');
    setState(prev => ({
      ...prev,
      score: 0,
      questionIndex: 0,
      startTime: Date.now(),
      endTime: 0,
      status: 'playing',
      history: [],
      selectedOptionCode: null,
    }));
    loadQuestion([], 0);
  };

  const loadQuestion = (currentHistory: string[], qIndex: number) => {
    // 1. Pick a random country not in history
    let availableCountries = COUNTRIES.filter(c => !currentHistory.includes(c.code));
    if (availableCountries.length === 0) availableCountries = COUNTRIES; // Should not happen with large list

    const correctCountry = availableCountries[Math.floor(Math.random() * availableCountries.length)];

    // 2. Pick unique distractors
    const distractors: Country[] = [];
    const usedCodes = new Set([correctCountry.code]);

    while (distractors.length < TOTAL_OPTIONS - 1) {
      const idx = Math.floor(Math.random() * COUNTRIES.length);
      const c = COUNTRIES[idx];
      if (!usedCodes.has(c.code)) {
        usedCodes.add(c.code);
        distractors.push(c);
      }
    }

    // 3. Shuffle options
    const options = shuffle([correctCountry, ...distractors]);

    setState(prev => ({
      ...prev,
      currentCountry: correctCountry,
      options,
      status: 'playing',
      selectedOptionCode: null,
      questionIndex: qIndex,
      // Add to history immediately so we don't pick it again
      history: [...currentHistory, correctCountry.code]
    }));
  };

  const handleOptionClick = (country: Country) => {
    if (state.status !== 'playing') return;

    playSound('click');

    setState(prev => ({
      ...prev,
      status: 'processing',
      selectedOptionCode: country.code
    }));

    // Wait 1 second before showing result
    setTimeout(() => {
      processResult(country);
    }, 1000);
  };

  const processResult = (selectedCountry: Country) => {
    const isCorrect = selectedCountry.code === state.currentCountry?.code;
    
    if (isCorrect) {
      playSound('correct');
      setState(prev => ({ ...prev, score: prev.score + SCORE_PER_QUESTION }));
    } else {
      playSound('wrong');
    }

    setState(prev => ({
      ...prev,
      status: 'result'
    }));
  };

  const handleNext = () => {
    if (state.questionIndex >= state.totalQuestions - 1) {
      // Game Over
      const now = Date.now();
      const timeTaken = Math.floor((now - state.startTime) / 1000);
      playSound('summary');
      saveToLeaderboard(state.score, timeTaken);
      setState(prev => ({
        ...prev,
        status: 'summary',
        endTime: now
      }));
    } else {
      // Next Question
      playSound('click');
      loadQuestion(state.history, state.questionIndex + 1);
    }
  };

  // Render Logic
  
  // Menu Screen
  if (state.status === 'menu') {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2">🌍 世界国旗大挑战</h1>
        <p className="text-gray-500 mb-8">看国旗，猜国家，挑战你的地理知识！</p>
        
        <button 
          onClick={startGame}
          className="w-full max-w-xs py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-bold rounded-xl shadow-lg transition-transform hover:scale-105 mb-4"
        >
          开始游戏
        </button>
        
        <button 
          onClick={() => setState(prev => ({ ...prev, status: 'leaderboard' }))}
          className="w-full max-w-xs py-3 bg-white hover:bg-gray-50 text-indigo-600 border-2 border-indigo-100 font-bold rounded-xl shadow-sm transition-colors"
        >
          🏆 排行榜
        </button>
      </div>
    );
  }

  // Leaderboard Screen
  if (state.status === 'leaderboard') {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
        <Leaderboard entries={leaderboard} onClose={() => setState(prev => ({ ...prev, status: 'menu' }))} />
      </div>
    );
  }

  // Summary Screen
  if (state.status === 'summary') {
    const timeTaken = Math.floor((state.endTime - state.startTime) / 1000);
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">挑战结束！</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-indigo-50 p-4 rounded-xl">
              <div className="text-sm text-gray-500 uppercase font-bold">最终得分</div>
              <div className="text-4xl font-bold text-indigo-600">{state.score}<span className="text-lg text-gray-400">/100</span></div>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl">
              <div className="text-sm text-gray-500 uppercase font-bold">总用时</div>
              <div className="text-4xl font-bold text-orange-600">{timeTaken}s</div>
            </div>
          </div>

          <button 
            onClick={startGame}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-105 mb-3"
          >
            再玩一次
          </button>
          <button 
            onClick={() => setState(prev => ({ ...prev, status: 'menu' }))}
            className="w-full py-3 text-gray-500 hover:text-gray-800 font-medium"
          >
            返回主菜单
          </button>
        </div>
      </div>
    );
  }

  // Playing / Processing / Result
  return (
    <div className="min-h-screen bg-slate-100 py-6 px-4 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center space-x-2">
          <span className="text-sm font-bold text-gray-400">题目</span>
          <span className="text-xl font-bold text-indigo-600">{state.questionIndex + 1}/{state.totalQuestions}</span>
        </div>
        
        <Timer startTime={state.startTime} isRunning={state.status !== 'result' && state.status !== 'summary'} />
      </div>

      <div className="w-full max-w-md space-y-6">
        
        {/* Flag */}
        <div className="relative z-10">
          <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-md z-20">
             得分: {state.score}
          </div>
          <FlagDisplay 
              country={state.currentCountry!} 
              isCorrect={state.status === 'result' && state.selectedOptionCode === state.currentCountry?.code}
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-4 mt-4">
          {state.options.map((option) => (
            <OptionButton
              key={option.code}
              country={option}
              isRevealed={state.status === 'result'}
              isCorrect={option.code === state.currentCountry?.code}
              isSelected={state.selectedOptionCode === option.code}
              isDisabled={state.status === 'processing' || state.status === 'result'}
              onClick={() => handleOptionClick(option)}
            />
          ))}
        </div>

        {/* Feedback / Next Button */}
        <FeedbackArea 
          status={state.status as 'playing' | 'processing' | 'result'}
          isCorrect={state.selectedOptionCode === state.currentCountry?.code}
          isLastQuestion={state.questionIndex === state.totalQuestions - 1}
          onNext={handleNext} 
        />
      </div>
    </div>
  );
};

export default App;
