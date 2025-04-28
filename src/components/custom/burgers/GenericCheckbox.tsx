import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type GenericCheckboxProps = {
  title: string;
  options: string[];
  state: string[];
  addOption: React.Dispatch<string>;
  removeOption: React.Dispatch<string>;
};

export default function GenericCheckbox({ title, options, state, addOption, removeOption }: GenericCheckboxProps) {
  return (
    <div className="space-y-2">
      <Label>{title}</Label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={option}
              checked={state.includes(option)}
              onCheckedChange={() => {
                if (state.includes(option)) {
                  removeOption(option);
                } else {
                  addOption(option);
                }
              }}
            />
            <label htmlFor={option} className="text-sm">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
