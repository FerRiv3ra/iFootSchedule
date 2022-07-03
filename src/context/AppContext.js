import moment from 'moment';
import React, {createContext, useEffect, useState} from 'react';
import {getDBConnection, initDatabase} from '../config/dbConfig';

const AppContext = createContext();

const AppProvider = ({children}) => {
  const [teams, setTeams] = useState([]);
  const [teams_p, setTeams_p] = useState([]);
  const [matches, setMatches] = useState([]);
  const [matches_p, setMatches_p] = useState([]);
  const [nextMatch, setNextMatch] = useState({});
  const [nextMatch_p, setNextMatch_p] = useState({});
  const [todayMatches, setTodayMatches] = useState([]);
  const [todayMatches_p, setTodayMatches_p] = useState([]);
  const [pendingMatches, setPendingMatches] = useState([]);
  const [pendingMatches_p, setPendingMatches_p] = useState([]);

  useEffect(() => {
    const init = async () => {
      await initDatabase();
      await getDataTeams();
    };

    init();
  }, []);

  const getDataTeams = async () => {
    const db = await getDBConnection();

    const resp = await db.executeSql('SELECT * FROM teams;');
    const resp2 = await db.executeSql('SELECT * FROM teams_p;');
    const resp3 = await db.executeSql('SELECT * FROM matches;');
    const resp4 = await db.executeSql('SELECT * FROM matches_p;');

    let data = [];
    resp.forEach(resulSet => {
      for (let i = 0; i < resulSet.rows.length; i++) {
        data.push(resulSet.rows.item(i));
      }
    });

    let data_p = [];
    resp2.forEach(resulSet => {
      for (let i = 0; i < resulSet.rows.length; i++) {
        data_p.push(resulSet.rows.item(i));
      }
    });

    let dataM = [];
    resp3.forEach(resulSet => {
      for (let i = 0; i < resulSet.rows.length; i++) {
        dataM.push(resulSet.rows.item(i));
      }
    });

    let dataM_p = [];
    resp4.forEach(resulSet => {
      for (let i = 0; i < resulSet.rows.length; i++) {
        dataM_p.push(resulSet.rows.item(i));
      }
    });

    setTeams(data);
    setTeams_p(data_p);
    setMatches(dataM);
    setMatches_p(dataM_p);

    db.close();
  };

  const getNextMatch = async () => {
    const nextM = matches.filter(match => match.played === 'false');

    setNextMatch(nextM[0]);
  };

  const getNextMatch_p = async () => {
    const nextM = matches_p.filter(match => match.played === 'false');

    setNextMatch_p(nextM[0]);
  };

  const getMatchesToday = async day => {
    const data = matches.filter(match => {
      const date = moment(match.dat).dayOfYear();
      if (date === day) {
        return match;
      }
    });

    setTodayMatches(data);
  };

  const getMatchesToday_p = async day => {
    const data = matches_p.filter(match => {
      const date = moment(match.dat).dayOfYear();
      if (date === day) {
        return match;
      }
    });

    setTodayMatches_p(data);
  };

  const getPendingMatches = async day => {
    const data = matches.filter(match => {
      const date = moment(match.dat).dayOfYear();
      if (date > day && match.played === 'false') {
        return match;
      }
    });

    setPendingMatches(data);
  };

  const getPendingMatches_p = async day => {
    const data = matches_p.filter(match => {
      const date = moment(match.dat).dayOfYear();
      if (date < day && match.played === 'false') {
        return match;
      }
    });

    setPendingMatches_p(data);
  };

  return (
    <AppContext.Provider
      value={{
        teams,
        teams_p,
        getNextMatch,
        getNextMatch_p,
        nextMatch,
        nextMatch_p,
        getMatchesToday,
        getMatchesToday_p,
        todayMatches,
        todayMatches_p,
        getPendingMatches,
        getPendingMatches_p,
        pendingMatches,
        pendingMatches_p,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export {AppProvider};

export default AppContext;
