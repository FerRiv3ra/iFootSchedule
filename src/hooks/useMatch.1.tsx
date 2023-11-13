import moment from 'moment';
import {useCallback, useContext, useEffect, useState} from 'react';
import {MatchDBInterface} from '../types';
import useApp from './useApp';
import {useTranslation} from 'react-i18next';
import ThemeContext from '../context/ThemeContext';
import {getUTC} from '../helpers';

export const useMatch = () => {
  const [date, setDate] = useState(moment(match.date).utcOffset(0));
  const [loading, setLoading] = useState(true);
  const [penalties, setPenalties] = useState(false);
  const [saving, setSaving] = useState(false);
  const [goll, setGoll] = useState(0);
  const [golv, setGolv] = useState(0);
  const [penl, setPenl] = useState(0);
  const [penv, setPenv] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [prevMatch, setPrevMatch] = useState<MatchDBInterface>();

  const {saveMatch, matchesC, DBLoading} = useApp();
  const {t} = useTranslation();
  const {mode} = useContext(ThemeContext);

  useEffect(() => {
    setLoading(true);
    getUTC().then(
      value => value && setDate(moment(match.date).utcOffset(value)),
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    if (mode === 'UCL') {
      setPrevMatch(
        matchesC.filter(m => {
          if (match.visit === m.local && m.played) return m;
        })[0],
      );
    }
  }, []);

  useEffect(() => {
    if (match.played) {
      setGoll(match.goll);
      setGolv(match.golv);
    }
  }, []);

  const focusEffect = useCallback(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, [DBLoading]);

  useFocusEffect(focusEffect);

  const handleGol = (team: 'local' | 'visit', type: 'add' | 'sub') => {
    if (team === 'local') {
      if (type === 'add') {
        setGoll(goll + 1);
      } else {
        if (goll === 0) {
          return;
        } else {
          setGoll(goll - 1);
        }
      }
    } else {
      if (type === 'add') {
        setGolv(golv + 1);
      } else {
        if (golv === 0) {
          return;
        } else {
          setGolv(golv - 1);
        }
      }
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const matchSave = {
      date: match.date,
      goll,
      golv,
      _id: match._id,
      local: match.local,
      penl,
      penv,
      played: true,
      visit: match.visit,
    };

    if (
      matchSave.goll + prevMatch?.golv! === matchSave.golv + prevMatch?.goll! &&
      matchSave.penl === 0 &&
      matchSave.penv === 0
    ) {
      setPenalties(true);
      setSaving(false);
      return;
    }

    if (loaded) {
      interstitial.show();
    }

    await saveMatch(matchSave, mode, editing);

    setSaving(false);
    navigation.goBack();
  };

  const handleClose = () => {
    navigation.goBack();
  };
};
