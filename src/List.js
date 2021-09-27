import React from "react";

const List = ({ list, removeItem, editItem }) => {
  return (
    <div>
      {list.map((item) => {
        const { id, title } = item;
        return (
          <article key={id}>
            <h3>{title}</h3>
            <div className="btn-container">
              <button className="btn-edit" onClick={() => editItem(id)}>
                edit
              </button>
              <button className="btn-remove" onClick={() => removeItem(id)}>
                remove
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
