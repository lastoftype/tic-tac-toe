export type Board = {
  choicesByPlayer: {
    [key: number]: number[];
  };
};

export type Winners = {
  [key: number]: number;
};

export type Winner = {
  combo: number[];
  playerIndex: number | null;
};
