import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  //Colors
  'bg-FWC': {
    backgroundColor: 'rgb(222,0,90)',
  },
  'bg-UCL': {
    backgroundColor: '#180056',
  },
  'bg-laLiga': {
    backgroundColor: 'rgb(141,29,29)',
  },
  'bg-premier': {
    backgroundColor: 'rgb(0,198,255)',
  },
  'text-FWC': {
    color: '#5a0024',
  },
  'text-UCL': {
    color: '#180056',
  },
  'text-laLiga': {
    color: 'rgb(141,29,29)',
  },
  'text-premier': {
    color: 'rgb(0,198,255)',
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
  whiteContainer: {
    backgroundColor: '#FFF',
    margin: 5,
    padding: 10,
    borderRadius: 10,
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
  row: {
    flexDirection: 'row',
  },
});

export default globalStyles;
