import { useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useGetUser } from './hooks/useGetUser';
import { useUpdateUser } from './hooks/useUpdateUser';

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useGetUser();

  const { updateCurrentUser, isUpdatingCurrUser } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateCurrentUser({ fullName, avatar }, {
      onSuccess: () => {
        setAvatar(null);
        e.target.reset();
      },
    });
  };

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address' orientation='vertical'>
        <Input value={email} disabled />
      </FormRow>
      <FormRow label='Full name' orientation='vertical'>
        <Input
          type='text'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id='fullName'
          disabled={isUpdatingCurrUser}
        />
      </FormRow>
      <FormRow label='Avatar image' orientation='vertical'>
        <FileInput
          id='avatar'
          accept='image/*'
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdatingCurrUser}
        />
      </FormRow>
      <FormRow>
        <Button
          type='reset'
          $variation='secondary'
          disabled={isUpdatingCurrUser}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdatingCurrUser}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
