import {  createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/template/Layout';
import Dashboard from './Pages/Dashboard/Dashboard';
import City from './Pages/City/City';
import { ThemeProvider } from './Context/theme-provider';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/sonner';
const router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      {
        index: true, element: <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      },
      {
        path: '/dashboard', element: <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      },
      {
        path: '/city/:cityName', element: <ProtectedRoute>
          <City />
        </ProtectedRoute>
      },
    ]
  }
]);
const clinet = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      retry: false,
      gcTime: 10 * 60 * 1000
    }
  }
});
export default function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={clinet}>
          <RouterProvider router={router} />
          <Toaster toastOptions={{
            duration: 1500,
            style: {
              fontSize: '15px'
            }
          }} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}
