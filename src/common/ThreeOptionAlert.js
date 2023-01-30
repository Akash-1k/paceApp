import React from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Fonts from '../constants/Fonts';
import {LinearGradient} from 'react-native-gradients';
import Colors from '../constants/Colors';

const ThreeOptionAlert = props => {
  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '3'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  return (
    <View style={{flex: 1, padding: 10}}>
      <View style={{flex: 1}}>
        <Text
          style={[
            {
              fontFamily: Fonts.Poppins_Bold,
              color: Colors.fontColor,
              fontSize: 22,
            },
          ]}>
          {props.title}
        </Text>
        <Text
          style={[
            {
              fontFamily: Fonts.Poppins_Medium,
              color: Colors.colorGray,
              fontSize: 20,
            },
          ]}>
          {props.msg}
        </Text>
      </View>

      <View
        style={{height: 50, flexDirection: 'row', justifyContent: 'flex-end'}}>
        {props.firstTitle && (
          <TouchableOpacity onPress={props.onPressFirst} style={styles.button}>
            <LinearGradient
              style={styles.granew}
              colorList={colorList1}
              angle={200}></LinearGradient>
            <Text style={styles.text}>{props.firstTitle}</Text>
          </TouchableOpacity>
        )}
        {props.secondTitle && (
          <TouchableOpacity onPress={props.onPressSecond} style={styles.button}>
            <LinearGradient
              style={styles.granew}
              colorList={colorList1}
              angle={200}></LinearGradient>
            <Text style={styles.text}>{props.secondTitle}</Text>
          </TouchableOpacity>
        )}

        {props.thirdTitle && (
          <TouchableOpacity onPress={props.onPressThird} style={styles.button}>
            <LinearGradient
              style={styles.granew}
              colorList={colorList1}
              angle={200}></LinearGradient>
            <Text style={styles.text}>{props.thirdTitle}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const {width, height} = Dimensions.get('window');
export default ThreeOptionAlert;

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    width: width / 4,
    marginRight: 10,
    height: 45,
    borderRadius: 10,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    zIndex: 1,
    fontFamily: Fonts.Poppins_Bold,
    color: '#fff',
    fontSize: 16,
    zIndex: 3,
  },
  granew: {
    flex: 1,
    flexGrow: 1,
  },
});
