import { createContext, Dispatch } from "react";

export const context = createContext(
  {} as {state: State, dispatch: Dispatch<Action>}
);