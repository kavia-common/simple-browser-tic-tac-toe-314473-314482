import React, { useMemo, useState } from "react";
import "./App.css";

function calculateWinner(squares) {
  // All possible 3-in-a-row combinations on a 3x3 grid
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diags
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    const v = squares[a];
    if (v && v === squares[b] && v === squares[c]) {
      return { winner: v, line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}

function isBoardFull(squares) {
  return squares.every((s) => s !== null);
}

// PUBLIC_INTERFACE
function App() {
  /** Main Tic Tac Toe UI and game logic (two-player local play, win/draw detection, restart). */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const { winner, line } = useMemo(() => calculateWinner(squares), [squares]);
  const isDraw = !winner && isBoardFull(squares);
  const gameOver = Boolean(winner) || isDraw;

  const statusText = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return "It's a draw!";
    return `Next turn: ${xIsNext ? "X" : "O"}`;
  }, [winner, isDraw, xIsNext]);

  // PUBLIC_INTERFACE
  function handleSquareClick(index) {
    /** Handles a user's click on a board cell and applies move if valid. */
    if (gameOver) return;
    if (squares[index] !== null) return;

    const next = squares.slice();
    next[index] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext((v) => !v);
  }

  // PUBLIC_INTERFACE
  function restartGame() {
    /** Resets the board and starts a new game with X. */
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="App">
      <main className="ttt-page">
        <section className="ttt-card" aria-label="Tic Tac Toe">
          <header className="ttt-header">
            <div className="ttt-title-wrap">
              <h1 className="ttt-title">Tic Tac Toe</h1>
              <p className="ttt-subtitle">Two-player, local play</p>
            </div>

            <div className="ttt-badges" aria-label="Player legend">
              <span className="ttt-badge ttt-badge-x" aria-label="Player X">
                X
              </span>
              <span className="ttt-badge ttt-badge-o" aria-label="Player O">
                O
              </span>
            </div>
          </header>

          <div
            className="ttt-status"
            role="status"
            aria-live="polite"
            data-state={winner ? "win" : isDraw ? "draw" : "playing"}
          >
            <span className="ttt-status-label">{statusText}</span>
            {winner ? (
              <span className="ttt-status-detail">Three in a row!</span>
            ) : isDraw ? (
              <span className="ttt-status-detail">No more moves left.</span>
            ) : (
              <span className="ttt-status-detail">Place your mark.</span>
            )}
          </div>

          <div className="ttt-board-wrap">
            <div className="ttt-board" role="grid" aria-label="3 by 3 game board">
              {squares.map((value, idx) => {
                const isWinningCell = line.includes(idx);
                const isX = value === "X";
                const isO = value === "O";

                return (
                  <button
                    key={idx}
                    type="button"
                    className={[
                      "ttt-cell",
                      isX ? "is-x" : "",
                      isO ? "is-o" : "",
                      isWinningCell ? "is-win" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => handleSquareClick(idx)}
                    disabled={gameOver || value !== null}
                    role="gridcell"
                    aria-label={
                      value
                        ? `Cell ${idx + 1}, ${value}`
                        : `Cell ${idx + 1}, empty`
                    }
                  >
                    <span className="ttt-cell-value" aria-hidden="true">
                      {value}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <footer className="ttt-footer">
            <button
              type="button"
              className="ttt-restart"
              onClick={restartGame}
              aria-label="Restart game"
            >
              Restart
            </button>

            <p className="ttt-hint">
              Tip:{" "}
              <span className="ttt-hint-strong">
                X starts
              </span>
              . Click an empty square to play.
            </p>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;
