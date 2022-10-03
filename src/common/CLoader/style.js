import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window')

const LOADER_SIZE = 100;
const LOADER_SIZE1 = 120;
const styles = StyleSheet.create({
  parentContainer: {
    position: 'absolute',
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    zIndex: 1,
    height: LOADER_SIZE,
    width: LOADER_SIZE1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    // opacity: 0.7,
    borderColor: 'white',
    //paddingLeft: 30,
    flexDirection: 'row',
  },
  errorParentView: {
    height,
    width,
    position: 'absolute',
    elevation: 10,
  },
  errorContainer: {
    alignItems: 'center',
    width: width * 0.7,
    position: 'absolute',
    elevation: 10,
    top: height * 0.4,
    left: (width * 0.3) / 2,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  errorText: {
    fontFamily: 'Rajdhani-SemiBold',
    fontSize: 18,
    color: 'black',
  },
  errorTitle: {
    fontFamily: 'Rajdhani-SemiBold',
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  buttonText: {
    fontFamily: 'rajdhani-bold',
    fontSize: 18,
    color: 'white',
    padding: 10,
    textAlign: 'center',
  },
  button: {
    height: 40,
    width: width * 0.3,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
export default styles;
