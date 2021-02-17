import { AxiosInstance } from 'axios';
import type { App } from 'vue';

interface Api {
  postColumns: (data: any) => Promise<any>,
  getColumnList: (data: any) => Promise<any>,
};
declare const Apis: Api;
export declare function useApi(): Api;
export declare const apiInstance: {
  install: (app: App<any>) => void;
} 
export default Apis;
