export type SquareType = 'O' | 'X' | null;
export type HistoryData = {
  squares: SquareType[]
}
export type JumpTo = (step: number) => void;