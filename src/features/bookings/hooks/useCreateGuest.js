import { useMutation } from '@tanstack/react-query';
import { createGuest as createGuestAPI } from '../../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCreateGuest() {
  const { mutate: createGuest, isPending: isCreatingGuest } = useMutation({
    mutationFn: createGuestAPI,
    onSuccess: () => {
      toast.success('Guest successfuly created');
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    createGuest,
    isCreatingGuest,
  };
};
