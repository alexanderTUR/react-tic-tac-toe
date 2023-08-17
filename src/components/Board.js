import Square from './Square';

const Board = ({ xIsNext, squares, onPlay }) => {
  // Handler for clicking on a square
  const handleClick = (i) => {
    // Prevent further actions if the square is already filled or there's a winner
    if (squares[i] || calculateWinner(squares).winner) {
      return;
    }
    // Create a copy of the current squares array
    const nextSquares = squares.slice();
    // Fill the square with 'X' or 'O' based on the player's turn
    nextSquares[i] = xIsNext ? 'X' : 'O';
    // Call the onPlay function to update game state
    onPlay(nextSquares, i);
  };

  // Calculate the winner and the winning line
  const { winner, line } = calculateWinner(squares);

  // Determine the game status based on winner or draw
  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (!squares.includes(null)) {
      return `It's a draw`;
    } else {
      return 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
  };

  return (
    <>
      <div className="status">{getStatus()}</div>
      {Array(3)
        .fill(null)
        .map((_, row) => (
          <div className="board-row" key={row}>
            {Array(3)
              .fill(null)
              .map((_, col) => {
                // Calculate the linear index for the current square
                const index = row * 3 + col;
                return (
                  <Square
                    key={index}
                    // Check if the current square is part of the winning line
                    victory={line && line.includes(index)}
                    // Pass the value and click handler to the Square component
                    value={squares[index]}
                    onSquareClick={() => handleClick(index)}
                  />
                );
              })}
          </div>
        ))}
    </>
  );
};

// Calculate the winner of the game and the winning line
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check each possible winning line
  for (const line of lines) {
    const [a, b, c] = line;
    // If the squares in the line are the same, return the winner and the line
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line,
      };
    }
  }

  // Return no winner and no winning line
  return {
    winner: null,
    line: null,
  };
};

export default Board;
