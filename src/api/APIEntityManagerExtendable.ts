import { AxiosResponse } from 'axios';

import axios from '../axios';
import { ExtendedClass } from '../types';

/**
 * Class for building other classes for managing APIs
 * TEntity - generic which describes an entity to work with (e.g,
 * ITodo or IList)
 * RequestParams - generic which describes what parameters we will
 * accept on post or put requests
 * TResponse - generic which describes axios response type
 */
class APIEntityManagerExtendable<TEntity, RequestParams, TResponse> {
  // Accept api path on initialization (e.g, "cards" or "lists")
  constructor(private apiPath: string) {}

  /* Default methods - methods which are going to be on all apiManagers 
     from the beginning
  */
  // DEFAULT METHODS START
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
  // DEFAULT METHODS END

  /**
   * Static method (kind of a factory) which returns a class which extends
   * APIEntityManagerExtendable and has some new methods which we specify
   * ourselves (newMethods param).
   * The whole point of this method is to extend existing functionality with
   * new required methods.
   *
   * Just in case:
   * https://stackoverflow.com/questions/46258728/dynamic-class-methods
   */
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

    // The extension
    return Class as ExtendedClass<Class, Methods, [string]> & typeof Class;
  }
}

export default APIEntityManagerExtendable;
