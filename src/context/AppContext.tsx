import Realm from 'realm';
import React, {createContext, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from '../translate/i18nConfig';
import {useAds} from '../hooks/useAds';
import {
  ChampTeamDBInterface,
  MatchDBInterface,
  TeamDBInterface,
  MatchMode,
  ValidLanguages,
  DataContextProps,
} from '../types';
import {quickStart} from '../config/dbConfig';
import {useRealmData} from '../hooks/useRealmData';
import {getMatches, getChampionData} from '../helpers';

const AppContext = createContext({} as DataContextProps);

const AppProvider = ({children}: any) => {
  const [DBLoading, setDBLoading] = useState(true);
  const [laLiga, setLaLiga] = useState<TeamDBInterface[]>([]);
  const [premier, setPremier] = useState<TeamDBInterface[]>([]);
  const [teamsC, setTeamsC] = useState<ChampTeamDBInterface[]>([]);
  const [laLigaMatches, setLaLigaMatches] = useState<MatchDBInterface[]>([]);
  const [premierMatches, setPremierMatches] = useState<MatchDBInterface[]>([]);
  const [matchesC, setMatchesC] = useState<MatchDBInterface[]>([]);
  const [matchesPlayed, setMatchesPlayed] = useState(0);
  const [premierPlayed, setPremierPlayed] = useState(0);
  const [matchesPlayedC, setMatchesPlayedC] = useState(0);
  const [nextMatch, setNextMatch] = useState<MatchDBInterface>();
  const [todayMatches, setTodayMatches] = useState<MatchDBInterface[]>([]);
  const [pendingMatches, setPendingMatches] = useState<MatchDBInterface[]>([]);
  const [lang, setLang] = useState<ValidLanguages>('en');
  const [uiMode, setUiMode] = useState<MatchMode>('FWC');

  const {loadAdsEngine} = useAds();
  const {getDataTeams} = useRealmData();

  useEffect(() => {
    loadAdsEngine();
  }, []);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await quickStart();
    await getData();
    // TODO: Cambiar a lowercase
    const language = await AsyncStorage.getItem('lang');
    if (language) {
      setLang(language as ValidLanguages);
      i18n.changeLanguage(language.toLowerCase());
    }
    const mode = await AsyncStorage.getItem('uiMode');
    if (mode) {
      setUiMode(mode as MatchMode);
    }
  };

  const getData = async () => {
    try {
      setDBLoading(true);
      const {
        laLigaData,
        premierData,
        champTeams,
        laLigaDataMatches,
        premierDataMatches,
        champDataMatches,
        laLigaPlayed,
        premierPlayed,
        champPlayed,
      } = await getDataTeams();

      setLaLiga(laLigaData);
      setPremier(premierData);
      setTeamsC(champTeams);

      setLaLigaMatches(laLigaDataMatches);
      setPremierMatches(premierDataMatches);
      setMatchesC(champDataMatches);

      setMatchesPlayed(laLigaPlayed);
      setPremierPlayed(premierPlayed);
      setMatchesPlayedC(champPlayed);

      setDBLoading(false);
    } catch (err: any) {
      console.error('Failed to open the realm', err.message);
    }
  };

  const getNextMatch = (mode: MatchMode) => {
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
        setNextMatch(undefined);
        break;
    }
  };

  const getMatchesToday = (parent: MatchMode) => {
    let data: MatchDBInterface[];

    switch (parent) {
      case 'laLiga':
        data = getMatches(laLigaMatches, 'today');
        break;
      case 'premier':
        data = getMatches(premierMatches, 'today');
        break;
      case 'UCL':
        data = getMatches(matchesC, 'today');
        break;
      default:
        data = [];
        break;
    }

    setTodayMatches(data);
  };

  const getPendingMatches = (parent: MatchMode) => {
    let data: MatchDBInterface[];

    switch (parent) {
      case 'laLiga':
        data = getMatches(laLigaMatches, 'pending');
        break;
      case 'premier':
        data = getMatches(premierMatches, 'pending');
        break;
      case 'UCL':
        data = getMatches(matchesC, 'pending');
        break;
      default:
        data = [];
        break;
    }

    setPendingMatches(data);
  };

  const getChampion = (parent: MatchMode) => {
    let champion: TeamDBInterface | ChampTeamDBInterface;

    if (parent === 'UCL') {
      const lastMatch = matchesC[matchesC.length - 1];

      champion = getChampionData(teamsC, parent, lastMatch);
    } else {
      if (parent === 'laLiga') {
        champion = getChampionData(laLiga, parent);
      } else {
        champion = getChampionData(premier, parent);
      }
    }

    return champion;
  };

  const saveMatch = async (
    match: MatchDBInterface,
    parent: MatchMode,
    editing = false,
  ) => {
    try {
      const realm = await Realm.open({path: 'ifootschedule'});

      const dataMatch = parent === 'UCL' ? 'uclMatches' : `${parent}Matches`;
      const dataTeam = parent === 'UCL' ? 'uclTeams' : parent;

      let currentMatch: MatchDBInterface;
      let local: TeamDBInterface | ChampTeamDBInterface;
      let visit: TeamDBInterface | ChampTeamDBInterface;

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
        const tempMatch = realm.objectForPrimaryKey<MatchDBInterface>(
          dataMatch,
          match.id,
        );

        currentMatch.goll = tempMatch?.goll || 0;
        currentMatch.golv = tempMatch?.golv || 0;

        tempMatch!.goll = match.goll;
        tempMatch!.golv = match.golv;
        tempMatch!.penl = match.penl;
        tempMatch!.penv = match.penv;
        tempMatch!.played = match.played;
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
          currentMatch!.goll === currentMatch!.golv
            ? 'draw'
            : currentMatch!.goll > currentMatch!.golv
            ? 'local'
            : 'visit';
        realm.write(() => {
          const tempTeamL = realm.objectForPrimaryKey<TeamDBInterface>(
            dataTeam,
            local._id,
          );

          tempTeamL!.gf = tempTeamL!.gf - currentMatch.goll + match.goll;
          tempTeamL!.ga = tempTeamL!.ga - currentMatch.golv + match.golv;
          tempTeamL!.gd = tempTeamL!.gf - tempTeamL!.ga;
          tempTeamL!.pts =
            tempTeamL!.pts -
            (winEdit === 'draw' ? 1 : winEdit === 'local' ? 3 : 0) +
            (winner === 'draw' ? 1 : winner === 'local' ? 3 : 0);
          if (parent !== 'UCL') {
            tempTeamL!.win +=
              (winEdit === 'local' ? -1 : 0) + (winner === 'local' ? 1 : 0);
            tempTeamL!.draw +=
              (winEdit === 'draw' ? -1 : 0) + (winner === 'draw' ? 1 : 0);
            tempTeamL!.lost +=
              (winEdit === 'visit' ? -1 : 0) + (winner === 'visit' ? 1 : 0);
            tempTeamL!.last = [
              ...tempTeamL!.last.filter((item, index) => {
                if (index > 0) return item;
              }),
              winner === 'draw' ? 'D' : winner === 'local' ? 'W' : 'L',
            ];
          }

          const tempTeamV = realm.objectForPrimaryKey<TeamDBInterface>(
            dataTeam,
            visit._id,
          );

          tempTeamV!.gf = tempTeamV!.gf - currentMatch.golv + match.golv;
          tempTeamV!.ga = tempTeamV!.ga - currentMatch.goll + match.goll;
          tempTeamV!.gd = tempTeamV!.gf - tempTeamV!.ga;
          tempTeamV!.pts =
            tempTeamV!.pts -
            (winEdit === 'draw' ? 1 : winEdit === 'visit' ? 3 : 0) +
            (winner === 'draw' ? 1 : winner === 'visit' ? 3 : 0);
          if (parent !== 'UCL') {
            tempTeamV!.win =
              tempTeamV!.win -
              (winEdit === 'visit' ? 1 : 0) +
              (winner === 'visit' ? 1 : 0);
            tempTeamV!.draw =
              tempTeamV!.draw -
              (winEdit === 'draw' ? 1 : 0) +
              (winner === 'draw' ? 1 : 0);
            tempTeamV!.lost =
              tempTeamV!.lost -
              (winEdit === 'local' ? 1 : 0) +
              (winner === 'local' ? 1 : 0);
            tempTeamV!.last = [
              ...tempTeamV!.last.filter((item, index) => {
                if (index > 0) return item;
              }),
              winner === 'draw' ? 'D' : winner === 'visit' ? 'W' : 'L',
            ];
          }
        });
      } else {
        realm.write(() => {
          const tempTeamL = realm.objectForPrimaryKey<TeamDBInterface>(
            dataTeam,
            local._id,
          );

          tempTeamL!.p += 1;
          tempTeamL!.gf += match.goll;
          tempTeamL!.ga += match.golv;
          tempTeamL!.gd = tempTeamL!.gf - tempTeamL!.ga;
          tempTeamL!.pts += winner === 'draw' ? 1 : winner === 'local' ? 3 : 0;

          if (parent !== 'UCL') {
            tempTeamL!.win += winner === 'local' ? 1 : 0;
            tempTeamL!.draw += winner === 'draw' ? 1 : 0;
            tempTeamL!.lost += winner === 'visit' ? 1 : 0;
            tempTeamL!.last = [
              ...tempTeamL!.last.filter((item, index) => {
                if (index > 0) return item;
              }),
              winner === 'draw' ? 'D' : winner === 'local' ? 'W' : 'L',
            ];
          }

          const tempTeamV = realm.objectForPrimaryKey<TeamDBInterface>(
            dataTeam,
            visit._id,
          );

          tempTeamV!.p += 1;
          tempTeamV!.gf += match.golv;
          tempTeamV!.ga += match.goll;
          tempTeamV!.gd = tempTeamV!.gf - tempTeamV!.ga;
          tempTeamV!.pts += winner === 'draw' ? 1 : winner === 'visit' ? 3 : 0;

          if (parent !== 'UCL') {
            tempTeamV!.win += winner === 'visit' ? 1 : 0;
            tempTeamV!.draw += winner === 'draw' ? 1 : 0;
            tempTeamV!.lost += winner === 'local' ? 1 : 0;
            tempTeamV!.last = [
              ...tempTeamV!.last.filter((item, index) => {
                if (index > 0) return item;
              }),
              winner === 'draw' ? 'D' : winner === 'visit' ? 'W' : 'L',
            ];
          }
        });
      }
      realm.close();

      await getData();
    } catch (err: any) {
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
        premierMatches,
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
