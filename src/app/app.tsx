import { useAuth } from '@/hooks/auth/auth.hook';
import { User } from '@/hooks/auth/auth.type';
import { useQuery } from '@/hooks/fetch/fetch.hook';
import { Guest } from '@/workspaces/guest.workspace';
import { Authorized } from '@/workspaces/authorized.workspace';

import './app.css'

function useApp() {
  const { user, setUser } = useAuth();
  const { loading } = useQuery('/auth/profile', { method: 'POST', onCompleted: (data: User) => setUser(data) });

  return { user, loading };
}

export function App() {
  const { user, loading } = useApp();

  return loading ? (<div>Cargando...</div>)
  : user.isAuthorized ? (
    <Authorized />
  ) : (
    <Guest />
  )
}
