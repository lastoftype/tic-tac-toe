import * as React from "react";

import * as Constants from "../constants";
import * as Utils from "../utils";
import * as Models from "../models";
import ApiService from "../api";

interface BoardState {
  choicesByPlayer: {
    [key: number]: number[];
  };
}

const INITIAL_STATE: BoardState = {
  choicesByPlayer: {
    0: [],
    1: [],
  },
};

const INITIAL_WINNER_STATE: Models.Winner = {
  combo: [],
  playerIndex: null,
};

export const useBoard = () => {
  const [activePlayer, _setActivePlayer] = React.useState(0);
  const [board, _setBoard] = React.useState(INITIAL_STATE);
  const [winner, _setWinner] = React.useState<Models.Winner>(
    INITIAL_WINNER_STATE as Models.Winner
  );
  const [isTieGame, _setTieGame] = React.useState(false);
  const [winners, _setWinners] = React.useState({} as Models.Winners);

  const takeTurn = (pieceIndex: number, playerIndex: number) => {
    _setBoard((prevBoard: BoardState) => {
      if (!!winner && winner.combo && winner.combo.length === 3) {
        return prevBoard;
      }

      const newBoard = {
        ...prevBoard,
        choicesByPlayer: {
          ...prevBoard.choicesByPlayer,
          [playerIndex]: [
            ...prevBoard.choicesByPlayer[playerIndex],
            pieceIndex,
          ],
        },
      };

      const winCombo = hasWinningCombo(playerIndex, newBoard);
      if (winCombo && winCombo.length === 3) {
        _setWinner({
          combo: winCombo,
          playerIndex,
        });
        const response = ApiService.set(playerIndex);
        _setWinners(response);
      } else if (
        [...newBoard.choicesByPlayer[0], ...newBoard.choicesByPlayer[1]]
          .length === 9
      ) {
        _setTieGame(true);
      } else {
        _setActivePlayer(activePlayer === 0 ? 1 : 0);
      }

      return newBoard;
    });
  };

  const hasWinningCombo = (
    playerIndex: number,
    board: BoardState
  ): number[] | null => {
    const choices = board.choicesByPlayer[playerIndex];
    let winningCombo = null;
    let hasCombo;
    for (const combo of Constants.WINNING_COMBOS) {
      hasCombo = combo.filter((x) => choices.includes(x)).length === 3;
      if (hasCombo) {
        winningCombo = combo;
        break;
      }
    }

    return winningCombo;
  };

  const togglePlayer = () => {
    _setActivePlayer((prevPlayer: number) => (prevPlayer === 0 ? 1 : 0));
  };

  const restartGame = () => {
    _setBoard({
      ...INITIAL_STATE,
    });
    _setActivePlayer(Utils.getRandomIndex());
    fetchWinners();
    _setWinner(INITIAL_WINNER_STATE as Models.Winner);
    _setTieGame(false);
  };

  const fetchWinners = () => {
    const response = ApiService.get();
    _setWinners(response);
  };

  const isComplete =
    (!!winner && winner.combo && winner.combo.length === 3) || isTieGame;

  return {
    activePlayer,
    togglePlayer,
    takeTurn,
    board,
    restartGame,
    winner,
    isComplete,
    isTieGame,
    winners,
    fetchWinners,
  };
};
