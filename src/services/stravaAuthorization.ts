import { exchangeStravaCodeForToken, getStravaAuthUrl, refreshStravaToken } from "@/hooks/use-strava-data";
import { AthleteProfile } from "@/types/components/strava";
import { StoredAuthData } from "@/types/services/stravaAuthorization";

interface RefreshedToken {
  token: string;
  expiresAt: number;
}

export function isAuthExpiredOrMissing(): { isValid: boolean; reason: "missing" | "expired" | null } {
  // Safety check for SSR
  if (typeof window === "undefined") {
    return { isValid: false, reason: "missing" };
  }

  const token = localStorage.getItem("strava_token");
  const expiresAt = localStorage.getItem("strava_expires_at");

  if (!token || !expiresAt) return { isValid: false, reason: "missing" };

  const now = Math.floor(Date.now() / 1000);
  if (parseInt(expiresAt) < now) return { isValid: false, reason: "expired" };

  return { isValid: true, reason: null };
}

export async function refreshToken(): Promise<RefreshedToken> {
  const refreshToken = localStorage.getItem("strava_refresh_token");
  if (!refreshToken) throw new Error("No refresh token found");

  const refreshedStravaAuth = await refreshStravaToken(refreshToken);
  console.log("refresh: ", refreshedStravaAuth);
  storeStravaAuth({ data: refreshedStravaAuth });
  return { token: refreshedStravaAuth.access_token, expiresAt: refreshedStravaAuth.expires_at };
}

export function redirectToStravaAuth(): void {
  const authURL = getStravaAuthUrl();
  window.location.href = authURL;
}

export async function handleCodeExchange(code: string) {
  const data = await exchangeStravaCodeForToken(code);
  storeStravaAuth({ data });
  return data;
}

export function hydrateAuthFromStorage(): {
  token: string | null;
  expiresAt: number | null;
  athleteID: AthleteProfile["id"] | null;
} {
  // Safety check for SSR
  if (typeof window === "undefined") {
    return { token: null, expiresAt: null, athleteID: null };
  }

  // const token = localStorage.getItem("strava_token");
  const token = hydrateFromStorage("strava_token", null);
  const expiresAt = hydrateFromStorage("strava_expires_at", null);
  // const expiresAt = localStorage.getItem("strava_expires_at");
  const athleteID = hydrateFromStorage<AthleteProfile["id"] | null>("strava_athlete_id", null);

  return {
    token,
    expiresAt: expiresAt ? parseInt(expiresAt) : null,
    athleteID,
  };
}

export function storeStravaAuth({ data }: { data: StoredAuthData }): void {
  localStorage.setItem("strava_token", data.access_token);
  localStorage.setItem("strava_expires_at", data.expires_at.toString());
  localStorage.setItem("strava_refresh_token", data.refresh_token);

  if (data.athlete && data.athlete.id) {
    localStorage.setItem("strava_athlete_id", JSON.stringify(data.athlete.id));
  }
}

export function hydrateFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return fallback;
    return JSON.parse(stored) as T;
  } catch (e) {
    console.warn(`Failed to parse ${key} from localStorage`, e);
    return fallback;
  }
}
