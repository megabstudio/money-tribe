import { createBrowserRouter } from 'react-router'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import Dashboard from './components/Dashboard'
import YourTribes from './components/YourTribes'
import TribeDetail from './components/TribeDetail'
import CreateTribe from './components/CreateTribe'
import Messages from './components/Messages'
import FindTribe from './components/FindTribe'
import Analytics from './components/Analytics'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Login,
  },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/forgot-password',
    Component: ForgotPassword,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/your-tribes',
    element: (
      <ProtectedRoute>
        <YourTribes />
      </ProtectedRoute>
    ),
  },
  {
    path: '/tribes/:id',
    element: (
      <ProtectedRoute>
        <TribeDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: '/create-tribe',
    element: (
      <ProtectedRoute>
        <CreateTribe />
      </ProtectedRoute>
    ),
  },
  {
    path: '/messages',
    element: (
      <ProtectedRoute>
        <Messages />
      </ProtectedRoute>
    ),
  },
  {
    path: '/find-tribe',
    element: (
      <ProtectedRoute>
        <FindTribe />
      </ProtectedRoute>
    ),
  },
  {
    path: '/analytics',
    element: (
      <ProtectedRoute>
        <Analytics />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
])
