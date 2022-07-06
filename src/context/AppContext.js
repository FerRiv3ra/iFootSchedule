import moment from 'moment';
import React, {createContext, useEffect, useState} from 'react';
import {getDBConnection, initDatabase} from '../config/dbConfig';

const AppContext = createContext();

const AppProvider = ({children}) => {
  const [DBLoading, setDBLoading] = useState(true);
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
    setDBLoading(true);
    const db = await getDBConnection();

    const resp = await db.executeSql(
      'SELECT * FROM teams ORDER BY pts DESC, gd DESC;',
    );
    const resp2 = await db.executeSql(
      'SELECT * FROM teams_p ORDER BY pts DESC, gd DESC;',
    );
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
    setDBLoading(false);

    db.close();
  };

  const getNextMatch = () => {
    const nextM = matches.filter(match => match.played === 'false');

    setNextMatch(nextM[0]);
  };

  const getNextMatch_p = () => {
    const nextM = matches_p.filter(match => match.played === 'false');

    setNextMatch_p(nextM[0]);
  };

  const getMatchesToday = day => {
    const data = matches.filter(match => {
      const date = moment(match.dat).dayOfYear();
      if (date === day) {
        return match;
      }
    });

    setTodayMatches(data);
  };

  const getMatchesToday_p = day => {
    const data = matches_p.filter(match => {
      const date = moment(match.dat).dayOfYear();
      if (date === day) {
        return match;
      }
    });

    setTodayMatches_p(data);
  };

  const getPendingMatches = day => {
    const data = matches.filter(match => {
      const date = moment(match.dat).dayOfYear();
      if (date < day && match.played === 'false') {
        return match;
      }
    });

    setPendingMatches(data);
  };

  const getPendingMatches_p = day => {
    const data = matches_p.filter(match => {
      const date = moment(match.dat).dayOfYear();
      if (date < day && match.played === 'false') {
        return match;
      }
    });

    setPendingMatches_p(data);
  };

  const getChampion = () => {
    const match = matches.filter(match => match.id === 64)[0];

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

    const dataTest = {
      name: 'QATAR',
      group: 'A',
      short_name: 'QAT',
      p: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      pts: 0,
    };

    const champ = teams.filter(team => team.short_name === champ_name);

    return champ.length ? champ : dataTest;
  };

  const getChampion_p = () => {
    const match = matches_p.filter(match => match.id === 64)[0];

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

    const dataTest = {
      name: 'QATAR',
      group: 'A',
      short_name: 'QAT',
      p: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      pts: 0,
    };

    const champ = teams_p.filter(team => team.short_name === champ_name);

    return champ.length ? champ : dataTest;
  };

  const saveMatch = async (match, parent) => {
    const db = await getDBConnection();

    let queryL = 'UPDATE ';
    let queryV = 'UPDATE ';
    let queryM = 'UPDATE ';
    let local;
    let visit;

    if (parent === 'Playground') {
      queryM += `matches_p SET goll = ${match.goll}, golv = ${match.golv}, penl = ${match.penl}, penv = ${match.penv}, played = "${match.played}" WHERE id = ${match.id};`;
      queryL += 'teams_p SET ';
      queryV += 'teams_p SET ';
      local = teams_p.filter(team => team.short_name === match.local)[0];
      visit = teams_p.filter(team => team.short_name === match.visit)[0];
    } else {
      queryM += `matches SET goll = ${match.goll}, golv = ${match.golv}, penl = ${match.penl}, penv = ${match.penv}, played = "${match.played}" WHERE id = ${match.id};`;
      queryL += 'teams SET ';
      queryV += 'teams SET ';
      local = teams.filter(team => team.short_name === match.local)[0];
      visit = teams.filter(team => team.short_name === match.visit)[0];
    }

    let winner = '';
    if (match.goll === match.golv) {
      winner = 'draw';
    } else if (match.goll > match.golv) {
      winner = 'local';
    } else {
      winner = 'visit';
    }

    queryL += `p = ${local.p + 1}, gf = ${local.gf + match.goll}, ga = ${
      local.ga + match.golv
    }, gd = ${local.gf + match.goll - (local.ga + match.golv)}, pts = ${
      local.pts + (winner === 'draw' ? 1 : winner === 'local' ? 3 : 0)
    } WHERE id = ${local.id};`;

    queryV += `p = ${visit.p + 1}, gf = ${visit.gf + match.golv}, ga = ${
      visit.ga + match.goll
    }, gd = ${visit.gf + match.golv - (visit.ga + match.goll)}, pts = ${
      visit.pts + (winner === 'draw' ? 1 : winner === 'visit' ? 3 : 0)
    } WHERE id = ${visit.id};`;

    try {
      await db.executeSql(queryM);
      await db.executeSql(queryL);
      await db.executeSql(queryV);
      await db.close();

      await getDataTeams();
    } catch (error) {
      console.log('SaveMatch' + error.message);
    }
  };

  const restorePlayground = async () => {
    const db = await getDBConnection();

    await db.executeSql('DROP TABLE matches_p;');
    await db.executeSql('DROP TABLE teams_p;');
    await db.executeSql(
      'CREATE TABLE IF NOT EXISTS matches_p AS SELECT * FROM matches_b;',
    );
    await db.executeSql(
      'CREATE TABLE IF NOT EXISTS teams_p AS SELECT * FROM teams_b;',
    );

    db.close();

    await getDataTeams();
    getNextMatch_p();
  };

  return (
    <AppContext.Provider
      value={{
        DBLoading,
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
        getChampion,
        getChampion_p,
        saveMatch,
        restorePlayground,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export {AppProvider};

export default AppContext;
