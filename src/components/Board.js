import Square from './Square';

// Board component
const Board = ({ xIsNext, squares, onPlay }) => {
  // Handler for clicking on a square
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares).winner) {
      return;
    }
    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  };

  // Calculate game status
  const { winner, line } = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (!squares.includes(null)) {
    status = `It's a draw`;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      {Array(3)
        .fill(null)
        .map((_, row) => (
          <div className="board-row" key={row}>
            {Array(3)
              .fill(null)
              .map((_, col) => {
                const index = row * 3 + col;
                return (
                  <Square
                    key={index}
                    victory={line && line.includes(index)}
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

// Calculate the winner of the game
const calculateWinner = (squares) => {
  const lines = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line,
      };
    }
  }
  return {
    winner: null,
    line: null,
  };
};

export default Board;
