import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  //Colors
  'bg-WCF': {
    backgroundColor: '#5a0024',
  },
  'bg-UCL': {
    backgroundColor: '#180056',
  },
  'text-WCF': {
    color: '#5a0024',
  },
  'text-UCL': {
    color: '#180056',
  },
  primary: {
    backgroundColor: '#5a0024',
  },
  white: {
    backgroundColor: '#FFF',
  },
  black: {
    backgroundColor: '#000',
  },
  gray: {
    backgroundColor: '#BBB',
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
    color: '#111111',
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
  ads: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});

export default globalStyles;
