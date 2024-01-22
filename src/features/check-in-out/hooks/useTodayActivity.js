import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity as getStaysTodayActivityAPI } from '../../../services/apiBookings';

export function useTodayActivity() {
  const { data: todayActivity, isLoading: isLoadingTodayActivity } = useQuery({
    queryKey: ['today-activity'],
    queryFn: getStaysTodayActivityAPI,
  });

  return {
    todayActivity,
    isLoadingTodayActivity,
  };
};