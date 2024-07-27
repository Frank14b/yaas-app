export type RequestMethod = "POST" | "GET" | "DELETE" | "PUT" | "PATCH";

export interface ApiResponseDto<T> {
  status: boolean;
  message: string;
  data?: T;
  statusCode?: number;
}

export interface BooleanResultDto<T> {
  status: boolean;
  message: string;
  data?: Array<T> | object | string | number | undefined | T | ObjectKeyDto;
}

export interface ResultPaginate<T> {
  data: T;
  skip: number;
  limit: number;
  total: number;
  sort: string;
  currentPage: number;
  lastPage: number;
}

export type ObjectKeyDto = {
  [key: string]: string | number| any | Array<any>;
};
