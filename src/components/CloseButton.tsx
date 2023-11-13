import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useContext} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import globalStyles from '../theme/styles';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../context/ThemeContext';

interface Props {
  handleClose: () => void;
}

export const CloseButton = ({handleClose}: Props) => {
  const {mode} = useContext(ThemeContext);

  return (
    <View style={styles.close}>
      <TouchableOpacity activeOpacity={0.7} onPress={handleClose}>
        <FontAwesomeIcon
          style={{...globalStyles.icon, ...globalStyles[`text-${mode}`]}}
          size={18}
          icon={faClose}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  close: {
    position: 'relative',
    width: 40,
    height: 40,
    backgroundColor: '#EEE',
    padding: 10,
    borderRadius: 50,
    left: 10,
    top: 10,
  },
});
