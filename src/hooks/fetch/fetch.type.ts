import { ReactNode } from "react";

export type FetchOptions<TResponse> = {
  method: string;
  onCompleted?: (data: TResponse) => void;
  data?: object;
  onError?: (error: object) => void;
}

export type ContextOptions = {
  headers: HeadersInit;
}

export type FetchContextType = {
  url: string;
  options: ContextOptions;
  setContext: (context: ContextOptions) => ContextOptions;
};

export type FetchProviderProps = {
  children: ReactNode;
  client: FetchContextType;
};
