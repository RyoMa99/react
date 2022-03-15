import React, { useState } from 'react';
import { SquareType, HistoryData, JumpTo } from '../interface';
import Board from './Board';
import Moves from './Moves'; 

type GameState = {
  readonly history: HistoryData[];
  readonly stepNumber: number;
  readonly xIsNext: boolean;
}

const Game: React.VFC = () => {
  const [state, setState] = useState<GameState>({
    history: [{
      squares: Array<SquareType>(9).fill(null)
    }],
    stepNumber: 0,
    xIsNext: true,
  });

  const handleClick = (i: number) => {
    const _history = state.history.slice(0, state.stepNumber + 1);
    const current = _history[_history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = state.xIsNext ? 'X' : 'O';
    setState({
      history: [..._history, {squares: squares}],
      stepNumber: _history.length,
      xIsNext: !state.xIsNext
    });
  }

  const jumpTo: JumpTo = (step: number) => {
    setState(prev => ({
      ...prev,
      xIsNext: (step % 2) === 0
    }));
  }

  const current = state.history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if(winner) {
    status = `Winner: ${winner}`;
  }else{
    status = `Next Player: ${state.xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <Moves
          history={state.history}
          jumpTo={jumpTo}
        ></Moves>
      </div>
    </div>
  );
}

function calculateWinner(squares: SquareType[]){
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
  for(let i = 0; i < lines.length; i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
  }
  return null;
}

export default Game;