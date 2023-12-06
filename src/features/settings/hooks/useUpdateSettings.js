import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSetting as updateSettingsAPI } from '../../../services/apiSettings';

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: (newSetting) => updateSettingsAPI(newSetting),
    onSuccess: () => {
      toast.success('Settings successfully updated');
      queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    updateSettings,
    isUpdating,
  };
}
