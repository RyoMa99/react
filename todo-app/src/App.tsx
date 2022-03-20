import { useReducer } from "react";

import { reducer } from "./reducer";
import { initialState } from "./initialState";

import { Form } from "./components/Form";
import { EmptyButton } from "./components/EmptyButton";
import { FilteredTodos } from "./components/FilteredTodo";
import { Selector } from "./components/Selector";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <Selector dispatch={dispatch} />
      {
        state.filter === "removed" ? (
          <EmptyButton state={state} dispatch={dispatch} />
        ) : (
          <Form state={state} dispatch={dispatch} />
        )
      }
      <FilteredTodos state={state} dispatch={dispatch} />
    </div>
  )
}

export default App;
