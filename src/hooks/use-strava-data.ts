import { RefreshedTokenResponse, StravaAuthResponse } from "@/types/services/stravaAuthorization";

export const getStravaAuthUrl = () => {
  const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID!;
  const redirectUri = process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI!;
  const scope = "activity:read";

  return `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&approval_prompt=force&scope=${scope}`;
};

export async function exchangeStravaCodeForToken(code: string): Promise<StravaAuthResponse> {
  const response = await fetch("https://www.strava.com/api/v3/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID!,
      client_secret: process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET!,
      code,
      grant_type: "authorization_code",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to exchange code for token: ${errorText}`);
  }

  const data = await response.json();
  return data;
}

export async function getAuthedAthlete(token: string): Promise<number> {
  const athlete = await getStravaData("athlete", token);
  console.log("here", athlete);
  return athlete;
}

export async function refreshStravaToken(refreshToken: string): Promise<RefreshedTokenResponse> {
  const response = await fetch("https://www.strava.com/api/v3/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID!,
      client_secret: process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to refresh token: ${errorText}`);
  }

  return await response.json();
}

export async function getStravaData(endpoint: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_STRAVA_BASE_URI}/${endpoint}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Fetch failed: ${res.status} ${res.statusText} - ${errorText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Strava API error:", error);
    throw error;
  }
}
