import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUpdateUser } from './hooks/useUpdateUser';

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateCurrentUser, isUpdatingCurrUser } = useUpdateUser();

  function onSubmit({ password }) {
    updateCurrentUser({ password }, {
      onSuccess: () => reset(),
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label='New password'
        error={errors?.password?.message}
        hint='min 8 chars'
        orientation='vertical'
      >
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          disabled={isUpdatingCurrUser}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Confirm password'
        error={errors?.passwordConfirm?.message}
        orientation='vertical'
      >
        <Input
          type='password'
          autoComplete='new-password'
          id='passwordConfirm'
          disabled={isUpdatingCurrUser}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              getValues().password === value || 'Passwords need to match',
          })}
        />
      </FormRow>
      <FormRow>
        <Button
          onClick={reset}
          type='reset'
          $variation='secondary'
        >
          Cancel
        </Button>
        <Button disabled={isUpdatingCurrUser}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
