import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SECTIONS from '../helper/selectImg';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import language from '../helper/translate';
import useApp from '../hooks/useApp';

const NextMatch = ({nextMatch_p, pendingMatches, todayMatches, parent}) => {
  const [date, setDate] = useState(moment(nextMatch_p.date));
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const {lang} = useApp();
  const matchSet = [...pendingMatches, ...todayMatches];

  useEffect(() => {
    setLoading(true);
    const getUTC = async () => {
      const utc = await AsyncStorage.getItem('UTC');

      if (utc) {
        setDate(moment(nextMatch_p.date).utcOffset(utc));
      }
    };

    getUTC();
    setLoading(false);
  }, [nextMatch_p]);

  const handlePress = () => {
    if (matchSet.includes(nextMatch_p)) {
      navigation.navigate('Match', {match: nextMatch_p, parent});
    } else {
      Alert.alert(
        language[lang].info,
        `${language[lang].infoMessage} ${date.format('lll')}`,
      );
    }
  };

  return (
    <Pressable onPress={handlePress}>
      {loading ? (
        <ActivityIndicator animating={loading} />
      ) : (
        <View>
          <View style={styles.container}>
            <Text style={styles.team}>{nextMatch_p.local}</Text>
            <Image
              style={styles.logoTeam}
              source={SECTIONS[nextMatch_p.local]?.file}
            />
            <Text>VRS</Text>
            <Image
              style={styles.logoTeam}
              source={SECTIONS[nextMatch_p.visit]?.file}
            />
            <Text style={styles.team}>{nextMatch_p.visit}</Text>
          </View>
          <Text style={styles.date}>{date.format('lll')}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default NextMatch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  logoTeam: {
    width: 40,
    height: 40,
    margin: 10,
  },
  team: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    textAlign: 'center',
    fontSize: 16,
  },
});
