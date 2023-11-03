import Realm from 'realm';
import {
  ChampTeamDBInterface,
  MatchDBInterface,
  TeamDBInterface,
} from '../types/database';

export const useRealmData = () => {
  const getDataTeams = async () => {
    try {
      const realm = await Realm.open({path: 'ifootschedule'});

      const laLiga = realm.objects<TeamDBInterface[]>('laLiga');
      const premier = realm.objects<TeamDBInterface>('premier');
      const dataTeamsC = realm.objects<ChampTeamDBInterface>('uclTeams');

      const laLigaMatches = realm.objects('laLigaMatches');
      const premierMatches = realm.objects('premierMatches');
      const dataMatchesC = realm.objects('uclMatches');

      const orderTeamsC = dataTeamsC.sorted([
        ['pts', true],
        ['gd', true],
        ['gf', true],
      ]);

      const laLigaPlayed = laLigaMatches.filtered('played = true').length;
      const premierPlayed = premierMatches.filtered('played = true').length;
      const champPlayed = dataMatchesC.filtered('played = true').length;

      const laLigaData: TeamDBInterface[] = laLiga
        .sorted([
          ['pts', true],
          ['gd', true],
          ['win', true],
          ['gf', true],
        ])
        .toJSON();

      const premierData: TeamDBInterface[] = premier
        .sorted([
          ['pts', true],
          ['gd', true],
          ['win', true],
          ['gf', true],
        ])
        .toJSON();

      const champTeams: ChampTeamDBInterface[] = orderTeamsC.toJSON();

      const laLigaDataMatches: MatchDBInterface[] = laLigaMatches
        .sorted([['date', false]])
        .toJSON();
      const premierDataMatches: MatchDBInterface[] = premierMatches
        .sorted([['date', false]])
        .toJSON();
      const champDataMatches: MatchDBInterface[] = dataMatchesC
        .sorted([['date', false]])
        .toJSON();

      realm.close();

      return {
        laLigaPlayed,
        premierPlayed,
        champPlayed,
        laLigaData,
        premierData,
        champTeams,
        laLigaDataMatches,
        premierDataMatches,
        champDataMatches,
      };
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return {getDataTeams};
};
