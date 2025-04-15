"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { exchangeStravaCodeForToken, getStravaAuthUrl, refreshStravaToken } from "@/hooks/use-strava-data";
import { AthleteProfile } from "@/components/custom/charts/Charts";

interface StravaTokenContextType {
  token: string | null;
  expiresAt: number | null;
  isLoading: boolean;
  athleteID: AthleteProfile["id"] | null;
}

const StravaTokenContext = createContext<StravaTokenContextType>({
  token: null,
  expiresAt: null,
  isLoading: true,
  athleteID: null,
});

export const useStravaToken = () => useContext(StravaTokenContext);

export const StravaTokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [athleteID, setAthleteID] = useState<AthleteProfile["id"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const url = new URL(window.location.href);
      const codeFromUrl = url.searchParams.get("code");

      const localToken = localStorage.getItem("strava_token");
      const localExpiresAt = localStorage.getItem("strava_expires_at");
      const localAthleteID = localStorage.getItem("strava_athlete_id");
      const localRefreshToken = localStorage.getItem("strava_refresh_token");

      const now = Math.floor(Date.now() / 1000);

      if (localToken && localExpiresAt && localRefreshToken) {
        const expires = parseInt(localExpiresAt);

        if (expires > now) {
          setToken(localToken);
          setExpiresAt(expires);
          setAthleteID(Number(localAthleteID));
          setIsLoading(false);
          return;
        } else {
          try {
            console.log("Access token expired, refreshing...");
            const refreshed = await refreshStravaToken(localRefreshToken);

            setToken(refreshed.access_token);
            setExpiresAt(refreshed.expires_at);
            setAthleteID(refreshed.athlete.id);

            localStorage.setItem("strava_token", refreshed.access_token);
            localStorage.setItem("strava_expires_at", refreshed.expires_at.toString());
            localStorage.setItem("strava_athlete_id", JSON.stringify(refreshed.athlete.id));
            localStorage.setItem("strava_refresh_token", refreshed.refresh_token);

            setIsLoading(false);
            return;
          } catch (err) {
            console.error("Failed to refresh token:", err);
          }
        }
      }

      const code = codeFromUrl || sessionStorage.getItem("strava_code");

      if (!code) {
        const authURL = getStravaAuthUrl();
        window.location.href = authURL;
        return;
      }

      try {
        if (codeFromUrl) {
          sessionStorage.setItem("strava_code", codeFromUrl);
        }

        const data = await exchangeStravaCodeForToken(code);

        setToken(data.access_token);
        setExpiresAt(data.expires_at);
        setAthleteID(data.athlete.id);

        localStorage.setItem("strava_token", data.access_token);
        localStorage.setItem("strava_expires_at", data.expires_at.toString());
        localStorage.setItem("strava_athlete", JSON.stringify(data.athlete.id));
        localStorage.setItem("strava_refresh_token", data.refresh_token);

        sessionStorage.removeItem("strava_code");
        if (codeFromUrl) {
          const newURL = url.origin + url.pathname;
          window.history.replaceState({}, document.title, newURL);
        }
      } catch (err) {
        console.error("Failed to exchange Strava code:", err);
      }

      setIsLoading(false);
    };

    checkToken();
  }, []);

  return (
    <StravaTokenContext.Provider value={{ token, expiresAt, isLoading, athleteID }}>
      {children}
    </StravaTokenContext.Provider>
  );
};
