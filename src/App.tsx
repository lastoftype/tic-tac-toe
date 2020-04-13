import React from "react";
import Board from "./components/Board";
import Tally from "./components/Tally";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Tally />
      <h1>Tic Tac Toe</h1>
      <Board />
    </div>
  );
}

export default App;
