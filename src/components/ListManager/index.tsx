import React, { useCallback, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { ToastPortal } from 'toast-notif-study';
import { propsRef } from 'toast-notif-study/dist/types';

import ErrorBoundary from '../ErrorBoundary';
import apiListsManager from '../../api/apiListsManager';
import { AxiosResponse } from 'axios';

import AddTodo from '../AddTodo';
import Lists from '../Lists';

import { IList } from '../../types';
import { displayToastMessage, handleAxiosError } from '../../helpers';

import classes from './ListManager.module.css';

/**
 * Central lists state manager.
 */
const ListManager: React.FC = () => {
  // lists state
  const [lists, setLists] = useState<IList[]>([]);

  const toastRef = useRef<propsRef>(null);

  /* FUNCTIONS START */
  // Get all lists from db
  const fetchLists = useCallback(() => {
    apiListsManager.fetchAll().then((output: AxiosResponse<IList[]>) => {
      setLists(output?.data);
    });
  }, []);

  useEffect(() => {
    fetchLists();
  }, []);

  // Create a new list
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

  // Remove list
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

  // Change list name
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
