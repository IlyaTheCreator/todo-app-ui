import React from 'react';
import Todo from './Todo';

import { ITodo } from '../../types';

import classes from './index.module.css';

interface TodoListProps {
  todos: ITodo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, name: string) => void;
}

/**
 * List of todos
 */
const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
  editTodo,
}) => {
  const todoItems: JSX.Element[] = todos.map((todo: ITodo) => (
    <Todo
      deleteTodo={deleteTodo}
      toggleTodo={toggleTodo}
      editTodo={editTodo}
      todo={todo}
      key={todo.id}
    />
  ));

  return <ul className={classes['todo-list']}>{todoItems}</ul>;
};

export default TodoList;
