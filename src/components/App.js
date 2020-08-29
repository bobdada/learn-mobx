import React, { useState } from "react";
import "../App.css";
import TodoListView from "./TodoListView";
import { useStore } from "../models/index";
import { TodoItem } from "../models/list";
import { observer } from "mobx-react";

function App() {
  const { todoStore } = useStore();
  const [edit, setEdit] = useState(false);

  const [data, setData] = useState({
    title: "",
    description: "",
    importance: "",
  });

  function onSubmit() {
    todoStore.create(data);
    setData({
      title: "",
      description: "",
      importance: "",
    });
  }

  // function onEditSubmit() {
  //   console.log(data);
  //   TodoItem.update(data);
  //   // setData({
  //   //   title: "",
  //   //   description: "",
  //   //   importance: "",
  //   // });
  // }

  function onEdit(logData, editFn) {
    console.log(edit);
    console.log(editFn);
    if (edit === true) {
      // editFn;
      return;
    }
    setEdit(true);
    // item.update
    setData({
      ...logData,
    });
  }
  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]:
        e.target.name === "importance" ? +e.target.value : e.target.value,
    });
  }

  if (todoStore && todoStore.status === "loading") {
    return <p>loading...</p>;
  }

  return (
    <div className="App">
      <h3>ToDo List:</h3>
      <TodoListView todoList={todoStore.items} onEdit={onEdit} />
      <hr />
      <form>
        <label htmlFor="">Title:</label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={(e) => handleChange(e)}
        />
        <br /> <br />
        <label htmlFor="">Descp:</label>
        <textarea
          name="description"
          value={data.description}
          onChange={(e) => handleChange(e)}
        />{" "}
        <br /> <br />
        <label htmlFor="">Imp(1-5):</label>
        <input
          name="importance"
          value={data.importance}
          onChange={(e) => handleChange(e)}
          type="number"
        />
        <br /> <br />
      </form>
      {edit ? (
        <button onClick={() => onEdit()}>Update Todo</button>
      ) : (
        <button onClick={onSubmit}>Add Todo</button>
      )}
    </div>
  );
}

export default observer(App);
