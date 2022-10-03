import React from 'react';
import Fonts from '../constants/Fonts';
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

const EquipmentsSlider = props => {
  //   alert(props.data.title);
  return (
    <SafeAreaView style={{paddingTop: 4}}>
      <View style={styles.items}>
        <View style={styles.itemcircle}>
          <Image
            resizeMode="contain"
            source={{
              uri: `https://dev.indiit.solutions/pace/public/assets/images/workouts/${props.data.image}`,
            }}
            // source={props.data.image != '' ?
            //     { uri: 'https://dev.indiit.solutions/pace/public/assets/images/workouts/' + props.data.image }
            //     : require('../../assets/images/barbel.png')}
            style={{
              width: 32,
              height: 25,
            }}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.title}>{props.data.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EquipmentsSlider;

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#3B2645',
    fontSize: 11,
    paddingTop: 4,
  },
  items: {
    marginRight: 10,
    width: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  subtitle: {
    color: '#C4BEC7',
    fontSize: 12,
    fontFamily: Fonts.Poppins_Regular,
  },
  flexDirection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 6,
    marginTop: 'auto',
  },
  itemcircle: {
    borderRadius: 1000,
    backgroundColor: '#F2F0FE',
    width: 80,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
