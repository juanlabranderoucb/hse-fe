import { createContext } from 'react';
import { AuthContextType } from './auth.type';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
