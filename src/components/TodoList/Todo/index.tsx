import React, { useState } from "react";

import classes from "./Todo.module.css";

interface TodoProps {
  name: string;
  isCompleted: boolean;
  onClick: (data: any) => void;
  key: any;
}

const Todo: React.FC<TodoProps> = ({ name, isCompleted, onClick }) => {
  const [closeIconShown, setCloseIconShown] = useState<boolean>(false);

  const mouseEnterHandler = () => setCloseIconShown(true);
  const mouseLeaveHandler = () => setCloseIconShown(false);

  const circleIconClasses = [classes["icon-circle"]];
  isCompleted
    ? circleIconClasses.push("icon-ok-circled2")
    : circleIconClasses.push("icon-circle-thin");

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      className={classes.todo}
    >
      <i
        onClick={() => onClick(isCompleted)}
        className={circleIconClasses.join(" ")}
      />
      <p className={classes["todo-name"]}>{name}</p>

      {closeIconShown && (
        <i className={`icon-cancel ${classes["close-icon"]}`} />
      )}
    </div>
  );
};

export default Todo;
