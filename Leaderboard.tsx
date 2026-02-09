import React from 'react';
import { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  onClose: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries, onClose }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-800">🏆 排行榜</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
      
      {entries.length === 0 ? (
        <div className="text-center text-gray-400 py-8">暂无记录，快来挑战吧！</div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-100">
          <table className="w-full">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-600 uppercase">排名</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-600 uppercase">得分</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-600 uppercase">用时</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-indigo-600 uppercase">日期</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {entries.map((entry, index) => (
                <tr key={index} className={index < 3 ? 'bg-yellow-50/30' : ''}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-indigo-600">{entry.score}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{entry.timeTaken}s</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{new Date(entry.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <button 
        onClick={onClose}
        className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors"
      >
        返回游戏
      </button>
    </div>
  );
};
