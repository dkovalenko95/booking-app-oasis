import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookings } from '../../../services/apiBookings';
import { PAGE_CAPACITY } from '../../../utils/constants';

export function useFetchBookings() {
  const queryClient = useQueryClient();
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
  
  // Sort (API-side sorting)
  const sortByRawData = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRawData.split('-');
  const sortBy = { field, direction };

  // Pagination (API-side)
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // Query
  const { isLoading, data: { data: bookings, count } = {}, error } = useQuery({
    // Re-fetch data if filter applied -> add value that query should be depend on in arr below -> if dependency changes -> re-fetch + (can think about this arr ['bookings', filter, sortBy] in queryKey as dependency arr of useQuery())
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Pre-fetching
  const numOfPages = Math.ceil(count / PAGE_CAPACITY);
  if (page < numOfPages) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  };

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  };

  return {
    isLoading,
    bookings,
    count,
    error,
  };
}
