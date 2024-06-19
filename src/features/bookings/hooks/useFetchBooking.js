import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../../services/apiBookings';
import { useParams } from 'react-router-dom';

export function useFetchBooking() {
  const { bookingId } = useParams();
  const { isLoading, data: booking, error } = useQuery({
    queryKey: ['bookings', bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { isLoading, booking, error };
};
