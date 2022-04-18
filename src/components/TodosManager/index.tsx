import React from "react";

import AddTodo from "../AddTodo";

import classes from "./TodosManager.module.css";

const TodosManager: React.FC = () => {
  return (
    <main className={classes["todos-manager"]}>
      <AddTodo />
      <h1 style={{ margin: 20, paddingBottom: 20 }}>App running</h1>
    </main>
  );
};

export default TodosManager;
