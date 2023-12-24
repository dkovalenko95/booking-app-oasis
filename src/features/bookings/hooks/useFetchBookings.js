import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookings } from '../../../services/apiBookings';

export function useFetchBookings() {
  const [searchParams] = useSearchParams();
  
  // Filter (API-side filtering)
  const filterValue = searchParams.get('status');
  const filter = !filterValue || filterValue === 'all'
    ? null
    : {
      field: 'status',
      value: filterValue,
      // method: null,
    }

  const { isLoading, data: bookings, error } = useQuery({
    // Re-fetch data if filter applied -> add value that query should be depend on in arr below -> if dependency changes -> re-fetch + (can think about this arr ['bookings', filter] in queryKey as dependency arr of useQuery())
    queryKey: ['bookings', filter],
    queryFn: () => getBookings({filter}),
  });

  return {
    isLoading,
    bookings,
    error,
  };
}
