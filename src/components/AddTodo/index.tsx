import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import classes from "./AddTodo.module.css";

type Inputs = {
  name: string;
};

interface AddTodoProps {
  addTodo: (name: string) => void;
  toggleAllTodos: () => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo, toggleAllTodos }) => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    addTodo(data.name);
    e?.target.reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <i
        onClick={toggleAllTodos}
        className={`icon-down-open ${classes["down-icon"]}`}
      />
      <input
        className={classes.input}
        {...register("name")}
        placeholder="What needs to be done?"
      />
    </form>
  );
};

export default AddTodo;
