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

const Congratulations = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../../assets/images/congrts.png')}
      style={styles.walletbg}>
      <TouchableOpacity style={styles.crossbtn}>
        <Image
          resizeMode="contain"
          source={require('../../assets/images/mcross.png')}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
      <Image
        resizeMode="contain"
        source={require('../../assets/images/congrts1.png')}
        style={{
          width: 360,
          height: 360,
        }}
      />
      <View style={styles.flexcoin}>
        <Image
          resizeMode="contain"
          source={require('../../assets/images/coins.png')}
          style={{
            width: 74,
            height: 74,
          }}
        />
        <Text style={styles.heading}>Congratulations</Text>
        <View
          style={{
            width: '80%',
            display: 'flex',
            alignItems: 'center',
          }}>
          <Text style={styles.stitle}>
            You have completed this Streak and earned
          </Text>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <ImageBackground
              source={require('../../assets/images/roundbg.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 6,
              }}>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Bold,
                  color: '#EC9613',
                  fontSize: 12,
                  position: 'relative',
                  top: 1,
                }}>
                84
              </Text>
            </ImageBackground>
            <Text style={styles.stitle}>coins by running 15 Km.</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('DoubleYourCoins')}
        style={styles.btnn}>
        <Text
          style={{
            color: '#A375EF',
            fontSize: 14,
            fontFamily: Fonts.Poppins_SemiBold,
          }}>
          Go Back
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Congratulations;

const styles = StyleSheet.create({
  crossbtn: {
    position: 'absolute',
    top: 25,
    right: 25,
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
    fontSize: 24,
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
  },
  btnn: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: 20,
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 1000,
    marginTop: 70,
  },
});
