import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom"; // router-dom hobe
import { router } from './router/router.jsx';
import 'aos/dist/aos.css';
import Aos from 'aos';
import AuthProvider from './Contexts/AuthContext/AuthProvider.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// 1. Prothome ekta QueryClient instance banate hobe
const queryClient = new QueryClient();

Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Font ar layout wrapper thik ase */}
    <div className='font-urbanist max-w-7xl mx-auto'>
      {/* 2. client={queryClient} oboshoy dite hobe */}
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)