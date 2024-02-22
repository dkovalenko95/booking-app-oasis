import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createGuest as createGuestAPI } from '../../../services/apiBookings';

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { mutate: createGuest, isPending: isCreatingGuest } = useMutation({
    mutationFn: createGuestAPI,
    onSuccess: () => {
      toast.success('Guest successfuly created');
      queryClient.invalidateQueries({
        queryKey: ['guests'],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    createGuest,
    isCreatingGuest,
  };
};
