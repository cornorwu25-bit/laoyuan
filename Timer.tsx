import React, { useState, useEffect } from 'react';

interface TimerProps {
  startTime: number;
  isRunning: boolean;
  onTimeUpdate?: (seconds: number) => void;
}

export const Timer: React.FC<TimerProps> = ({ startTime, isRunning, onTimeUpdate }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = window.setInterval(() => {
        const now = Date.now();
        const seconds = Math.floor((now - startTime) / 1000);
        setElapsed(seconds);
        if (onTimeUpdate) onTimeUpdate(seconds);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime, onTimeUpdate]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="font-mono text-xl font-bold text-gray-700 bg-gray-200 px-3 py-1 rounded-lg">
      ⏱️ {formatTime(elapsed)}
    </div>
  );
};
