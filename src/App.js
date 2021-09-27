import React, { useState, useEffect } from "react";
import List from "./List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(list));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [editID, setEditID] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setIsEditing(false);
      setEditID("");
    } else if (name) {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };
  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2 className="title">Todo List</h2>
          <div className="input">
            <input
              type="text"
              value={name}
              placeholder="e.g go to market"
              onChange={(e) => setName(e.target.value)}
            />
            <button className="btn-submit" type="submit">
              Submit
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="list">
            <List list={list} removeItem={removeItem} editItem={editItem} />
            <button className="btn-remove" onClick={() => setList([])}>
              Remove All
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
