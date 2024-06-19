import { useQuery } from '@tanstack/react-query';
import { getCountriesWithFlags } from '../../../services/apiBookings';
import { COUNTRIES } from './countries';

export function useFetchCountries() {
  const { data: countries, isLoading, error } = useQuery({
    queryKey: ['countries'],
    queryFn: () => getCountriesWithFlags(COUNTRIES),
  });

  return {
    countries,
    isLoading,
    error,
  };
};
