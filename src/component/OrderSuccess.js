import React from 'react';
import Fonts from '../constants/Fonts';
import {
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const OrderSuccess = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../../assets/images/ordersuccess.png')}
      style={styles.walletbg}>
      {/* <TouchableOpacity
        style={styles.crossbtn}
        onPress={() => navigation.navigate('Root', {screen: 'TabOne'})}>
        <Image
          resizeMode="contain"
          source={require('../../assets/images/whitecross.png')}
          style={{
            position: 'absolute',
            width: 20,
            height: 20,
            bottom: 380,
            left: 15,
          }}
        />
      </TouchableOpacity> */}
      <View style={styles.flexcoin}>
        <Image
          resizeMode="contain"
          source={require('../../assets/images/check.png')}
          style={{
            width: 62,
            height: 62,
          }}
        />
        <Text style={styles.heading}>Congratulations</Text>
        <Text style={styles.stitle}>Your order has been placed.</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Shop')}
        style={styles.btnn}>
        <Text
          style={{
            color: '#A375EF',
            fontSize: 14,
            fontFamily: Fonts.Poppins_SemiBold,
          }}>
          Explore other products
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  crossbtn: {
    position: 'absolute',
    right: 55,
  },
  walletbg: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 22,
    color: '#fff',
    marginVertical: 12,
    marginBottom: 0,
  },
  stitle: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  flexcoin: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 140,
    marginTop: -110,
  },
  btnn: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: 20,
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 1000,
    marginBottom: 20,
  },
});
