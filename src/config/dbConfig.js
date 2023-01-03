import AsyncStorage from '@react-native-async-storage/async-storage';
import Realm from 'realm';
import {v4 as uuid} from 'uuid';

import {laLigaData} from '../data/laLiga';
import {premierLeagueData} from '../data/premierLeague';
import champData from '../data/champData';
import {matchesProps, teamsChampProps, teamsProperties} from './dbProperties';
import champMatches from '../data/champMatches';
import {laLigaDataMatches} from '../data/laLigaMatches';
import {premierLegueMatches} from '../data/premierMatches';

// Realm
const teamsSchemaConstructor = name => ({
  name,
  properties: teamsProperties,
  primaryKey: '_id',
});

const teamsSchemaChampions = name => ({
  name,
  properties: teamsChampProps,
  primaryKey: '_id',
});

const matchesSchemaConstructor = name => ({
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
      laLigaData.forEach(team => {
        realm.write(() => {
          realm.create('laLiga', {
            _id: uuid(),
            name: team.name,
            short_name: team.short_name,
            stadium: team.stadium,
            p: team.p,
            win: team.win,
            draw: team.draw,
            lost: team.lost,
            gf: team.gf,
            ga: team.ga,
            gd: team.gf - team.ga,
            pts: team.pts,
          });
        });
      });
    }

    if (!dbPremier.length) {
      premierLeagueData.forEach(team => {
        realm.write(() => {
          realm.create('premier', {
            _id: uuid(),
            name: team.name,
            short_name: team.short_name,
            stadium: team.stadium,
            p: team.p,
            win: team.win,
            draw: team.draw,
            lost: team.lost,
            gf: team.gf,
            ga: team.ga,
            gd: team.gf - team.ga,
            pts: team.pts,
          });
        });
      });
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
            gd: team.gd,
            gd: team.gf - team.ga,
            pts: team.pts,
          });
        });
      });
    }

    if (!dbLaLigaMatches.length) {
      laLigaDataMatches.forEach(match => {
        realm.write(() => {
          realm.create('laLigaMatches', {
            _id: uuid(),
            local: match.local,
            visit: match.visit,
            date: match.date,
            goll: match.goll,
            golv: match.golv,
            played: match.played,
          });
        });
      });
    }

    if (!dbPremierMatches.length) {
      premierLegueMatches.forEach(match => {
        realm.write(() => {
          realm.create('premierMatches', {
            _id: uuid(),
            local: match.local,
            visit: match.visit,
            date: match.date,
            goll: match.goll,
            golv: match.golv,
            played: match.played,
          });
        });
      });
    }

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
  } catch (err) {
    console.error('Failed to open the realm QuickStart', err.message);
  }
};

export {quickStart};
