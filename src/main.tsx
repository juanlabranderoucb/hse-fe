import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './hooks/auth/auth.provider.tsx'
import { FetchProvider } from './hooks/fetch/fetch.provider.tsx'
import { ContextOptions } from './hooks/fetch/fetch.type.ts'
import { App } from './app/app.tsx'

const client = {
  url: import.meta.env.VITE_API_URI,
  options: {
    headers: {
      'Content-Type': 'application/json'
    }
  },
  setContext: ({ headers }: ContextOptions) => {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <FetchProvider client={client}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </FetchProvider>
    </BrowserRouter>
  </StrictMode>,
)
