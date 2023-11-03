import {MatchResponse, TeamsResponse} from '../types/database';

export const getDataFetch = async () => {
  const laLigaResp = await fetch(
    'https://raw.githubusercontent.com/FerRiv3ra/iFootScheduleDB/main/data/laLiga.json',
  );
  const premierResp = await fetch(
    'https://raw.githubusercontent.com/FerRiv3ra/iFootScheduleDB/main/data/premier.json',
  );
  const laLigaMatchesResp = await fetch(
    'https://raw.githubusercontent.com/FerRiv3ra/iFootScheduleDB/main/data/laLigaMatches.json',
  );
  const premierMatchesResp = await fetch(
    'https://raw.githubusercontent.com/FerRiv3ra/iFootScheduleDB/main/data/premierMatches.json',
  );

  const laLigaDataFetch = (await laLigaResp.json()) as TeamsResponse;
  const premierDataFetch = (await premierResp.json()) as TeamsResponse;
  const laLigaMatchesDataFetch =
    (await laLigaMatchesResp.json()) as MatchResponse;
  const premierMatchesDataFetch =
    (await premierMatchesResp.json()) as MatchResponse;

  return {
    laLigaDataFetch,
    premierDataFetch,
    laLigaMatchesDataFetch,
    premierMatchesDataFetch,
  };
};
