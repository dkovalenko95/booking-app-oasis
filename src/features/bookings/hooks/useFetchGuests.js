import { useQuery } from '@tanstack/react-query';
import { getGuests } from '../../../services/apiBookings';

export function useFetchGuests() {  
  const { isLoading, data: guests, error } = useQuery({
    queryKey: ['guests'],
    queryFn: getGuests,
  });

  return {
    isLoading,
    guests,
    error,
  };
}
