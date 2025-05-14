"use client";
import { useEffect, useState } from "react";
import { getStravaData } from "@/hooks/use-strava-data";
import { AthleteStats, StravaActivity } from "@/types/components/strava";
import Spinner from "@/components/custom/Spinner";
import ActivityCard from "@/components/custom/activities/ActivityCard";
import { useStravaAuthState } from "@/components/contexts/strava-context";

function convertMetersToMiles(meters: number): string {
  return (meters / 1609).toFixed(0);
}

export default function Page() {
  const state = useStravaAuthState();
  const { token, athleteID, isLoading } = state;
  const [activities, setActivities] = useState<StravaActivity[] | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [stats, setStats] = useState<AthleteStats | null>();

  useEffect(() => {
    if (!token || athleteID === undefined || athleteID === null) return;

    const fetchData = async () => {
      const [activities, athlete, stats] = await Promise.all([
        await getStravaData("athlete/activities", token),
        await getStravaData("athlete", token),
        await getStravaData(`athletes/${athleteID}/stats`, token),
      ]);
      setActivities(activities);
      setProfilePhoto(athlete.profile);
      setStats(stats);
    };
    fetchData();
  }, [token, athleteID]);

  if (!activities || !stats || isLoading || profilePhoto == "") return <Spinner />;
  console.log(`${convertMetersToMiles(stats.all_ride_totals.distance)} Miles`);
  return (
    <div className="flex flex-wrap gap-4 max-w-full">
      {activities.map((activity: StravaActivity) => {
        return <ActivityCard key={activity.id} activity={activity} profilePhoto={profilePhoto} />;
      })}
    </div>
  );
}
