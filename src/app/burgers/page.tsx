import AddBurgersModal from "@/components/custom/burgers/AddBurgersModal";
import BurgerGrid from "@/components/custom/burgers/BurgerGrid";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: burgers } = await supabase.from("test").select();

  return (
    <div className="w-full h-full flex flex-col gap-y-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-x-2">
          <div className="text-5xl">🍔</div>
          <div className="text-5xl font-bold text-white tracking-tight">Burger Boi’s Finest</div>
        </div>
        <AddBurgersModal />
      </div>

      <BurgerGrid burgers={burgers || []} />
    </div>
  );
}
