import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function login(mail, pass) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: mail,
    password: pass,
  });
  if (error) throw new Error(error.message);
  return data;
}

////getCurrentUser
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data } = await supabase.auth.getUser();
  return data.user;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (avatar === null) return data;
  ///
  const fileName = `avatar-${data.user.id}-${Date.now()}`;

  const { error: avatarError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (avatarError) throw new Error(avatarError.message);
  //////
  const { data: updateUser, error: loadError } = await supabase.auth.updateUser(
    {
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    }
  );
  if (loadError) throw new Error(loadError.message);
  return updateUser;
}
