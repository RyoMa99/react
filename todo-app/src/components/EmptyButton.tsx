import { Dispatch, memo } from "react";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
}

export const EmptyButton = memo((props: Props) => {
  const handleOnEmpty = () => {
    props.dispatch({ type: "empty" });
  };

  return(
    <button
      onClick={handleOnEmpty}
      disabled={props.state.todos.filter(todo => (todo.removed)).length === 0}
    >
      ごみ箱を空にする
    </button>
  );
});

EmptyButton.displayName = "EmptyButton";