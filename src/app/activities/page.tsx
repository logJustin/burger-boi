"use client";
import { useEffect, useState } from "react";
import { useStravaToken } from "@/components/contexts/strava-context";
import { getStravaData } from "@/hooks/use-strava-data";
import { StravaActivity } from "@/types/components/strava";
import { MdThumbUp } from "react-icons/md";
import Image from "next/image";
import { format } from "date-fns";

function convertMetersToMiles(meters: number): string {
  return (meters / 1609).toFixed(2);
}

export default function Page() {
  const { athleteID, token, isLoading } = useStravaToken();
  const [data, setData] = useState<StravaActivity[] | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string>("");

  useEffect(() => {
    if (!token || athleteID === undefined || athleteID === null) return;

    const fetchData = async () => {
      const [activities, athlete] = await Promise.all([
        await getStravaData("athlete/activities", token),
        await getStravaData("athlete", token),
      ]);
      setData(activities);
      setProfilePhoto(athlete.profile);
    };
    fetchData();
  }, [token, athleteID]);

  if (!data || isLoading || profilePhoto == "") return <div>Loading...</div>;
  return (
    <div className="flex flex-wrap gap-4 max-w-full">
      {data.map((activity: StravaActivity) => {
        const distance = convertMetersToMiles(activity.distance);

        return (
          <div
            key={activity.id}
            className="flex gap-y-4 min-w-[315px] flex-col justify-between bg-blue-300 hover:bg-blue-400 p-4 cursor-pointer text-gray-900 text-sm rounded-md shadow-md flex-auto w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          >
            <div className="flex gap-x-4">
              {!profilePhoto && <div className="w-[120px] h-[120px] bg-gray-300 rounded animate-pulse" />}
              {profilePhoto && (
                <Image
                  loading="lazy"
                  alt="profile photo"
                  width={120}
                  height={120}
                  className="rounded flex-shrink-0 object-cover"
                  src={profilePhoto}
                />
              )}
              <div className="flex flex-col truncate">
                <div className="font-medium text-lg">{activity.name}</div>
                <div className="text-xs text-gray-700 uppercase">
                  {format(new Date(activity.start_date_local), "dd MMM yy")}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <TextGroup category="Distance" enumeration={`${distance} Miles`} />
              <div className="h-full bg-black w-[1px] opacity-75" />
              <TextGroup category="Duration" enumeration={`${(activity.moving_time / 60 / 60).toFixed(1)} Hours`} />
              <div className="h-full bg-black w-[1px] opacity-75" />
              <TextGroup category="Kudos" enumeration={String(activity.kudos_count)} forKudos={true} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TextGroup({
  category,
  enumeration,
  forKudos = false,
}: {
  category: string;
  enumeration: string;
  forKudos?: boolean;
}): React.ReactNode {
  return (
    <div className="flex flex-col m-2">
      <div className="font-medium text-md align-[-10px]">{category}</div>
      {!forKudos && <div className="text-lg truncate">{enumeration}</div>}
      {forKudos && (
        <div className="flex gap-2 items-center ml-[3px]">
          <MdThumbUp />
          <div className="text-lg truncate">{enumeration}</div>
        </div>
      )}
    </div>
  );
}
