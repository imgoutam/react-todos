import React, { useState, useEffect } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [currentTodo, setCurrentTodo] = useState(null);

  const markDone = ({ id, name, done }) => {
    const tempTodos = [...todos];
    const currentTodo = tempTodos.findIndex((todo) => todo.id === Number(id));
    tempTodos[currentTodo].done = !done;
    setTodos(tempTodos);
  };

  const save = (e) => {
    e.preventDefault();
    let tempTodos = [...todos];

    if (currentTodo) {
      tempTodos[currentTodo].name = todo;
    } else {
      tempTodos = [...todos, { id: todos.length + 1, name: todo, done: false }];
    }

    setTodos(tempTodos);
    setCurrentTodo(null);
    setTodo("");
  };

  const remove = (index) => {
    const tempTodos = [...todos];
    tempTodos.splice(index, 1);
    setTodos(tempTodos);
  };

  const edit = (index) => {
    const tempTodos = [...todos];
    setTodo(tempTodos[index].name);
    setCurrentTodo(index);
  };

  const canSave = Boolean(todo);

  useEffect(() => {
    setTodos([
      { id: 1, name: "test1", done: false },
      { id: 2, name: "test2", done: true }
    ]);
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <input
        type="text"
        name="todo"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button type="button" onClick={(e) => save(e)} disabled={!canSave}>
        Save
      </button>

      {todos &&
        todos.map((todo, index) => (
          <div
            style={{
              display: "flex",
              gap: "10px"
            }}
            key={todo.id}
          >
            <span>{todo.id}</span>
            <span
              style={{
                color: todo.done ? "green" : "red"
              }}
            >
              {todo.name}
            </span>
            <span onClick={() => markDone(todo)}>Toggle</span>
            <span onClick={() => edit(index)}>Edit</span>
            <span onClick={() => remove(index)}>Remove</span>
          </div>
        ))}
    </div>
  );
}
