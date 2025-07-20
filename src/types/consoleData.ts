export type ConsoleData = {
  display: {
    raceTrack: string;
    tail: string[];
  };
  gamePlay: {
    id: string;
    target: string;
    solutions: string[];
    level: number;
    rating: number;
    speechLang: string;
    tries?: 0 | 1 | 2 | 3;
  };
  stats: {
    due: number;
    steps: number;
    time: number;
    streak: number;
    newWords: number;
  };
  dictionary: string;
  isNewWord?: boolean;
};
