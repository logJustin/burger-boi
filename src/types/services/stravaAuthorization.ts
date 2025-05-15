import { AthleteProfile } from "@/types/components/strava";

/**
 * Interface representing the OAuth token response from Strava after authentication
 */
export interface StravaAuthResponse {
  athlete: AthleteProfile;
  expires_in: string;
  token_type: string;
  expires_at: number;
  refresh_token: string;
  access_token: string;
}

export interface StoredStravaAuth extends Omit<StravaAuthResponse, "athlete" | "expires_in" | "token_type"> {
  athleteID?: number;
}

/**
 * Interface for the refreshed token response when using a refresh token
 */
export interface RefreshedTokenResponse {
  token_type: string;
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
}

export interface RefreshedToken {
  token: string;
  expiresAt: number;
}
