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
import {MatchInterface, MatchMode, TeamInterface} from '../types';

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

    const writeTeamData = (data: TeamInterface[], collection: MatchMode) => {
      if (!!data[0].draw) {
        data.forEach(team => {
          realm.write(() => {
            realm.create(collection, {
              _id: uuid(),
              name: team.name,
              short_name: team.short_name,
              stadium: team.stadium,
              p: team.p,
              win: team.win,
              draw: team.draw,
              last: team.last,
              lost: team.lost,
              gf: team.gf,
              ga: team.ga,
              gd: team.gf - team.ga,
              pts: team.pts,
            });
          });
        });
      }
    };

    const writeMatchData = (data: MatchInterface[], collection: MatchMode) => {
      data.forEach(match => {
        realm.write(() => {
          realm.create(
            `${
              collection === 'UCL' ? collection.toLowerCase() : collection
            }Matches`,
            {
              _id: uuid(),
              local: match.local,
              visit: match.visit,
              date: match.date,
              goll: match.goll,
              golv: match.golv,
              played: match.played,
            },
          );
        });
      });
    };

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

    const dbLaLiga = realm.objects('laLiga');
    const dbPremier = realm.objects('premier');
    const dbUclTeams = realm.objects('uclTeams');
    const dbLaLigaMatches = realm.objects('laLigaMatches');
    const dbPremierMatches = realm.objects('premierMatches');
    const dbUclMatches = realm.objects('uclMatches');

    if (!dbLaLiga.length) {
      writeTeamData(laLigaData, 'laLiga');

      await AsyncStorage.setItem('laLigaVersion', '1.0.0');
    }

    if (!dbPremier.length) {
      writeTeamData(premierLeagueData, 'premier');

      await AsyncStorage.setItem('premierVersion', '1.0.0');
    }

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

    if (!dbLaLigaMatches.length) {
      writeMatchData(laLigaDataMatches, 'laLiga');

      await AsyncStorage.setItem('laLigaMatchesVersion', '1.0.0');
    }

    if (!dbPremierMatches.length) {
      writeMatchData(premierLegueMatches, 'premier');

      await AsyncStorage.setItem('premierMatchesVersion', '1.0.0');
    }

    if (!dbUclMatches.length) {
      writeMatchData(champMatches, 'UCL');
    }

    realm.close();
  } catch (err: any) {
    console.error('Failed to open the realm QuickStart', err.message);
  }
};

export {quickStart};
