import {MatchMode} from '../types/MatchesContextProps';
import {MatchDBInterface, TeamDBInterface} from '../types/database';

export const getChampionData = (
  teamsData: TeamDBInterface[],
  matchMode: MatchMode,
  lastMatch?: MatchDBInterface,
) => {
  let champion: TeamDBInterface;

  if (matchMode === 'UCL') {
    const {local, goll, penl, visit, golv, penv} = lastMatch!;

    let champ_name = '';

    if (goll === golv) {
      if (penl > penv) {
        champ_name = local;
      } else {
        champ_name = visit;
      }
    } else if (goll > golv) {
      champ_name = local;
    } else {
      champ_name = visit;
    }

    champion = teamsData.filter(team => team.short_name === champ_name)[0];
  } else {
    champion = teamsData[0];
  }

  return champion;
};
