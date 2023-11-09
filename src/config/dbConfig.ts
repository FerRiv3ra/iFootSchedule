import AsyncStorage from '@react-native-async-storage/async-storage';
import Realm from 'realm';
import {v4 as uuid} from 'uuid';

import {matchesProps, teamsChampProps, teamsProperties} from './dbProperties';
import {
  laLigaData,
  premierLeagueData,
  champData,
  champMatches,
  laLigaDataMatches,
  premierLegueMatches,
} from '../data';

import {getDataFetch} from '../helpers';

// Realm
const teamsSchemaConstructor = (name: string) => ({
  name,
  properties: teamsProperties,
  primaryKey: '_id',
});

const teamsSchemaChampions = (name: string) => ({
  name,
  properties: teamsChampProps,
  primaryKey: '_id',
});

const matchesSchemaConstructor = (name: string) => ({
  name,
  primaryKey: '_id',
  properties: matchesProps,
});

const laLiga = teamsSchemaConstructor('laLiga');
const premier = teamsSchemaConstructor('premier');
const laLigaMatches = matchesSchemaConstructor('laLigaMatches');
const premierMatches = matchesSchemaConstructor('premierMatches');
const uclTeams = teamsSchemaChampions('uclTeams');
const uclMatches = matchesSchemaConstructor('uclMatches');

const quickStart = async () => {
  try {
    const realm = await Realm.open({
      path: 'ifootschedule',
      schema: [
        laLiga,
        premier,
        laLigaMatches,
        premierMatches,
        uclTeams,
        uclMatches,
      ],
      deleteRealmIfMigrationNeeded: true,
    });

    // await AsyncStorage.removeItem('newVersion');
    // await AsyncStorage.removeItem('laLigaVersion');
    // await AsyncStorage.removeItem('premierVersion');
    // await AsyncStorage.removeItem('laLigaMatchesVersion');
    // await AsyncStorage.removeItem('premierMatchesVersion');
    const asKeys = await AsyncStorage.getAllKeys();

    if (!asKeys.includes('newVersion')) {
      realm.write(() => {
        realm.deleteAll();
      });

      if (asKeys.includes('newConfig16')) {
        await AsyncStorage.removeItem('newConfig16');
      }
      if (asKeys.includes('newConfig')) {
        await AsyncStorage.removeItem('newConfig');
      }

      await AsyncStorage.setItem('currentDay', '324');
      await AsyncStorage.setItem('newVersion', 'true');
    }

    if (!asKeys.includes('laLigaVersion')) {
      await AsyncStorage.setItem('laLigaVersion', '1.0.0');
      await AsyncStorage.setItem('premierVersion', '1.0.0');
      await AsyncStorage.setItem('laLigaMatchesVersion', '1.0.0');
      await AsyncStorage.setItem('premierMatchesVersion', '1.0.0');
    }

    const dbLaLiga = realm.objects('laLiga');
    const dbPremier = realm.objects('premier');
    const dbUclTeams = realm.objects('uclTeams');
    const dbLaLigaMatches = realm.objects('laLigaMatches');
    const dbPremierMatches = realm.objects('premierMatches');
    const dbUclMatches = realm.objects('uclMatches');

    const {
      laLigaDataFetch,
      premierDataFetch,
      laLigaMatchesDataFetch,
      premierMatchesDataFetch,
    } = await getDataFetch();

    const laLigaVersion = await AsyncStorage.getItem('laLigaVersion');
    const premierVersion = await AsyncStorage.getItem('premierVersion');
    const laLigaMatchesVersion = await AsyncStorage.getItem(
      'laLigaMatchesVersion',
    );
    const premierMatchesVersion = await AsyncStorage.getItem(
      'premierMatchesVersion',
    );

    // if (laLigaVersion === laLigaDataFetch.version) {
    //   if (!dbLaLiga.length) {
    //     laLigaData.forEach(team => {
    //       realm.write(() => {
    //         realm.create('laLiga', {
    //           _id: uuid(),
    //           name: team.name,
    //           short_name: team.short_name,
    //           stadium: team.stadium,
    //           p: team.p,
    //           win: team.win,
    //           draw: team.draw,
    //           last: team.last,
    //           lost: team.lost,
    //           gf: team.gf,
    //           ga: team.ga,
    //           gd: team.gf - team.ga,
    //           pts: team.pts,
    //         });
    //       });
    //     });

    //     await AsyncStorage.setItem('laLigaVersion', '1.0.0');
    //   }
    // } else {
    //   realm.write(() => {
    //     realm.delete(dbLaLiga);
    //   });

    //   laLigaDataFetch.data.forEach(team => {
    //     realm.write(() => {
    //       realm.create('laLiga', {
    //         _id: uuid(),
    //         name: team.name,
    //         short_name: team.short_name,
    //         stadium: team.stadium,
    //         p: team.p,
    //         win: team.win,
    //         draw: team.draw,
    //         last: team.last,
    //         lost: team.lost,
    //         gf: team.gf,
    //         ga: team.ga,
    //         gd: team.gf - team.ga,
    //         pts: team.pts,
    //       });
    //     });
    //   });

    //   await AsyncStorage.setItem('laLigaVersion', laLigaDataFetch.version);
    // }

    // if (premierVersion === premierDataFetch.version) {
    //   if (!dbPremier.length) {
    //     premierLeagueData.forEach(team => {
    //       realm.write(() => {
    //         realm.create('premier', {
    //           _id: uuid(),
    //           name: team.name,
    //           short_name: team.short_name,
    //           stadium: team.stadium,
    //           p: team.p,
    //           win: team.win,
    //           draw: team.draw,
    //           lost: team.lost,
    //           gf: team.gf,
    //           ga: team.ga,
    //           gd: team.gf - team.ga,
    //           pts: team.pts,
    //         });
    //       });
    //     });

    //     await AsyncStorage.setItem('premierVersion', '1.0.0');
    //   }
    // } else {
    //   realm.write(() => {
    //     realm.delete(dbPremier);
    //   });

    //   premierDataFetch.data.forEach(team => {
    //     realm.write(() => {
    //       realm.create('premier', {
    //         _id: uuid(),
    //         name: team.name,
    //         short_name: team.short_name,
    //         stadium: team.stadium,
    //         p: team.p,
    //         win: team.win,
    //         draw: team.draw,
    //         lost: team.lost,
    //         gf: team.gf,
    //         ga: team.ga,
    //         gd: team.gf - team.ga,
    //         pts: team.pts,
    //       });
    //     });
    //   });

    //   await AsyncStorage.setItem('premierVersion', premierDataFetch.version);
    // }

    if (!dbUclTeams.length) {
      champData.forEach(team => {
        realm.write(() => {
          realm.create('uclTeams', {
            _id: uuid(),
            name: team.name,
            short_name: team.short_name,
            stadium: team.stadium,
            group: team.group,
            p: team.p,
            gf: team.gf,
            gd: team.gf - team.ga,
            pts: team.pts,
          });
        });
      });
    }

    // if (laLigaMatchesVersion === laLigaMatchesDataFetch.version) {
    //   if (!dbLaLigaMatches.length) {
    //     laLigaDataMatches.forEach(match => {
    //       realm.write(() => {
    //         realm.create('laLigaMatches', {
    //           _id: uuid(),
    //           local: match.local,
    //           visit: match.visit,
    //           date: match.date,
    //           goll: match.goll,
    //           golv: match.golv,
    //           played: match.played,
    //         });
    //       });
    //     });
    //     await AsyncStorage.setItem('laLigaMatchesVersion', '1.0.0');
    //   }
    // } else {
    //   realm.write(() => {
    //     realm.delete(dbLaLigaMatches);
    //   });

    //   laLigaMatchesDataFetch.data.forEach(match => {
    //     realm.write(() => {
    //       realm.create('laLigaMatches', {
    //         _id: uuid(),
    //         local: match.local,
    //         visit: match.visit,
    //         date: match.date,
    //         goll: match.goll,
    //         golv: match.golv,
    //         played: match.played,
    //       });
    //     });
    //   });

    //   await AsyncStorage.setItem(
    //     'laLigaMatchesVersion',
    //     laLigaMatchesDataFetch.version,
    //   );
    // }

    // if (premierMatchesVersion === premierMatchesDataFetch.version) {
    //   if (!dbPremierMatches.length) {
    //     premierLegueMatches.forEach(match => {
    //       realm.write(() => {
    //         realm.create('premierMatches', {
    //           _id: uuid(),
    //           local: match.local,
    //           visit: match.visit,
    //           date: match.date,
    //           goll: match.goll,
    //           golv: match.golv,
    //           played: match.played,
    //         });
    //       });
    //     });

    //     await AsyncStorage.setItem('premierMatchesVersion', '1.0.0');
    //   }
    // } else {
    //   realm.write(() => {
    //     realm.delete(dbPremierMatches);
    //   });

    //   premierMatchesDataFetch.data.forEach(match => {
    //     realm.write(() => {
    //       realm.create('premierMatches', {
    //         _id: uuid(),
    //         local: match.local,
    //         visit: match.visit,
    //         date: match.date,
    //         goll: match.goll,
    //         golv: match.golv,
    //         played: match.played,
    //       });
    //     });
    //   });

    //   await AsyncStorage.setItem(
    //     'premierMatchesVersion',
    //     premierMatchesDataFetch.version,
    //   );
    // }

    if (!dbUclMatches.length) {
      champMatches.forEach(match => {
        realm.write(() => {
          realm.create('uclMatches', {
            _id: uuid(),
            local: match.local,
            visit: match.visit,
            date: match.date,
          });
        });
      });
    }

    realm.close();
  } catch (err: any) {
    console.error('Failed to open the realm QuickStart', err.message);
  }
};

export {quickStart};
