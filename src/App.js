import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import TodoList from "./components/todoList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const local_Storage_Key = "todoAPP.todos";
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem(local_Storage_Key)) || []
  );
  const todoNameRef = useRef();

  useEffect(() => {
    localStorage.setItem(local_Storage_Key, JSON.stringify(todos));
  }, [todos]);

  function handleDeleteTodo(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  function toggleTodo(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  }

  function handleAddRef() {
    const name = todoNameRef.current.value;
    if (name === "") return;

    setTodos((prevTodos) => [
      ...prevTodos,
      { id: uuidv4(), name: name, complete: false },
    ]);

    todoNameRef.current.value = "";
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  function handleEditTodo(id, newName) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, name: newName } : todo
      )
    );
  }

  return (
    <div className="bg-gray-200 w-full h-screen flex items-center justify-center">
      <div className="card-container sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 shadow-lg rounded-md">
        <div className="card-content p-5">
          <div className="mb-4 space-x-2">
            <input
              ref={todoNameRef}
              type="text"
              placeholder="Enter task details..."
              className="p-2 border border-gray-300 rounded text-black mb-4 w-full"
            />

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddRef}
            >
              Add todo
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleClearTodos}
            >
              Clear Complete
            </button>
          </div>

          <TodoList
            todos={todos}
            toggleTodo={toggleTodo}
            handleEditTodo={handleEditTodo}
            handleDeleteTodo={handleDeleteTodo}
          />

          <div className="text-lg font-normal text-blue-400 border border-t-amber-500 mt-4 p-2">
            {todos.filter((todo) => !todo.complete).length} left to do
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
