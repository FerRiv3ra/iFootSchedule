import moment from 'moment';
import {MatchDBInterface} from '../types/database';

export const getMatches = (
  dataMatches: MatchDBInterface[],
  type: 'today' | 'pending',
) => {
  let data: MatchDBInterface[];
  const today = moment();

  data = dataMatches.filter(match => {
    const date = moment(match.date);

    if (type === 'today') {
      if (
        date.toISOString().slice(0, 10) === today.toISOString().slice(0, 10)
      ) {
        return match;
      }
    } else {
      if (moment(date).add(2, 'hours').isBefore(today) && !match.played) {
        return match;
      }
    }
  });

  return data;
};
