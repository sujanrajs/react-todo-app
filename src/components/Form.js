import React, { useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa";

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

  console.log(todos);

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
      </div>
    </>
  );
};

export default Form;
