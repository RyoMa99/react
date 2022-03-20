import { useContext, memo } from "react";
import { context } from "../context";

export const Selector = memo(() => {
  const {state, dispatch} = useContext(context);

  const handleOnFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "filter", filter: e.target.value as Filter });
  };

  return (
    <select
      defaultValue="all"
      onChange={handleOnFilter}
    >
      <option value="all">すべてのタスク</option>
      <option value="checked">完了したタスク</option>
      <option value="unchecked">現在のタスク</option>
      <option value="removed">ごみ箱</option>
    </select>
  );
});

Selector.displayName = "Selector";