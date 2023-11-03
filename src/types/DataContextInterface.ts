import {ValidLanguages} from './ConfigContexInterface';
import {MatchMode} from './MatchesContextProps';
import {
  ChampTeamDBInterface,
  MatchDBInterface,
  TeamDBInterface,
} from './database';

export interface DataContextProps {
  DBLoading: boolean;
  laLiga: TeamDBInterface[];
  laLigaMatches: MatchDBInterface[];
  lang: ValidLanguages;
  matchesC: MatchDBInterface[];
  matchesPlayed: number;
  matchesPlayedC: number;
  nextMatch?: MatchDBInterface;
  pendingMatches: MatchDBInterface[];
  premier: TeamDBInterface[];
  premierMatches: MatchDBInterface[];
  premierPlayed: number;
  teamsC: ChampTeamDBInterface[];
  todayMatches: MatchDBInterface[];
  uiMode: MatchMode;
  getChampion: (parent: MatchMode) => void;
  getMatchesToday: (parent: MatchMode) => void;
  getNextMatch: (mode: MatchMode) => void;
  getPendingMatches: (parent: MatchMode) => void;
  saveMatch: (
    match: MatchDBInterface,
    parent: MatchMode,
    editing?: boolean,
  ) => Promise<void>;
  setLang: (lang: ValidLanguages) => void;
  setUiMode: (mode: MatchMode) => void;
}
