import {MatchDBInterface, TeamDBInterface, ValidLanguages} from '../types';

export interface AppState {
  teams: TeamDBInterface[];
  matches: MatchDBInterface[];
  matchPlayed: number;
  nextMatch?: MatchDBInterface;
  todayMatches: MatchDBInterface[];
  pendingMatches: MatchDBInterface[];
  lang: ValidLanguages;
}

export type ReducerAction =
  | {type: 'setTeams'; payload: TeamDBInterface[]}
  | {type: 'setMatches'; payload: MatchDBInterface[]}
  | {type: 'updatePlayed'; payload: number}
  | {type: 'setNextMatch'}
  | {type: 'setTodayMatches'; payload: MatchDBInterface[]}
  | {type: 'setPendingMatches'; payload: MatchDBInterface[]}
  | {type: 'setLanguage'; payload: ValidLanguages};

export const appReducer = (
  state: AppState,
  action: ReducerAction,
): AppState => {
  switch (action.type) {
    case 'setTeams':
      return {
        ...state,
        teams: action.payload,
      };
    case 'setMatches':
      return {
        ...state,
        matches: action.payload,
      };
    case 'updatePlayed':
      return {
        ...state,
        matchPlayed: action.payload,
      };
    case 'setNextMatch':
      return {
        ...state,
        nextMatch: state.matches.filter(match => match.played === false)[0],
      };
    case 'setTodayMatches':
      return {
        ...state,
        todayMatches: action.payload,
      };
    case 'setPendingMatches':
      return {
        ...state,
        pendingMatches: action.payload,
      };
    case 'setLanguage':
      return {
        ...state,
        lang: action.payload,
      };

    default:
      return state;
  }
};
