import {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import moment from 'moment';

export const useCountDownScreen = () => {
  const today = moment();
  const start = moment([2026, 6, 8, 16, 0, 0]).utcOffset('00:00');
  const diffDays = start.diff(today, 'days');
  const diffHours = start.diff(today, 'hours', true) % 24;
  const diffMins =
    (start.diff(today, 'minutes', true) % 1440) - Math.floor(diffHours) * 60;

  const [days, setDays] = useState(diffDays);
  const [hours, setHours] = useState(diffHours);
  const [minutes, setMinutes] = useState(diffMins);
  const navigation = useNavigation();

  const timerRef = useRef(diffMins);

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        timerRef.current = 59;
        if (hours < 0) {
          setHours(23);
          setDays(days - 1);
        } else {
          setHours(hours - 1);
        }
        setMinutes(59);
      } else {
        setMinutes(timerRef.current);
      }
    }, 1000 * 60);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  return {
    goBack,
    minutes,
    days,
    hours,
  };
};
