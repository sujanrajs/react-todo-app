import React from "react";

import { FaPlus } from "react-icons/fa";

const Form = () => {
  return (
    <>
      <div className="form">
        <form autoComplete="off">
          <div className="input-and-button">
            <input type="text" placeholder="Add to do items" required />
            <div className="button">
              <button type="submit">
                <FaPlus size={25}/>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
