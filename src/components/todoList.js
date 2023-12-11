import React from "react";
import Todo from "./todos";

export default function TodoList({ todos, toggleTodo, handleEditTodo, handleDeleteTodo }) {
  return (
    <div>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          handleEditTodo={handleEditTodo}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </div>
  );
}
