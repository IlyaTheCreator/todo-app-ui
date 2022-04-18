import React from "react";

import AddTodo from "../AddTodo";
import TodoList from "../TodoList";

import classes from "./TodosManager.module.css";

export type Todo = {
  id: string;
  name: string;
  isCompleted: boolean;
};

const MOCK_TODOS: Todo[] = [
  {
    id: "1",
    name: "ыфвапывап",
    isCompleted: false,
  },
  {
    id: "2",
    name: "Todo 2",
    isCompleted: true,
  },
  {
    id: "3",
    name: "Todo 3",
    isCompleted: false,
  },
  {
    id: "4",
    name: "Todo 4",
    isCompleted: true,
  },
];

const TodosManager: React.FC = () => {
  return (
    <main className={classes["todos-manager"]}>
      <AddTodo />
      <TodoList todos={MOCK_TODOS} />
    </main>
  );
};

export default TodosManager;
