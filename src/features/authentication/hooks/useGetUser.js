import { useQuery } from '@tanstack/react-query';
import { getCurrentUser as getCurrentUserAPI } from '../../../services/apiAuth';

// Get current user and store it into cache (to prevent unnecessary re-downloads)
export function useGetUser() {
  const { data: user, isLoading: isLoadingUser, fetchStatus } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUserAPI,
  });
  
  return {
    user,
    isLoadingUser,
    fetchStatus,
    isAuthenticated: user?.role === 'authenticated',
  };
};
