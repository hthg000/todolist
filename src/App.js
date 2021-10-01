import React, { useState, useEffect } from "react";
import List from "./List";
import { AiOutlinePlus } from "react-icons/ai";

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
    if (name.trim() === "") {
      alert("Say something...");
      setName("");
    } else if (name && isEditing) {
      if (list.find((item) => item.title === name)) {
        alert("This item already exists");
      } else {
        setList(
          list.map((item) => {
            if (item.id === editID) {
              return { ...item, title: name, isComplete: false };
            }
            return item;
          })
        );
        setName("");
        setIsEditing(false);
        setEditID("");
      }
    } else if (name) {
      if (list.find((item) => item.title === name)) {
        alert("This item already exists");
      } else {
        const newItem = {
          id: new Date().getTime().toString(),
          title: name,
          isComplete: false,
        };
        setList([...list, newItem]);
        setName("");
      }
    }
  };
  const checkComplete = (id) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          item.isComplete = !item.isComplete;
        }
        return item;
      })
    );
  };
  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    console.log(specificItem);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="container">
      <h2 className="title">Todo List</h2>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <input
            type="text"
            value={name}
            placeholder="e.g go to market"
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn-submit" type="submit">
            <AiOutlinePlus />
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="todos">
          <List
            list={list}
            removeItem={removeItem}
            editItem={editItem}
            checkComplete={checkComplete}
          />
          <button className="btn-remove-all" onClick={() => setList([])}>
            Remove All
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
