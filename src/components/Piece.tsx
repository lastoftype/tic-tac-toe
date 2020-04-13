import * as React from "react";
import classNames from "classnames";

import { BoardContext } from "../context";

import "./Piece.scss";

interface Props {
  playerIndex: number;
  pieceIndex: number;
}

const Piece: React.FC<Props> = (props: Props) => {
  const { board, takeTurn, winner, isTieGame, isComplete } = React.useContext(
    BoardContext
  );

  const getPieceValue = (): React.ReactNode => {
    if (board.choicesByPlayer[0].includes(props.pieceIndex)) {
      return (
        <span role="img" aria-label="X">
          ❌
        </span>
      );
    } else if (board.choicesByPlayer[1].includes(props.pieceIndex)) {
      return (
        <span role="img" aria-label="O">
          ⭕️
        </span>
      );
    } else {
      return <span>{""}</span>;
    }
  };

  const isWinningPiece =
    winner && winner.combo && winner.combo.includes(props.pieceIndex);

  const handleClick = () => {
    const hasBeenChosenAlready = [
      ...board.choicesByPlayer[0],
      ...board.choicesByPlayer[1],
    ].includes(props.pieceIndex);
    if (isComplete || isTieGame || hasBeenChosenAlready) {
      return;
    }

    takeTurn(props.pieceIndex, props.playerIndex);
  };

  return (
    <div
      className={classNames("Piece", {
        "Piece--Winning": isWinningPiece,
      })}
      onClick={handleClick}
    >
      {getPieceValue()}
    </div>
  );
};

export default Piece;
