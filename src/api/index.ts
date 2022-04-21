import { AxiosResponse } from "axios";
import axios from "../axios";

export default class APILayer {
  static async fetchTodos(): Promise<AxiosResponse> {
    return await axios.get("cards/filter?listId=4");
  }

  static async toggleIsCompleted(id: number): Promise<AxiosResponse> {
    await axios.put(`cards/complete/${id}`);
    return await APILayer.fetchTodos();
  }

  static async addNewTodo(
    name: string,
    listId: number
  ): Promise<AxiosResponse> {
    await axios.post("cards", { name, listId });
    return await APILayer.fetchTodos();
  }

  static async deleteExistingTodo(id: number): Promise<AxiosResponse> {
    await axios.delete(`cards/${id}`);
    return await APILayer.fetchTodos();
  }

  static async updateTodoName(
    id: number,
    name: string
  ): Promise<AxiosResponse> {
    await axios.put(`cards/${id}`, { name });
    return await APILayer.fetchTodos();
  }

  static async deleteCompletedTodos(): Promise<AxiosResponse> {
    await axios.delete("cards/complete/all");
    return await APILayer.fetchTodos();
  }

  static async toggleGlobalIsCompleted(
    isCompletedValue: boolean
  ): Promise<AxiosResponse> {
    await axios.put(`cards/complete/all/${isCompletedValue}`);
    return await APILayer.fetchTodos();
  }
}
