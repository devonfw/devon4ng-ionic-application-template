import { Pageable } from './pageable';

/** Interface used for searching sampledatas by criteria on the server. */
export interface SampledataSearchCriteria {
  name: string;
  surname: string;
  age: number;
  email: string;
  pageable: Pageable;
}
