import React from "react";
import { HistoryData, JumpTo } from "../interface";

interface MovesProps {
  history: HistoryData[];
  jumpTo: JumpTo;
}

const Moves: React.FC<MovesProps> = ({history, jumpTo}) => {
  return (
    <ol>
      {history.map((step, move) => {
        const desc = move ? `Go to move #${move}` : `Go to game start`;
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        );
      })}
    </ol>
  );
}

export default Moves;