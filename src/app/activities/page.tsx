"use client";
import { useEffect, useState } from "react";
import { useStravaToken } from "@/components/contexts/strava-context";
import { getStravaData } from "@/hooks/use-strava-data";
import { StravaActivity } from "@/types/components/strava";
import Spinner from "@/components/custom/Spinner";
import ActivityCard from "@/components/custom/activities/ActivityCard";

export default function Page() {
  const { athleteID, token, isLoading } = useStravaToken();
  const [activities, setActivities] = useState<StravaActivity[] | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string>("");

  useEffect(() => {
    if (!token || athleteID === undefined || athleteID === null) return;

    const fetchData = async () => {
      const [activities, athlete] = await Promise.all([
        await getStravaData("athlete/activities", token),
        await getStravaData("athlete", token),
      ]);
      setActivities(activities);
      setProfilePhoto(athlete.profile);
    };
    fetchData();
  }, [token, athleteID]);

  if (!activities || isLoading || profilePhoto == "") return <Spinner />;

  return (
    <div className="flex flex-wrap gap-4 max-w-full">
      {activities.map((activity: StravaActivity) => {
        return <ActivityCard key={activity.id} activity={activity} profilePhoto={profilePhoto} />;
      })}
    </div>
  );
}
