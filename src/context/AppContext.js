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
  const [matchesPlayed, setMatchesPlayed] = useState(0);
  const [matchesPlayed_p, setMatchesPlayed_p] = useState(0);
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

    const count = await db.executeSql(
      'SELECT COUNT(*) FROM matches WHERE played = "true";',
    );
    const countP = await db.executeSql(
      'SELECT COUNT(*) FROM matches_p WHERE played = "true";',
    );

    setMatchesPlayed(count[0].rows.item(0)['COUNT(*)']);
    setMatchesPlayed_p(countP[0].rows.item(0)['COUNT(*)']);

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

    generateNextMatches_p();
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

    const champ = teams_p.filter(team => team.short_name === champ_name)[0];

    return champ ? champ : dataTest;
  };

  const saveMatch = async (match, parent) => {
    const db = await getDBConnection();

    let queryL = 'UPDATE ';
    let queryV = 'UPDATE ';
    let queryM = 'UPDATE ';
    let part =
      match.id <= 48
        ? 'groups'
        : match.id <= 56
        ? 'round16'
        : match.id <= 60
        ? 'quarter'
        : 'semis';
    let local;
    let visit;

    if (parent === 'Playground') {
      queryM += `matches_p SET goll = ${match.goll}, golv = ${match.golv}, penl = ${match.penl}, penv = ${match.penv}, played = "${match.played}" WHERE id = ${match.id};`;
      local = teams_p.filter(team => team.short_name === match.local)[0];
      visit = teams_p.filter(team => team.short_name === match.visit)[0];
      queryL += part === 'groups' ? 'teams_p SET ' : 'matches_p SET ';
      queryV += part === 'groups' ? 'teams_p SET ' : 'matches_p SET ';
    } else {
      queryM += `matches SET goll = ${match.goll}, golv = ${match.golv}, penl = ${match.penl}, penv = ${match.penv}, played = "${match.played}" WHERE id = ${match.id};`;
      local = teams.filter(team => team.short_name === match.local)[0];
      visit = teams.filter(team => team.short_name === match.visit)[0];
      queryL += part === 'groups' ? 'teams SET ' : 'matches SET ';
      queryV += part === 'groups' ? 'teams SET ' : 'matches SET ';
    }

    let winner = '';
    let looser = '';
    if (part === 'groups') {
      if (match.goll === match.golv) {
        winner = 'draw';
      } else if (match.goll > match.golv) {
        winner = 'local';
      } else {
        winner = 'visit';
      }
    } else {
      if (match.goll + match.penl > match.golv + match.penv) {
        winner = 'local';
        looser = 'visit';
      } else {
        winner = 'visit';
        looser = 'local';
      }
    }

    if (part === 'groups') {
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
    } else if (part === 'round16') {
      if (match.id % 2 === 1) {
        queryL += `local = '${match[winner]}' WHERE local = '8W${
          match.id - 48
        }';`;
        queryV = '';
      } else {
        queryL += `visit = '${match[winner]}' WHERE visit = '8W${
          match.id - 48
        }';`;
        queryV = '';
      }
    } else if (part === 'quarter') {
      if (match.id % 2 === 0) {
        queryL += `local = '${match[winner]}' WHERE local = '4W${
          match.id - 56
        }';`;
        queryV = '';
      } else {
        queryL += `visit = '${match[winner]}' WHERE visit = '4W${
          match.id - 56
        }';`;
        queryV = '';
      }
    } else if (part === 'semis') {
      if (match.id % 2 === 1) {
        queryL += `local = '${match[winner]}' WHERE local = 'SW${
          match.id - 60
        }';`;
        queryV += `local = '${match[looser]}' WHERE local = 'SL${
          match.id - 60
        }';`;
      } else {
        queryL += `visit = '${match[winner]}' WHERE visit = 'SW${
          match.id - 60
        }';`;
        queryV += `visit = '${match[looser]}' WHERE visit = 'SL${
          match.id - 60
        }';`;
      }
    }

    try {
      await db.executeSql(queryM);
      if (match.id !== 64) {
        await db.executeSql(queryL);
      }
      if (part === 'groups' || part === 'semis') {
        await db.executeSql(queryV);
      }
      await db.close();

      await getDataTeams();

      await generateNextMatches();
      await generateNextMatches_p();
    } catch (error) {
      console.log('SaveMatch ' + error.message + ' ' + error);
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

  const generateNextMatches = async () => {
    if (matchesPlayed < 48) return;

    const db = await getDBConnection();

    if (matchesPlayed === 48) {
      const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

      groups.forEach(async group => {
        const groupTeam = teams.filter(team => team.gr === group);

        await db.executeSql(
          `UPDATE TABLE matches SET local = ${groupTeam[0]} WHERE local = 1${group};`,
        );
        await db.executeSql(
          `UPDATE TABLE matches SET visit = ${groupTeam[1]} WHERE visit = 2${group};`,
        );
      });
    }

    db.close();
  };

  const generateNextMatches_p = async () => {
    if (matchesPlayed_p < 48) return;

    const db = await getDBConnection();

    if (matchesPlayed_p === 48) {
      const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

      groups.forEach(async group => {
        const groupTeam = teams_p.filter(team => team.gr === group);
        const query1 = `UPDATE matches_p SET local = '${groupTeam[0].short_name}' WHERE local = '1${group}';`;
        await db.executeSql(query1);
        await db.executeSql(
          `UPDATE matches_p SET visit = '${groupTeam[1].short_name}' WHERE visit = '2${group}';`,
        );
      });
    }

    db.close();
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
        matchesPlayed,
        matchesPlayed_p,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export {AppProvider};

export default AppContext;
