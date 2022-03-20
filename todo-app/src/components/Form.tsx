import { useContext, memo } from "react";
import { context } from "../context";

export const Form = memo(() => {
  const {state, dispatch} = useContext(context);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "change", text: e.target.value });
  };

  const handleOnSubmit = () => {
    dispatch({ type: "submit" });
  };

  return(
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit();
    }}>
      <input
        type="text"
        value={state.text}
        disabled={state.filter === "checked"}
        onChange={handleOnChange}
      />
      <input
        type="submit"
        value="追加"
        disabled={state.filter === "checked"}
        onSubmit={handleOnSubmit}
      />
    </form>            
  );
});

Form.displayName = "Form";