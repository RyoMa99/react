import React, { useState } from 'react'

type Todo = {
  value: string
  readonly id: number;
  checked: boolean;
  removed: boolean;
}

type Filter = "all" | "checked" | "unchecked" | "removed";

type TodoState = {
  text: string;
  todos: Todo[];
  filter: Filter;
}


function App() {
  const [state, setState] = useState<TodoState>({
    text: "",
    todos: [],
    filter: "all"
  });

  const handleOnSubmit = () => {
    if (!state.text) return;

    const newTodo: Todo = {
      value: state.text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    setState(prev => {
      return({
        ...prev,
        text: "",
        todos: [newTodo, ...state.todos],
      })
    })
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => {
      return({
        ...prev,
        text: e.target.value,
      });
    })
  }

  const handleOnEdit = (id: number, value: string) => {
    const deepCopy = state.todos.map(todo => ({...todo}));
    
    const newTodos = deepCopy.map(todo => {
      if (todo.id === id) todo.value = value;
      return todo;
    });

    setState(prev => {
      return({
        ...prev,
        todos: newTodos,   
      });
    })
  }

  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy = state.todos.map(todo => ({...todo}));
    const newTodos = deepCopy.map(todo => {
      if (todo.id === id) todo.checked = !checked;
      return todo;
    });

    setState(prev => {
      return({
        ...prev,
        todos: newTodos,   
      });
    })
  }

  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy = state.todos.map(todo => ({...todo}));
    const newTodos = deepCopy.map(todo => {
      if (todo.id === id) todo.removed = !removed;
      return todo;
    });

    setState(prev => {
      return({
        ...prev,
        todos: newTodos,   
      });
    })
  }

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

  const handleOnEmpty = () => {
    const newTodos = state.todos.filter(todo => !todo.removed);
    setState(prev => {
      return({
        ...prev,
        todos: newTodos,   
      });
    })
  }

  return (
    <div className="App">
      <select
        defaultValue="all"
        onChange={(e) => setState(prev => {
          return({
            ...prev,
            filter: e.target.value as Filter
          })
        })}
      >
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>
      {
        state.filter === "removed" ? (
          <button onClick={handleOnEmpty}>ごみ箱を空にする</button>
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
                onChange={e => handleOnEdit(todo.id, e.target.value)} 
              />
              <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
                {todo.removed ? "復元" : "削除"}
              </button>
            </li>);
          })
        }
      </ul>
    </div>
  )
}

export default App
