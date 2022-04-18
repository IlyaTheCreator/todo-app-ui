import React from "react";
import Todo from "./Todo";

import { Todo as TodoType } from "../TodosManager";

// import classes from "./TodoList.module.css";

interface TodoListProps {
  todos: TodoType[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
}) => {
  const todoItems: JSX.Element[] = todos.map((todo: TodoType) => (
    <Todo
      deleteTodo={deleteTodo}
      toggleTodo={toggleTodo}
      todo={todo}
      key={todo.id}
    />
  ));

  return <ul>{todoItems}</ul>;
};

export default TodoList;
