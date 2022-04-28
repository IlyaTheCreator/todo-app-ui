import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { ToastPortal } from 'toast-notif-study';
import { propsRef } from 'toast-notif-study/dist/types';

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
  const toastRef = useRef<propsRef>(null);

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
    APILayer.addList(name).then(output => {
      setLists(output.data);
      toastRef.current?.addMessage({ mode: output.status, message: output.message })
    });
  };

  /**
   * Remove list
   * @param id {number} - the id of the list
   */
  const deleteList = (id: number) => {
    APILayer.deleteList(id).then(output => {
      setLists(output.data);
      toastRef.current?.addMessage({ mode: output.status, message: output.message })
    });
  };

  /**
   * Change list name
   * @param id {number} - the id of the list
   * @param name {string} - the name of the list
   */
  const updateName = (id: number, name: string) => {
    APILayer.updateListName(id, name).then(output => {
      setLists(output.data);
      toastRef.current?.addMessage({ mode: output.status, message: output.message })
    });
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
      <ToastPortal autoClose={true} autoCloseTime={4000} ref={toastRef} />
    </div>
  );
};

export default ListManager;
