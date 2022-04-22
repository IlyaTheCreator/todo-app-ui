import { AxiosResponse } from "axios";
import axios from "../axios";

class APILayer {
  constructor(public currentListId?: string) {

  }

  async fetchTodos(listId?: string): Promise<AxiosResponse> {
    this.currentListId = listId || this.currentListId;
    return await axios.get(`cards/filter?listId=${this.currentListId}`);
  }

  async toggleIsCompleted(id: number): Promise<AxiosResponse> {
    await axios.put(`cards/complete/${id}`);
    return await this.fetchTodos();
  }

  async addNewTodo(
    name: string,
    listId: number
  ): Promise<AxiosResponse> {
    await axios.post("cards", { name, listId });
    return await this.fetchTodos();
  }

  async deleteExistingTodo(id: number): Promise<AxiosResponse> {
    await axios.delete(`cards/${id}`);
    return await this.fetchTodos();
  }

  async updateTodoName(
    id: number,
    name: string
  ): Promise<AxiosResponse> {
    await axios.put(`cards/${id}`, { name });
    return await this.fetchTodos();
  }

  async deleteCompletedTodos(): Promise<AxiosResponse> {
    await axios.delete("cards/complete/all");
    return await this.fetchTodos();
  }

  async toggleGlobalIsCompleted(
    isCompletedValue: boolean
  ): Promise<AxiosResponse> {
    await axios.put(`cards/complete/all/${isCompletedValue}`);
    return await this.fetchTodos();
  }
};

export default new APILayer();
