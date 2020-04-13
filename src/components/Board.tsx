import * as React from "react";
import classNames from "classnames";

import { BoardContext } from "../context";
import Piece from "./Piece";
import Modal from "./Modal";
import Tally from "./Tally";

import "./Board.scss";

const Board: React.FC = () => {
  const { activePlayer, isComplete, isTieGame } = React.useContext(
    BoardContext
  );

  const getBoard = () => {
    const pieces = [];
    for (let i = 0; i < 9; i += 1) {
      pieces.push(<Piece key={i} playerIndex={activePlayer} pieceIndex={i} />);
    }

    return (
      <div
        className={classNames("Board", {
          "Board--TurnX": activePlayer === 0,
          "Board--TurnO": activePlayer === 1,
          "Board--isComplete": isComplete,
          "Board--isTieGame": isTieGame,
        })}
      >
        {pieces}
      </div>
    );
  };

  return (
    <div className="BoardWrapper">
      <Modal />
      {getBoard()}
    </div>
  );
};

export default Board;
