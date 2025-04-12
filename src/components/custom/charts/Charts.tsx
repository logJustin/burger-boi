"use client";

// import { useStravaToken } from "@/components/contexts/strava-context";
// import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Charts() {
  // const { token, expiresAt, isLoading, athlete } = useStravaToken();
  const day = new Date(1744281000);
  const content =
    'athlete: {"id":159126528,"username":null,"resource_state":2,"firstname":"JNasty","lastname":"420","bio":"pushin pedals","city":"Springfield","state":"MO","country":"United States","sex":"M","premium":true,"summit":true,"created_at":"2025-02-16T01:19:28Z","updated_at":"2025-03-19T18:00:51Z","badge_type_id":1,"weight":78.0179,"profile_medium":"https://dgalywyr863hv.cloudfront.net/pictures/athletes/159126528/35508427/2/medium.jpg","profile":"https://dgalywyr863hv.cloudfront.net/pictures/athletes/159126528/35508427/2/large.jpg","friend":null,"follower":null}';

  if (true)
    return (
      <div className="flex flex-col gap-y-4">
        <div className="p-4 bg-blue-200 text-gray-700 break-words rounded">{content}</div>
        <div className="p-4 bg-blue-200 text-gray-700 break-words rounded">{content}</div>
        <div className="p-4 bg-blue-200 text-gray-700 break-words rounded">{content}</div>
        <div className="p-4 bg-blue-200 text-gray-700 break-words rounded">{content}</div>
      </div>
    );

  return (
    <div>
      <div className="flex flex-wrap gap-y-4 gap-x-4 max-w-full">
        <div className="p-4 bg-blue-200 text-gray-700 break-words rounded">Token: {token}</div>
        <div className="p-4 bg-blue-200 text-gray-700 break-words rounded">expiresAt: {expiresAt}</div>
        <div className="p-4 bg-blue-200 text-gray-700 break-words rounded">expiresAt: {day.toUTCString()}</div>
        <div className="p-4 bg-blue-200 text-gray-700 break-words rounded">Athlete: {JSON.stringify(content)}</div>
        {/* <image /> */}
      </div>
    </div>
  );
}
