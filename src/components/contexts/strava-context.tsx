"use client";

import {
  getStravaAuthFromStorage,
  handleCodeExchange,
  numberToDateString,
  redirectToStravaAuth,
  refreshAuthToken,
  storeStravaAuth,
} from "@/services/stravaAuthorization";
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

type Action = {
  type: "update_strava_auth" | "toggle_loading";
  stravaAuth: Partial<AuthorizationState>;
};

type AuthorizationState = {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: string | null;
  isLoading: boolean;
  athleteID: number | null;
};

type Dispatch = (action: Action) => void;

const StravaTokenContext = createContext<{ state: AuthorizationState; dispatch: Dispatch } | undefined>(undefined);

const stravaTokenReducer = (state: AuthorizationState, action: Action): AuthorizationState => {
  switch (action.type) {
    case "update_strava_auth":
      return {
        ...state,
        ...action.stravaAuth,
      };
    default:
      return state;
  }
};

const StravaTokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(stravaTokenReducer, getStravaAuthFromStorage());

  useEffect(() => {
    const codeFromStravaRedirect = new URLSearchParams(window.location.search).get("code");
    const expirationDate = state.expiresAt ? new Date(state.expiresAt) : new Date("1970-01-01T00:00:00Z");
    const isTokenExpired = new Date() >= expirationDate;

    if (state.accessToken !== null && !isTokenExpired) {
      dispatch({ type: "update_strava_auth", stravaAuth: { isLoading: false } });
      return;
    }

    if (state.refreshToken !== null && isTokenExpired) {
      refreshAuthToken(state.refreshToken).then(({ token, expiresAt }) => {
        dispatch({
          type: "update_strava_auth",
          stravaAuth: { accessToken: token, expiresAt: numberToDateString(expiresAt) },
        });
      });
      return;
    }

    if (state.accessToken == null && !codeFromStravaRedirect) {
      redirectToStravaAuth();
      return;
    }

    if (codeFromStravaRedirect) {
      handleCodeExchange(codeFromStravaRedirect).then((data) => {
        window.history.replaceState({}, document.title, "/activities");
        dispatch({
          type: "update_strava_auth",
          stravaAuth: {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresAt: numberToDateString(data.expires_at),
            isLoading: false,
            athleteID: data.athleteID,
          },
        });
        storeStravaAuth({ data });
      });
    }
  }, [state.accessToken, state.expiresAt, state.refreshToken]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StravaTokenContext.Provider value={value}>{children}</StravaTokenContext.Provider>;
};

function useStravaAuthState() {
  const context = useContext(StravaTokenContext);
  if (context === undefined) {
    throw new Error("useStravaAuthState must be used within a StravaTokenProvider");
  }
  return context.state;
}

function useStravaTokenDispatch() {
  const context = useContext(StravaTokenContext);
  if (context === undefined) {
    throw new Error("useStravaTokenDispatch must be used within a StravaTokenProvider");
  }
  return context.dispatch;
}

export { StravaTokenProvider, useStravaAuthState, useStravaTokenDispatch };
