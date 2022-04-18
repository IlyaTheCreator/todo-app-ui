import React from "react";

import classes from "./TodosManager.module.css";

const TodosManager: React.FC = () => {
  return (
    <main className={classes["todos-manager"]}>
      <h1>App running</h1>
    </main>
  );
}

export default TodosManager;