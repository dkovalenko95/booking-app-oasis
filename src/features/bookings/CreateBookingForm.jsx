import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosCheckmarkCircle } from 'react-icons/io';

import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './datePicker/datePicker.css';

import CountrySelector from './countryPicker/CountrySelector';
import { COUNTRIES } from './countryPicker/countries';

import Form from '../../ui/Form';
import FormTitle from '../../ui/FormTitle';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import SelectForForm from '../../ui/SelectForForm';
import Checkbox from '../../ui/Checkbox';
import Textarea from '../../ui/Textarea';

import { useFetchCabins } from '../cabins/hooks/useFetchCabins';
import { useCreateGuest } from './hooks/useCreateGuest';
import { useFetchGuests } from './hooks/useFetchGuests';
import { useSettings } from '../settings/hooks/useSettings';

import { formatCurrency, formatDateToString, getCurrGuestId, getSelectedGuestData } from '../../utils/helpers';
import { useCreateBooking } from './hooks/useCreateBooking';

function CreateBookingForm({ onCloseModal }) {
  // RENDER COUNT
  const renderCount = useRef(0);
  // Increment the render count on each render
  renderCount.current += 1;
  console.log('Render count:', renderCount.current);
  
  // useForm
  const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm();
  // console.log('useForm errors:', errors);

  const [selectedGuest, setSelectedGuest] = useState(null);
  // console.log('Selected guest:', selectedGuest);

  const [createdGuest, setCreatedGuest] = useState(null);
  // console.log('Guest is created:', createdGuest);

  // FORM GUEST(1st step)
  const { createGuest, isCreatingGuest } = useCreateGuest();
  // Country picker
  const [country, setCountry] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  // FORM BOOKING(2nd step)
  // Fetch cabins
  const { cabins, isLoading: isLoadingCabins } = useFetchCabins();
  // Fetch settings
  const { settings, isLoading: isLoadingSettings } = useSettings();
  // Fetch guests
  const { guests, isLoading: isLoadingGuests } = useFetchGuests();

  const { createBooking, isCreatingBooking } = useCreateBooking();

  // Date picker
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + (24 * 60 * 60 * 1000)));

  // Nights number
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const numNights = Math.floor(timeDiff / (1000 * 3600 * 24));

  // Cabin and Guests number
  const [currCabin, setCurrCabin] = useState(null);
  const [numGuests, setNumGuests] = useState(null);

  // Breakfast 
  const [hasBreakfast, setHasBreakfast] = useState(true);

  // Paid
  const [isPaid, setIsPaid] = useState(false);

  // Status
  const [status, setStatus] = useState('unconfirmed');

  // Additonal info
  const observationRef = useRef(null);

  // Confirm form data
  const [confirmForm, setConfirmForm] = useState(false);
  const [confirmHint, setConfirmHint] = useState(false);

  // Set current cabin after fetched
  useEffect(() => {
    console.log('EFFECT to set CURR CABIN called...');
    if (cabins && cabins.length > 0) setCurrCabin(cabins[0]);
  }, [cabins]);

  // Set max guests capacity for current cabin
  useEffect(() => {
    console.log('EFFECT to set NUM GUESTS called...');
    if (currCabin) setNumGuests(currCabin.maxCapacity);
  }, [currCabin]);

  // Summary
  // TODO: Workaround to ommit useEffect (if possible)
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    console.log('EFFECT for booking SUMMARY called...');
    setSummary({
      cabinPrice: currCabin?.regularPrice * numNights,
      extrasPrice: (numNights * numGuests) * settings?.breakfastPrice,
      totalPrice: (currCabin?.regularPrice * numNights) + ((numNights * numGuests) * settings?.breakfastPrice),
    });
  }, [currCabin, numNights, numGuests, settings]);
  
  // Capacity range for selecting possible number of guest for current cabin 
  let capacityRange;
  if (currCabin !== null) capacityRange = [...Array(currCabin.maxCapacity).keys()].map((num) => num + 1);


  // FORM SUBMISSION - 1st step - create new guest
  function onSubmitGuest(data) {
    // ----- Select existed guest -----
    // console.log('SUBMIT GUEST CALLED', 'Form guest data:', data);
    if (selectedGuest) {
      const selectedGuestData = getSelectedGuestData(selectedGuest, guests);
      setCreatedGuest(selectedGuestData)
    };

    // ----- Create new guest -----
    // 1st step - create guest data
    if (!selectedGuest) {
      const newGuestData = {
        ...data,
        nationality: country ? country.title : '',
        countryFlag: country ? `https://flagcdn.com/${country.value.toLowerCase()}.svg` : '',
      };
      console.log('New guest data:', newGuestData);
      setCreatedGuest(newGuestData);
      
      // 2nd - step API interaction
      createGuest({
        ...newGuestData,
      }, {
        onSuccess: () => {
          reset();
          setCountry(null);
          // onCloseModal?.();
        }
      });
    }
  };

  // FORM SUBMISSION - 2nd step - create new booking
  function onSubmitBooking() {
    if (!confirmForm) {
      setConfirmHint(true)
      return;
    };
    // 1st step - create booking data
    const newBookingData = {
      startDate: formatDateToString(startDate),
      endDate: formatDateToString(endDate),
      numNights: +numNights,
      numGuests: +numGuests,
      cabinPrice: +summary?.cabinPrice,
      extrasPrice: +summary?.extrasPrice,
      totalPrice: +summary?.totalPrice,
      status: String(status),
      hasBreakfast: String(hasBreakfast).toUpperCase(),
      isPaid: String(isPaid).toUpperCase(),
      observations: observationRef.current.value,
      cabinId: +currCabin?.id,
      guestId: getCurrGuestId(createdGuest, guests),
    };
    console.log('New booking data:', newBookingData);

    // 2nd step - API interaction
    createBooking({
      ...newBookingData,
    }, {
      onSuccess: () => {
        reset();
        onCloseModal();
      }
    });
  };

  if (createdGuest) {
    return (
      <Form
        name='create-booking'
        id='create-booking'
        onSubmit={handleSubmit(onSubmitBooking, /* onError */)}
        $type={onCloseModal ? 'modal' : 'regular'}
      >
        <FormTitle>Create new booking</FormTitle>

        <FormRow id='guest-select' descr='Creating booking for:'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.6rem' }} id='guest-select'>
            <span>{createdGuest?.fullName}</span>
            {createdGuest?.countryFlag && <img width='22rem' src={createdGuest?.countryFlag} />}
          </div>
        </FormRow>

          {isLoadingCabins
            ? <SpinnerMini />
            : <FormRow id='cabin-select' label='Choose the cabin:'>
                <SelectForForm
                  id='cabin-select'
                  onChange={(e) => {
                    const cabinNum = e.target.value;
                    const selectedCabin = cabins.find((cabin) => cabin.name === cabinNum);
                    setCurrCabin(selectedCabin);
                  }}
                >
                  {cabins.map((cabin) => (
                    <option key={cabin.id} value={cabin.name}>{cabin.name}</option>
                  ))}  
                </SelectForForm>
              </FormRow>
          }

        <FormRow
          id='date-start-select'
          orientation='selector'
          descr='Start date:'
        >
          <DatePicker
            id='date-start-select'
            format='dd.MM.yyyy'
            onChange={setStartDate}
            value={startDate}
          />
        </FormRow>
        <FormRow
          id='date-end-select'
          orientation='selector'
          descr='End date:'
        >
          <DatePicker
            id='date-end-select'
            format='dd.MM.yyyy'
            onChange={setEndDate}
            value={endDate}
          />
        </FormRow>

        <FormRow id='num-nights-select' descr='Number of nights:'>
          <p style={{ fontSize: '1.6rem', paddingLeft: '1.6rem' }}>{numNights}</p>
        </FormRow>

          {isLoadingCabins
            ? <SpinnerMini />
            : <FormRow id='num-guests-select' label='Number of guests:'>
                <SelectForForm
                  id='num-guests-select'
                  value={numGuests ?? 'Select number of guests'}
                  onChange={(e) => {
                    const selected = e.target.value;
                    setNumGuests(selected);
                  }}
                >
                  {currCabin && capacityRange.map((num) => (
                    <option value={num} name={num} key={num}>{num}</option>
                  ))}
                </SelectForForm>
              </FormRow>
          }

        {isLoadingSettings
          ? <SpinnerMini />
          : <FormRow
              id='breakfast-select'
              label='Does booking include breakfast?'
              info={`Breakfast price for 1 person is ${formatCurrency(settings?.breakfastPrice)}`}
            >
              <SelectForForm
                id='breakfast-select'
                onChange={(e) => {
                  let selected = e.target.value;
                  selected = selected === 'yesBreakfast' ? true : false;
                  setHasBreakfast(selected);
                }}
              >
                <option value='yesBreakfast'>Yes</option>  
                <option value='noBreakfast'>No</option>  
              </SelectForForm>
            </FormRow>
        }

        <FormRow id='paid-select' label='Did the client pay for the booking?'>
          <SelectForForm 
            id='paid-select'
            onChange={(e) => {
              let selected = e.target.value;
              selected = selected === 'isPaid' ? true : false;
              setIsPaid(selected);
              if (selected !== isPaid) setStatus('unconfirmed')
            }}
          >
            <option value='notPaid'>No</option>  
            <option value='isPaid'>Yes</option>  
          </SelectForForm>
        </FormRow>

        <FormRow id='status-select' label='Booking status:'>
          <SelectForForm
            $status={status}
            id='status-select'
            onChange={(e) => {
              let selected = e.target.value;
              setStatus(selected);
            }}
          >
            <option
              style={{ color: 'var(--color-blue-700)', backgroundColor: 'var(--color-blue-100' }} 
              value='unconfirmed'
            >
              Unconfirmed
            </option>  
            {isPaid && 
              <>
                <option
                  style={{ color: 'var(--color-green-700)', backgroundColor: 'var(--color-green-100' }} 
                  value='checked-in'
                >
                  Checked-in
                </option>  
                <option
                  style={{ color: 'var(--color-silver-700)', backgroundColor: 'var(--color-silver-100' }} 
                  value='checked-out'
                >
                  Checked-out
                </option>
              </>
            }  
          </SelectForForm>
        </FormRow>
        
        <FormRow id='additional-info' label='Additional info:'>
          <Textarea
            ref={observationRef}
            id='additional-info' />
        </FormRow>

        <FormRow is='summary' descr='Summary:'>
          <div id='summary' style={{display: 'flex', gap: '1rem', flexDirection: 'column', justifyContent: 'center', fontSize: '1.6rem'}}> 
            <p>
              Cabin <span style={{ fontWeight: '500' }}>
                {currCabin?.name}
              </span> price for <span style={{ fontWeight: '500' }}>
                {numNights}
              </span> nights: <span style={{ fontWeight: '500' }}>
                {formatCurrency(currCabin?.regularPrice * numNights)}
              </span>
            </p>
            <p>
              Breakfast price: <span style={{ fontWeight: '500' }}>
                {hasBreakfast ? formatCurrency((numNights * numGuests) * settings?.breakfastPrice) : '-'}
              </span>
            </p>   
            <p>
              Total price: <span style={{ fontWeight: '500' }}>
                {hasBreakfast 
                  ? formatCurrency((currCabin?.regularPrice * numNights) + ((numNights * numGuests) * settings?.breakfastPrice)) 
                  : formatCurrency(currCabin?.regularPrice * numNights)
                }
              </span>
            </p>
             
            <div style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <p>Confirm form data:</p>
              <Checkbox
                id='confirm-form-data' 
                checked={confirmForm}
                onChange={() => {
                  setConfirmHint(false);
                  setConfirmForm((confirm) => !confirm);
                }}
              />
              {confirmHint && <p style={{ color: ' #388E3C', fontStyle: 'italic', fontWeight: '500' }}>Confirm form data</p>}
            </div>
          </div>
        </FormRow>

        <FormRow id='form-actions'>
          {/* type is an HTML attribute! */}
          <Button
            $variation='secondary'
            type='reset'
            disabled={isCreatingBooking}
            onClick={() => onCloseModal?.()} // conditional call with optional chaining
          >
            Cancel
          </Button>
          <Button disabled={isCreatingBooking}>
            {isCreatingBooking ? <SpinnerMini /> : 'Create booking'} 
          </Button>
        </FormRow>
      </Form>
    );
  };

  console.log('-----END OF COMP CYCLE -> RENDER MARKUP-----');

  return (
    <Form
      id='create-guest'
      onSubmit={handleSubmit(onSubmitGuest, /* onError */)}
      $type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormTitle>Select existed guest OR create the new one</FormTitle>
      <FormRow label='Select existed guest:' error={errors?.selectedGuest?.message}>
        {isLoadingGuests
          ? <SpinnerMini />
          : <>
              <SelectForForm
                id='guest-select-input'
                onChange={(e) => {
                  const selected = e.target.value;
                  setSelectedGuest(selected);
                  clearErrors();
                }}
              >
                <option value='' hidden>Select the guest...</option>
                {guests.map((guest) => (
                  <option key={guest.id} value={guest.fullName}>{guest.fullName}</option>
                ))}
              </SelectForForm>
              {selectedGuest && <IoIosCheckmarkCircle color='green' size={24} />}
            </>
        }
      </FormRow>
      
      <FormRow id='full-name' label='Guest full name:' error={errors?.fullName?.message}>
        <Input
          type='text'
          id='full-name'
          disabled={isCreatingGuest || selectedGuest}
          {...!selectedGuest && {...register('fullName',
            {
              required: 'This field is required if no guest selected',
            }
          )}}
        />
      </FormRow>

      <FormRow id='email' label='Guest email:' error={errors?.email?.message}>
        <Input
          autoComplete='off'
          type='email'
          id='email'
          disabled={isCreatingGuest || selectedGuest}
          {...!selectedGuest && {...register('email', 
            {
              required: 'This field is required if no guest selected',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            }
          )}}
        />
      </FormRow>

      <FormRow label='Guest nationality:' hint='optional' orientation='selector'>
        <CountrySelector
          id='country-selector'
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          countries={COUNTRIES}
          country={country}
          setCountry={setCountry}
          disabledCondition={isCreatingGuest || selectedGuest}
        />
      </FormRow>

      <FormRow id='national-id' label='National ID:' hint='optional' error={errors?.nationalID?.message}>
        <Input
          type='text'
          id='national-id'
          disabled={isCreatingGuest || selectedGuest}
          {...register('nationalID')}
        />
      </FormRow>

      <FormRow orientation='reset-cancel-form'>
        <div>
          <Button
            $variation='secondary'
            type='reset'
            disabled={isCreatingGuest}
            onClick={() => {
              setSelectedGuest(null);
              clearErrors();
            }}
          >
            Reset form
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '1.2rem' }}>
          <Button
            $variation='secondary'
            type='reset'
            disabled={isCreatingGuest}
            onClick={() => onCloseModal?.()} // conditional call with optional chaining
          >
            Cancel
          </Button>
          <Button disabled={isCreatingGuest}>
            {isCreatingGuest ? <SpinnerMini /> : 'Confirm guest'}
          </Button>
        </div>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
