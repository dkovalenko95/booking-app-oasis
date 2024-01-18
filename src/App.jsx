import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import GlobalStyles from './styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { tempSignUpLogout, tempSignUpSession } from './services/apiAuth';

// Init React Query - used to interact with a cache
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // amount of time the data in the cache will stay fresh(so that it will stay valid until it is refetched again)
    }
  }
});

function App() {
  // Check for temp session logout after new user SignUp confirmation via email(check if it could be done with React Query)
  useEffect(() => {
    async function checkTempSignUpSession() {
      const session = await tempSignUpSession();
      if (!session) return null;
      if (session) {
        await tempSignUpLogout();
      };
    };
    checkTempSignUpSession();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <RouterProvider router={router} />
      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 25px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)'
          }
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
