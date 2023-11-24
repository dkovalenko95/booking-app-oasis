import supabase from './supabase';

// Get cabin data from Supabase 
export async function getCabins() {
  const { data, error } = await supabase
    .from('Cabins')
    .select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded')
  };

  return data;
};
