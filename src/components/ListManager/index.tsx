import React, { useCallback, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { ToastPortal } from 'toast-notif-study';
import { propsRef } from 'toast-notif-study/dist/types';

import ErrorBoundary from '../ErrorBoundary';
import apiListsManager from '../../api/apiListsManager';
import axios, { AxiosError, AxiosResponse } from 'axios';

import AddTodo from '../AddTodo';
import Lists from '../Lists';

import { IList } from '../../types';

import classes from './ListManager.module.css';
import { displayToastMessage, handleAxiosError } from '../../helpers';

/**
 * Central lists state manager.
 */
const ListManager: React.FC = () => {
  // lists state
  const [lists, setLists] = useState<IList[]>([]);
  const toastRef = useRef<propsRef>(null);

  const fetchLists = useCallback(() => {
    apiListsManager.fetchAll().then((output: AxiosResponse<IList[]>) => {
      setLists(output?.data);
    });
  }, []);

  useEffect(() => {
    fetchLists();
  }, []);

  /* FUNCTIONS START */
  /**
   * Create a new list
   * @param name {string} the name of the list
   */
  const addList = useCallback(
    async (name: string) => {
      apiListsManager
        .create({ name })
        .then(output => {
          fetchLists();
          displayToastMessage(toastRef, 'success', output.data.message);
        })
        .catch(e => handleAxiosError(toastRef, e));
    },
    [apiListsManager],
  );

  /**
   * Remove list
   * @param id {number} - the id of the list
   */
  const deleteList = useCallback(
    (id: number) => {
      apiListsManager
        .deleteSingle(id)
        .then(output => {
          fetchLists();
          displayToastMessage(toastRef, 'info', output.data.message);
        })
        .catch(e => handleAxiosError(toastRef, e));
    },
    [apiListsManager],
  );

  /**
   * Change list name
   * @param id {number} - the id of the list
   * @param name {string} - the name of the list
   */
  const updateName = useCallback(
    (id: number, name: string) => {
      apiListsManager
        .update(id, { name })
        .then(output => {
          fetchLists();
          displayToastMessage(toastRef, 'info', output.data.message);
        })
        .catch(e => handleAxiosError(toastRef, e));
    },
    [apiListsManager],
  );

  return (
    <div className={classNames(classes['list-manager'], 'container')}>
      <ErrorBoundary>
        <AddTodo
          addTodo={addList}
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
