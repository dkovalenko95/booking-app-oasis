import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { createCabin } from '../../services/apiCabins';

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,

    onSuccess: () => {
      toast.success('Cabin successfuly created');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });

      reset();
    },

    onError: (error) => toast.error(error.message),
  });

  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  // 'data' gets from all field that registered
  function onSubmit(data) {
    mutate({ ...data, image: data?.image[0] })
  };

  function onError(errors) {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>

      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isPending}
          {...register('name', {
            required: 'This field is required'
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isPending}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isPending}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isPending}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (currInputValue) =>
              +currInputValue <= +getValues().regularPrice || 'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          disabled={isPending}
          defaultValue=''
          {...register('description', {
            required: 'This field is required'
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          disabled={isPending}
          accept='image/*'
          {...register('image', {
            required: 'This field is required'
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation='secondary'
          type='reset'
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          disabled={isPending}
        >
          Add cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
