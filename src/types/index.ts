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

// API TYPES
export type CommonResponse = {
  id?: number;
  message?: string;
  statusCode?: number;
  status: string;
  name?: string;
};

export type ListResponse = CommonResponse;
export type ListRequestParams = { name?: string };

export type TodoResponse = CommonResponse;
export type TodoRequestParams =
  | ITodo[]
  | { name?: string; listId?: number };

export interface IApiTodosManagerExtendedMethods {
  fetchAll: (id: number) => Promise<AxiosResponse<ITodo[]>>;
  toggleIsCompleted: (id: number) => Promise<AxiosResponse<TodoResponse>>;
  deleteCompletedTodos: () => Promise<AxiosResponse<TodoResponse>>;
  toggleGlobalIsCompleted: (
    isCompletedValue: boolean,
  ) => Promise<AxiosResponse<TodoResponse>>;
}
