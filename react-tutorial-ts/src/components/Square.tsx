import React from 'react';
import { SquareType } from '../interface';

type SquareProps = {
  value: SquareType;
  onClick: () => void;
}

const Square: React.VFC<SquareProps> = ({value, onClick}) => {
  return (
    <button
      className='square'
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;