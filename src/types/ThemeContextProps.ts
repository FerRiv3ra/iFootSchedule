import {MatchMode} from './MatchesContextProps';

export interface ThemeContextProps {
  colors: string[];
  prevColors: string[];
  mode: MatchMode;
  setMainColors: (colors: string[]) => void;
  setPrevMainColors: (colors: string[]) => void;
  setNewMode: (newMode: MatchMode) => void;
}
