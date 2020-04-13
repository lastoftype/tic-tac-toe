import * as React from "react";

import * as Hooks from "../hooks";
import * as Models from "../models";

export interface BoardState {
  activePlayer: number;
  togglePlayer: () => void;
  takeTurn: (pieceIndex: number, playerIndex: number) => void;
  board: Models.Board;
  restartGame: () => void;
  winner: Models.Winner;
  isComplete: boolean;
  isTieGame: boolean;
  winners: Models.Winners;
  fetchWinners: () => void;
}

/**
 * Init the context
 */
export const BOARD_DEFAULT_STATE: BoardState = {} as BoardState;
export const BoardContext = React.createContext<BoardState>(
  BOARD_DEFAULT_STATE
);

/**
 * Provide default Provider state component to wrap around app
 */
export const BoardProvider = (props: {
  children: React.ReactNode;
}): JSX.Element => {
  const boardState = Hooks.useBoard();
  return (
    <BoardContext.Provider value={boardState}>
      {props.children}
    </BoardContext.Provider>
  );
};
