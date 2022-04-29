import APIEntityManagerExtendable from './APIEntityManagerExtendable';

import { IList, ListRequestParams, ListResponse } from '../types';

/**
 * Instance of APIEntityManagerExtendable for managing lists
 */
export default new APIEntityManagerExtendable<
  IList,
  ListRequestParams,
  ListResponse
>('lists');
