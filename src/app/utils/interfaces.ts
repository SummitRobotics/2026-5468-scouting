export interface AutoScoutingData {
  moved: boolean;
  fuel_depot: boolean;
  fuel_outpost: boolean;
  fuel_neutral: boolean;
  climb: boolean;
  climb_location: string;
  fuel_score: number;
}

export interface TeleopScoutingData {
  fuelscore: number;
  snowblow_neutral1: boolean;
  snowblow_neutral2: boolean;
  snowblow_alliance: boolean;
  out_of_bounds: boolean;
  move_shoot: boolean;
  bump: boolean;
  trench: boolean;
  driver_skill: number;
  defense: boolean;
  speed: number;
}

export interface EndgameScoutingData {
  fuel_score: number;
  climb_level: number;
  climb_location: string;
}

export interface AssessmentScoutingData {
  died: boolean;
  tipped: boolean;
  fuel_spill: boolean;
  stuck_fuel: boolean;
  stuck_bump: boolean;
}

export interface ScoutingData {
  eventID: string;
  teamID: number;
  scout_name: string;
  on_field: boolean;
  start_position: string;
  rank_points: number;
  notes: string;
  'teleop-fuel_score': number;
  'teleop-snowblow_neutral1': boolean;
  'teleop-snowblow_neutral2': boolean;
  'teleop-snowblow_alliance': boolean;
  'teleop-out_of_bounds': boolean;
  'teleop-move_shoot': boolean;
  'teleop-bump': boolean;
  'teleop-trench': boolean;
  'teleop-driver_skill': number;
  'teleop-defense': boolean;
  'teleop-speed': number;
  'endgame-fuel_score': number;
  'endgame-climb_level': number;
  'endgame-climb_location': string;
  'assessment-died': boolean;
  'assessment-tipped': boolean;
  'assessment-fuel_spill': boolean;
  'assessment-stuck_fuel': boolean;
  'assessment-stuck_bump': boolean;
  'auto-moved': boolean;
  'auto-fuel_depot': boolean;
  'auto-fuel_outpost': boolean;
  'auto-fuel_neutral': boolean;
  'auto-climb': boolean;
  'auto-climb_location': string;
  'auto-fuel_score': number;
}

export interface FormValues {
    [key: string]: string | number | boolean | File | undefined;
}

export interface TeamPitData {
  width?: number;
  length?: number;
  height?: number;
  weight?: number;
  intake_type?: string;
  shooter_type?: string;
  shooter_count?: number;
  auto_aim?: boolean;
  auto_score_count?: number;
  move_shoot?: boolean;
  outpost_feed?: boolean;
  outpost_receive?: boolean;
  climb_endgame?: boolean;
  climb_auto?: boolean;
  drive_type?: string;
  nav_bump?: boolean;
  nav_trench?: string;
  hopper_capacity?: number;
  quality?: string;
  electrical_quality?: string;
  electrical_ports_taped?: boolean;
  electrical_battery_protected?: boolean;
  eletrical_loose_wiring?: boolean;
  pit_condition?: string;
  notes?: string;
  teamID: number;
  error?: string;
}
