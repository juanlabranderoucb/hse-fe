
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

  const login = (token: string) => {
    localStorage.setItem('token', token);
    location.reload();
  }

  const logout = () => {
    localStorage.removeItem('token');
    location.reload();
  }

  const setUser = (user: User) => setUserData({ ...user, isAuthorized: Boolean(user.id) });

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
