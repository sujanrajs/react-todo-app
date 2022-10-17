import React, { useEffect, useState } from "react";

import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const getTodosFromLS = () => {
  const data = localStorage.getItem("Todos");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const Form = () => {
  const [todoValue, setTodoValue] = useState("");
  const [todos, setTodos] = useState(getTodosFromLS());

  const handleSubmit = (e) => {
    e.preventDefault();

    const time = new Date().getTime();

    let todoObject = {
      ID: time,
      TodoValue: todoValue,
      completed: false,
    };

    setTodos([...todos, todoObject]);

    setTodoValue("");
  };

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (id) => {
    const filtered = todos.filter((todo) => {
      return todo.ID !== id;
    });
    setTodos(filtered);
  };

  return (
    <>
      <div className="form">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="input-and-button">
            <input
              type="text"
              required
              placeholder="Add to do items"
              onChange={(e) => setTodoValue(e.target.value)}
              value={todoValue}
            />
            <div className="button">
              <button type="submit">
                <FaPlus size={25} />
              </button>
            </div>
          </div>
        </form>
        {todos.length > 0 && (
          <>
            {todos.map((singleItem, index) => (
              <div className="todo-lists" key={singleItem.ID}>
                <div>
                  <input type="checkbox" />
                  <span>{singleItem.TodoValue}</span>
                </div>
                <div className="edit-and-delete">
                  <div style={{ marginRight: 10 }}>
                    <FaEdit size={20} />
                  </div>
                  <div onClick={() => handleDelete(singleItem.ID)}>
                    <FaTrash size={20} />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 5 }}
        >
          <button onClick={() => setTodos([])} className="delete-all">
            Delete All
          </button>
        </div>
      </div>
    </>
  );
};

export default Form;
