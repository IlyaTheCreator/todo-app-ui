import { AxiosResponse } from 'axios';

export interface IList {
  id: number;
  name: string;
}

// Todo entity type
export type ITodo = {
  id: number;
  name: string;
  isCompleted: boolean;
};

// Union for typing filter state (bar at the bottom of the list of todos)
export type filterNameType = 'all' | 'active' | 'completed';

// API TYPES (see api folder)
// Type for APIEntityManagerExtendable
export type ExtendedClass<
  Class,
  Methods,
  ArgsType extends unknown[] = [],
> = {
  new (...args: ArgsType): Class & Methods;
};

// Type for common axios response
export type CommonResponse = {
  id?: number;
  message?: string;
  statusCode?: number;
  status: string;
  name?: string;
};

// Types for apiListsManager
export type ListResponse = CommonResponse;
export type ListRequestParams = { name?: string };

// Types for apiTodosManager
export type TodoResponse = CommonResponse;
export type TodoRequestParams =
  | ITodo[]
  | { name?: string; listId?: number };

// Additional (custom) method types for apiTodosManager
export interface IApiTodosManagerExtendedMethods {
  fetchAll: (id: number) => Promise<AxiosResponse<ITodo[]>>;
  toggleIsCompleted: (id: number) => Promise<AxiosResponse<TodoResponse>>;
  deleteCompletedTodos: () => Promise<AxiosResponse<TodoResponse>>;
  toggleGlobalIsCompleted: (
    isCompletedValue: boolean,
  ) => Promise<AxiosResponse<TodoResponse>>;
}
