import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import globalStyles from '../styles/styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMinus, faPlus, faSave} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalSettings = ({setModalVisible}) => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [plus, setPlus] = useState(true);

  useEffect(() => {
    const getUTC = async () => {
      const utc = await AsyncStorage.getItem('UTC');

      if (utc) {
        if (utc[0] === '+') {
          setPlus(true);
        } else {
          setPlus(false);
        }
        if (utc.slice(1, 3) !== '00') {
          setHours(utc.slice(1, 3));
        }

        if (utc.slice(4, 6) !== '00') {
          setMinutes(utc.slice(4, 6));
        }
      }
    };

    getUTC();
  }, []);

  const handleSave = async () => {
    let utc = '';

    if ((plus && Number(hours) > 14) || (!plus && Number(hours) > 11)) {
      Alert.alert('Error', 'Valid hours +14 | -11');
      return;
    }

    if (!['', '00', '30', '45'].includes(minutes)) {
      Alert.alert('Error', 'Valid minutes 00 | 30 | 45');
      return;
    }

    if (!plus && minutes === '45') {
      Alert.alert('Error', 'Invalid time zone');
      return;
    }

    if (
      !plus &&
      minutes === '30' &&
      (Number(hours) !== 3 || Number(hours) !== 9)
    ) {
      Alert.alert('Error', 'Invalid time zone');
      return;
    }

    if (
      plus &&
      minutes === '30' &&
      (Number(hours) < 3 || Number(hours) > 6) &&
      (Number(hours) < 9 || Number(hours) > 10)
    ) {
      Alert.alert('Error', 'Invalid time zone');
      return;
    }

    if (
      plus &&
      minutes === '45' &&
      Number(hours) !== 5 &&
      Number(hours) !== 8 &&
      Number(hours) !== 12
    ) {
      Alert.alert('Error', 'Invalid time zone');
      return;
    }

    if (plus || !hours) {
      utc += '+';
    } else {
      utc += '-';
    }

    if (!hours) {
      utc += '00';
    } else {
      if (hours.length === 1) {
        utc += `0${hours}`;
      } else {
        utc += hours;
      }
    }

    utc += ':';

    if (minutes === '') {
      utc += '00';
    } else {
      utc += minutes;
    }

    await AsyncStorage.setItem('UTC', utc);

    setModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Select your time zone</Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            style={{alignSelf: 'center'}}
            onPress={() => setPlus(!plus)}>
            <FontAwesomeIcon
              style={[globalStyles.icon]}
              size={16}
              icon={plus ? faPlus : faMinus}
            />
          </Pressable>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={hours}
            onChangeText={setHours}
            placeholder="HH"
            maxLength={2}
          />
          <Text style={styles.points}>:</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={minutes}
            onChangeText={setMinutes}
            placeholder="MM"
            maxLength={2}
          />
        </View>
        <Pressable
          style={[styles.button, globalStyles.primary]}
          onPress={handleSave}>
          <FontAwesomeIcon
            style={[globalStyles.icon, styles.icon]}
            size={14}
            icon={faSave}
          />
          <Text style={styles.textStyle}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ModalSettings;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flexDirection: 'row',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#AAA',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
  points: {
    alignSelf: 'center',
    fontSize: 18,
  },
  icon: {
    color: '#FFF',
    marginHorizontal: 5,
  },
});
