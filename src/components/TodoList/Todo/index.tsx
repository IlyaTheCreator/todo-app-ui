import React, { useState, useRef, useEffect } from "react";
import cn from 'classnames';

import { Todo as TodoType } from "../../TodosManager";

import classes from "./Todo.module.css";

interface TodoProps {
  todo: TodoType;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, name: string) => void;
  key: any;
}

/**
 * Single todo
 */
const Todo: React.FC<TodoProps> = ({
  todo,
  toggleTodo,
  deleteTodo,
  editTodo,
}) => {
  // State for managing whether to show/hide delete icon
  const [closeIconShown, setCloseIconShown] = useState<boolean>(false);
  // State for managing whether to show/hide editing input
  const [showInput, setShowInput] = useState<boolean>(false);
  // State for managing editing input value
  const [name, setName] = useState<string>(todo.name);
  // Ref for the editing input
  const inputRef = useRef<HTMLInputElement>(null);

  //Cursor focus on input, when double click
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  // Show delete icon on mouseenter
  const mouseEnterHandler = () => setCloseIconShown(true);

  // Hide delete icon on mouseleave
  const mouseLeaveHandler = () => setCloseIconShown(false);

  // Delete icon click handler
  const deleteIconClickHandler = () => deleteTodo(todo.id);

  // Handling double click event
  const doubleClickHandler = () => {
    setShowInput(true);

    const listener = (e: any) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        editTodo(todo.id, inputRef.current.value);
        setShowInput(false);

        window.removeEventListener("click", listener);
      }
    };

    window.addEventListener("click", listener);
  };

  // Handling input change
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // Handling Enter key press
  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      editTodo(todo.id, name);
      setShowInput(false);
    }
  };

  return (
    <div
      onMouseEnter={!showInput ? mouseEnterHandler : () => { }}
      onMouseLeave={!showInput ? mouseLeaveHandler : () => { }}
      className={cn(classes.todo, { [classes['todo_edit']]: showInput })}
    >
      {!showInput && (
        <>
          <input
            className={classes['check-input']}
            type="checkbox"
            id={`checkbox_${todo.id}`}
            checked={todo.isCompleted}
            onChange={() => toggleTodo(todo.id)}
          />
          <label htmlFor={`checkbox_${todo.id}`} className={classes.box} />
        </>
      )}
      {showInput ? (
        <input
          ref={inputRef}
          className={classes["todo-input"]}
          type="text"
          value={name}
          onChange={changeHandler}
          onKeyDown={keyPressHandler}
        />
      ) : (
        <p className={cn(classes["todo-name"], { [classes["todo-completed"]]: todo.isCompleted })}
          onDoubleClick={doubleClickHandler}
        >{todo.name}</p>
      )}
      {closeIconShown && !showInput && (
        <i
          onClick={deleteIconClickHandler}
          className={`icon-cancel ${classes["close-icon"]}`}
        />
      )}
    </div>
  );
};

export default Todo;
