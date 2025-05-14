"use client";

import { addBurger } from "@/server/actions/add-burger";
import { useStravaToken } from "@/components/contexts/strava-context";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

export default function Charts() {
  const { token, expiresAt, isLoading, athleteID } = useStravaToken();
  const currentDate = new Date();
  const newTime = new Date(currentDate.getTime() + expiresAt!);

  const supabase = createClient();

  useEffect(() => {
    supabase
      .from("test")
      .select()
      .then(({ data }) => {
        console.log("from client", data);
      });
  }, [supabase]);

  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const handleSubmit = async () => {
    const formData = { type: "Cheese Burger" };
    await addBurger(formData);
  };
  if (isLoading)
    return (
      <div className="flex flex-col gap-y-4">
        <div className="p-4 bg-blue-200 text-gray-700 break-words rounded">{lorem}</div>
        <div className="p-4 bg-blue-200 text-gray-700 break-words rounded">{lorem}</div>
        <div className="p-4 bg-blue-200 text-gray-700 break-words rounded">{lorem}</div>
        <div className="p-4 bg-blue-200 text-gray-700 break-words rounded">{lorem}</div>
      </div>
    );

  return (
    <div>
      <div className="flex flex-wrap gap-y-4 gap-x-4 max-w-full">
        <div className="p-4 bg-blue-200 text-gray-700 break-words rounded">Token: {token}</div>
        <div className="p-4 bg-blue-200 text-gray-700 break-words rounded">expiresAt: {newTime.toUTCString()}</div>
        <div className="p-4 bg-blue-200 text-gray-700 break-words rounded">Athlete Id: {athleteID}</div>
        <button
          className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-700 break-words rounded"
          onClick={handleSubmit}
        >
          Add Cheeseburger
        </button>
        {/* <Athlete athlete={athleteID as AthleteProfile['id']} /> */}
      </div>
    </div>
  );
}

// const Athlete = ({ athlete }: { athlete: AthleteProfile }) => {
//   if (!athlete) return null;

//   return (
//     <div className="flex flex-col gap-y-4 text-gray-700 break-words w-full">
//       <div className="flex gap-x-4 justify-between w-full">
//         <Image
//           className="bg-blue-200 rounded-md p-0.5"
//           src={"/Moth.png"}
//           width={500}
//           height={500}
//           alt="Picture of the author"
//         />
//         <div className="text-4xl text-center w-full font-medium p-4 bg-blue-200 rounded-md">
//           Name: {athlete.firstname}
//           <br />
//           since {athlete.created_at.slice(0, 4)}
//         </div>
//       </div>
//       <div className="p-4 bg-blue-200 rounded-md">
//         Location: {athlete.city || "N/A"}, {athlete.state || "N/A"}
//       </div>
//       <div className="p-4 bg-blue-200 rounded-md">Bio: {athlete.bio || "N/A"}</div>
//       <div className="p-4 bg-blue-200 rounded-md">Profile: {athlete.profile || "N/A"}</div>
//       <div className="p-4 bg-blue-200 rounded-md">Weight: {Math.floor(athlete.weight / 0.4536) || "N/A"} lbs.</div>
//     </div>
//   );
// };
