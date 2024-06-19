import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import { useRecentBookings } from './hooks/useRecentBookings';
import { useRecentStays } from './hooks/useRecentStays';
import { useFetchCabins } from '../cabins/hooks/useFetchCabins';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart'
import TodayActivity from '../check-in-out/TodayActivity';
import { devices } from '../../utils/devices';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 2.4rem;
  /* grid-template-rows: auto 34rem auto; */

  @media ${devices.xl} {
    gap: 2.2rem;
  }

  @media ${devices.lg} {
    grid-template-columns: 1fr 1fr;
    gap: 1.8rem;
  }

  @media ${devices.md} {
    gap: 1.4rem;
  }

  @media ${devices.xxs} {
    gap: 1rem;
  }
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { confirmedStays, isLoading: isLoadingStays, numDays } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useFetchCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins) return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        numCabins={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
