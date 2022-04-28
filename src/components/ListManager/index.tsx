import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import APILayer from '../../api/index';
import AddTodo from '../AddTodo';
import Lists from '../Lists';

import { IList } from '../../types';

import classes from './ListManager.module.css';
import ErrorBoundary from '../ErrorBoundary';

/**
 * Central lists state manager.
 */
const ListManager: React.FC = () => {
  // lists state
  const [lists, setLists] = useState<IList[]>([]);

  useEffect(() => {
    APILayer.fetchLists()
      .then(res => res.data)
      .then((lists: IList[]) => setLists(lists));
  }, []);

  /* FUNCTIONS START */

  /**
   * Create a new list
   * @param name {string} the name of the list
   */
  const addTodo = (name: string) => {
    APILayer.addList(name).then(output => setLists(output.data));
  };

  /**
   * Remove list
   * @param id {number} - the id of the list
   */
  const deleteList = (id: number) => {
    APILayer.deleteList(id).then(output => setLists(output.data));
  };

  /**
   * Change list name
   * @param id {number} - the id of the list
   * @param name {string} - the name of the list
   */
  const updateName = (id: number, name: string) => {
    APILayer.updateListName(id, name).then(output =>
      setLists(output.data),
    );
  };

  return (
    <div className={classNames(classes['list-manager'], 'container')}>
      <ErrorBoundary>
        <AddTodo
          addTodo={addTodo}
          toggleAllTodos={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
        {lists.length ? (
          <Lists
            lists={lists}
            deleteList={deleteList}
            updateName={updateName}
          />
        ) : (
          <h1 className={classes.empty}>Lists not found</h1>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default ListManager;
