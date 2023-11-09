import {
  ChampTeamInterface,
  MatchDBInterface,
  TeamDBInterface,
} from './database';

export type RootStackParams = {
  WelcomeScreen: undefined;
  Matches: undefined;
  Match: {
    match: MatchDBInterface;
    editing?: boolean;
    local?: TeamDBInterface | ChampTeamInterface;
  };
  PlayedMatches: {parent: 'Matches' | 'Playground'};
  Countdown: undefined;
};
