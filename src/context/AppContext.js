import moment from 'moment';
import Realm from 'realm';
import React, {createContext, useEffect, useState} from 'react';
import {quickStart} from '../config/dbConfig';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import MobileAds, {
  AdsConsent,
  AdsConsentStatus,
} from 'react-native-google-mobile-ads';

const AppContext = createContext();

const AppProvider = ({children}) => {
  const [DBLoading, setDBLoading] = useState(true);
  const [laLiga, setLaLiga] = useState([]);
  const [premier, setPremier] = useState([]);
  const [teamsC, setTeamsC] = useState([]);
  const [laLigaMatches, setLaLigaMatches] = useState([]);
  const [premierMatches, setPremierMatches] = useState([]);
  const [matchesC, setMatchesC] = useState([]);
  const [matchesPlayed, setMatchesPlayed] = useState(0);
  const [premierPlayed, setPremierPlayed] = useState(0);
  const [matchesPlayedC, setMatchesPlayedC] = useState(0);
  const [nextMatch, setNextMatch] = useState({});
  const [todayMatches, setTodayMatches] = useState([]);
  const [pendingMatches, setPendingMatches] = useState([]);
  const [lang, setLang] = useState('EN');
  const [uiMode, setUiMode] = useState('WCF');

  const today = moment();

  useEffect(() => {
    loadAdsEngine();
  }, []);

  useEffect(() => {
    init();
  }, []);

  const loadAdsEngine = async () => {
    const consentInfo = await AdsConsent.requestInfoUpdate();
    if (
      consentInfo.isConsentFormAvailable &&
      consentInfo.status === AdsConsentStatus.REQUIRED
    ) {
      const {status} = await AdsConsent.showForm();

      await AsyncStorage.setItem('adsStatus', status);
    }

    MobileAds().initialize().then(console.log);
  };

  const init = async () => {
    await quickStart();
    await getDataTeams();
    const language = await AsyncStorage.getItem('lang');
    if (language) {
      setLang(language);
    }
    const mode = await AsyncStorage.getItem('uiMode');
    if (mode) {
      setUiMode(mode);
    }
    SplashScreen.hide();
  };

  const getDataTeams = async () => {
    try {
      setDBLoading(true);
      const realm = await Realm.open({path: 'ifootschedule'});

      const laLiga = realm.objects('laLiga');
      const premier = realm.objects('premier');
      const dataTeamsC = realm.objects('uclTeams');

      const laLigaMatches = realm.objects('laLigaMatches');
      const premierMatches = realm.objects('premierMatches');
      const dataMatchesC = realm.objects('uclMatches');

      const orderTeamsC = dataTeamsC.sorted([
        ['pts', true],
        ['gd', true],
        ['gf', true],
      ]);

      const countPlayed = laLigaMatches.filtered('played = true');
      const countPremierPlayed = premierMatches.filtered('played = true');
      const countPlayedC = dataMatchesC.filtered('played = true');

      setLaLiga(
        laLiga
          .sorted([
            ['pts', true],
            ['gd', true],
            ['win', true],
            ['gf', true],
          ])
          .toJSON(),
      );

      setPremier(
        premier
          .sorted([
            ['pts', true],
            ['gd', true],
            ['win', true],
            ['gf', true],
          ])
          .toJSON(),
      );

      setTeamsC(orderTeamsC.toJSON());

      setLaLigaMatches(laLigaMatches.sorted([['date', false]]).toJSON());
      setPremierMatches(premierMatches.sorted([['date', false]]).toJSON());
      setMatchesC(dataMatchesC.sorted([['date', false]]).toJSON());

      setMatchesPlayed(countPlayed.length);
      setPremierPlayed(countPremierPlayed.length);
      setMatchesPlayedC(countPlayedC.length);

      setDBLoading(false);

      realm.close();
    } catch (err) {
      console.error('Failed to open the realm', err.message);
    }
  };

  const getNextMatch = mode => {
    switch (mode) {
      case 'laLiga':
        setNextMatch(laLigaMatches.filter(match => match.played === false)[0]);
        break;
      case 'premier':
        setNextMatch(premierMatches.filter(match => match.played === false)[0]);
        break;
      case 'UCL':
        setNextMatch(matchesC.filter(match => match.played === false)[0]);
        break;
      default:
        setNextMatch({});
        break;
    }
  };

  const getMatchesToday = parent => {
    let data = [];
    switch (parent) {
      case 'laLiga':
        data = laLigaMatches.filter(match => {
          const date = moment(match.date);

          if (
            date.toISOString().slice(0, 10) === today.toISOString().slice(0, 10)
          ) {
            return match;
          }
        });
        break;

      case 'premier':
        data = premierMatches.filter(match => {
          const date = moment(match.date);

          if (
            date.toISOString().slice(0, 10) === today.toISOString().slice(0, 10)
          ) {
            return match;
          }
        });
        break;

      case 'UCL':
        data = matchesC.filter(match => {
          const date = moment(match.date);

          if (
            date.toISOString().slice(0, 10) === today.toISOString().slice(0, 10)
          ) {
            return match;
          }
        });
        break;

      default:
        data = [];
        break;
    }
    setTodayMatches(data);
  };

  const getPendingMatches = parent => {
    let data = [];

    switch (parent) {
      case 'laLiga':
        data = laLigaMatches.filter(match => {
          const date = moment(match.date);
          if (moment(date).add(2, 'hours').isBefore(today) && !match.played) {
            return match;
          }
        });
        break;

      case 'premier':
        data = premierMatches.filter(match => {
          const date = moment(match.date);
          if (moment(date).add(2, 'hours').isBefore(today) && !match.played) {
            return match;
          }
        });
        break;

      case 'UCL':
        data = matchesC.filter(match => {
          const date = moment(match.date);
          if (moment(date).add(2, 'hours').isBefore(today) && !match.played) {
            return match;
          }
        });
        break;

      default:
        data = [];
        break;
    }

    setPendingMatches(data);
  };

  const getChampion = parent => {
    let match = {};
    let limit = parent === 'C' ? 125 : 64;
    switch (parent) {
      case 'C':
        match = matchesC.filter(match => match.id === limit)[0];

        break;
      case 'M':
        match = laLigaMatches.filter(match => match.id === limit)[0];

        break;
    }

    if (!match) {
      const dataTest =
        parent === 'UCL'
          ? {
              name: 'Real Madrid',
              group: 'F',
              short_name: 'RMA',
              stadium: 'Santiago Benabéu',
              p: 0,
              gf: 0,
              ga: 0,
              gd: 0,
              pts: 0,
            }
          : {
              name: 'QATAR',
              group: 'A',
              short_name: 'QAT',
              p: 0,
              gf: 0,
              ga: 0,
              gd: 0,
              pts: 0,
            };

      return dataTest;
    }

    const {local, goll, penl, visit, golv, penv} = match;

    let champ_name;

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

    const champ = laLiga.filter(team => team.short_name === champ_name)[0];

    return champ;
  };

  const saveMatch = async (match, parent, editing = false) => {
    try {
      const realm = await Realm.open({path: 'ifootschedule'});

      const dataMatch = parent === 'UCL' ? 'uclMatches' : `${parent}Matches`;
      const dataTeam = parent === 'UCL' ? 'uclTeams' : parent;

      let currentMatch = {};
      let local = {};
      let visit = {};

      if (parent === 'UCL') {
        local = teamsC.filter(team => team.short_name === match.local)[0];
        visit = teamsC.filter(team => team.short_name === match.visit)[0];
      } else if (parent === 'laLiga') {
        local = laLiga.filter(team => team.short_name === match.local)[0];
        visit = laLiga.filter(team => team.short_name === match.visit)[0];
      } else {
        local = premier.filter(team => team.short_name === match.local)[0];
        visit = premier.filter(team => team.short_name === match.visit)[0];
      }

      realm.write(() => {
        const tempMatch = realm.objectForPrimaryKey(dataMatch, match.id);

        currentMatch.goll = tempMatch.goll.toString();
        currentMatch.golv = tempMatch.golv.toString();

        tempMatch.goll = match.goll;
        tempMatch.golv = match.golv;
        tempMatch.penl = match.penl;
        tempMatch.penv = match.penv;
        tempMatch.played = match.played;
      });

      let winner = '';

      if (match.goll === match.golv) {
        winner = 'draw';
      } else if (match.goll > match.golv) {
        winner = 'local';
      } else {
        winner = 'visit';
      }

      if (editing) {
        let winEdit =
          Number(currentMatch.goll) === Number(currentMatch.golv)
            ? 'draw'
            : Number(currentMatch.goll) > Number(currentMatch.golv)
            ? 'local'
            : 'visit';
        realm.write(() => {
          const tempTeamL = realm.objectForPrimaryKey(dataTeam, local._id);

          tempTeamL.gf = tempTeamL.gf - Number(currentMatch.goll) + match.goll;
          tempTeamL.ga = tempTeamL.ga - Number(currentMatch.golv) + match.golv;
          tempTeamL.gd = tempTeamL.gf - tempTeamL.ga;
          tempTeamL.pts =
            tempTeamL.pts -
            (winEdit === 'draw' ? 1 : winEdit === 'local' ? 3 : 0) +
            (winner === 'draw' ? 1 : winner === 'local' ? 3 : 0);

          const tempTeamV = realm.objectForPrimaryKey(dataTeam, visit._id);

          tempTeamV.gf = tempTeamV.gf - Number(currentMatch.golv) + match.golv;
          tempTeamV.ga = tempTeamV.ga - Number(currentMatch.goll) + match.goll;
          tempTeamV.gd = tempTeamV.gf - tempTeamV.ga;
          tempTeamV.pts =
            tempTeamV.pts -
            (winEdit === 'draw' ? 1 : winEdit === 'visit' ? 3 : 0) +
            (winner === 'draw' ? 1 : winner === 'visit' ? 3 : 0);
        });
      } else {
        realm.write(() => {
          const tempTeamL = realm.objectForPrimaryKey(dataTeam, local._id);

          tempTeamL.p += 1;
          tempTeamL.gf += match.goll;
          tempTeamL.ga += match.golv;
          tempTeamL.gd = tempTeamL.gf - tempTeamL.ga;
          tempTeamL.pts += winner === 'draw' ? 1 : winner === 'local' ? 3 : 0;
          tempTeamL.win += winner === 'local' ? 1 : 0;
          tempTeamL.draw += winner === 'draw' ? 1 : 0;
          tempTeamL.lost += winner === 'visit' ? 1 : 0;

          const tempTeamV = realm.objectForPrimaryKey(dataTeam, visit._id);

          tempTeamV.p += 1;
          tempTeamV.gf += match.golv;
          tempTeamV.ga += match.goll;
          tempTeamV.gd = tempTeamV.gf - tempTeamV.ga;
          tempTeamV.pts += winner === 'draw' ? 1 : winner === 'visit' ? 3 : 0;
          tempTeamV.win += winner === 'visit' ? 1 : 0;
          tempTeamV.draw += winner === 'draw' ? 1 : 0;
          tempTeamV.lost += winner === 'local' ? 1 : 0;
        });
      }
      realm.close();

      await getDataTeams();
    } catch (err) {
      console.error('Failed to open the realm', err.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        laLigaMatches,
        matchesC,
        DBLoading,
        laLiga,
        premier,
        teamsC,
        getNextMatch,
        nextMatch,
        getMatchesToday,
        todayMatches,
        getPendingMatches,
        pendingMatches,
        getChampion,
        saveMatch,
        matchesPlayed,
        matchesPlayedC,
        premierPlayed,
        lang,
        setLang,
        uiMode,
        setUiMode,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export {AppProvider};

export default AppContext;
