import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login as loginAPI } from '../../../services/apiAuth';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    
    // 'data' - user/session data recieved from func as input
    onSuccess: (data) => {
      // NOTE: does NOT work as should - ???
      // Manually add 'user' to React Query cache -> 
      // -> right after 'logging in' there is no need to run getCurrentUser() again (so after 1st initial log in, because it user's data was downloaded in time with logging in). 
      // If there is a active session with user then need to re-fetch user's data
      queryClient.setQueryData(['user'], data.user); // allows manually set some data into the React Query cache

      navigate('/dashboard', { replace: true });
    },

    onError: (error) => {
      console.error('ERROR while log in.', error);
      toast.error('Provided email or password are incorrect')
    },
  });

  return {
    login,
    isLoggingIn,
  };
};



// NOTE: Wrong queryClient method -> Spinner Bug
// In useLogin onSuccess handler, was using the wrong queryClient method to set the query cache manually.
// Instead of using: 
// - queryClient.setQueriesData(["user"], user);
// Have to use:
// queryClient.setQueryData(["user"], user.user);
// Since according to the docs setQueriesData is being used for updating existing cache data, not creating new ones:
// Also, have to get the user from the data obj -> data.user
// There is also a user.session in data if needed 
// https://tanstack.com/query/v4/docs/react/reference/QueryClient#queryclientsetqueriesdata
