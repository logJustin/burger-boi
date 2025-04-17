import Charts from "@/components/custom/charts/Charts";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: test } = await supabase.from("test").select();
  console.log("from server", test);

  return <Charts />;
}
