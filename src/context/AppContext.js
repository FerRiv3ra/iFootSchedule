import moment from 'moment';
import Realm from 'realm';
import React, {createContext, useEffect, useState} from 'react';
import {quickStart} from '../config/dbConfig';
import data from '../helper/data';
import matchData from '../helper/matchData';

const AppContext = createContext();

const AppProvider = ({children}) => {
  const [DBLoading, setDBLoading] = useState(true);
  const [distributingRound16, setDistributingRound16] = useState(false);
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
      await quickStart();
      await getDataTeams();
    };

    init();
  }, []);

  const getDataTeams = async () => {
    try {
      setDBLoading(true);
      const realm = await Realm.open({path: 'ifootschedule'});

      // realm.write(() => {
      //   const m = realm.objectForPrimaryKey('matches_p', 48);

      //   m.played = false;
      // });

      const dataTeams = realm.objects('teams');
      const dataTeamsP = realm.objects('teams_p');

      const dataMatches = realm.objects('matches');
      const dataMatchesP = realm.objects('matches_p');

      const orderTeams = dataTeams.sorted([
        ['pts', true],
        ['gd', true],
      ]);

      const orderTeamsP = dataTeamsP.sorted([
        ['pts', true],
        ['gd', true],
      ]);

      const countPlayed = dataMatches.filtered('played = true');
      const countPlayedP = dataMatchesP.filtered('played = true');

      setTeams(orderTeams.toJSON());
      setTeams_p(orderTeamsP.toJSON());
      setMatches(dataMatches.toJSON());
      setMatches_p(dataMatchesP.toJSON());

      setMatchesPlayed(countPlayed.length);
      setMatchesPlayed_p(countPlayedP.length);

      setDBLoading(false);

      realm.close();
    } catch (err) {
      console.error('Failed to open the realm', err.message);
    }
  };

  const getNextMatch = () => {
    const nextM = matches.filter(match => match.played === false);

    setNextMatch(nextM[0]);
  };

  const getNextMatch_p = () => {
    const nextM = matches_p.filter(match => match.played === false);

    setNextMatch_p(nextM[0]);
  };

  const getMatchesToday = day => {
    const data = matches.filter(match => {
      const date = moment(match.date).dayOfYear();
      if (date === day) {
        return match;
      }
    });

    setTodayMatches(data);
  };

  const getMatchesToday_p = day => {
    const data = matches_p.filter(match => {
      const date = moment(match.date).dayOfYear();
      if (date === day) {
        return match;
      }
    });

    setTodayMatches_p(data);
  };

  const getPendingMatches = day => {
    const data = matches.filter(match => {
      const date = moment(match.date).dayOfYear();
      if (date < day && !match.played) {
        return match;
      }
    });

    setPendingMatches(data);
  };

  const getPendingMatches_p = day => {
    const data = matches_p.filter(match => {
      const date = moment(match.date).dayOfYear();
      if (date < day && !match.played) {
        return match;
      }
    });

    setPendingMatches_p(data);
  };

  const getChampion = () => {
    const match = matches.filter(match => match.id === 64)[0];

    if (!match) {
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

    const champ = teams.filter(team => team.short_name === champ_name)[0];

    return champ;
  };

  const getChampion_p = () => {
    const match = matches_p.filter(match => match.id === 64)[0];

    if (!match) {
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

    const champ = teams_p.filter(team => team.short_name === champ_name)[0];

    return champ;
  };

  const saveMatch = async (match, parent, editing = false) => {
    try {
      const realm = await Realm.open({path: 'ifootschedule'});

      const dataMatch = parent === 'Playground' ? 'matches_p' : 'matches';
      const dataTeam = parent === 'Playground' ? 'teams_p' : 'teams';

      let currentMatch = {};

      let part =
        match.id <= 48
          ? 'groups'
          : match.id <= 56
          ? 'round16'
          : match.id <= 60
          ? 'quarter'
          : 'semis';
      let local = teams.filter(team => team.short_name === match.local)[0];
      let visit = teams.filter(team => team.short_name === match.visit)[0];

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

      if (match.id >= 63) {
        realm.close();

        await getDataTeams();

        return;
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

      if (editing) {
        let winEdit =
          Number(currentMatch.goll) === Number(currentMatch.golv)
            ? 'draw'
            : Number(currentMatch.goll) > Number(currentMatch.golv)
            ? 'local'
            : 'visit';
        realm.write(() => {
          const tempTeamL = realm.objectForPrimaryKey(dataTeam, local.id);

          tempTeamL.gf = tempTeamL.gf - Number(currentMatch.goll) + match.goll;
          tempTeamL.ga = tempTeamL.ga - Number(currentMatch.golv) + match.golv;
          tempTeamL.gd = tempTeamL.gf - tempTeamL.ga;
          tempTeamL.pts =
            tempTeamL.pts -
            (winEdit === 'draw' ? 1 : winEdit === 'local' ? 3 : 0) +
            (winner === 'draw' ? 1 : winner === 'local' ? 3 : 0);

          const tempTeamV = realm.objectForPrimaryKey(dataTeam, visit.id);

          tempTeamV.gf = tempTeamV.gf - Number(currentMatch.golv) + match.golv;
          tempTeamV.ga = tempTeamV.ga - Number(currentMatch.goll) + match.goll;
          tempTeamV.gd = tempTeamV.gf - tempTeamV.ga;
          tempTeamV.pts =
            tempTeamV.pts -
            (winEdit === 'draw' ? 1 : winEdit === 'visit' ? 3 : 0) +
            (winner === 'draw' ? 1 : winner === 'visit' ? 3 : 0);
        });

        realm.close();

        await getDataTeams();

        return;
      }

      if (part === 'groups') {
        realm.write(() => {
          const tempTeamL = realm.objectForPrimaryKey(dataTeam, local.id);

          tempTeamL.p += 1;
          tempTeamL.gf += match.goll;
          tempTeamL.ga += match.golv;
          tempTeamL.gd = tempTeamL.gf - tempTeamL.ga;
          tempTeamL.pts += winner === 'draw' ? 1 : winner === 'local' ? 3 : 0;

          const tempTeamV = realm.objectForPrimaryKey(dataTeam, visit.id);

          tempTeamV.p += 1;
          tempTeamV.gf += match.golv;
          tempTeamV.ga += match.goll;
          tempTeamV.gd = tempTeamV.gf - tempTeamV.ga;
          tempTeamV.pts += winner === 'draw' ? 1 : winner === 'visit' ? 3 : 0;
        });

        realm.close();

        await getDataTeams();

        return;
      }

      if (part === 'round16') {
        if (
          match.id === 49 ||
          match.id === 52 ||
          match.id === 53 ||
          match.id === 55
        ) {
          realm.write(() => {
            const local = realm
              .objects(dataMatch)
              .filtered(`local = '8W${match.id - 48}'`)[0];
            local.local = `${match[winner]}`;
          });
        } else {
          realm.write(() => {
            const visit = realm
              .objects(dataMatch)
              .filtered(`visit = '8W${match.id - 48}'`)[0];
            visit.visit = `${match[winner]}`;
          });
        }

        realm.close();

        await getDataTeams();

        return;
      }

      if (part === 'quarter') {
        if (match.id % 2 === 0) {
          realm.write(() => {
            const local = realm
              .objects(dataMatch)
              .filtered(`local = '4W${match.id - 56}'`)[0];
            local.local = `${match[winner]}`;
          });
        } else {
          realm.write(() => {
            const visit = realm
              .objects(dataMatch)
              .filtered(`visit = '4W${match.id - 56}'`)[0];
            visit.visit = `${match[winner]}`;
          });
        }

        realm.close();

        await getDataTeams();

        return;
      }

      if (part === 'semis') {
        if (match.id % 2 === 1) {
          realm.write(() => {
            const winLocal = realm
              .objects(dataMatch)
              .filtered(`local = 'SW${match.id - 60}'`)[0];
            winLocal.local = `${match[winner]}`;

            const loosLocal = realm
              .objects(dataMatch)
              .filtered(`local = 'SL${match.id - 60}'`)[0];
            loosLocal.local = `${match[looser]}`;
          });
        } else {
          realm.write(() => {
            const winVisit = realm
              .objects(dataMatch)
              .filtered(`visit = 'SW${match.id - 60}'`)[0];
            winVisit.visit = `${match[winner]}`;

            const loosLocal = realm
              .objects(dataMatch)
              .filtered(`visit = 'SL${match.id - 60}'`)[0];
            loosLocal.visit = `${match[looser]}`;
          });
        }
        realm.close();

        await getDataTeams();

        return;
      }
    } catch (err) {
      console.error('Failed to open the realm', err.message);
    }
  };

  const restorePlayground = async () => {
    try {
      const realm = await Realm.open({path: 'ifootschedule'});

      realm.write(() => {
        data.forEach((team, index) => {
          const tempTeam = realm.objects('teams_p')[index];
          tempTeam.id = index + 1;
          tempTeam.name = team.name;
          tempTeam.group = team.group;
          tempTeam.short_name = team.short_name;
          tempTeam.p = 0;
          tempTeam.gf = 0;
          tempTeam.ga = 0;
          tempTeam.gd = 0;
          tempTeam.pts = 0;
        });

        matchData.forEach((match, index) => {
          const tempMatch = realm.objects('matches_p')[index];
          tempMatch.id = index + 1;
          tempMatch.local = match.local;
          tempMatch.visit = match.visit;
          tempMatch.date = match.date;
          tempMatch.goll = 0;
          tempMatch.penl = 0;
          tempMatch.golv = 0;
          tempMatch.penv = 0;
          tempMatch.played = false;
        });
      });

      realm.close();
      await getDataTeams();
      getNextMatch_p();
    } catch (err) {
      console.error('Failed to open the realm', err.message);
    }
  };

  const generateNextMatches = async () => {
    const match49 = matches.filter(match => match.id === 49)[0];

    if (matchesPlayed === 48 && match49 && match49.local === '1A') {
      setDistributingRound16(true);
      const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      try {
        const realm = await Realm.open({path: 'ifootschedule'});

        const groupTeam = teams.filter(team => team.group === group);
        realm.write(() => {
          groups.forEach(group => {
            const first = realm
              .objects('matches')
              .filtered(`local = '1${group}'`)[0];

            first.local = groupTeam[0].short_name;

            const second = realm
              .objects('matches')
              .filtered(`visit = '2${group}'`)[0];
            second.visit = groupTeam[1].short_name;
          });
        });

        realm.close();
        setDistributingRound16(false);
      } catch (err) {
        console.error('Generate matches ', err.message);
      }
    }
  };

  const generateNextMatches_p = async () => {
    const match49 = matches_p.filter(match => match.id === 49)[0];

    if (matchesPlayed_p === 48 && match49 && match49.local === '1A') {
      setDistributingRound16(true);
      const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      try {
        const realm = await Realm.open({path: 'ifootschedule'});

        realm.write(() => {
          groups.forEach(group => {
            const groupTeam = teams_p.filter(team => team.group === group);

            const first = realm
              .objects('matches_p')
              .filtered(`local = '1${group}'`)[0];

            first.local = groupTeam[0].short_name;

            const second = realm
              .objects('matches_p')
              .filtered(`visit = '2${group}'`)[0];
            second.visit = groupTeam[1].short_name;
          });
        });

        realm.close();
        setDistributingRound16(false);
        await getDataTeams();
      } catch (err) {
        console.error('Generate matches playground ', err.message);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        matches,
        matches_p,
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
        generateNextMatches,
        generateNextMatches_p,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export {AppProvider};

export default AppContext;
