import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const CounterQuantity = () => {
  const [counter, setCounter] = useState(1);

  const onPressMinus = () => {
    setCounter(counter - 1);
  };

  const onPressPlus = () => {
    setCounter(counter + 1);
  };
  useEffect(() => {
    setCounter(1);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPressMinus}
        style={[styles.touchable, styles.buttonStyle]}>
        <Text>-</Text>
      </TouchableOpacity>
      <View style={styles.count}>
        <Text style={styles.countTextStyle}>{counter}</Text>
      </View>
      <TouchableOpacity
        onPress={onPressPlus}
        style={[styles.touchable, styles.buttonStyle]}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CounterQuantity;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  buttonStyle: {
    backgroundColor: '#F9F6FE',
    borderColor: '#F9F6FE',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  buttonTextStyle: {
    color: '#3B2645',
  },
  countTextStyle: {
    color: '#3B2645',
    borderWidth: 1,
    height: 42,
    borderColor: '#B668E7',
    borderRadius: 12,
    padding: 12,
    width: 250,
    textAlign: 'center',
    marginHorizontal: 10,
    fontSize: 16,
  },
  count: {
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
});
