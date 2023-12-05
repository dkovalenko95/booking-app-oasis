import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { createEditCabin } from '../../services/apiCabins';

function CreateCabinForm({ cabinToEdit = {}, setShowForm }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const queryClient = useQueryClient();

  // CREATE/EDIT MODE
  const isEditSession = Boolean(editId); // indicate edit/create mode for form

  // React Hook Form
  const { register, handleSubmit, reset, getValues, formState } = useForm(
    {
      defaultValues: isEditSession
        ? editValues // values from form fields
        : {}
    });
  const { errors } = formState;

  // TODO: Apply DRY for 2 func below
  // Create cabin
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('Cabin successfuly created');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  // Edit cabin
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfuly edited');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  const isProcessing = isCreating || isEditing;

  // 'data' gets from all field that registered
  function onSubmit(data) {
    console.log(data);

    const imageType = typeof data.image === 'string' ? data.image : data?.image[0]; // CREATE - image new 'object' || EDIT - image existed 'string' url from Supabase 

    if (isEditSession)
      editCabin({
        newCabinData: {
          ...data,
          image: imageType
        },
        id: editId
      });
    else 
      createCabin({
      ...data,
      image: imageType
    });

    setShowForm(false);
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
          disabled={isProcessing}
          {...register('name', {
            required: 'This field is required'
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isProcessing}
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
          disabled={isProcessing}
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
          disabled={isProcessing}
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
          disabled={isProcessing}
          defaultValue=''
          {...register('description', {
            required: 'This field is required'
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          disabled={isProcessing}
          accept='image/*'
          {...register('image', {
            validate: (fileData) => {
              if (typeof fileData === 'string' || fileData?.length > 0) return true;
              if (fileData.length === 0) return 'This field is required';
            },
            required: isEditSession ? false : 'This field is required'
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation='secondary'
          type='reset'
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button
          disabled={isProcessing}
        >
          {isEditSession ? 'Edit cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
