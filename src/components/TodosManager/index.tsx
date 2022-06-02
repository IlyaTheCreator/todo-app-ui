import React, { useState, useEffect, useCallback, useRef } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import AddTodo from '../AddTodo';
import Filters from '../Filters';
import TodoList from '../TodoList';

import classes from './TodosManager.module.scss';

import { filterNameType, ITodo } from '../../types';
import ErrorBoundary from '../ErrorBoundary';
import apiTodosManager from '../../api/apiTodosManager';
import { AxiosResponse } from 'axios';
import { propsRef } from 'toast-notif-study/dist/types';
import { ToastPortal } from 'toast-notif-study';
import { displayToastMessage, handleAxiosError } from '../../helpers';

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

  const toastRef = useRef<propsRef>(null);

  // initial error boundary error state
  const [error] = useState<boolean>(false);

  const params = useParams<TodosManagesParams>();
  const navigate = useNavigate();

  /* FUNCTIONS START */
  // Get all todos from db
  const fetchTodos = useCallback(() => {
    if (params.id === undefined) {
      navigate('/');
      return;
    }

    apiTodosManager
      .fetchAll(parseInt(params.id))
      .then((output: AxiosResponse<ITodo[]>) => {
        setTodos(output?.data);
      });
  }, [apiTodosManager]);

  useEffect(() => {
    fetchTodos();
  }, []);

  // Complete/undo a todo
  const toggleTodo = useCallback(
    (id: number) => {
      apiTodosManager
        .toggleIsCompleted(id)
        .then(output => {
          fetchTodos();
          displayToastMessage(toastRef, 'info', output.data.message);
        })
        .catch(e => handleAxiosError(toastRef, e));
    },
    [apiTodosManager],
  );

  // Create a new todo
  const addTodo = useCallback(
    (name: string) => {
      apiTodosManager
        .create({ name, listId: parseInt(params.id as string) })
        .then(output => {
          fetchTodos();
          displayToastMessage(toastRef, 'success', output.data.message);
        })
        .catch(e => handleAxiosError(toastRef, e));
    },
    [apiTodosManager],
  );

  // Remove a todo from list
  const deleteTodo = useCallback(
    (id: number) => {
      apiTodosManager
        .deleteSingle(id)
        .then(output => {
          fetchTodos();
          displayToastMessage(toastRef, 'success', output.data.message);
        })
        .catch(e => handleAxiosError(toastRef, e));
    },
    [apiTodosManager],
  );

  // Change todo name
  const editTodo = useCallback(
    (id: number, name: string) => {
      apiTodosManager
        .update(id, { name })
        .then(output => {
          fetchTodos();
          displayToastMessage(toastRef, 'info', output.data.message);
        })
        .catch(e => handleAxiosError(toastRef, e));
    },
    [apiTodosManager],
  );

  // Remove all completed todos
  const clearCompletedTodos = useCallback(() => {
    apiTodosManager
      .deleteCompletedTodos()
      .then(output => {
        fetchTodos();
        displayToastMessage(toastRef, 'success', output.data.message);
      })
      .catch(e => handleAxiosError(toastRef, e));
  }, [apiTodosManager]);

  /**
   * Function for managing onClick event on the arrow icon in the input for adding a todo.
   * If at least one todo is completed, i.e isCompleted = true, all of them will be set to
   * isCompleted = true, otherwise all of them will be set to isCompleted = false
   */
  const toggleAllTodos = useCallback(() => {
    const todoCheck = todos.find((todo: ITodo) => !todo.isCompleted);

    apiTodosManager
      .toggleGlobalIsCompleted(Boolean(todoCheck))
      .then(output => {
        fetchTodos();
        displayToastMessage(toastRef, 'info', output.data.message);
      })
      .catch(e => handleAxiosError(toastRef, e));
  }, [apiTodosManager, todos]);

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
      <ToastPortal autoClose={true} autoCloseTime={4000} ref={toastRef} />
    </main>
  );
};

export default TodosManager;
