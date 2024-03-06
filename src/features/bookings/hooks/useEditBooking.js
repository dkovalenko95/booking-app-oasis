import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { editBooking as editBookingAPI } from '../../../services/apiBookings';

export function useEditBooking() {
  const queryClient = useQueryClient();

  const { mutate: editBooking, isPending: isEditing } = useMutation({
    mutationFn: ({ newBookingData, id }) => editBookingAPI(newBookingData, id), // mutation func recieves only 1 argument -> pass {} with needed values 
    onSuccess: () => {
      toast.success('Booking successfuly edited');
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return {
    editBooking,
    isEditing,
  };
}
