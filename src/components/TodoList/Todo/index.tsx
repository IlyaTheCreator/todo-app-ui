import React, { useState } from "react";
import { Todo as TodoType } from "../../TodosManager";

import classes from "./Todo.module.css";

interface TodoProps {
  todo: TodoType;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  key: any;
}

/**
 * Single todo
 */
const Todo: React.FC<TodoProps> = ({ todo, toggleTodo, deleteTodo }) => {
  // State for managing whether to show/hide delete icon
  const [closeIconShown, setCloseIconShown] = useState<boolean>(false);

  // Show delete icon on mouseenter
  const mouseEnterHandler = () => setCloseIconShown(true);

  // Hide delete icon on mouseleave
  const mouseLeaveHandler = () => setCloseIconShown(false);

  // Delete icon click handler
  const deleteIconClickHandler = () => deleteTodo(todo.id);

  // Setting what classes to apply to the circle icon
  const circleIconClasses = [classes["icon-circle"]];
  todo.isCompleted
    ? circleIconClasses.push("icon-ok-circled2")
    : circleIconClasses.push("icon-circle-thin");

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      className={classes.todo}
    >
      <i
        onClick={() => toggleTodo(todo.id)}
        className={circleIconClasses.join(" ")}
      />
      <p className={classes["todo-name"]}>{todo.name}</p>
      {closeIconShown && (
        <i
          onClick={deleteIconClickHandler}
          className={`icon-cancel ${classes["close-icon"]}`}
        />
      )}
    </div>
  );
};

export default Todo;
