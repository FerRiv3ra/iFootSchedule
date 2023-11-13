import {StyleSheet} from 'react-native';

export const modalStyles = StyleSheet.create({
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
    margin: 5,
    flexDirection: 'row',
  },
  close: {
    backgroundColor: '#FFF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#111111',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#AAA',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    color: '#111111',
  },
  points: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#111111',
  },
  icon: {
    color: '#FFF',
    marginHorizontal: 5,
  },
});
