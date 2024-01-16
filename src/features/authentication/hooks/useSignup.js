import { useMutation } from '@tanstack/react-query';
import { signup as signupAPI } from '../../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: signupAPI,
    
    onSuccess: () => {
      toast.success('Account successfully created! Please, verify the new account from the user\'s email address.');
    },

    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  return {
    signup,
    isSigningUp,
  };
};