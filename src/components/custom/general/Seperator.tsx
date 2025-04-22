import { Separator } from "@radix-ui/react-separator";

export default function Seperator({ orientation }: { orientation: "vertical" | "horizontal" }) {
  return <Separator orientation={orientation} className="h-full self-center w-px bg-border" />;
}
