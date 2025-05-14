"use client";

import { createContext, useContext, useMemo, useReducer } from "react";

type Action = {
  type: "update_strava_auth";
  stravaAuth: AuthorizationState;
};

type AuthorizationState = {
  token: null;
  expiresAt: null;
  isLoading: true;
  athleteID: null;
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
  const [state, dispatch] = useReducer(stravaTokenReducer, {
    token: null,
    expiresAt: null,
    isLoading: true,
    athleteID: null,
  });

  //implement auth checks in here
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
