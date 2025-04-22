"use client";

import { useEffect, useState } from "react";
import { Avatar as ShadcnAvatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { getStravaData } from "@/hooks/use-strava-data";
import { useStravaToken } from "@/components/contexts/strava-context";

export default function Avatar() {
  const { token } = useStravaToken();
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    getStravaData("athlete", token).then((athlete) => {
      setProfilePhoto(athlete.profile);
    });
  }, [token]);

  return (
    <ShadcnAvatar className="ml-auto max-h-10 max-w-10">
      <AvatarImage
        src={profilePhoto ?? ""}
        alt="Profile Photo"
        className="rounded-full border-chart-3/35 border-2 object-cover max-h-10 max-w-10"
      />
      <AvatarFallback className="rounded-full border max-h-10 max-w-10 flex items-center justify-center">
        BB
      </AvatarFallback>
    </ShadcnAvatar>
  );
}
