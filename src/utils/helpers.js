import { formatDistance, parseISO } from 'date-fns';
import { differenceInDays } from 'date-fns/esm';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );

export function formatDateToString(dateString) {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so adding 1
  const day = String(dateObject.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day} 00:00:00`;
  return formattedDate;
};

// While creating new booking used to get guest id for booking-guest table relation
export function getCurrGuestId(curr, arr) {
  const currGuest = arr.find((person) => person.fullName === curr.fullName);
  return +currGuest.id;
};

// Used to get guest data object after select guest for new created booking
export function getSelectedGuestData(name, arr) {
  const selectedGuest = arr.find((person) => person.fullName === name);
  return selectedGuest;
};
