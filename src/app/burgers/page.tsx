import AddBurgerModal from "@/components/custom/burgers/AddBurgersModal";
import BurgerGrid from "@/components/custom/burgers/BurgerGrid";
import Spinner from "@/components/custom/Spinner";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: burgers } = await supabase.from("burgers").select();

  if (!burgers) return <Spinner />;
  return (
    <div className="flex justify-center px-4 md:px-8 lg:px-0 w-full min-h-screen">
      <div className="w-full max-w-4xl flex flex-col gap-y-6">
        <div className="flex w-full items-center justify-between">
          <Header />
          <AddBurgerModal />
        </div>
        {burgers?.length > 0 ? <BurgerGrid burgers={burgers || []} /> : <BurgerPlacholder />}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="text-xl sm:text-3xl md:text-4xl">🍔</div>
      <div className="text-xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">Burger Boi’s Finest</div>
    </div>
  );
}

function BurgerPlacholder() {
  return <div className="p-4 text-3xl text-center bg-primary/10 rounded-md shadow-md">No Burgers</div>;
}
