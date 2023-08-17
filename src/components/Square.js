const Square = ({ value, onSquareClick, victory }) => (
  <button className={'square' + (victory ? ' winner' : '')} onClick={onSquareClick}>
    {value}
  </button>
);

export default Square;
