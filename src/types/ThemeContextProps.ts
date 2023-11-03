import {MatchMode} from './MatchesContextProps';

export interface ThemeContextProps {
  colors: string[];
  prevColors: string[];
  setMainColors: (colors: string[]) => void;
  setPrevMainColors: (colors: string[]) => void;
  mode: MatchMode;
  setMode: (mode: MatchMode) => void;
}
