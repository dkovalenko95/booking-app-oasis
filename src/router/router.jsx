import { createBrowserRouter } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import RootLayout from '../layout/RootLayout/RootLayout';
import PageNotFound from '../pages/PageNotFound';
import Dashboard from '../pages/Dashboard';
import Bookings from '../pages/Bookings';
import Cabins from '../pages/Cabins';
import Users from '../pages/Users';
import Settings from '../pages/Settings';
import Account from '../pages/Account';
import Login from '../pages/Login';
import Booking from '../pages/Booking';
import Checkin from '../pages/Checkin';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <ProtectedRoute>
      <RootLayout />
    </ProtectedRoute>,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Navigate to='/dashboard' replace />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/bookings',
        element: <Bookings />,
      },
      {
        path: '/bookings/:bookingId',
        element: <Booking />,
      },
      {
        path: '/checkin/:bookingId',
        element: <Checkin />,
      },
      {
        path: '/cabins',
        element: <Cabins />
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/settings',
        element: <Settings />
      },
      {
        path: '/account',
        element: <Account />
      },
    ],
  },
]);
