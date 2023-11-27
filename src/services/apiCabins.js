import supabase, { supabaseUrl } from './supabase';

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

export async function createCabin(newCabinData) {
  // https://nciymbkietambwmlyeav.supabase.co/storage/v1/object/public/Cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabinData.image.name}`.replaceAll('/', '');
  const imagePath = `${supabaseUrl}/storage/v1/object/public/Cabin-images/${imageName}`;

  // 1. Create cabin
  const { data, error } = await supabase
  .from('Cabins')
  .insert([{ ...newCabinData, image: imagePath }])
  .select()

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created')
  };

  // 2. Upload image
  const { error: storageError } = await supabase
    .storage
    .from('Cabin-images')
    .upload(imageName, newCabinData.image )

    // 3. Delete the cabin if there was an error uploading image
    if (storageError) {
      await supabase
        .from('Cabins')
        .delete()
        .eq('id', newCabinData.id)
      console.error(storageError);
      throw new Error('Cabin image could not be uploaded and the cabin was not created')
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
};
