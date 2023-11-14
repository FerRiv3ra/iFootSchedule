import Realm from 'realm';
import {MatchDBInterface, TeamDBInterface} from '../types/database';
import {MatchMode} from '../types';

export const useRealmData = () => {
  const getDataTeams = async (collection: MatchMode) => {
    try {
      const realm = await Realm.open({path: 'ifootschedule'});

      let teamsData: TeamDBInterface[] = [];
      let matchesDB;
      let matchPlayed;

      if (collection === 'laLiga') {
        teamsData = realm
          .objects('laLiga')
          .sorted([
            ['pts', true],
            ['gd', true],
            ['win', true],
            ['gf', true],
          ])
          .toJSON();
        matchesDB = realm.objects('laLigaMatches');
      } else if (collection === 'premier') {
        teamsData = realm
          .objects('premier')
          .sorted([
            ['pts', true],
            ['gd', true],
            ['gf', true],
          ])
          .toJSON();
        matchesDB = realm.objects('premierMatches');
      } else if (collection === 'UCL') {
        teamsData = realm
          .objects('uclTeams')
          .sorted([
            ['pts', true],
            ['gd', true],
            ['gf', true],
          ])
          .toJSON();
        matchesDB = realm.objects('uclMatches');
      }

      matchPlayed = matchesDB!.filtered('played = true').length;

      const matchData: MatchDBInterface[] = matchesDB!
        .sorted([['date', false]])
        .toJSON();

      realm.close();

      return {
        teamsData,
        matchPlayed,
        matchData,
      };
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return {getDataTeams};
};
