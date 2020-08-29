import React from "react";

const TodoListItemView = ({ item, onEdit }) => {
  const deleteItem = () => {
    //do something
    item.remove();
  };
  return (
    <li>
      <h3>Title: {item.title}</h3>
      <p>{item.description && item.description}</p>
      <p>Importance(1-5): {item.importance}</p>
      <br />
      <button onClick={deleteItem}>Delete</button>
      <button onClick={() => onEdit(item, () => item.update(item))}>
        Edit
      </button>
    </li>
  );
};
export default TodoListItemView;
