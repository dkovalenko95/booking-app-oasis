import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createBooking as createBookingAPI } from '../../../services/apiBookings';

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isPending: isCreatingBooking } = useMutation({
    mutationFn: createBookingAPI,
    onSuccess: () => {
      toast.success('Booking successfuly created');
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    createBooking,
    isCreatingBooking,
  };
};