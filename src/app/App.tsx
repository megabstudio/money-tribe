import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function App() {
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.auth.signUp({
        email: 'test@savingstribe.com',
        password: 'test123456'
      })

      if (error) {
        console.error('❌ Error:', error.message)
      } else {
        console.log('✅ Supabase conectado. Usuario creado:', data.user?.email)
      }
    }

    testConnection()
  }, [])

  return <RouterProvider router={router} />;
}