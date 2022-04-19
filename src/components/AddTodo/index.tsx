import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import classes from "./AddTodo.module.css";

/**
 * Type required by useForm. It uses it to give us appropriate functions from 
 * useForm() hook.
 */
type Inputs = {
  name: string;
};

interface AddTodoProps {
  addTodo: (name: string) => void;
  toggleAllTodos: () => void;
}

/**
 * Input for creating a new todo
 */
const AddTodo: React.FC<AddTodoProps> = ({ addTodo, toggleAllTodos }) => {
  // Using useForm() hook to generate functions which will help us to manage form
  const { register, handleSubmit } = useForm<Inputs>();

  // Form onSubmit handler. The type is from useForm docs
  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    addTodo(data.name);
    // Clearing inputs after submission
    e?.target.reset();
  };

  // There's no buttom. Form is submitted by pressing Enter
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
