import {ValidLanguages} from './ConfigContexInterface';
import {MatchMode} from './MatchesContextProps';
import {
  ChampTeamDBInterface,
  MatchDBInterface,
  TeamDBInterface,
} from './database';

export interface DataContextProps {
  DBLoading: boolean;
  teams: TeamDBInterface[];
  matches: MatchDBInterface[];
  matchPlayed: number;
  nextMatch?: MatchDBInterface;
  todayMatches: MatchDBInterface[];
  pendingMatches: MatchDBInterface[];
  lang: ValidLanguages;
  changeMode: (mode: MatchMode) => void;
  getChampion: (parent: MatchMode) => TeamDBInterface | ChampTeamDBInterface;
  getMatchesToday: () => void;
  getNextMatch: () => void;
  getPendingMatches: () => void;
  saveMatch: (
    match: MatchDBInterface,
    parent: MatchMode,
    editing?: boolean,
  ) => Promise<void>;
  setLanguage: (language: ValidLanguages) => void;
}
