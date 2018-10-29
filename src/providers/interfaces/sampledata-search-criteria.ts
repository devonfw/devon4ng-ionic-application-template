import { Pagination } from "./pagination";

/** Interface used for searching sampledatas by criteria on the server.*/
export interface SampledataSearchCriteria {
    name:string,
    surname:string,
    age:number,
    mail:string,
    pagination: Pagination,
}