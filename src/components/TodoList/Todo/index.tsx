import React, { useState } from "react";
import { Todo as TodoType } from "../../TodosManager";

import classes from "./Todo.module.css";

interface TodoProps {
  todo: TodoType;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  key: any;
}

const Todo: React.FC<TodoProps> = ({ todo, toggleTodo, deleteTodo }) => {
  const [closeIconShown, setCloseIconShown] = useState<boolean>(false);

  const mouseEnterHandler = () => setCloseIconShown(true);

  const mouseLeaveHandler = () => setCloseIconShown(false);

  const deleteIconClickHandler = () => deleteTodo(todo.id);

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
