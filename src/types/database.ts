export interface MatchInterface {
  date: string;
  goll: number;
  golv: number;
  penl: number;
  penv: number;
  local: string;
  played: boolean;
  visit: string;
}

export interface MatchDBInterface extends MatchInterface {
  _id: string;
}

export interface MatchResponse {
  version: string;
  data: MatchInterface[];
}

export interface TeamsResponse {
  version: string;
  data: TeamInterface[];
}

export type MatchResult = 'W' | 'L' | 'D';

export interface TeamInterface {
  name: string;
  short_name: string;
  stadium: string;
  p: number;
  win: number;
  last?: MatchResult[];
  group?: string;
  draw: number;
  lost: number;
  gf: number;
  ga: number;
  gd?: number;
  pts: number;
}

export interface TeamDBInterface extends TeamInterface {
  _id: string;
}
