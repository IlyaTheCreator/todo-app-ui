import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import classes from "./AddTodo.module.css";

type Inputs = {
  name: string;
};

const AddTodo: React.FC = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className={classes.input}
        {...register("name")}
        placeholder="What needs to be done?"
      />
    </form>
  );
};

export default AddTodo;
