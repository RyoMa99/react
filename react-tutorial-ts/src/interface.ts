export type SquareType = 'O' | 'X' | null;
export interface HistoryData {
  squares: SquareType[]
}
export type JumpTo = (step: number) => void;