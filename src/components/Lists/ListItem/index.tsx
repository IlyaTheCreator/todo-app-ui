import React, { useEffect, useRef, useState } from "react";
import cn from 'classnames';
import { Link } from "react-router-dom";

import classes from './index.module.scss';

interface IListItem {
  id: number,
  name: string,
  deleteList: (id: number) => void;
  updateName: (id: number, name: string) => void;
}

/**
 * Single list
 */
const ListItem: React.FC<IListItem> = ({ id, name, deleteList, updateName }) => {
  // State for managing whether to show/hide editing input
  const [isEditMode, setEditMode] = useState<boolean>(false);
  // State for managing added animation delete for list
  const [isDeleting, setDeleting] = useState<boolean>(false);
  // State for managing editing input value
  const [newName, setNewName] = useState<string>(name);
  // Ref for the editing input
  const inputRef = useRef<HTMLInputElement>(null);

  //Cursor focus on input, when double click
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  //Handler for show/hide input 
  const handleEditMode = () => setEditMode(!isEditMode);

  // handler delete list
  const handleDeleteButton = () => {
    setDeleting(true);

    // Delete list after animate
    setTimeout(() => {
      deleteList(id);
      setDeleting(false);
    }, 200);
  }

  // Handling input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  }

  // Save a new name for the list
  const onSubmit = () => {
    updateName(id, newName);
    handleEditMode();
  }

  return <div className={cn(classes['list-item'], { [classes['animate-delete']]: isDeleting })}>
    {!isEditMode
      ? <Link to={`/lists/${id}`}>
        <h2 className={classes['list-item__title']}>{name}</h2>
      </Link>
      : <div className={classes['list-item__edit-name']}>
        <input
          className={classes['list-item__input']}
          value={newName}
          onChange={handleChange}
          type="text"
          ref={inputRef}
        />
        <i
          className={`ico-check ${classes['list-item__confirm']}`}
          onClick={onSubmit}
        />
      </div>
    }
    <section className={classes['buttons']}>
      <div className={classes['btn']} onClick={handleEditMode}>
        <i
          className={`ico-edit ${classes['btn-edit']}`}
        />
        <span>Edit</span>
      </div>
      <div className={classes['btn']} onClick={handleDeleteButton}>
        <i
          className={`ico-trash ${classes['btn-delete']}`}
        />
        <span>Delete</span>
      </div>
    </section>
  </div >;
};

export default ListItem;
