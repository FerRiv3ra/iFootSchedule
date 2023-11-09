import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFutbol} from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from 'react-i18next';

import globalStyles from '../theme/styles';

interface Props {
  title: string;
  icon: 'faFutbol';
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const MainButton = ({title, onPress, style, icon}: Props) => {
  const {t} = useTranslation();

  const iconSelector = {
    faFutbol,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[globalStyles.button, styles.btn, style]}>
      <FontAwesomeIcon
        style={{...globalStyles.icon}}
        color="#000"
        size={16}
        icon={iconSelector[icon]}
      />
      <Text style={globalStyles.textBtn}> {t(title)}</Text>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  btn: {
    marginHorizontal: '3%',
    marginTop: 40,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
