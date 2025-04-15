"use client";
import { useEffect, useState } from "react";
import { useStravaToken } from "@/components/contexts/strava-context";
import { getStravaData } from "@/hooks/use-strava-data";
import { StravaActivity } from "@/types/components/strava";
import { MdThumbUp } from "react-icons/md";

function convertMetersToMiles(meters: number): string {
  return (meters / 1609).toFixed(2);
}

export default function Page() {
  const { athleteID, token } = useStravaToken();
  const [data, setData] = useState<StravaActivity[] | null>(null);

  useEffect(() => {
    console.log(athleteID, token);
    // if (athleteID && token) {
    (async () => {
      try {
        const result = await getStravaData("athlete/activities", token ?? "");
        console.log(result);
        setData(result);
      } catch (err) {
        console.error("Strava fetch error:", err);
      }
    })();
    // }
  }, [athleteID, token]);

  if (!data) return <div>Loding...</div>;
  return (
    <div className="flex flex-wrap gap-4 max-w-full">
      {data.map((activity: StravaActivity) => (
        <div
          key={activity.id}
          className="bg-blue-300 hover:bg-blue-400 p-4 cursor-pointer text-gray-900 text-sm basis-1/5 flex-grow rounded-md shadow-md"
        >
          <div className="font-medium text-lg">{activity.name}</div>
          <div className="text-xs text-gray-700">{formatToLocalMilitary(activity.start_date_local)}</div>
          <div>{convertMetersToMiles(activity.distance)} Miles</div>
          <div className="text-xs">{(activity.moving_time / 60 / 60).toFixed(1)} Hours</div>
          <div className="flex gap-2 items-center">
            <MdThumbUp />
            <div> {activity.kudos_count}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatToLocalMilitary(dateStr: string): string {
  const date = new Date(dateStr);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const monthAbbrs = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const month = monthAbbrs[date.getMonth()];

  return `${hours}${minutes} ${day}${month}`;
}
