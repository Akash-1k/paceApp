import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Fonts from '../constants/Fonts';
import {useNavigation} from '@react-navigation/native';
import {LinearGradient} from 'react-native-gradients';

const colorList1 = [
  {offset: '0%', color: '#aa0055', opacity: '1'},
  {offset: '100%', color: '#ff0a0a', opacity: '1'},
];

const OrderFail = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Transaction Failed</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Root', {screen: 'TabOne'})}
        style={styles.button}>
        <LinearGradient
          style={styles.granew}
          colorList={colorList1}
          angle={200}></LinearGradient>
        <Text style={styles.text}>Ok, Got It!</Text>
      </TouchableOpacity>
    </>
  );
};

export default OrderFail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.Poppins_Black,
    color: '#F11d24',
  },
  button: {
    position: 'relative',
    height: 60,
    borderRadius: 1000,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginHorizontal: 15,
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
