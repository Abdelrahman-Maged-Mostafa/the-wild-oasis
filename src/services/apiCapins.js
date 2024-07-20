import supabase from "./supabase";
//// getSettings
export async function getSettings() {
  let { data, error } = await supabase.from("settings").select("*").single();
  if (error) {
    throw new Error("Settings could not be loaded");
  }
  return data;
}
//updateSettings
export async function updateSettings(newSettings) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSettings)
    .eq("id", 1)
    .select();
  if (error) {
    throw new Error("Settings could not be updated");
  }
  return data;
}
///////////// getCabins
export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Cabins could not be loaded");
  }
  return data;
}
///////////deleteCabin
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
////Create and Edit Cabin
export async function createEditCabin(newCabin, id) {
  //1-create Cabin
  ///https://cfhswauccdltcdnjealq.supabase.co/storage/v1/object/public/cabin-images/cabin_001.jpg
  const hasImagePath =
    typeof newCabin.image === "string" ||
    newCabin.image.name.startsWith("https://cfhswauccdltcdnjealq.supabase.co");

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `https://cfhswauccdltcdnjealq.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  ///is for Creat
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  ///is for edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    throw new Error("Cabins could not be Created");
  }

  //uploading photo
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image, {
      cacheControl: "3600",
      upsert: false,
    });
  //Delete cabine if have error in photo
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}

// export async function createCabin(newCabin) {
//   //1-create Cabin
//   ///https://cfhswauccdltcdnjealq.supabase.co/storage/v1/object/public/cabin-images/cabin_001.jpg
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );
//   const imagePath = `https://cfhswauccdltcdnjealq.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;
//   const { data, error } = await supabase
//     .from("cabins")
//     .insert([{ ...newCabin, image: imagePath }])
//     .select();
//   if (error) {
//     throw new Error("Cabins could not be Created");
//   }

//   //uploading photo

//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, newCabin.image, {
//       cacheControl: "3600",
//       upsert: false,
//     });
//   //Delete cabine if have error in photo
//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     console.error(storageError);
//     throw new Error(
//       "Cabin image could not be uploaded and the cabin was not created"
//     );
//   }
//   return data;
// }
