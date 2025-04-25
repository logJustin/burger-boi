import { BurgerSection } from "@/components/custom/burgers/sections/BurgerSection";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function AddBurgersModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-foreground">Add Burger</Button>
      </DialogTrigger>
      <DialogContent className="flex h-[80vh] flex-col">
        {/* header */}
        <DialogHeader className="shrink-0">
          <DialogTitle>Add a Burger</DialogTitle>
          <DialogDescription>Tell us about the setup, flavor, and cost.</DialogDescription>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto">
          <Tabs defaultValue="burger" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-background border-border sticky top-0 z-10">
              <TabsTrigger className="cursor-pointer" value="burger">
                Burger
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="fries">
                Fries
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="cost">
                Cost
              </TabsTrigger>
            </TabsList>

            {/* body */}
            <TabsContent value="burger" className="pt-4">
              <BurgerSection />
            </TabsContent>
            <TabsContent value="fries" className="pt-4 pb-24">
              <p className="text-muted-foreground">Coming soon: Rate the fries 🍟</p>
            </TabsContent>
            <TabsContent value="cost" className="pt-4 pb-24">
              <p className="text-muted-foreground">Coming soon: Track the price 💵</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* footer */}
        <div className="border-t pt-4 shrink-0">
          <Button className="w-full">Next</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
