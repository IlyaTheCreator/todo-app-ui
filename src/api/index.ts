import { AxiosError, AxiosResponse } from 'axios';
import axios from '../axios';

import { IList, ITodo } from '../types';

type Mode = 'success' | 'error' | 'info' | 'warning';

// Ожидаем получить id и message (по доке)
interface IListRequest {
  id: number;
  message: string;
}

interface IResponse {
  message: string;
  data: IList[];
  status: Mode;
}

class APILayer {
  constructor(
    public message: string = '',
    public status: Mode = 'success',
    public currentListId?: string,
  ) {}

  async fetchLists(): Promise<AxiosResponse<IList[]>> {
    this.status = 'success';
    return await axios.get<IList[]>('lists');
  }

  async addList(name: string): Promise<IResponse> {
    axios
      .post<IResponse>('lists', { name })
      .then(res => {
        //Если всё успешно то кладём сообщенение из ответа
        this.message = res.data.message;
      })
      .catch((e: Error | AxiosError) => {
        //При любой ошибке меняем статус, чтобы сменилась иконка на уведомлении
        this.status = 'error';
        /**
         * новая какая то штука в axios
         * пишут, что If you look at the types you'll see that AxiosError
         * has a property isAxiosError that is used to detect types, when combined with the builtin typeguard
         * https://github.com/axios/axios/issues/3612#issuecomment-770224236
         */
        if (axios.isAxiosError(e)) {
          //Проверяем является ли эта ошибка ошибок из axios
          // Кладем сообщение из ошибки
          this.message = e.response?.data.message;
        } else {
          this.message = 'Error';
        }
      });

    const data = (await this.fetchLists()).data;

    return await { status: this.status, message: this.message, data };
  }

  async deleteList(id: number): Promise<IResponse> {
    try {
      this.message = (
        await axios.delete<IListRequest>('lists/' + id)
      ).data.message;
    } catch (e: unknown) {
      // При указании такого же типа как выше. В try...catch подчеркивает ошибку.
      // Через await не получилось, получается так что срабатывает быстрее строка 68:const data = (await this.fetchLists()).data;
      // И не видно что лист удаляется. Удаляется короче с задержкой на 1 действие.
      this.status = 'error';
      if (axios.isAxiosError(e)) {
        //Проверяем является ли эта ошибка ошибок из axios
        this.message = e.response?.data.message;
      } else {
        this.message = 'Error';
      }
    }

    const data = (await this.fetchLists()).data;
    return { status: this.status, message: this.message, data };
  }

  async updateListName(id: number, name: string): Promise<IResponse> {
    try {
      this.message = (
        await axios.put<IListRequest>(`lists/${id}`, { name })
      ).data.message;
    } catch (e: unknown) {
      this.status = 'error';
      if (axios.isAxiosError(e)) {
        this.message = e.response?.data.message;
      } else {
        this.message = 'Error';
      }
    }

    const data = (await this.fetchLists()).data;
    return { status: this.status, message: this.message, data };
  }

  async fetchTodos(listId?: string): Promise<AxiosResponse<ITodo[]>> {
    this.currentListId = listId || this.currentListId;

    return await axios.get<ITodo[]>(
      `cards/filter?listId=${this.currentListId}`,
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
