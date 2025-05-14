export type StravaActivity = {
  resource_state: number;
  athlete: {
    id: number;
    resource_state: number;
  };
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  workout_type: number;
  id: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  location_city: string | null;
  location_state: string | null;
  location_country: string | null;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: {
    id: string;
    summary_polyline: string;
    resource_state: number;
  };
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: string;
  flagged: boolean;
  gear_id: string;
  start_latlng: [number, number];
  end_latlng: [number, number];
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  average_temp: number;
  average_watts: number;
  device_watts: boolean;
  kilojoules: number;
  has_heartrate: boolean;
  average_heartrate: number;
  max_heartrate: number;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: boolean;
  elev_high: number;
  elev_low: number;
  upload_id: number;
  upload_id_str: string;
  external_id: string;
  from_accepted_tag: boolean;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
  suffer_score: number;
};

type ActivityTotals = {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
  achievement_count?: number;
};

export type AthleteStats = {
  biggest_ride_distance: number;
  biggest_climb_elevation_gain: number;
  recent_ride_totals: ActivityTotals;
  all_ride_totals: ActivityTotals;
  recent_run_totals: ActivityTotals;
  all_run_totals: ActivityTotals;
  recent_swim_totals: ActivityTotals;
  all_swim_totals: ActivityTotals;
  ytd_ride_totals: ActivityTotals;
  ytd_run_totals: ActivityTotals;
  ytd_swim_totals: ActivityTotals;
};

export type AthleteProfile = {
  id: number;
  username: string | null;
  resource_state: number;
  firstname: string;
  lastname: string;
  bio: string;
  city: string;
  state: string;
  country: string;
  sex: "M" | "F" | string; // You can narrow this down further if needed
  premium: boolean;
  summit: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  badge_type_id: number;
  weight: number;
  profile_medium: string;
  profile: string;
  friend: null; // can be typed better if you know its shape
  follower: null; // same here
};
