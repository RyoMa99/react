import React from 'react';
import { SquareType } from '../interface';

interface SquareProps {
  value: SquareType;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({value, onClick}) => {
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