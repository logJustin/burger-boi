import { exchangeStravaCodeForToken, getStravaAuthUrl, refreshStravaToken } from "@/hooks/use-strava-data";
import { RefreshedToken, StoredStravaAuth } from "@/types/services/stravaAuthorization";

export async function refreshAuthToken(refreshToken: string): Promise<RefreshedToken> {
  const refreshedStravaAuth = await refreshStravaToken(refreshToken);
  storeStravaAuth({ data: refreshedStravaAuth });
  return { token: refreshedStravaAuth.access_token, expiresAt: refreshedStravaAuth.expires_at };
}

export function redirectToStravaAuth(): void {
  const authURL = getStravaAuthUrl();
  window.location.href = authURL;
}

export async function handleCodeExchange(code: string): Promise<StoredStravaAuth> {
  const authResponse = await exchangeStravaCodeForToken(code);
  return {
    ...authResponse,
    athleteID: authResponse.athlete.id,
  };
}

export function storeStravaAuth({ data }: { data: StoredStravaAuth }): void {
  localStorage.setItem("strava_access_token", data.access_token);
  localStorage.setItem("strava_expires_at", data.expires_at.toString());
  localStorage.setItem("strava_refresh_token", data.refresh_token);
  if (data.athleteID) localStorage.setItem("strava_athlete_id", JSON.stringify(data.athleteID));
}

export function getStravaAuthFromStorage() {
  return {
    accessToken: hydrateFromStorage("strava_access_token"),
    refreshToken: hydrateFromStorage("strava_refresh_token"),
    expiresAt: hydrateFromStorage("strava_expires_at"),
    athleteID: Number(hydrateFromStorage("strava_athlete_id")),
    isLoading: true,
  };
}

function hydrateFromStorage(key: string): string | null {
  try {
    const value = localStorage.getItem(key);
    return value ?? null;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return null;
  }
}

export function numberToDateString(expirationDate: number): string {
  return new Date(expirationDate * 1000).toISOString();
}
