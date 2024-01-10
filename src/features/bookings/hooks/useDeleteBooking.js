import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking as deleteBookingAPI } from '../../../services/apiBookings';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isPending, isSuccess } = useMutation({
    mutationFn: deleteBookingAPI,

    onSuccess: () => {
      toast.success('Booking successfully deleted');

      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },

    onError: (error) => toast.error(`Error occurred. ${error.message}`),
  });

  const isDeletingBooking = isPending || isSuccess;

  return {
    deleteBooking,
    isDeletingBooking,
  }
};
