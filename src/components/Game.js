import Board from './Board';
import { useState } from 'react';

// Game component
const Game = () => {
  // State management for the game
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [sortAscending, setSortAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Handler for playing a move
  const handlePlay = (nextSquares) => {
    const newHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  };

  // Handler for jumping to a specific move
  const jumpTo = (step) => {
    setCurrentMove(step);
  };

  // Handler for toggling sort order
  const toggleSortOrder = () => {
    setSortAscending(!sortAscending);
  };

  // Generate the list of moves
  const moves = history.map((step, move) => {
    let description;
    if (move > 0) {
      description = `Go to move #${move}`;
    } else if (move === currentMove) {
      description = `You are at move #${move}`;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        {move === currentMove ? (
          <span>{move === 0 ? 'You are at start' : `You are at move #${move}`}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  // Reverse moves if sort order is descending
  if (!sortAscending) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div>
          <button onClick={toggleSortOrder}>
            Toggle Sort Order: {sortAscending ? 'Ascending' : 'Descending'}
          </button>
        </div>
        <ul>{moves}</ul>
      </div>
    </div>
  );
};

export default Game;
