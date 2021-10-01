import React from "react";
import { FiCheck } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const List = ({ list, removeItem, editItem, checkComplete }) => {
  return (
    <>
      {/* // <div className="todo"> */}
      {list.map((item) => {
        const { id, title, isComplete } = item;
        return (
          <article key={id} className="todo">
            <span className={isComplete ? "complete" : ""}>{title}</span>
            <div className="btn-container">
              <button
                className="btn btn-complete"
                onClick={() => checkComplete(id)}
              >
                <FiCheck />
              </button>
              <button className="btn btn-edit" onClick={() => editItem(id)}>
                <FaRegEdit />
              </button>
              <button className="btn btn-remove" onClick={() => removeItem(id)}>
                <RiDeleteBin6Line />
              </button>
            </div>
          </article>
        );
      })}
      {/* // </div> */}
    </>
  );
};

export default List;
