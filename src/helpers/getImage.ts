import {MatchMode} from '../types/MatchesContextProps';
import SECTIONS from './selectImg';

export const getImage = (mode: MatchMode, team: string) => {
  return SECTIONS[mode][team]?.file;
};
