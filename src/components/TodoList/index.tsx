import React from "react";
import Todo from "./Todo";

import { Todo as TodoType } from "../TodosManager";

// import classes from "./TodoList.module.css";

interface TodoListProps {
  todos: TodoType[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const handleClick = (data: any) => {
    console.log(data);
  };

  const todoItems: JSX.Element[] = todos.map((todo: TodoType) => (
    <Todo
      onClick={handleClick}
      name={todo.name}
      isCompleted={todo.isCompleted}
      key={todo.id}
    />
  ));

  return <ul>{todoItems}</ul>;
};

export default TodoList;
