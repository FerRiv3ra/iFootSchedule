import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUTC = async () => {
  const utcStg = await AsyncStorage.getItem('UTC');

  return utcStg;
};
