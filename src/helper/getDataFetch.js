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

  const laLigaDataFetch = await laLigaResp.json();
  const premierDataFetch = await premierResp.json();
  const laLigaMatchesDataFetch = await laLigaMatchesResp.json();
  const premierMatchesDataFetch = await premierMatchesResp.json();

  return {
    laLigaDataFetch,
    premierDataFetch,
    laLigaMatchesDataFetch,
    premierMatchesDataFetch,
  };
};
