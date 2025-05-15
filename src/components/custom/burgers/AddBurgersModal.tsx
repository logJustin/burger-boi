"use client";

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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";

export default function AddBurgerModal() {
  const [open, setOpen] = useState<boolean>(false);
  const tabs = ["burger", "fries", "cost"];
  const [tabNumber, setTabNumber] = useState<number>(0);
  const modalButtonText = tabNumber < 2 ? "Next" : "Save";

  function handleNextAndSaveButton() {
    if (tabNumber < 2) {
      setTabNumber(tabNumber + 1);
      return;
    }
    console.log("submitted");
    setOpen(false);
    setTabNumber(0);
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          className="bg-foreground cursor-pointer"
        >
          <IoMdAddCircle /> Add Burger
        </Button>
      </DialogTrigger>

      <DialogContent className="h-[80vh] min-w-[398px] flex flex-col">
        {/* header */}
        <DialogHeader className="shrink-0">
          <DialogTitle>Add a Burger</DialogTitle>
          <DialogDescription>Tell us about the setup, flavor, and cost.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="burger" value={tabs[tabNumber]} className="w-full flex flex-col flex-grow overflow-hidden">
          <TabsList className="grid w-full grid-cols-3 bg-background border-border z-10 shrink-0">
            <TabsTrigger value="burger">Burger</TabsTrigger>
            <TabsTrigger value="fries">Fries</TabsTrigger>
            <TabsTrigger value="cost">Cost</TabsTrigger>
          </TabsList>

          <Separator />

          {/* body */}
          <div className="flex-grow overflow-y-auto">
            <TabsContent value="burger" className="pt-4">
              <BurgerSection />
            </TabsContent>
            <TabsContent value="fries" className="pt-4 pb-24">
              <p className="text-muted-foreground">Coming soon: Rate the fries 🍟</p>
            </TabsContent>
            <TabsContent value="cost" className="pt-4 pb-24">
              <p className="text-muted-foreground">Coming soon: Track the price 💵</p>
            </TabsContent>
          </div>
        </Tabs>

        {/* footer */}
        <div className="border-t pt-4 shrink-0">
          <Button onClick={handleNextAndSaveButton} className="w-full cursor-pointer">
            {modalButtonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
