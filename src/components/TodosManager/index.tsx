import React, { useState, useEffect } from "react";
import axios from "../../axios";

import AddTodo from "../AddTodo";
import Filters from "../Filters";
import TodoList from "../TodoList";

import classes from "./TodosManager.module.css";

// Todo entity type
export type Todo = {
  id: string;
  name: string;
  isCompleted: boolean;
};

// Union for typing filter state (bar at the bottom of the list of todos)
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

const fetchTodos = async () => await axios.get("cards/filter?listId=4");


/**
 * Central todos state manager.
 */
const TodosManager: React.FC = () => {
  // todos state
  const [todos, setTodos] = useState<Todo[]>(MOCK_TODOS);
  // state for deciding what type of filter to apply
  const [activeFilterName, setActiveFilterName] =
    useState<filterNameType>("all");

  useEffect(() => {
    axios.get("cards/filter?listId=4").then((output) => {
      setTodos(output.data);
    });
  }, [todos]);

  /* FUNCTIONS START */

  // Complete/undo a todo
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

  // Create a new todo
  const addTodo = (name: string) => {
    setTodos((prev: Todo[]) => [
      { name, isCompleted: false, id: String(Math.random()) },
      ...prev,
    ]);
  };

  // Remove a todo from list
  const deleteTodo = (id: string) => {
    setTodos((prev: Todo[]) => prev.filter((todo: Todo) => todo.id !== id));
  };

  // Change todo name
  const editTodo = (id: string, name: string) => {
    setTodos((prev: Todo[]) =>
      prev.map((todo: Todo) => (todo.id === id ? { ...todo, name } : todo))
    );
  };

  // Managing what happens when one of the filters is clicked
  const handleFilterChange = (filterName: filterNameType) => {
    if (filterName !== activeFilterName) {
      setActiveFilterName(filterName);
    }
  };

  // Remove all completed todos
  const clearCompletedTodos = () => {
    setTodos((prev: Todo[]) => prev.filter((todo: Todo) => !todo.isCompleted));
  };

  /**
   * Function for managing onClick event on the arrow icon in the input for adding a todo.
   * If at least one todo is completed, i.e isCompleted = true, all of them will be set to
   * isCompleted = true, otherwise all of them will be set to isCompleted = false
   */
  const toggleAllTodos = () => {
    const todoCheck = todos.find((todo: Todo) => !todo.isCompleted);

    if (todoCheck) {
      setTodos((prev: Todo[]) =>
        prev.map((todo: Todo) => {
          return { ...todo, isCompleted: true };
        })
      );
    } else {
      setTodos((prev: Todo[]) =>
        prev.map((todo: Todo) => {
          return { ...todo, isCompleted: false };
        })
      );
    }
  };

  /* FUNCTIONS END */

  // Variable definitions for producing final output
  const completedTodos = todos.filter((todo: Todo) => todo.isCompleted);
  const activeTodos = todos.filter((todo: Todo) => !todo.isCompleted);
  let itemsLeftAmount: number = activeTodos.length;
  let todosToDisplay: Todo[];

  // Based on selected filter name, we display different parts of todos state
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
        editTodo={editTodo}
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
