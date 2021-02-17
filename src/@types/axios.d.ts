declare module 'axios' {
  interface AxiosResponse {
    code?: number;
    message? : string;
  }
}

export {};
