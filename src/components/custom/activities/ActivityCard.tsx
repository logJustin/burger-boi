import { StravaActivity } from "@/types/components/strava";
import { format } from "date-fns";
import Image from "next/image";
import { MdThumbUp } from "react-icons/md";

function convertMetersToMiles(meters: number): string {
  return (meters / 1609).toFixed(2);
}

export default function ActivityCard({ activity, profilePhoto }: { activity: StravaActivity; profilePhoto: string }) {
  const distance = convertMetersToMiles(activity.distance);
  return (
    <div
      key={activity.id}
      className="flex gap-y-4 p-4 animate-in fade-in slide-in-from-bottom-2 duration-500 min-w-[315px] flex-col justify-between rounded-xl border bg-card/100 text-card-foreground hover:shadow-xl hover:scale-[1.02]
transition-all hover:border-muted hover:bg-muted/50 flex-auto w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
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
          <div className="text-xs text-primary uppercase">
            {format(new Date(activity.start_date_local), "dd MMM yy")}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <TextGroup category="Distance" enumeration={`${distance} Miles`} />
        <div className="h-full bg-primary w-[1px] opacity-75" />
        <TextGroup category="Duration" enumeration={`${(activity.moving_time / 60 / 60).toFixed(1)} Hours`} />
        <div className="h-full bg-primary w-[1px] opacity-75" />
        <TextGroup category="Kudos" enumeration={String(activity.kudos_count)} />
      </div>
    </div>
  );
}

function TextGroup({ category, enumeration }: { category: string; enumeration: string }): React.ReactNode {
  const forKudos = category == "Kudos";
  return (
    <div className="flex flex-col m-2">
      <div className="font-medium text-xs align-[-10px]">{category}</div>
      {!forKudos && <div className="text-lg truncate">{enumeration}</div>}
      {forKudos && (
        <div className="flex gap-2 items-center ml-[3px]">
          <MdThumbUp />
          <div className="ml-1 text-lg truncate">{enumeration}</div>
        </div>
      )}
    </div>
  );
}
