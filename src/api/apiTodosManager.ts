import axios from '../axios';
import APIEntityManagerExtendable from './APIEntityManagerExtendable';

import {
  IApiTodosManagerExtendedMethods,
  ITodo,
  TodoRequestParams,
  TodoResponse,
} from '../types';

const APITodosManager = APIEntityManagerExtendable.extend<
  ITodo,
  TodoRequestParams,
  TodoResponse,
  IApiTodosManagerExtendedMethods
>({
  fetchAll: async (id: number) => {
    // CUSTOM METHODS DEFINITION
    return await axios.get(`cards/filter/?listId=${id}`);
  },
  toggleGlobalIsCompleted: async (isCompletedValue: boolean) => {
    return await axios.put(`cards/complete/all/${isCompletedValue}`);
  },
  toggleIsCompleted: async (id: number) => {
    return await axios.put(`cards/complete/${id}`);
  },
  deleteCompletedTodos: async () => {
    return await axios.delete(`cards/complete/all`);
  },
});

export default new APITodosManager('cards');
