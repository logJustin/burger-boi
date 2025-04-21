"use server";

import { createClient } from "@/utils/supabase/server";

export async function addBurger(formData: { type: string }) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("test").insert([formData]);

  if (error) throw new Error(error.message);
  return data;
}
