import * as React from "react";

import { BoardContext } from "../context";

import "./Tally.scss";

const Tally: React.FC = () => {
  const { board, winners, fetchWinners } = React.useContext(BoardContext);

  React.useEffect(() => {
    fetchWinners();
  }, []);

  const getPlayerTallies = () => {
    const players = Object.keys(board.choicesByPlayer);
    const nodes = [];

    for (const player of players) {
      nodes.push(
        <div className="PlayerTally">
          <header>
            <h2>
              Player{" "}
              {player === "0" ? (
                <span role="img" aria-label="x">
                  ❌
                </span>
              ) : (
                <span role="img" aria-label="x">
                  ⭕️
                </span>
              )}
            </h2>
          </header>
          <div className="PlayerTally__Count">
            {winners[player as any]} wins
          </div>
        </div>
      );
    }

    return nodes;
  };

  return (
    <div className="Tally">
      <div className="Tally__Inner">{getPlayerTallies()}</div>
    </div>
  );
};

export default Tally;
