import { ReactNode } from "react";

export type User = {
  id: number,
  userName: string,
  displayName?: string,
  email?: string,
  isAuthorized: boolean
}

export type AuthContextType = {
  user: User;
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
};

export type AuthProviderProps = {
  children: ReactNode;
};
