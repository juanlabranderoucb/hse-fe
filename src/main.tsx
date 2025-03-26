import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AuthProvider } from './hooks/auth/auth.provider.tsx'
import { App } from './app/app.tsx'
import { FetchProvider } from './hooks/fetch/fetch.provider.tsx'

const client = {
  url: import.meta.env.VITE_API_URI,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FetchProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </FetchProvider>
    
  </StrictMode>,
)
