import { useReducer } from "react";

import { reducer } from "./reducer";
import { initialState } from "./initialState";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const filteredTodos = state.todos.filter(todo => {
    switch(state.filter){
      case "all":
        return !todo.removed;
      case "checked":
        return todo.checked && !todo.removed;
      case "unchecked":
        return !todo.checked && !todo.removed;
      case "removed":
        return todo.removed;
      default:
        return todo;
    }
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "change", text: e.target.value });
  };

  const handleOnSubmit = () => {
    dispatch({ type: "submit" });
  };

  const handleOnEdit = (id: number, value: string) => {
    dispatch({ type: "edit", id, value });
  };

  const handleOnCheck = (id: number, checked: boolean) => {
    dispatch({ type: "check", id, checked });
  };

  const handleOnRemove = (id: number, removed: boolean) => {
    dispatch({ type: "remove", id, removed });
  };

  const handleOnEmpty = () => {
    dispatch({ type: "empty" });
  };

  const handleOnFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: "filter", filter: e.target.value as Filter });
  };

  return (
    <div className="App">
      <select
        defaultValue="all"
        onChange={handleOnFilter}
      >
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>
      {
        state.filter === "removed" ? (
          <button
            onClick={handleOnEmpty}
            disabled={state.todos.filter(todo => (todo.removed)).length === 0}
          >
            ごみ箱を空にする
          </button>
        ) : (
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
        )
      }
      <ul>
        {
          filteredTodos.map(todo => {
            return (
            <li key={todo.id}>
              <input
                type="checkbox"
                disabled={todo.removed}
                checked={todo.checked}
                onChange={() => handleOnCheck(todo.id, todo.checked)}
              />
              <input
                type="text"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleOnEdit(todo.id, e.target.value)} 
              />
              <button onClick={() =>handleOnRemove(todo.id, todo.removed)}>
                {todo.removed ? "復元" : "削除"}
              </button>
            </li>);
          })
        }
      </ul>
    </div>
  )
}

export default App;
