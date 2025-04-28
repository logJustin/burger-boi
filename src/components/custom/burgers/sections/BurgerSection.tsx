"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { BurgerSelect } from "@/components/custom/burgers/BurgerSelect";

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
  const [rating, setRating] = useState([5]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedSetup, setSelectedSetup] = useState<string[]>([]);
  const [selectedCondiments, setSelectedCondiments] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [openSelect, setOpenSelect] = useState<"bun" | "patty" | null>(null);

  const toggleSelection = (item: string, list: string[], setList: (val: string[]) => void) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const handleSubmit = () => {
    console.log("location", selectedLocation);
  };

  return (
    <div className="space-y-6 p-2 overflow-scroll max-h-[90%]">
      {/* Burger Rating */}
      <div className="space-y-2">
        <Label>Burger Rating (1–10)</Label>
        <Slider min={1} max={10} step={1} value={rating} onValueChange={setRating} />
        <div className="text-sm text-muted-foreground">Current Rating: {rating[0]}</div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-x-2">
        <BurgerSelect
          id="bun"
          label="Bun Type"
          placeholder="Choose bun type"
          openSelect={openSelect}
          setOpenSelect={setOpenSelect}
          options={bunTypes}
        />
        <BurgerSelect
          id="patty"
          label="Patty Cook Level"
          placeholder="How was it cooked?"
          openSelect={openSelect}
          setOpenSelect={setOpenSelect}
          options={pattyCooks}
        />
      </div>

      {/* Toppings */}
      <div className="space-y-2">
        <Label>Toppings</Label>
        <div className="grid grid-cols-2 gap-2">
          {toppings.map((topping) => (
            <div key={topping} className="flex items-center space-x-2">
              <Checkbox
                id={topping}
                checked={selectedToppings.includes(topping)}
                onCheckedChange={() => toggleSelection(topping, selectedToppings, setSelectedToppings)}
              />
              <label htmlFor={topping} className="text-sm">
                {topping}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Setup */}
      <div className="space-y-2">
        <Label>Setup</Label>
        <div className="grid grid-cols-2 gap-2">
          {setups.map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={item}
                checked={selectedSetup.includes(item)}
                onCheckedChange={() => toggleSelection(item, selectedSetup, setSelectedSetup)}
              />
              <label htmlFor={item} className="text-sm">
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Condiments */}
      <div className="space-y-2">
        <Label>Condiments</Label>
        <div className="grid grid-cols-2 gap-2">
          {condiments.map((condiment) => (
            <div key={condiment} className="flex items-center space-x-2">
              <Checkbox
                id={condiment}
                checked={selectedCondiments.includes(condiment)}
                onCheckedChange={() => toggleSelection(condiment, selectedCondiments, setSelectedCondiments)}
              />
              <label htmlFor={condiment} className="text-sm">
                {condiment}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Business Input */}
      <div className="space-y-2">
        <Label htmlFor="business">Business / Location</Label>
        <Textarea
          onChange={(e) => setSelectedLocation(e.target.value)}
          id="business"
          placeholder="Where'd you get it?"
        />
      </div>
    </div>
  );
}
