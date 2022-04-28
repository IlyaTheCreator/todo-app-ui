import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import AddTodo from '../AddTodo';
import Filters from '../Filters';
import TodoList from '../TodoList';

import APILayer from '../../api';

import classes from './TodosManager.module.scss';

import { filterNameType, ITodo } from '../../types';
import ErrorBoundary from '../ErrorBoundary';

export type TodosManagesParams = {
  id: string;
};

/**
 * Central todos state manager.
 */
const TodosManager: React.FC = () => {
  // todos state
  const [todos, setTodos] = useState<ITodo[]>([]);
  // state for deciding what type of filter to apply
  const [activeFilterName, setActiveFilterName] =
    useState<filterNameType>('all');

  // initial error boundary error state
  const [error, setError] = useState<boolean>(false);

  const params = useParams<TodosManagesParams>();

  /* FUNCTIONS START */
  const setTodosOrCatchErrors = (data: ITodo[]) => {
    if (Array.isArray(data)) {
      setTodos(data);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    APILayer.fetchTodos(params.id).then(output =>
      setTodosOrCatchErrors(output.data),
    );
  }, [params.id]);

  // Complete/undo a todo
  const toggleTodo = (id: number) => {
    APILayer.toggleIsCompleted(id).then(output =>
      setTodosOrCatchErrors(output.data),
    );
  };

  // Create a new todo
  const addTodo = (name: string, listId: string = '1') => {
    APILayer.addNewTodo(name, Number(listId)).then(output =>
      setTodosOrCatchErrors(output.data),
    );
  };

  // Remove a todo from list
  const deleteTodo = (id: number) => {
    APILayer.deleteExistingTodo(id).then(output =>
      setTodosOrCatchErrors(output.data),
    );
  };

  // Change todo name
  const editTodo = (id: number, name: string) => {
    APILayer.updateTodoName(id, name).then(output =>
      setTodosOrCatchErrors(output.data),
    );
  };

  // Remove all completed todos
  const clearCompletedTodos = () => {
    APILayer.deleteCompletedTodos().then(output =>
      setTodosOrCatchErrors(output.data),
    );
  };

  /**
   * Function for managing onClick event on the arrow icon in the input for adding a todo.
   * If at least one todo is completed, i.e isCompleted = true, all of them will be set to
   * isCompleted = true, otherwise all of them will be set to isCompleted = false
   */
  const toggleAllTodos = () => {
    const todoCheck = todos.find((todo: ITodo) => !todo.isCompleted);

    APILayer.toggleGlobalIsCompleted(Boolean(todoCheck)).then(output =>
      setTodosOrCatchErrors(output.data),
    );
  };

  // Managing what happens when one of the filters is clicked
  const handleFilterChange = (filterName: filterNameType) => {
    if (filterName !== activeFilterName) {
      setActiveFilterName(filterName);
    }
  };

  /* FUNCTIONS END */

  // Variable definitions for producing final output
  const completedTodos = todos.filter((todo: ITodo) => todo.isCompleted);
  const activeTodos = todos.filter((todo: ITodo) => !todo.isCompleted);
  const itemsLeftAmount = activeTodos.length;
  let todosToDisplay: ITodo[];

  // Based on selected filter name, we display different parts of todos state
  switch (activeFilterName) {
    case 'active':
      todosToDisplay = activeTodos;
      break;
    case 'completed':
      todosToDisplay = completedTodos;
      break;
    default:
      todosToDisplay = todos;
      break;
  }

  return (
    <main className={classes['todos-manager']}>
      <ErrorBoundary error={error}>
        <AddTodo toggleAllTodos={toggleAllTodos} addTodo={addTodo} />
        <TodoList
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
          todos={todosToDisplay}
        />
        {todos.length ? (
          <Filters
            handleFilterChange={handleFilterChange}
            activeFilterName={activeFilterName}
            clearCompletedTodos={clearCompletedTodos}
            itemsLeftAmount={itemsLeftAmount}
          />
        ) : null}
      </ErrorBoundary>
    </main>
  );
};

export default TodosManager;
