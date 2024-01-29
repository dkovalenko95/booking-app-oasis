import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import CountrySelector from './countryPicker/CountrySelector';
import { COUNTRIES } from './countryPicker/countries';
import { useCreateGuest } from './hooks/useCreateGuest';

function CreateBookingForm({ onCloseModal }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const { createGuest, isCreatingGuest } = useCreateGuest();

  // Country picker
  const [country, setCountry] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  function onSubmit(data) {
    const newGuestData = {
      ...data,
      nationality: country.title,
      countryFlag: `https://flagcdn.com/${country.value.toLowerCase()}.svg`,
    };

    createGuest({
      ...newGuestData,
    }, {
      onSuccess: () => {
        reset();
        setCountry(null);
        // onCloseModal?.();
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, /* onError */)} type={onCloseModal ? 'modal' : 'regular'}>

      <FormRow label='Guest full name' error={errors?.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          disabled={isCreatingGuest}
          {...register('fullName', {
            required: 'This field is required'
          })}
        />
      </FormRow>

      <FormRow label='Guest email' error={errors?.email?.message}>
        <Input
          type='email'
          id='email'
          disabled={isCreatingGuest}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email address',
            },
          })}
        />
      </FormRow>

      <FormRow label='Guest nationality' orientation='selector'>
        <CountrySelector
          register={register}
          id='country-selector'
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          countries={COUNTRIES}
          country={country}
          setCountry={setCountry}
        />
      </FormRow>

      <FormRow label='National ID' error={errors?.nationalID?.message}>
        <Input
          type='text'
          id='nationalID'
          disabled={isCreatingGuest}
          {...register('nationalID', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation='secondary'
          type='reset'
          disabled={isCreatingGuest}
          onClick={() => onCloseModal?.()} // conditional call with optional chaining
        >
          Cancel
        </Button>
        <Button
          disabled={isCreatingGuest}
        >
          Create booking
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
