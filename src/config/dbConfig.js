import {enablePromise, openDatabase} from 'react-native-sqlite-storage';
import data from '../helper/data';
import matchData from '../helper/matchData';

enablePromise(true);

const DATABASE_NAME = 'ifootschedule.db';

const getDBConnection = async () => {
  try {
    const db = await openDatabase({
      name: DATABASE_NAME,
      location: 'default',
    });

    return db;
  } catch (error) {
    console.log(error);
  }
};

const createTableTeams = async db => {
  const query =
    'CREATE TABLE IF NOT EXISTS teams(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50) NOT NULL UNIQUE, gr VARCHAR(5), short_name VARCHAR(3), p TINYINT, gf TINYINT, ga TINYINT, gd TINYINT, pts TINYINT)';

  try {
    await db.executeSql(query);
  } catch (error) {
    console.log(`Teams - ${error.message}`);
  }
};

const createTableMatches = async db => {
  const query =
    'CREATE TABLE IF NOT EXISTS matches(id INTEGER PRIMARY KEY AUTOINCREMENT, local VARCHAR(3), goll INTEGER, penl INTEGER, visit VARCHAR(3), golv INTEGER, penv INTEGER, played BOOL, dat VARCHAR(20) )';

  try {
    await db.executeSql(query);
  } catch (error) {
    console.log(error);
  }
};

const addData = async db => {
  let query =
    'INSERT INTO teams (name, gr, short_name, p, gf, ga, gd, pts) VALUES ';

  data.forEach(
    team =>
      (query += `("${team.name}", "${team.group}", "${team.short_name}", ${team.p}, ${team.gf}, ${team.ga}, ${team.gd}, ${team.pts}),`),
  );

  query = `${query.slice(0, -1)};`;

  await db.executeSql(query);
};

const addDataMatches = async db => {
  let query =
    'INSERT INTO matches (local, goll, penl, visit, golv, penv, played, dat) VALUES ';

  matchData.forEach(
    match =>
      (query += `("${match.local}", ${match.goll}, ${match.penl}, "${match.visit}", ${match.golv}, ${match.penv}, "${match.played}", "${match.date}"),`),
  );

  query = `${query.slice(0, -1)};`;

  await db.executeSql(query);
};

const duplicateTeams = async db => {
  const query = 'CREATE TABLE IF NOT EXISTS teams_p AS SELECT * FROM teams;';
  const query1 = 'CREATE TABLE IF NOT EXISTS teams_b AS SELECT * FROM teams;';

  await db.executeSql(query);
  await db.executeSql(query1);
};

const duplicateMatches = async db => {
  const query1 =
    'CREATE TABLE IF NOT EXISTS matches_p AS SELECT * FROM matches;';
  const query2 =
    'CREATE TABLE IF NOT EXISTS matches_b AS SELECT * FROM matches;';

  await db.executeSql(query1);
  await db.executeSql(query2);
};

const initDatabase = async () => {
  const db = await getDBConnection();
  await createTableTeams(db);
  await createTableMatches(db);
  const res = await db.executeSql('SELECT COUNT(*) FROM teams');
  const resM = await db.executeSql('SELECT COUNT(*) FROM matches');

  if (res[0].rows.item(0)['COUNT(*)'] === 0) {
    await addData(db);
    await duplicateTeams(db);
  }

  if (resM[0].rows.item(0)['COUNT(*)'] === 0) {
    await addDataMatches(db);
    await duplicateMatches(db);
  }

  db.close();
};

export {getDBConnection, createTableTeams, createTableMatches, initDatabase};
