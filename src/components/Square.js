// Square component
const Square = ({ value, onSquareClick, victory }) => {
  return (
    <button className={`square ${victory ? 'winner' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
