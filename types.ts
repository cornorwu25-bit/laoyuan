export interface Country {
  code: string;
  name: string;
}

export type GameStatus = 'menu' | 'playing' | 'processing' | 'result' | 'summary' | 'leaderboard';

export interface LeaderboardEntry {
  date: string;
  score: number;
  timeTaken: number; // in seconds
}

export interface GameState {
  currentCountry: Country | null;
  options: Country[];
  score: number;
  questionIndex: number; // 0-9
  totalQuestions: number;
  startTime: number;
  endTime: number;
  status: GameStatus;
  selectedOptionCode: string | null;
  history: string[]; // Codes of countries already shown in this set
}
