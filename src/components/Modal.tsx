import * as React from "react";
import classNames from "classnames";

import { BoardContext } from "../context";

import "./Modal.scss";

const Modal: React.FC = () => {
  const { restartGame, isComplete, activePlayer, isTieGame } = React.useContext(
    BoardContext
  );

  if (!isComplete) {
    return <>{""}</>;
  }

  const getPlayerMessage = () => {
    let playerName =
      activePlayer === 0 ? (
        <span>
          <span role="img" aria-label="x">
            ❌
          </span>{" "}
          has won
        </span>
      ) : (
        <span>
          <span role="img" aria-label="o">
            ⭕️
          </span>{" "}
          has won
        </span>
      );

    return (
      <div className="Message">
        <div className="Message__Text">
          {isTieGame ? <span>It's a tie</span> : playerName}
        </div>
        <div>
          <button className="Button" onClick={() => restartGame()}>
            Start a new game
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="ModalWrapper">
      <div className={classNames("Modal")}>
        <div className="Modal__Message">{getPlayerMessage()}</div>
      </div>
    </div>
  );
};

export default Modal;
