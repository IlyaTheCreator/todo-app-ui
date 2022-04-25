import React, { useState, useEffect } from "react";

import AddTodo from "../AddTodo";
import Filters from "../Filters";
import TodoList from "../TodoList";

import APILayer from "../../api";

import { useParams } from "react-router-dom";
import classes from "./TodosManager.module.scss";

// Todo entity type
export type Todo = {
  id: number;
  name: string;
  isCompleted: boolean;
};

// Union for typing filter state (bar at the bottom of the list of todos)
export type filterNameType = "all" | "active" | "completed";

export type TodosManagesParams = {
  id: string;
};
/**
 * Central todos state manager.
 */
const TodosManager: React.FC = () => {
  // todos state
  const [todos, setTodos] = useState<Todo[]>([]);
  // state for deciding what type of filter to apply
  const [activeFilterName, setActiveFilterName] =
    useState<filterNameType>("all");

  const params = useParams<TodosManagesParams>();

  useEffect(() => {
    APILayer.fetchTodos(params.id).then((output) => setTodos(output.data));
  }, [params.id]);

  /* FUNCTIONS START */

  // Complete/undo a todo
  const toggleTodo = (id: number) => {
    APILayer.toggleIsCompleted(id).then((output) => setTodos(output.data));
  };

  // Create a new todo
  const addTodo = (name: string, listId: string = '1') => {
    APILayer.addNewTodo(name, Number(listId)).then((output) => setTodos(output.data));
  };

  // Remove a todo from list
  const deleteTodo = (id: number) => {
    APILayer.deleteExistingTodo(id).then((output) => setTodos(output.data));
  };

  // Change todo name
  const editTodo = (id: number, name: string) => {
    APILayer.updateTodoName(id, name).then((output) => setTodos(output.data));
  };

  // Remove all completed todos
  const clearCompletedTodos = () => {
    APILayer.deleteCompletedTodos().then((output) => setTodos(output.data));
  };

  /**
   * Function for managing onClick event on the arrow icon in the input for adding a todo.
   * If at least one todo is completed, i.e isCompleted = true, all of them will be set to
   * isCompleted = true, otherwise all of them will be set to isCompleted = false
   */
  const toggleAllTodos = () => {
    const todoCheck = todos.find((todo: Todo) => !todo.isCompleted);

    APILayer.toggleGlobalIsCompleted(Boolean(todoCheck)).then((output) => setTodos(output.data));
  };

  // Managing what happens when one of the filters is clicked
  const handleFilterChange = (filterName: filterNameType) => {
    if (filterName !== activeFilterName) {
      setActiveFilterName(filterName);
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
      {todos.length
        ? <Filters
          handleFilterChange={handleFilterChange}
          activeFilterName={activeFilterName}
          clearCompletedTodos={clearCompletedTodos}
          itemsLeftAmount={itemsLeftAmount}
        />
        : null
      }
    </main>
  );
};

export default TodosManager;
