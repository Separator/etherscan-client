import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { Chain } from '../types/chain';

export interface Transport {
  getApiKey(): string;
  getUrl(): string;
  get<T>(options: any): Promise<AxiosResponse<T>>;
  post<T>(options?: any, params?: any): Promise<AxiosResponse<T>>;
}

export interface TransportOptions {
  url: string;
  apikey: string;
  chainid?: Chain | number;
  options?: AxiosRequestConfig;
}

export class AxiosTransport implements Transport {
  protected url: string = '';
  protected apikey: string = '';
  protected options: AxiosRequestConfig = {};
  protected chainid?: Chain | number;

  constructor(props: TransportOptions) {
    const { apikey, url, chainid, options = {} } = props;

    this.url = url;
    this.apikey = apikey;
    this.options = options;

    if (chainid) {
      this.chainid = chainid;
    }
  }

  public async get<T>(options: any): Promise<AxiosResponse<T>> {
    const { apikey, chainid } = this;

    const response = await axios.get<T>(this.url, {
      ...this.options,
      headers: {
        'User-Agent': '',
        'Ok-Access-Key': apikey
      },
      params: {
        apikey,
        chainid,
        ...options
      }
    });

    return response;
  }

  public async post<T>(options: any = {}, params: any = {}): Promise<AxiosResponse<T>> {
    const { apikey, chainid } = this;

    const response = await axios.post<T>(this.url, options, {
      ...this.options,
      params: {
        apikey,
        chainid,
        ...params
      },
      headers: {
        'User-Agent': '',
        'Ok-Access-Key': apikey
      }
    });

    return response;
  }

  public getApiKey(): string {
    return this.apikey;
  }

  public getUrl(): string {
    return this.url;
  }

  public getChainId(): Chain | number | undefined {
    return this.chainid;
  }
}
