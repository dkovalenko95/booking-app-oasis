import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinAPI } from '../../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  // Delete cabin
  const { mutate: deleteCabin, isPending, isSuccess } = useMutation({
    mutationFn: deleteCabinAPI,

    onSuccess: () => {
      toast.success('Cabin successfully deleted');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      }); // allow to mark queries as stale and potentially refetch data
    }, // called after successful mutation

    onError: (error) => toast.error(error.message), // err from muatation func deleteCabin
  });

  const isDeleting = isPending || isSuccess;

  return {
    deleteCabin,
    isDeleting,
  };
}
