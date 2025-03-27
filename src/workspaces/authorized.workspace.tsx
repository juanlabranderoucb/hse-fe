import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/ui/navbar';
import { useAuth } from '@/hooks/auth/auth.hook';
import { ScReportList } from '@/modules/safety/rcs/sc-report-list.view';

export function Authorized() {
  const auth = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar auth={auth}/>
      <main className="flex-1 container py-6">
        <Routes>
          <Route path="/" element={<div><h1>Inicio</h1></div>} />
          <Route path="/rcs" element={<ScReportList/>}/>
          <Route
              path="/iniciar"
              element={<Navigate to="/" replace />}
          />
          <Route path="*" element={<div><h1>No encontrado</h1></div>}/>
        </Routes>
      </main>
    </div>
  )
}
