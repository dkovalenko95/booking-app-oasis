import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser as updateCurrentUserAPI } from '../../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateCurrentUser, isPending: isUpdatingCurrUser } = useMutation({
    mutationFn: ({ password, fullName, avatar }) => updateCurrentUserAPI({ password, fullName, avatar }),

    onSuccess: () => {
      toast.success('User account successfully updated');
      queryClient.invalidateQueries({ queryKey: ['user'] });

      // Manual cache update, 'user' should come from: 'onSuccess: ({ user }) => {...' (in case it could be useful)
      // queryClient.setQueryData(['user'], data.user);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    updateCurrentUser,
    isUpdatingCurrUser,
  };
};