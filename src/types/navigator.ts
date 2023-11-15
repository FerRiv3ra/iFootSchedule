import {MatchDBInterface, TeamDBInterface} from './database';

export type RootStackParams = {
  WelcomeScreen: undefined;
  Matches: undefined;
  Match: {
    match: MatchDBInterface;
    editing?: boolean;
    local?: TeamDBInterface;
  };
  PlayedMatches: {parent: 'Matches' | 'Playground'};
  Countdown: undefined;
};
