import { ReactNode } from "react";

export type FetchContextType = {
  url: string;
};

export type FetchProviderProps = {
  children: ReactNode;
  client: FetchContextType;
};
