import React, { useEffect, useState } from "react";

import APILayer from '../../api/index';
import AddTodo from "../AddTodo";
import Lists from "../Lists";

import classes from './ListManager.module.css';

export interface IList {
  id: number,
  name: string
}

const ListManager: React.FC = () => {
  const [lists, setLists] = useState<IList[]>([]);

  useEffect(() => {
    APILayer.fetchLists().then((res) => res.data).then((lists: IList[]) => setLists(lists));
  }, []);

  const addTodo = (name: string) => {
    APILayer.addList(name).then((output) => setLists(output.data));
  };

  const deleteList = (id: number) => {
    APILayer.deleteList(id).then((output) => setLists(output.data));
  };

  const updateName = (id: number, name: string) => {
    APILayer.updateListName(id, name).then((output) => setLists(output.data));
  };

  return (
    <div className={classes["list-manager"]}>
      <AddTodo addTodo={addTodo} toggleAllTodos={function (): void {
        throw new Error("Function not implemented.");
      }} />
      <Lists lists={lists} deleteList={deleteList} updateName={updateName} />
    </div>
  )
};

export default ListManager;
