import { useReducer } from "react";

import { initialState } from "./initialState";
import { reducer } from "./reducer";
import { context } from "./context";

import { Form } from "./components/Form";
import { EmptyButton } from "./components/EmptyButton";
import { FilteredTodos } from "./components/FilteredTodo";
import { Selector } from "./components/Selector";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <context.Provider value={{ state, dispatch }}>
      <div className="App">
        <Selector />
        {
          state.filter === "removed" ? (
            <EmptyButton />
          ) : (
            <Form />
          )
        }
        <FilteredTodos />
      </div>
    </context.Provider>
  )
}

export default App;
