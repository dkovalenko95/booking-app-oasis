import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) => 
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),

    // 'data' - returned from mutation function(apiBookings())
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries(
        // { queryKey: ['bookings'] }
        { active: true } // invalidate all the queries that are currenty active on the page
      );
      navigate('/');
    },

    onError: (error) => toast.error(error.message),
  });

  return {
    checkin,
    isCheckingIn,
  };
};
