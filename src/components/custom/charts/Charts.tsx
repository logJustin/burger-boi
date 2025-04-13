"use client";

import { useStravaToken } from "@/components/contexts/strava-context";
import Image from "next/image";

export default function Charts() {
  const { token, expiresAt, isLoading, athlete } = useStravaToken();
  const currentDate = new Date();
  const newTime = new Date(currentDate.getTime() + expiresAt!);

  // const content =
  //   'athlete: {"id":159126528,"username":null,"resource_state":2,"firstname":"JNasty","lastname":"420","bio":"pushin pedals","city":"Springfield","state":"MO","country":"United States","sex":"M","premium":true,"summit":true,"created_at":"2025-02-16T01:19:28Z","updated_at":"2025-03-19T18:00:51Z","badge_type_id":1,"weight":78.0179,"profile_medium":"https://dgalywyr863hv.cloudfront.net/pictures/athletes/159126528/35508427/2/medium.jpg","profile":"https://dgalywyr863hv.cloudfront.net/pictures/athletes/159126528/35508427/2/large.jpg","friend":null,"follower":null}';
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

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
        <div className="p-4 bg-blue-200 text-gray-700 break-words rounded">
          {lorem}
          {lorem}
          {lorem}
        </div>
        <Athlete athlete={athlete as AthleteProfile} />
      </div>
    </div>
  );
}

export type AthleteProfile = {
  id: number;
  username: string | null;
  resource_state: number;
  firstname: string;
  lastname: string;
  bio: string;
  city: string;
  state: string;
  country: string;
  sex: "M" | "F" | string; // You can narrow this down further if needed
  premium: boolean;
  summit: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  badge_type_id: number;
  weight: number;
  profile_medium: string;
  profile: string;
  friend: null; // can be typed better if you know its shape
  follower: null; // same here
};

const Athlete = ({ athlete }: { athlete: AthleteProfile }) => {
  if (!athlete) return null;
  console.log(athlete);

  return (
    <div className="flex flex-col gap-y-4 text-gray-700 break-words w-full">
      <div className="flex gap-x-4 justify-between w-full">
        <Image
          className="bg-blue-200 rounded-md p-0.5"
          src={"/Moth.png"}
          width={500}
          height={500}
          alt="Picture of the author"
        />
        <div className="text-4xl text-center w-full font-medium p-4 bg-blue-200 rounded-md">
          Name: {athlete.firstname}
          <br />
          since {athlete.created_at.slice(0, 4)}
        </div>
      </div>
      <div className="p-4 bg-blue-200 rounded-md">
        Location: {athlete.city || "N/A"}, {athlete.state || "N/A"}
      </div>
      <div className="p-4 bg-blue-200 rounded-md">Bio: {athlete.bio || "N/A"}</div>
      <div className="p-4 bg-blue-200 rounded-md">Profile: {athlete.profile || "N/A"}</div>
      <div className="p-4 bg-blue-200 rounded-md">Weight: {Math.floor(athlete.weight / 0.4536) || "N/A"} lbs.</div>
    </div>
  );
};
