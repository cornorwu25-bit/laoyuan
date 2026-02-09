import React from 'react';

interface FeedbackAreaProps {
  status: 'playing' | 'processing' | 'result';
  isCorrect: boolean;
  isLastQuestion: boolean;
  onNext: () => void;
}

export const FeedbackArea: React.FC<FeedbackAreaProps> = ({ status, isCorrect, isLastQuestion, onNext }) => {
  if (status === 'playing' || status === 'processing') {
    return <div className="h-20" />; // Spacer
  }

  return (
    <div className="h-20 flex flex-col items-center justify-center fade-in">
      <div className="flex flex-col items-center w-full">
        <p className={`text-xl font-bold mb-2 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
          {isCorrect ? '🎉 回答正确！ (+10分)' : '❌ 回答错误！ (+0分)'}
        </p>
        <button 
          onClick={onNext}
          className="px-8 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors shadow-lg animate-pulse"
        >
          {isLastQuestion ? '查看结果' : '下一题'} ➡
        </button>
      </div>
    </div>
  );
};
