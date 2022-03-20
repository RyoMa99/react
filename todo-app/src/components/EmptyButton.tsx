import { useContext, memo } from "react";
import { context } from "../context";

export const EmptyButton = memo(() => {
  const {state, dispatch} = useContext(context);

  const handleOnEmpty = () => {
    dispatch({ type: "empty" });
  };

  return(
    <button
      onClick={handleOnEmpty}
      disabled={state.todos.filter(todo => (todo.removed)).length === 0}
    >
      ごみ箱を空にする
    </button>
  );
});

EmptyButton.displayName = "EmptyButton";