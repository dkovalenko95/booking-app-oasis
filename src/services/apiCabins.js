import supabase, { supabaseUrl } from './supabase';

// https://nciymbkietambwmlyeav.supabase.co/storage/v1/object/public/Cabin-images/cabin-001.jpg

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

export async function createEditCabin(cabinData, id) {
  // Helper to check type of image:
  // 1 - url string from Supabase(already existed file, could be kept if no new image)
  // 2 - newly added image obj{}(should be added after submittion)
  const hasImagePath = cabinData.image?.startsWith?.(supabaseUrl);
  
  const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll('/', '');

  const imagePath = hasImagePath
    ? cabinData.image // existed image remains
    : `${supabaseUrl}/storage/v1/object/public/Cabin-images/${imageName}`; // create new one

  // 1. Create/edit cabin
  let query = supabase.from('Cabins');

  // A) CREATE
  if (!id) query = query.insert([{ ...cabinData, image: imagePath }]);

  // B) EDIT
  if (id) query = query
    .update({ ...cabinData, image: imagePath }) // point what should be updated
    .eq('id', id) // update only the row where the field of 'id' equal to 'id' passed in
    .select()
      
  const { data, error } = await query
    .select()
    .single() // return data as a single object instead of an array of objects
    .order('created_at', { ascending: true }); // allow to retain the position in the table

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created')
  };

  // 2. Upload image
  // Guard clause
  if (hasImagePath) return data;

  const { error: storageError } = await supabase
    .storage
    .from('Cabin-images')
    .upload(imageName, cabinData.image )

    // 3. Delete the cabin if there was an error uploading image
    if (storageError) {
      await supabase
        .from('Cabins')
        .delete()
        .eq('id', cabinData.id)
      console.error(storageError);
      throw new Error('Cabin image could not be uploaded and the cabin was not created')
    };

  console.log(data);

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
