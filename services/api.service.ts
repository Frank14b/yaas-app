import axios, { CancelTokenSource } from "axios";

import { ApiResponseDto, ObjectKeyDto, RequestMethod } from "../types";
import { Environments } from "@/constants/Environment";
import { storage } from "@/utils/expo-storage";
import { StorageKeys } from "@/constants";

//create axios api call instance
const instance = axios.create({
  baseURL: `${Environments.API_HOST}`, // Set your base URL here
});

// setup an interceptor for all requests
const applyRequestInterceptor = async ({ isSecure }: { isSecure: boolean }) => {

  const authToken = await storage.getItem<string>(StorageKeys.AUTH_TOKEN);

  instance.interceptors.request.use(
    async (config) => {
      // Add an authorization header
      if (authToken && authToken.length > 0 && isSecure) {
        config.headers.Authorization = `Bearer ${`${authToken}`}`;
      }

      return config;
    },
    (error) => {
      // Handle request errors here
      return Promise.reject(error); // Or custom error handling
    }
  );
};

// instance.interceptors.response.use()

let requestSource: CancelTokenSource | null = null; // Store cancellation token for each request

export const apiCall = async <R, T = unknown, P = unknown>({
  method = "GET",
  url,
  data,
  params,
  headers = {},
  isSecure = true,
}: {
  method?: RequestMethod;
  url: string;
  data?: T;
  params?: P;
  headers?: ObjectKeyDto;
  isSecure?: boolean;
}): Promise<ApiResponseDto<R>> => {
  try {
    requestSource = axios.CancelToken.source();

    await applyRequestInterceptor({ isSecure }); // apply request interceptor

    const response = await instance({
      method,
      url,
      data,
      params,
      headers,
      // cancelToken: requestSource.token,
      timeout: 20000,
    });

    return ApiSuccessMessage<R>(response.data, response.status);
  } catch (error) {

    if (axios.isCancel(error)) {
      console.log("Request cancelled");
    }

    if (!error) throw error;

    const finalError = error as ObjectKeyDto;
    if (finalError.response?.status == 401) {
      // await storage.deleteItem(StorageKeys.AUTH_TOKEN);
      console.log("Unauthorized User");
    }

    return ApiErrorMessage<R>(finalError);
  } finally {
    if (requestSource) {
      requestSource.cancel(); // Clean up cancellation token
      requestSource = null;
    }
  }
};

export const ApiErrorMessage = <T>(error: ObjectKeyDto): ApiResponseDto<T> => {
  return {
    status: false,
    message:
      error?.response?.data?.title ??
      error?.response?.data?.error ??
      error?.response?.data,
    data: error?.response?.data?.errors,
    statusCode: customErrorCode?.[error.code] ?? error?.response?.status,
  };
};

export const ApiSuccessMessage = <T>(
  data: T,
  statusCode: number = 200,
  message: string = "Success"
): ApiResponseDto<T> => {
  return {
    status: true,
    message: message,
    data: data,
    statusCode,
  };
};

export const customErrorCode: {
  [key: string]: number;
} = {
  ENOTFOUND: 4040,
  ECONNABORTED: 4040,
  ECONNRESET: 4040,
  ECONNREFUSED: 4040,
  ETIMEDOUT: 4040,
  EHOSTUNREACH: 4040,
  ERR_NETWORK: 4040,
  EPIPE: 4040,
  EAI_AGAIN: 4040,
  EAI_BADFLAGS: 4040,
  EAI_FAIL: 4040,
  EAI_FAMILY: 4040,
  EAI_MEMORY: 4040,
  EAI_NODATA: 4040,
  EAI_NONAME: 4040,
  EAI_SERVICE: 4040,
};
