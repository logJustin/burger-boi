import BurgerGrid from "@/components/custom/burgers/BurgerGrid";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: burgers } = await supabase.from("test").select();

  return <BurgerGrid burgers={burgers || []} />;
}
