
import { useState } from 'react';
import { AuthProviderProps, User } from './auth.type';
import { AuthContext } from './auth.context';

const guest: User = {
  id: 0,
  userName: 'guest',
  isAuthorized: false
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUserData] = useState<User>(guest);

  const login = (token: string) => localStorage.setItem('token', token);

  const logout = () => localStorage.removeItem('token');

  const setUser = (user: User) => setUserData(user)

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
