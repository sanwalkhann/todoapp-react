import React, { useState } from "react";

export default function Todo({ todo, toggleTodo, handleEditTodo, handleDeleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.name);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleEdit = () => {
    handleEditTodo(todo.id, editText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this todo?');
    if (confirmDelete) {
      handleDeleteTodo(todo.id);
    }
  };

  return (
    <div className="flex items-center justify-between p-2 border border-gray-300 mb-2 rounded">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={handleEdit}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <span
            className={`cursor-pointer ${todo.complete ? "line-through" : ""}`}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.name}
          </span>
          <div className="flex">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
              onClick={handleToggleEdit}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
