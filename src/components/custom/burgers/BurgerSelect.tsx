"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";

interface BurgerSelectProps {
  id: "bun" | "patty";
  openSelect: "bun" | "patty" | null;
  setOpenSelect: Dispatch<SetStateAction<"bun" | "patty" | null>>;
  label: string;
  placeholder: string;
  options: string[];
}

export function BurgerSelect({ id, label, placeholder, options, openSelect, setOpenSelect }: BurgerSelectProps) {
  return (
    <div className={"flex flex-col gap-2 w-full"}>
      <Label htmlFor={id}>{label}</Label>
      <Select>
        <SelectTrigger onClick={() => setOpenSelect(id)} id={id} className="w-full whitespace-nowrap">
          <SelectValue placeholder={placeholder} className="w-full block overflow-hidden text-ellipsis" />
        </SelectTrigger>
        {openSelect == id && (
          <SelectContent side="bottom" align="start">
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        )}
      </Select>
    </div>
  );
}
