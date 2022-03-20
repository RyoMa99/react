import { Dispatch, memo } from "react";

type Props = {
  state: State;
  dispatch: Dispatch<Action>;
}

export const Form = memo((props: Props) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.dispatch({ type: "change", text: e.target.value });
  };

  const handleOnSubmit = () => {
    props.dispatch({ type: "submit" });
  };

  return(
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit();
    }}>
      <input
        type="text"
        value={props.state.text}
        disabled={props.state.filter === "checked"}
        onChange={handleOnChange}
      />
      <input
        type="submit"
        value="追加"
        disabled={props.state.filter === "checked"}
        onSubmit={handleOnSubmit}
      />
    </form>            
  );
});

Form.displayName = "Form";