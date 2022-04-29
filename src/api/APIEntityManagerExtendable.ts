import { AxiosResponse } from 'axios';

import axios from '../axios';

type ExtendedClass<Class, Methods, ArgsType extends unknown[] = []> = {
  new (...args: ArgsType): Class & Methods;
};

/**
 * Class for building other classes for managing APIs
 */
class APIEntityManagerExtendable<TEntity, RequestParams, TResponse> {
  constructor(protected apiPath: string) {}

  create = async (
    data: RequestParams,
  ): Promise<AxiosResponse<TResponse>> => {
    return await axios.post(this.apiPath, data);
  };

  fetchAll = async (): Promise<AxiosResponse<TEntity[]>> => {
    return await axios.get(this.apiPath);
  };

  update = async (
    id: number,
    data: RequestParams,
  ): Promise<AxiosResponse<TResponse>> => {
    return await axios.put(`${this.apiPath}/${id}`, data);
  };

  deleteAll = async (): Promise<AxiosResponse<TResponse>> => {
    return await axios.get(this.apiPath);
  };

  deleteSingle = async (id: number): Promise<AxiosResponse<TResponse>> => {
    return await axios.delete(`${this.apiPath}/${id}`);
  };

  static extend<TEntity, RequestParams, TResponse, Methods>(
    newMethods: Methods,
  ): ExtendedClass<
    APIEntityManagerExtendable<TEntity, RequestParams, TResponse>,
    Methods,
    [string]
  > &
    typeof APIEntityManagerExtendable {
    class Class extends this<TEntity, RequestParams, TResponse> {
      constructor(apiPath: string) {
        super(apiPath);
        Object.assign(this, newMethods);
      }
    }

    return Class as ExtendedClass<Class, Methods, [string]> & typeof Class;
  }
}

export default APIEntityManagerExtendable;
