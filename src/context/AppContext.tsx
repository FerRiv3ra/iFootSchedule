import Realm from 'realm';
import React, {createContext, useEffect, useReducer, useState} from 'react';

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
import {AppState, ReducerAction, appReducer} from './appReducer';

const AppContext = createContext({} as DataContextProps);

const initialState: AppState = {
  teams: [],
  matches: [],
  matchPlayed: 0,
  nextMatch: undefined,
  todayMatches: [],
  pendingMatches: [],
  lang: 'es',
};

const AppProvider = ({children}: any) => {
  const [DBLoading, setDBLoading] = useState(true);
  const [
    {
      teams,
      matches,
      matchPlayed,
      nextMatch,
      todayMatches,
      pendingMatches,
      lang,
    },
    dispatch,
  ] = useReducer(appReducer, initialState);

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
    await getData('UCL');
    const language = await AsyncStorage.getItem('lang');
    if (language) {
      dispatch({type: 'setLanguage', payload: language as ValidLanguages});
      i18n.changeLanguage(language.toLowerCase());
    }
  };

  const getData = async (mode: MatchMode) => {
    try {
      setDBLoading(true);
      const {teamsData, matchData, matchPlayed} = await getDataTeams(mode);

      const addTeamsAction: ReducerAction = {
        type: 'setTeams',
        payload: teamsData,
      };
      const addMatchesAction: ReducerAction = {
        type: 'setMatches',
        payload: matchData,
      };
      const setPlayedAction: ReducerAction = {
        type: 'updatePlayed',
        payload: matchPlayed,
      };

      dispatch(addTeamsAction);
      dispatch(addMatchesAction);
      dispatch(setPlayedAction);

      setDBLoading(false);
    } catch (err: any) {
      console.error('Failed to open the realm', err.message);
    }
  };

  const changeMode = (mode: MatchMode) => {
    getData(mode);
  };

  const setLanguage = (language: ValidLanguages) => {
    i18n.changeLanguage(language);
    dispatch({type: 'setLanguage', payload: language});
  };

  const getNextMatch = () => {
    dispatch({type: 'setNextMatch'});
  };

  const getMatchesToday = () => {
    let data: MatchDBInterface[] = getMatches(matches, 'today');

    dispatch({type: 'setTodayMatches', payload: data});
  };

  const getPendingMatches = () => {
    let data: MatchDBInterface[] = getMatches(matches, 'pending');

    dispatch({type: 'setPendingMatches', payload: data});
  };

  const getChampion = (parent: MatchMode) => {
    let champion: TeamDBInterface | ChampTeamDBInterface;

    if (parent === 'UCL') {
      const lastMatch = matches[matches.length - 1];

      champion = getChampionData(teams, parent, lastMatch);
    } else {
      champion = getChampionData(teams, parent);
    }

    return champion;
  };

  const saveMatch = async (
    match: MatchDBInterface,
    parent: MatchMode,
    editing = false,
  ) => {
    // TODO: Refactor this
    //   try {
    //     const realm = await Realm.open({path: 'ifootschedule'});
    //     const dataMatch = parent === 'UCL' ? 'uclMatches' : `${parent}Matches`;
    //     const dataTeam = parent === 'UCL' ? 'uclTeams' : parent;
    //     let currentMatch: MatchDBInterface;
    //     let local: TeamDBInterface | ChampTeamDBInterface;
    //     let visit: TeamDBInterface | ChampTeamDBInterface;
    //     if (parent === 'UCL') {
    //       local = teamsC.filter(team => team.short_name === match.local)[0];
    //       visit = teamsC.filter(team => team.short_name === match.visit)[0];
    //     } else if (parent === 'laLiga') {
    //       local = laLiga.filter(team => team.short_name === match.local)[0];
    //       visit = laLiga.filter(team => team.short_name === match.visit)[0];
    //     } else {
    //       local = premier.filter(team => team.short_name === match.local)[0];
    //       visit = premier.filter(team => team.short_name === match.visit)[0];
    //     }
    //     realm.write(() => {
    //       const tempMatch = realm.objectForPrimaryKey<MatchDBInterface>(
    //         dataMatch,
    //         match._id,
    //       );
    //       currentMatch.goll = tempMatch?.goll || 0;
    //       currentMatch.golv = tempMatch?.golv || 0;
    //       tempMatch!.goll = match.goll;
    //       tempMatch!.golv = match.golv;
    //       tempMatch!.penl = match.penl;
    //       tempMatch!.penv = match.penv;
    //       tempMatch!.played = match.played;
    //     });
    //     let winner = '';
    //     if (match.goll === match.golv) {
    //       winner = 'draw';
    //     } else if (match.goll > match.golv) {
    //       winner = 'local';
    //     } else {
    //       winner = 'visit';
    //     }
    //     if (editing) {
    //       let winEdit =
    //         currentMatch!.goll === currentMatch!.golv
    //           ? 'draw'
    //           : currentMatch!.goll > currentMatch!.golv
    //           ? 'local'
    //           : 'visit';
    //       realm.write(() => {
    //         const tempTeamL = realm.objectForPrimaryKey<TeamDBInterface>(
    //           dataTeam,
    //           local._id,
    //         );
    //         tempTeamL!.gf = tempTeamL!.gf - currentMatch.goll + match.goll;
    //         tempTeamL!.ga = tempTeamL!.ga - currentMatch.golv + match.golv;
    //         tempTeamL!.gd = tempTeamL!.gf - tempTeamL!.ga;
    //         tempTeamL!.pts =
    //           tempTeamL!.pts -
    //           (winEdit === 'draw' ? 1 : winEdit === 'local' ? 3 : 0) +
    //           (winner === 'draw' ? 1 : winner === 'local' ? 3 : 0);
    //         if (parent !== 'UCL') {
    //           tempTeamL!.win +=
    //             (winEdit === 'local' ? -1 : 0) + (winner === 'local' ? 1 : 0);
    //           tempTeamL!.draw +=
    //             (winEdit === 'draw' ? -1 : 0) + (winner === 'draw' ? 1 : 0);
    //           tempTeamL!.lost +=
    //             (winEdit === 'visit' ? -1 : 0) + (winner === 'visit' ? 1 : 0);
    //           tempTeamL!.last = [
    //             ...tempTeamL!.last!.filter((item, index) => {
    //               if (index > 0) return item;
    //             }),
    //             winner === 'draw' ? 'D' : winner === 'local' ? 'W' : 'L',
    //           ];
    //         }
    //         const tempTeamV = realm.objectForPrimaryKey<TeamDBInterface>(
    //           dataTeam,
    //           visit._id,
    //         );
    //         tempTeamV!.gf = tempTeamV!.gf - currentMatch.golv + match.golv;
    //         tempTeamV!.ga = tempTeamV!.ga - currentMatch.goll + match.goll;
    //         tempTeamV!.gd = tempTeamV!.gf - tempTeamV!.ga;
    //         tempTeamV!.pts =
    //           tempTeamV!.pts -
    //           (winEdit === 'draw' ? 1 : winEdit === 'visit' ? 3 : 0) +
    //           (winner === 'draw' ? 1 : winner === 'visit' ? 3 : 0);
    //         if (parent !== 'UCL') {
    //           tempTeamV!.win =
    //             tempTeamV!.win -
    //             (winEdit === 'visit' ? 1 : 0) +
    //             (winner === 'visit' ? 1 : 0);
    //           tempTeamV!.draw =
    //             tempTeamV!.draw -
    //             (winEdit === 'draw' ? 1 : 0) +
    //             (winner === 'draw' ? 1 : 0);
    //           tempTeamV!.lost =
    //             tempTeamV!.lost -
    //             (winEdit === 'local' ? 1 : 0) +
    //             (winner === 'local' ? 1 : 0);
    //           tempTeamV!.last = [
    //             ...tempTeamV!.last!.filter((item, index) => {
    //               if (index > 0) return item;
    //             }),
    //             winner === 'draw' ? 'D' : winner === 'visit' ? 'W' : 'L',
    //           ];
    //         }
    //       });
    //     } else {
    //       realm.write(() => {
    //         const tempTeamL = realm.objectForPrimaryKey<TeamDBInterface>(
    //           dataTeam,
    //           local._id,
    //         );
    //         tempTeamL!.p += 1;
    //         tempTeamL!.gf += match.goll;
    //         tempTeamL!.ga += match.golv;
    //         tempTeamL!.gd = tempTeamL!.gf - tempTeamL!.ga;
    //         tempTeamL!.pts += winner === 'draw' ? 1 : winner === 'local' ? 3 : 0;
    //         if (parent !== 'UCL') {
    //           tempTeamL!.win += winner === 'local' ? 1 : 0;
    //           tempTeamL!.draw += winner === 'draw' ? 1 : 0;
    //           tempTeamL!.lost += winner === 'visit' ? 1 : 0;
    //           tempTeamL!.last = [
    //             ...tempTeamL!.last!.filter((item, index) => {
    //               if (index > 0) return item;
    //             }),
    //             winner === 'draw' ? 'D' : winner === 'local' ? 'W' : 'L',
    //           ];
    //         }
    //         const tempTeamV = realm.objectForPrimaryKey<TeamDBInterface>(
    //           dataTeam,
    //           visit._id,
    //         );
    //         tempTeamV!.p += 1;
    //         tempTeamV!.gf += match.golv;
    //         tempTeamV!.ga += match.goll;
    //         tempTeamV!.gd = tempTeamV!.gf - tempTeamV!.ga;
    //         tempTeamV!.pts += winner === 'draw' ? 1 : winner === 'visit' ? 3 : 0;
    //         if (parent !== 'UCL') {
    //           tempTeamV!.win += winner === 'visit' ? 1 : 0;
    //           tempTeamV!.draw += winner === 'draw' ? 1 : 0;
    //           tempTeamV!.lost += winner === 'local' ? 1 : 0;
    //           tempTeamV!.last = [
    //             ...tempTeamV!.last!.filter((item, index) => {
    //               if (index > 0) return item;
    //             }),
    //             winner === 'draw' ? 'D' : winner === 'visit' ? 'W' : 'L',
    //           ];
    //         }
    //       });
    //     }
    //     realm.close();
    //     await getData();
    //   } catch (err: any) {
    //     console.error('Failed to open the realm', err.message);
    //   }
  };

  return (
    <AppContext.Provider
      value={{
        DBLoading,
        lang,
        matches,
        matchPlayed,
        nextMatch,
        pendingMatches,
        teams,
        todayMatches,
        changeMode,
        getNextMatch,
        getChampion,
        getMatchesToday,
        getPendingMatches,
        saveMatch,
        setLanguage,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export {AppProvider};

export default AppContext;
