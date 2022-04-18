import React, { useState } from "react";

import AddTodo from "../AddTodo";
import Filters from "../Filters";
import TodoList from "../TodoList";

import classes from "./TodosManager.module.css";

export type Todo = {
  id: string;
  name: string;
  isCompleted: boolean;
};

export type filterNameType = "all" | "active" | "completed";

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
  const [activeFilterName, setActiveFilterName] =
    useState<filterNameType>("all");

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
    setTodos((prev: Todo[]) => prev.filter((todo: Todo) => todo.id !== id));
  };

  const handleFilterChange = (filterName: filterNameType) => {
    if (filterName !== activeFilterName) {
      setActiveFilterName(filterName);
    }
  };

  const clearCompletedTodos = () => {
    setTodos((prev: Todo[]) => prev.filter((todo: Todo) => !todo.isCompleted));
  };

  const toggleAllTodos = () => {
    // setTodos((prev: Todo[]) =>
    //   prev.map((todo: Todo) => {
    //     return { ...todo, isCompleted: value };
    //   })
    // );
    console.log("hello")
  };

  const completedTodos = todos.filter((todo: Todo) => todo.isCompleted);
  const activeTodos = todos.filter((todo: Todo) => !todo.isCompleted);
  let itemsLeftAmount: number = activeTodos.length;
  let todosToDisplay: Todo[];

  switch (activeFilterName) {
    case "active":
      todosToDisplay = activeTodos;
      break;
    case "completed":
      todosToDisplay = completedTodos;
      break;
    default:
      todosToDisplay = todos;
      break;
  }

  return (
    <main className={classes["todos-manager"]}>
      <AddTodo toggleAllTodos={toggleAllTodos} addTodo={addTodo} />
      <TodoList
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
        todos={todosToDisplay}
      />
      <Filters
        handleFilterChange={handleFilterChange}
        activeFilterName={activeFilterName}
        clearCompletedTodos={clearCompletedTodos}
        itemsLeftAmount={itemsLeftAmount}
      />
    </main>
  );
};

export default TodosManager;
