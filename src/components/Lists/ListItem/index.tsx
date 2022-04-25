import React, { useState } from "react";
import { Link } from "react-router-dom";

import classes from './index.module.css';

interface IListItem {
  id: number,
  name: string,
  deleteList: (id: number) => void;
  updateName: (id: number, name: string) => void;
}

const ListItem: React.FC<IListItem> = ({ id, name, deleteList, updateName }) => {
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(name);

  const handleEditMode = () => setEditMode(!isEditMode);

  const handleDeleteButton = () => deleteList(id);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  }

  const onSubmit = () => {
    updateName(id, newName);
    handleEditMode();
  }

  return <div className={classes['list-item']}>
    {!isEditMode
      ? <h2 className={classes['list-item__title']}>{name}</h2>
      : <div className={classes['list-item__edit-name']}>
        <input
          className={classes['list-item__input']}
          value={newName}
          onChange={handleChangeName}
          type="text"
        />
        <i
          className={`ico-check ${classes['list-item__confirm']}`}
          onClick={onSubmit}
        />
      </div>
    }
    <section className={classes['buttons']}>
      {/* <Link to={`/lists/${id}`}>
        Open
      </Link> */}
      <div className={classes['btn']}>
        <i
          className={`ico-edit ${classes['btn-edit']}`}
          onClick={handleEditMode}
        />
        <span>Edit</span>
      </div>
      <div className={classes['btn']}>
        <i
          className={`ico-trash ${classes['btn-delete']}`}
          onClick={handleDeleteButton}
        />
        <span>Delete</span>
      </div>
    </section>
  </div >;
};

export default ListItem;
