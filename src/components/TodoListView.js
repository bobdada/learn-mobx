import React from "react";
import TodoListItemView from "./TodoListItemView";
import { observer } from "mobx-react";

const TodoListView = ({ todoList, onEdit }) => {
  console.log(todoList);
  return (
    <div>
      <ul>
        {todoList.map((t, i) => (
          <TodoListItemView key={t.key} item={t} onEdit={onEdit} />
        ))}
      </ul>
    </div>
  );
};
export default observer(TodoListView);
