import Board from './Board';
import { useState } from 'react';

const Game = () => {
  // State management for the game
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [sortAscending, setSortAscending] = useState(true);
  const [movesLocation, setMovesLocation] = useState([]);

  // Determine if it's X's turn based on the current move
  const xIsNext = currentMove % 2 === 0;
  // Get the current state of the game board
  const currentSquares = history[currentMove];

  // Handler for playing a move
  const handlePlay = (nextSquares, squareIndex) => {
    // Update history with new move
    const newHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // Update move location history
    const newMovesLocation = [...movesLocation.slice(0, currentMove), squareIndex];

    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
    setMovesLocation(newMovesLocation);
  };

  // Handler for jumping to a specific move
  const jumpTo = (step) => {
    setCurrentMove(step);
  };

  // Handler for toggling sort order
  const toggleSortOrder = () => {
    setSortAscending(!sortAscending);
  };

  // Calculate row and column indices from a linear index
  const getRowColFromIndex = (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return [row, col];
  };

  // Generate the description for each move
  const generateMoveDescription = (move, row, col) => {
    return move === 0 ? 'Go to game start' : `Go to move #${move} (${row + 1}, ${col + 1})`;
  };

  // Generate the list of moves with their descriptions
  const moves = history.map((step, move) => {
    const [row, col] = getRowColFromIndex(movesLocation[move - 1]);
    const description = generateMoveDescription(move, row, col);

    const isCurrentMove = move === currentMove;
    const moveContent = isCurrentMove
      ? move === 0
        ? 'You are at start'
        : `You are at move #${move} (${row + 1}, ${col + 1})`
      : description;

    return (
      <li key={move}>
        {isCurrentMove ? (
          <span>{moveContent}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  // Reverse the order of moves if sortAscending is false
  if (!sortAscending) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={(nextSquares, squareIndex) => handlePlay(nextSquares, squareIndex)}
        />
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
