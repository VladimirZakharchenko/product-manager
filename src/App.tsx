import { LoginForm } from './components/auth/LoginForm';
import { ProductTable } from './components/products/ProductTable';
import { useAuthStore } from './store/authStore';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import './App.css';

function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const checkSession = useAuthStore(state => state.checkSession);

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      {!isAuthenticated ? <LoginForm /> : <ProductTable />}
    </>
  );
}

export default App;