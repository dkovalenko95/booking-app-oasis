import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './hooks/useSettings';
import { useUpdateSettings } from './hooks/useUpdateSettings';

// TODO: remake onBlur to onClick with btns
// TODO: apply proper validation for fields

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice
    } = {},
  } = useSettings();

  const { isUpdating, updateSettings } = useUpdateSettings();

  const updateHandler = (e, field) => {
    const { id, defaultValue, value } = e.target;

    // Basic validation for onBlur
    if (!value || !id || defaultValue === value) return;

    // Dynamically generate prop obj -> [field]: value 
    updateSettings({
      [field]: value,
    });
  };

  if (isLoading) return <Spinner />

  return (
    <Form>
      <FormRow label='Minimum nights/booking' orientation='settings-form-row'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => updateHandler(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking' orientation='settings-form-row'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => updateHandler(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking' orientation='settings-form-row'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => updateHandler(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label='Breakfast price' orientation='settings-form-row'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => updateHandler(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
