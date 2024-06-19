import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './datePicker/datePicker.css';
import Form from '../../ui/Form';
import FormTitle from '../../ui/FormTitle';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import SelectForForm from '../../ui/SelectForForm';
import Checkbox from '../../ui/Checkbox';
import Textarea from '../../ui/Textarea';
import DottedLoader from '../../ui/DottedLoader';
import ConfirmHint from '../../ui/ConfirmHint';
import ButtonGroup from '../../ui/ButtonGroup';
import GuestForForm from '../../ui/GuestForForm';
import StatusOption from '../../ui/StatusOption';
import SummaryContainer from '../../ui/SummaryContainer';
import ConfirmFormContainer from '../../ui/ConfirmFormContainer';
import SpanMedium from '../../ui/SpanMedium';
import { useFetchCabins } from '../cabins/hooks/useFetchCabins';
import { useCreateBooking } from './hooks/useCreateBooking';
import { useSettings } from '../settings/hooks/useSettings';
import { useFetchGuests } from './hooks/useFetchGuests';
import { formatCurrency, formatDateToString, getCurrGuestId } from '../../utils/helpers';

const NumberNights = styled.p`
  font-size: 1.6rem;
  padding-left: 1.6rem;
`;

function CreateBookingForm({ onCloseModal, createdGuest, setCreatedGuestData }) {
  // useForm
  const { handleSubmit, reset } = useForm();

  // Fetch guests
  const { guests } = useFetchGuests();
  
  // FORM BOOKING(2nd step)
  // Fetch cabins
  const { cabins, isLoading: isLoadingCabins } = useFetchCabins();
  // Fetch settings(breakfasr price)
  const { settings, isLoading: isLoadingSettings } = useSettings();
  // Create booking
  const { createBooking, isCreatingBooking } = useCreateBooking();

  // Most of form data
  const [formData, setFormData] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
    currCabin: null,
    numGuests: null,
    hasBreakfast: true,
    isPaid: false,
    status: 'unconfirmed',
  });

  const observationRef = useRef(null);

  // Nights number
  const timeDiff = Math.abs(formData.endDate.getTime() - formData.startDate.getTime());
  const numNights = Math.floor(timeDiff / (1000 * 3600 * 24));

  // Confirm form data
  const [confirmForm, setConfirmForm] = useState(false);
  // Hint for confirmation
  const [confirmHint, setConfirmHint] = useState(false);

  // Set current cabin
  useEffect(() => {
    if (cabins && cabins.length > 0) {
      setFormData(prevState => ({
        ...prevState,
        currCabin: cabins[0],
      }));
    };
  }, [cabins]);

  // Update max guest capacity
  useEffect(() => {
    if (formData.currCabin) {
      setFormData(prevState => ({
        ...prevState,
        numGuests: formData.currCabin.maxCapacity
      }));
    }
  }, [formData.currCabin]);
  
  // Capacity range for selecting possible number of guest for current cabin 
  let capacityRange;
  if (formData.currCabin !== null) capacityRange = [...Array(formData.currCabin.maxCapacity).keys()].map((num) => num + 1);

  // FORM SUBMISSION - 2nd step - create new booking
  function onSubmitBooking() {
    if (!confirmForm) {
      setConfirmHint(true);
      return;
    };
    // 1) create booking data
    const newBookingData = {
      startDate: formatDateToString(formData.startDate),
      endDate: formatDateToString(formData.endDate),
      numNights: +numNights,
      numGuests: +formData.numGuests,
      cabinPrice: +formData.currCabin?.regularPrice * numNights,
      extrasPrice: +(numNights * formData.numGuests) * settings?.breakfastPrice,
      totalPrice: +(formData.currCabin?.regularPrice * numNights) + ((numNights * formData.numGuests) * settings?.breakfastPrice),
      status: String(formData.status),
      hasBreakfast: String(formData.hasBreakfast).toUpperCase(),
      isPaid: String(formData.isPaid).toUpperCase(),
      observations: observationRef.current.value,
      cabinId: +formData.currCabin?.id,
      guestId: getCurrGuestId(createdGuest, guests),
    };

    // 2) API interaction
    createBooking({
      ...newBookingData,
    }, {
      onSuccess: () => {
        reset();
        onCloseModal();
      },
    });
  };

  
  return (
    <Form
      name='create-booking'
      id='create-booking'
      onSubmit={handleSubmit(onSubmitBooking)}
      $type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormTitle>Create new booking</FormTitle>

      <FormRow id='guest-select' descr='Creating booking for:' orientation='horizontal'>
        <GuestForForm>
          <span>{createdGuest?.fullName}</span>
          {createdGuest?.countryFlag && <img width='22rem' src={createdGuest?.countryFlag} />}
        </GuestForForm>
      </FormRow>

      <FormRow label='Choose the cabin' orientation='horizontal-selector'>
        {isLoadingCabins
          ? <DottedLoader /> 
          : <SelectForForm
              id='cabin-select'
              onChange={(e) => {
                const cabinNum = e.target.value;
                const selectedCabin = cabins.find((cabin) => cabin.name === cabinNum);
                setFormData(prevState => ({
                  ...prevState,
                  currCabin: selectedCabin,
                }));
              }}
            >
              {cabins.map((cabin) => (
                <option key={cabin.id} value={cabin.name}>{cabin.name}</option>
              ))}  
            </SelectForForm>
        }
        </FormRow>

      <FormRow
        id='date-start-select'
        orientation='horizontal-selector'
        descr='Start date:'
      >
        <DatePicker
          id='date-start-select'
          format='dd.MM.yyyy'
          onChange={(date) => {
            setFormData(prevState => ({
              ...prevState,
              startDate: date
            }));
          }}
          value={formData.startDate}
        />
      </FormRow>
      <FormRow
        id='date-end-select'
        orientation='horizontal-selector'
        descr='End date:'
      >
        <DatePicker
          id='date-end-select'
          format='dd.MM.yyyy'
          onChange={(date) => {
            setFormData(prevState => ({
              ...prevState,
              endDate: date,
            }));
          }}
          value={formData.endDate}
        />
      </FormRow>

      <FormRow id='num-nights-select' descr='Number of nights' orientation='horizontal'>
        <NumberNights>{numNights}</NumberNights>
      </FormRow>

      <FormRow label='Number of guests' orientation='horizontal-selector'>
        {isLoadingCabins
          ? <DottedLoader />
          :  <SelectForForm
              id='num-guests-select'
              value={formData.numGuests ?? 'Select number of guests'}
              onChange={(e) => {
                const selected = e.target.value;
                setFormData(prevState => ({
                  ...prevState,
                  numGuests: selected,
                }));
              }}
            >
              {formData.currCabin && capacityRange.map((num) => (
                <option value={num} name={num} key={num}>{num}</option>
              ))}
            </SelectForForm>
        }
      </FormRow>

      <FormRow
        label='Does booking include breakfast?'
        title={`Breakfast price for 1 person is ${formatCurrency(settings?.breakfastPrice)}`}
        orientation='horizontal-selector'
      >
        {isLoadingSettings
          ? <DottedLoader />
          : <SelectForForm
              id='breakfast-select'
              onChange={(e) => {
                let selected = e.target.value;
                selected = selected === 'yesBreakfast' ? true : false;
                setFormData(prevState => ({
                  ...prevState,
                  hasBreakfast: selected,
                }));
              }}
            >
              <option value='yesBreakfast'>Yes</option>  
              <option value='noBreakfast'>No</option>  
            </SelectForForm>
        }
      </FormRow>

      <FormRow id='paid-select' label='Did the client pay for the booking?' orientation='horizontal-selector'>
        <SelectForForm 
          id='paid-select'
          onChange={(e) => {
            let selected = e.target.value;
            selected = selected === 'isPaid' ? true : false;
            setFormData(prevState => ({
              ...prevState,
              isPaid: selected,
            }))
            if (selected !== formData.isPaid) 
              setFormData(prevState => ({
                ...prevState,
                status: 'unconfirmed',
              }))
          }}
        >
          <option value='notPaid'>No</option>  
          <option value='isPaid'>Yes</option>  
        </SelectForForm>
      </FormRow>

      <FormRow id='status-select' label='Booking status' orientation='horizontal-selector'>
        <SelectForForm
          $status={formData.status}
          id='status-select'
          onChange={(e) => {
            let selected = e.target.value;
            setFormData(prevState => ({
              ...prevState,
              status: selected,
            }))
          }}
        >
          <StatusOption $variation='unconfirmed' value='unconfirmed'>
            Unconfirmed
          </StatusOption>  
          {formData.isPaid && 
            <>
              <StatusOption $variation='checked-in' value='checked-in'>
                Checked-in
              </StatusOption>  
              <StatusOption $variation='checked-out' value='checked-out'>
                Checked-out
              </StatusOption>
            </>
          }  
        </SelectForForm>
      </FormRow>
      
      <FormRow
        id='additional-info'
        label='Additional info'
        orientation='horizontal'
      >
        <Textarea ref={observationRef} id='additional-info' />
      </FormRow>

      <FormRow is='summary' descr='Summary' orientation='horizontal'>
        <SummaryContainer id='summary'> 
          <p>
            Cabin <SpanMedium>
              {formData.currCabin?.name}
            </SpanMedium> price for <SpanMedium>
              {numNights}
            </SpanMedium> nights: <SpanMedium>
              {formatCurrency(formData.currCabin?.regularPrice * numNights)}
            </SpanMedium>
          </p>
          <p>
            Breakfast price: <SpanMedium>
              {formData.hasBreakfast ? formatCurrency((numNights * formData.numGuests) * settings?.breakfastPrice) : '-'}
            </SpanMedium>
          </p>   
          <p>
            Total price: <SpanMedium>
              {formData.hasBreakfast 
                ? formatCurrency((formData.currCabin?.regularPrice * numNights) + ((numNights * formData.numGuests) * settings?.breakfastPrice)) 
                : formatCurrency(formData.currCabin?.regularPrice * numNights)
              }
            </SpanMedium>
          </p>
            
          <ConfirmFormContainer>
            <p>Confirm form data:</p>
            <Checkbox
              id='confirm-form-data' 
              checked={confirmForm}
              onChange={() => {
                setConfirmHint(false);
                setConfirmForm((confirm) => !confirm);
              }}
            />
            {confirmHint &&
              <ConfirmHint>Confirm form data</ConfirmHint>
            }
          </ConfirmFormContainer>
        </SummaryContainer>
      </FormRow>

      <FormRow id='form-actions' orientation='extra-controls'>
        <ButtonGroup>
          <Button
            $variation='secondary'
            disabled={isCreatingBooking}
            type='reset'
            onClick={() => {
              setCreatedGuestData(null);
            }}
          >
            Back to guest
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            $variation='secondary'
            type='button'
            disabled={isCreatingBooking}
            onClick={() => onCloseModal?.()} // conditional call with optional chaining
            >
            Cancel
          </Button>
          <Button disabled={isCreatingBooking}>
            {isCreatingBooking ? <SpinnerMini /> : 'Create booking'} 
          </Button>
        </ButtonGroup>
      </FormRow>
    </Form>
  );
};

export default CreateBookingForm;
