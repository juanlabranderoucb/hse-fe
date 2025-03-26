import { useContext } from 'react';
import { AuthContext } from './auth.context';
import { AuthContextType } from './auth.type';

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
