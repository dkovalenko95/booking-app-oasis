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

export async function deleteCabin(id) { 
  const { data, error } = await supabase
    .from('Cabins')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted')
  };

  return data;
}
