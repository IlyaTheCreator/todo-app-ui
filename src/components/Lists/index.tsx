import React from "react";

import { IList } from "../ListManager";
import ListItem from "./ListItem";

import classes from './index.module.scss';

interface ILists {
  lists: IList[],
  deleteList: (id: number) => void;
  updateName: (id: number, name: string) => void;
}

/**
 * Lists of lists
 */
const Lists: React.FC<ILists> = ({ lists, deleteList, updateName }) => {
  return <div className={classes.lists}>
    {lists.map((list: IList) => {
      return <ListItem
        key={list.id}
        id={list.id}
        name={list.name}
        deleteList={deleteList}
        updateName={updateName}
      />
    })}
  </div>;
};

export default Lists;
