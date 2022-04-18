import React, { useState } from "react";

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
  const [todos, setTodos] = useState<Todo[]>(MOCK_TODOS);

  const toggleTodo = (id: string) => {
    setTodos((prev: Todo[]) =>
      prev.map((todo: Todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }

        return todo;
      })
    );
  };

  const addTodo = (name: string) => {
    setTodos((prev: Todo[]) => [
      { name, isCompleted: false, id: String(Math.random()) },
      ...prev,
    ]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev: Todo[]) =>
      prev.filter((todo: Todo) => (todo.id === id ? false : true))
    );
  };

  return (
    <main className={classes["todos-manager"]}>
      <AddTodo addTodo={addTodo} />
      <TodoList deleteTodo={deleteTodo} toggleTodo={toggleTodo} todos={todos} />
    </main>
  );
};

export default TodosManager;
