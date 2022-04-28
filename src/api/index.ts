import { AxiosResponse } from 'axios';
import axios from '../axios';

import { IList, ITodo } from '../types';

class APILayer {
  constructor(public currentListId?: string) {}

  async fetchLists(): Promise<AxiosResponse<IList[]>> {
    return await axios.get<IList[]>('lists');
  }

  async addList(name: string): ReturnType<typeof this.fetchLists> {
    await axios.post<Parameters<typeof this.addList>>('lists', { name });

    return await this.fetchLists();
  }

  async deleteList(id: number): ReturnType<typeof this.fetchLists> {
    await axios.delete<Parameters<typeof this.deleteList>>('lists/' + id);

    return await this.fetchLists();
  }

  async updateListName(
    id: number,
    name: string,
  ): ReturnType<typeof this.fetchLists> {
    await axios.put<Parameters<typeof this.updateListName>>(
      `lists/${id}`,
      { name },
    );

    return await this.fetchLists();
  }

  async fetchTodos(listId?: string): Promise<AxiosResponse<ITodo[]>> {
    this.currentListId = listId || this.currentListId;

    return await axios.get<ITodo[]>(
      `carsds/filter?listId=${this.currentListId}`,
    );
  }

  async toggleIsCompleted(id: number): ReturnType<typeof this.fetchTodos> {
    await axios.put<Parameters<typeof this.toggleIsCompleted>>(
      `cards/complete/${id}`,
    );

    return await this.fetchTodos();
  }

  async addNewTodo(
    name: string,
    listId: number,
  ): ReturnType<typeof this.fetchTodos> {
    await axios.post<Parameters<typeof this.addNewTodo>>('cards', {
      name,
      listId,
    });

    return await this.fetchTodos();
  }

  async deleteExistingTodo(
    id: number,
  ): ReturnType<typeof this.fetchTodos> {
    await axios.delete<Parameters<typeof this.deleteExistingTodo>>(
      `cards/${id}`,
    );

    return await this.fetchTodos();
  }

  async updateTodoName(
    id: number,
    name: string,
  ): ReturnType<typeof this.fetchTodos> {
    await axios.put<Parameters<typeof this.updateTodoName>>(
      `cards/${id}`,
      { name },
    );

    return await this.fetchTodos();
  }

  async deleteCompletedTodos(): ReturnType<typeof this.fetchTodos> {
    await axios.delete<Parameters<typeof this.deleteCompletedTodos>>(
      'cards/complete/all',
    );

    return await this.fetchTodos();
  }

  async toggleGlobalIsCompleted(
    isCompletedValue: boolean,
  ): ReturnType<typeof this.fetchTodos> {
    await axios.put<Parameters<typeof this.toggleGlobalIsCompleted>>(
      `cards/complete/all/${isCompletedValue}`,
    );

    return await this.fetchTodos();
  }
}

export default new APILayer();
