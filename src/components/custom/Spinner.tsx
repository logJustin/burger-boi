import { ImSpinner10 } from "react-icons/im";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-full fade-out duration-500">
      <ImSpinner10 className="animate-spin text-primary text-5xl sm:text-6xl md:text-7xl lg:text-9xl" />
    </div>
  );
}
