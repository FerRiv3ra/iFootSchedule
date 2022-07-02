import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  //Colors
  primary: {
    backgroundColor: '#5a0024',
  },
  white: {
    backgroundColor: '#FFF',
  },
  black: {
    backgroundColor: '#000',
  },
  //Components
  view: {
    marginHorizontal: 30,
    marginBottom: 15,
  },
  button: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textBtn: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 16,
  },
  // Single
  flex: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
  },
  mid: {
    alignItems: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default globalStyles;
