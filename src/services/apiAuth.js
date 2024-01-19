import supabase, { supabaseUrl } from './supabase';
import { supabaseSignUpTemp } from './supabaseSignUpTemp';

export async function signup({ fullName, email, password }) {
  // Using 2nd Supabase Client to allow current user register new one without current user session shutting-off
  const { data, error } = await supabaseSignUpTemp.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) throw new Error(error.message);

  return {
    data,
  };
};

export async function tempSignUpSession() {
  const { data: session } = await supabaseSignUpTemp.auth.getSession();
  if (!session.session) return null;

  return session.session;
};

export async function tempSignUpLogout() {
  const { error } = await supabaseSignUpTemp.auth.signOut();
  if (error) throw new Error(error.message);
};

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  };

  return data;
};

export async function getCurrentUser() {
  // Check if is active session
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null; // means thera is NO current user

  // Get user
  const { data: user, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  };

  return user?.user;
};

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password or fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  
  const { data, error } = await supabase.auth.updateUser(updateData);
  
  if (error) throw new Error(error.message);
  if (!avatar) return data;
  
  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  
  const { error: storageError } = await supabase.storage
    .from('Avatars')
    .upload(fileName, avatar);
  
  if (storageError) throw new Error(storageError.message);
  
  // 3. Update avatar in the user
  const { data: updatedUser, error: updatedUserError } = await supabase.auth.updateUser({ data: {
    avatar: `${supabaseUrl}/storage/v1/object/public/Avatars/${fileName}`,
  }});
  
  if (updatedUserError) throw new Error(updatedUserError.message);
  
  return updatedUser;
};
