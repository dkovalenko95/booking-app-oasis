import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBooking } from '../../../services/apiBookings';

export function useUnconfirmed() {
  const queryClient = useQueryClient();

  const { mutate: setUnconfirmed, isPending: isSettingUnconfirmed } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'unconfirmed',
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} status changed to unconfirmed`);
      queryClient.invalidateQueries({ active: true }); // invalidate all the queries that are currenty active on the page
    },
  
    onError: (error) => toast.error(error.message),
  })

  return {
    setUnconfirmed,
    isSettingUnconfirmed,
  };
};