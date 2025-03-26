import { Routes, Route } from 'react-router-dom';

import { Login } from '@/modules/auth/login/login.view';
import { Navbar } from '@/components/ui/navbar';

function Scafold() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-6">
        <Routes>
          <Route path="/" element={<div><h1>Guest</h1></div>}/>
        </Routes>
      </main>
    </div>
  )
}

export function Guest() {
  return (
    <Routes>
      <Route path="/" element={<Scafold />}/>
      <Route path="/iniciar" element={<Login/>}/>
      <Route path="*" element={<div><h1>No encontrado</h1></div>}/>
    </Routes>
  )
}
