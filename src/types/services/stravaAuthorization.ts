import { AthleteProfile } from "@/types/components/strava";

/**
 * Interface representing the OAuth token response from Strava after authentication
 */
export interface StravaAuthResponse {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: AthleteProfile;
}

/**
 * Interface for the simplified version of token data stored in the app
 */
export interface StoredAuthData {
  access_token: string;
  expires_at: number;
  refresh_token: string;
  athlete?: {
    id: number;
  };
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

/**
 * Interface for the simplified version of tokens used internally
 */
export interface TokenData {
  token: string;
  expiresAt: number;
  refreshToken?: string;
}
