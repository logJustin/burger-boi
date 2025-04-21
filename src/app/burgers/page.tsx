import Spinner from "@/components/custom/Spinner";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: burgers } = await supabase.from("test").select();
  console.log("from server", burgers);

  if (!burgers) return <Spinner />;
  return (
    <div className="w-full gap-x-4 gap-y-4 flex flex-wrap">
      {burgers?.map((burger) => {
        return (
          <div
            key={burger.id}
            className="flex gap-y-4 p-4 animate-in fade-in slide-in-from-bottom-2 duration-500 min-w-[315px] flex-col justify-between rounded-xl border bg-card/100 text-card-foreground hover:shadow-xl hover:scale-[1.02]
       transition-all hover:border-muted hover:bg-muted/50 flex-auto w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          >
            <div>{burger.type}</div>
          </div>
        );
      })}
    </div>
  );
}
