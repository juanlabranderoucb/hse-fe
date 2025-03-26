import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/ui/navbar';
import { useAuth } from '@/hooks/auth/auth.hook';

export function Authorized() {
  const auth = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar auth={auth}/>
      <main className="flex-1 container py-6">
        <Routes>
          <Route path="/" element={<div><h1>Authorized</h1></div>} />
          <Route
              path="/iniciar"
              element={<Navigate to="/" replace />}
          />
        </Routes>
      </main>
    </div>
  )
}
