
import { useState, useContext } from 'react';

import { FetchContext } from './fetch.context';

type FetchOptions<TResponse> = {
  method: string;
  onCompleted?: (data: TResponse) => void;
  data?: object;
  onError?: (error: object) => void;
}

type FetchResult<TResponse> = {
  loading: boolean;
  data?: TResponse;
  error?: object;
  called: boolean;
  refetch?: () => void;
}

type FetchArgs = {
  body?: object;
  params?: string | Array<string>;
}

function useFetchProps<T>(to: string, options: FetchOptions<T>) {
  const client = useContext(FetchContext);

  const url = client.url + to;
  const props = {
    method: options.method || 'GET'
  };

  const makeResult = async (response: Response) => {
    let result: FetchResult<T>;
    const payload = await response.json();

    if (response.status < 300) {
      result = { loading: false, data: payload, error: undefined, called: true };
      options.onCompleted && options.onCompleted(payload);
    }
    else {
      result = { loading: false, data: undefined, error: payload, called: true };
      options?.onError && options.onError(payload);
    }

    return { result };
  };

  const params = (data: Array<string> | string | undefined) => {
    if (!data) return url;
    if (Array.isArray(data)) {
      let result = `${url}/${data}`;
      for (const value of data) {
        result = `${result}/${value}`;
      }
      return result;
    }
    return `${url}/${data}`;
  };

  return { url, props, makeResult, params };
}

function useFetch<T>(to: string, options: FetchOptions<T>) {
  const defautResult: FetchResult<T> = { loading: true, data: undefined, error: undefined, called: false }
  const [ result, setResult] = useState(defautResult);
  const { props, makeResult, params } = useFetchProps(to, options);

  const call = async (args?: FetchArgs) => {
    setResult({ ...result, loading: true });
    const response = await fetch(params(args?.params), { ...props, body: args?.body ? JSON.stringify(args.body) : undefined });
    const maked = await makeResult(response);
    setResult(maked.result);
    return maked.result;
  };

  return [ call, result ];
}

export function usePost<T>(to: string, options: FetchOptions<T>) {
  return useFetch(to, { ...options, method: 'POST' });
}

export function useGet<T>(to: string, options: FetchOptions<T>) {
  return useFetch(to, { ...options, method: 'GET' });
}

export function usePut<T>(to: string, options: FetchOptions<T>) {
  return useFetch(to, { ...options, method: 'PUT' });
}

export function useDelete<T>(to: string, options: FetchOptions<T>) {
  return useFetch(to, { ...options, method: 'DELETE' });
}

export function useQuery<T>(to: string, options: FetchOptions<T>) {
  const defautResult: FetchResult<T> = { loading: true, data: undefined, error: undefined, called: false }
  const [ result, setResult] = useState(defautResult);
  const { url, props, makeResult } = useFetchProps(to, options);

  const refetch = async () => {
    const response = await fetch(url, { ...props, body: options.data ? JSON.stringify(options.data) : undefined });
    const maked = await makeResult(response);
    setResult(maked.result);
    return maked.result;
  };

  if (!result.called) refetch();

  return { ...result, refetch };
}
