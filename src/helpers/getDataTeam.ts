import {MatchMode} from '../types/MatchesContextProps';
import {SECTIONS} from './';

export const getImage = (mode: MatchMode | 'trophy', team: string) => {
  return SECTIONS[mode][team]?.file;
};
export const getTitle = (mode: MatchMode | 'trophy', team: string) => {
  return SECTIONS[mode][team]?.title;
};
