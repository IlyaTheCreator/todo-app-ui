import React from "react";
import Todo from "./Todo";

import { Todo as TodoType } from "../TodosManager";

interface TodoListProps {
  todos: TodoType[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

/**
 * List of todos
 */
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
