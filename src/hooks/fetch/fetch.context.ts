import { createContext } from "react";
import { ContextOptions, FetchContextType } from "./fetch.type";

export const FetchContext = createContext<FetchContextType>({
  url: '',
  options: {
    headers: {},
  },
  setContext: (context: ContextOptions) => context,
});
