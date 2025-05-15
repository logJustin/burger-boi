"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { BurgerSelect } from "@/components/custom/burgers/BurgerSelect";
import { burgerActions, useBurger } from "@/components/contexts/burger-context";
import GenericCheckbox from "@/components/custom/burgers/GenericCheckbox";

const bunTypes = ["Sesame", "Potato", "Brioche", "Lettuce Wrap", "No Bun"];
const pattyCooks = ["Rare", "Medium Rare", "Medium", "Medium Well", "Well Done"];

const toppings = [
  "Lettuce",
  "Tomato",
  "Grilled Onions",
  "Raw Onions",
  "Grilled Mushrooms",
  "Jalapeños",
  "Green Peppers",
  "Pickles",
  "Extra Patty",
  "Bacon",
  "Cheese",
];

const setups = ["Double Stack", "Open Face", "Cut in Half", "Wrapped in Foil"];
const condiments = ["Ketchup", "Mustard", "Mayo", "BBQ", "A1", "Hot Sauce", "Relish"];

export function BurgerSection() {
  const { state, dispatch } = useBurger();
  const { rating, openSelect, selectedToppings, selectedSetup, selectedCondiments } = state;

  return (
    <div className="space-y-6 p-2 overflow-scroll max-h-[90%]">
      <div className="space-y-2">
        <Label htmlFor="name">Burger Name</Label>
        <Textarea
          onChange={(e) => dispatch(burgerActions.setName(e.target.value))}
          id="name"
          placeholder="What's it called?"
        />
      </div>

      <Separator />

      {/* Burger Rating */}
      <div className="space-y-2">
        <Label>Burger Rating (1–10)</Label>
        <Slider
          min={1}
          max={10}
          step={1}
          value={rating}
          onValueChange={(value) => dispatch(burgerActions.setRating(value))}
        />
        <div className="text-sm text-muted-foreground">Current Rating: {rating}</div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-x-2">
        <BurgerSelect
          id="bun"
          label="Bun Type"
          placeholder="Choose bun type"
          openSelect={openSelect}
          setOpenSelect={() => dispatch(burgerActions.setOpenSelect("bun"))}
          options={bunTypes}
        />
        <BurgerSelect
          id="patty"
          label="Patty Cook Level"
          placeholder="How was it cooked?"
          openSelect={openSelect}
          setOpenSelect={() => dispatch(burgerActions.setOpenSelect("patty"))}
          options={pattyCooks}
        />
      </div>

      <Separator />

      {/* Toppings */}
      <GenericCheckbox
        title={"Toppings"}
        options={toppings}
        state={selectedToppings}
        addOption={(topping) => dispatch(burgerActions.addTopping(topping))}
        removeOption={(topping) => dispatch(burgerActions.removeTopping(topping))}
      />

      <Separator />

      {/* Setup */}
      <GenericCheckbox
        title={"Setup"}
        options={setups}
        state={selectedSetup}
        addOption={(item) => dispatch(burgerActions.addSetupItem(item))}
        removeOption={(item) => dispatch(burgerActions.removeSetupItem(item))}
      />

      <Separator />

      {/* Condiments */}
      <GenericCheckbox
        title={"Condiments"}
        options={condiments}
        state={selectedCondiments}
        addOption={(condiment) => dispatch(burgerActions.addCondiment(condiment))}
        removeOption={(condiment) => dispatch(burgerActions.removeCondiment(condiment))}
      />

      <Separator />

      {/* Business Input */}
      <div className="space-y-2">
        <Label htmlFor="business">Business / Location</Label>
        <Textarea
          onChange={(e) => dispatch(burgerActions.setLocation(e.target.value))}
          id="business"
          placeholder="Where'd you get it?"
        />
      </div>
    </div>
  );
}
