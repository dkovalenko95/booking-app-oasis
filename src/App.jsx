import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import RootLayout from './layout/RootLayout/RootLayout';
import PageNotFound from './pages/PageNotFound';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <PageNotFound />,
    children: [
      // {
      //   index: true,
      //   element: <Navigate to='/dashboard' replace />,
      // },
      {
        index: true,
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/bookings',
        element: <Bookings />,
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
  {
    path: '/login',
    element: <Login />,
  },
]);

function App() {

  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
