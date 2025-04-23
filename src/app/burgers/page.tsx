import BurgerGrid from "@/components/custom/burgers/BurgerGrid";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: burgers } = await supabase.from("test").select();
  console.log(burgers);

  return <BurgerGrid burgers={burgers || []} />;
}
