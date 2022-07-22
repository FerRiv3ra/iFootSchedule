import Realm from 'realm';
import data from '../helper/data';
import matchData from '../helper/matchData';

// Realm
const teamsSchemaConstructor = name => ({
  name,
  properties: {
    id: {
      type: 'int',
    },
    name: 'string',
    group: 'string',
    short_name: 'string',
    p: {
      type: 'int',
      default: 0,
    },
    gf: {
      type: 'int',
      default: 0,
    },
    ga: {
      type: 'int',
      default: 0,
    },
    gd: {
      type: 'int',
      default: 0,
    },
    pts: {
      type: 'int',
      default: 0,
    },
  },
  primaryKey: 'id',
});

const matchesSchemaConstructor = name => ({
  name,
  primaryKey: 'id',
  properties: {
    id: 'int',
    local: 'string',
    goll: {
      type: 'int',
      default: 0,
    },
    penl: {
      type: 'int',
      default: 0,
    },
    visit: 'string',
    golv: {
      type: 'int',
      default: 0,
    },
    penv: {
      type: 'int',
      default: 0,
    },
    played: {
      type: 'bool',
      default: false,
    },
    date: 'string',
  },
});

const teams = teamsSchemaConstructor('teams');
const teamsP = teamsSchemaConstructor('teams_p');
const matches = matchesSchemaConstructor('matches');
const matchesP = matchesSchemaConstructor('matches_p');

const quickStart = async () => {
  try {
    const realm = await Realm.open({
      path: 'ifootschedule',
      schema: [teams, teamsP, matches, matchesP],
    });

    const dataTeams = realm.objects('teams');
    const dataMatches = realm.objects('matches');

    if (!dataTeams.length) {
      data.forEach((team, index) => {
        realm.write(() => {
          realm.create('teams', {
            id: index + 1,
            name: team.name,
            group: team.group,
            short_name: team.short_name,
          });
          realm.create('teams_p', {
            id: index + 1,
            name: team.name,
            group: team.group,
            short_name: team.short_name,
          });
        });
      });
    }

    if (!dataMatches.length) {
      matchData.forEach((match, index) => {
        realm.write(() => {
          realm.create('matches', {
            id: index + 1,
            local: match.local,
            visit: match.visit,
            date: match.date,
          });
          realm.create('matches_p', {
            id: index + 1,
            local: match.local,
            visit: match.visit,
            date: match.date,
          });
        });
      });
    }

    realm.close();
  } catch (err) {
    console.error('Failed to open the realm', err.message);
  }
};

export {quickStart};
