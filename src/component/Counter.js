import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

// onPressMinus = fun
// onPressPlus = fun
// disabledPlus = bool
// disabledMinus = bool
// counter = number

const Counter = props => {
  return (
    <View style={styles.counterContainer}>
      <TouchableOpacity
        onPress={props.onPressMinus}
        disabled={props.disabledPlus}
        style={[
          styles.touchable,
          styles.buttonStyle,
          {opacity: props.disabledPlus ? 0.2 : 1},
        ]}>
        <Text
          style={[
            styles.icon,
            {color: props.disabledPlus ? '#000' : '#3B2645'},
          ]}>
          -
        </Text>
      </TouchableOpacity>
      <View style={styles.count}>
        <Text style={styles.countTextStyle}>{props.counter}</Text>
      </View>
      <TouchableOpacity
        onPress={props.onPressPlus}
        disabled={props.disabledMinus}
        style={[
          styles.touchable,
          styles.buttonStyle,
          {opacity: props.disabledMinus ? 0.2 : 1},
        ]}>
        <Text
          style={[
            styles.icon,
            {color: props.disabledMinus ? '#000' : '#3B2645'},
          ]}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  counterContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  touchable: {
    minWidth: 35,
    minHeight: 35,
    borderWidth: 1,
    borderColor: '#27AAE1',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#F9F6FE',
    borderColor: '#F9F6FE',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  icon: {
    fontSize: 18,
  },
  count: {
    borderWidth: 1,
    height: 42,
    borderColor: '#B668E7',
    borderRadius: 12,
    width: 250,
    marginHorizontal: 10,
    minWidth: 40,
    justifyContent: 'center',
  },
  countTextStyle: {
    color: '#3B2645',
    textAlign: 'center',
    fontSize: 18,
  },
});
