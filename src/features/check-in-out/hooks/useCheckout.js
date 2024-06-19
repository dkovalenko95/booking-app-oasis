import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBooking } from '../../../services/apiBookings';

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) => 
      updateBooking(bookingId, {
        status: 'checked-out',
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true }); // invalidate all the queries that are currenty active on the page
    },

    onError: (error) => toast.error(error.message),
  });
  
  return {
    checkout,
    isCheckingOut,
  };
};
