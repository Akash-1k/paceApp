import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from './Colors';

const shadow = StyleSheet.create({
  container: {
    flex: 1,
  },
  wholeView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    height: wp('12%'),
    width: '90%',
    borderRadius: wp('2%'),
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.graylight,
  },
  buttonView: {
    width: '50%',
    borderRadius: wp('2%'),
    backgroundColor: '#1050e6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp('2.5%'),
  },
  itemsInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  valueView: {
    fontSize: wp('11.5%'),
  },
  myshadow: {
    shadowColor: '#1050e6',
    shadowOpacity: 30,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 8.3,
    elevation: 13,
  },
});

export default shadow;
