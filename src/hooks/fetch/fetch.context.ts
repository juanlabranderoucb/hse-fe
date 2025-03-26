import { createContext } from "react";
import { FetchContextType } from "./fetch.type";

export const FetchContext = createContext<FetchContextType>({
  url: '',
});
