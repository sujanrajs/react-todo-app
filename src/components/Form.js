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

  const [editForm, setEditForm] = useState(false);
  const [id, setId] = useState();

  const handleEdit = (todo, index) => {
    setEditForm(true);
    setId(index);
    setTodoValue(todo.TodoValue);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    let items = [...todos];
    let item = items[id];
    item.TodoValue = todoValue;
    item.completed = false;
    items[id] = item;
    setTodos(items);
    setTodoValue("");
    setEditForm(false);
  };

  const handleCheckbox = (id) => {
    let todoArray = [];
    todos.forEach((todo) => {
      if (todo.ID === id) {
        if (todo.completed === false) {
          todo.completed = true;
        } else if (todo.completed === true) {
          todo.completed = false;
        }
      }
      todoArray.push(todo);
      setTodos(todoArray);
    });
  };

  return (
    <>
      {editForm === false && (
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
                <button type="submit" aria-label="Add todo">
                  <FaPlus size={25} />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {editForm === true && (
        <div className="form">
          <form autoComplete="off" onSubmit={handleEditSubmit}>
            <div className="input-and-button">
              <input
                type="text"
                required
                placeholder="Add to do items"
                onChange={(e) => setTodoValue(e.target.value)}
                value={todoValue}
              />
              <div className="button edit">
                <button type="submit">Update</button>
              </div>
            </div>
          </form>
        </div>
      )}
      {todos.length > 0 && (
        <>
          {todos.map((singleItem, index) => (
            <div className="todo-lists" key={singleItem.ID}>
              <div>
                {editForm === false && (
                  <input
                    type="checkbox"
                    checked={singleItem.completed}
                    onChange={() => handleCheckbox(singleItem.ID)}
                  />
                )}
                <span
                  style={
                    singleItem.completed === true
                      ? { textDecoration: "line-through" }
                      : { textDecoration: "none" }
                  }
                >
                  {singleItem.TodoValue}
                </span>
              </div>
              {editForm === false && (
                <div className="edit-and-delete">
                  <div
                    style={{ marginRight: 10 }}
                    onClick={() => handleEdit(singleItem, index)}
                  >
                    <FaEdit size={20} />
                  </div>
                  <div onClick={() => handleDelete(singleItem.ID)}>
                    <FaTrash size={20} />
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 5,
            }}
          >
            <button onClick={() => setTodos([])} className="delete-all">
              Delete All
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Form;
