import React from 'react';
import {
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import Fonts from '../constants/Fonts';

const DoubleYourCoinsCompleted = () => {
  return (
    <SafeAreaView style={styles.mainbg}>
      <ScrollView>
        <View style={styles.detailbox}>
          <View style={styles.radius}>
            <ImageBackground
              source={require('../../assets/images/coinsbg.png')}
              style={styles.walletbg}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/dcoins.png')}
                style={{
                  width: 270,
                  height: 270,
                }}
              />
              <View style={{marginTop: -30}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 0,
                  }}>
                  <Text
                    style={[
                      styles.titlemins,
                      {
                        color: '#fff',
                        fontSize: 21,
                        fontFamily: Fonts.Poppins_Bold,

                        textAlign: 'center',
                      },
                    ]}>
                    How this works
                  </Text>
                </View>

                <Text
                  style={[
                    styles.titlemins,
                    {
                      color: '#fff',
                      fontSize: 14,
                      fontFamily: Fonts.Poppins_Regular,
                      textAlign: 'center',
                    },
                  ]}>
                  Running <Text style={{fontWeight: '600'}}>3 times</Text> in a
                  week
                </Text>
                <Text
                  style={[
                    styles.titlemins,
                    {
                      color: '#fff',
                      fontSize: 14,
                      fontFamily: Fonts.Poppins_Regular,
                      textAlign: 'center',
                    },
                  ]}>
                  Continue for <Text style={{fontWeight: '600'}}>3 times</Text>{' '}
                  in a row
                </Text>
                <Text
                  style={[
                    styles.titlemins,
                    {
                      color: '#fff',
                      fontSize: 14,
                      fontFamily: Fonts.Poppins_Regular,
                      textAlign: 'center',
                    },
                  ]}>
                  Run atleast <Text style={{fontWeight: '600'}}>1 time</Text> in
                  a week
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.container}>
            <View style={styles.boxbor}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/com.png')}
                style={{
                  width: 70,
                  height: 70,
                }}
              />
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Bold,
                  fontSize: 20,
                  color: '#C068E5',
                }}>
                <Text>Streak Completed?</Text>
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Regular,
                  color: '#3B2645',
                }}>
                Total Distance :
                <Text
                  style={{
                    fontWeight: '600',
                    color: '#3B2645',
                    opacity: 0.8,
                    fontFamily: Fonts.Poppins_Bold,
                  }}>
                  {''} 10 km
                </Text>
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Regular,
                    color: '#3B2645',
                  }}>
                  You have earned
                </Text>
                <ImageBackground
                  source={require('../../assets/images/roundbg.png')}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    marginHorizontal: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
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
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Regular,
                    color: '#3B2645',
                  }}>
                  Coins
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontFamily: Fonts.Poppins_Regular,
                textAlign: 'center',
                fontSize: 12,
                color: '#62516A',
                opacity: 0.7,
                marginTop: 20,
              }}>
              Please wait until you get your next streak
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoubleYourCoinsCompleted;

const styles = StyleSheet.create({
  radius: {
    overflow: 'hidden',
    height: 550,
  },
  walletbg: {
    height: 800,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 50,
  },
  detailbox: {
    position: 'relative',
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 15,
    marginTop: -130,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 13,
  },
  startbtn: {
    backgroundColor: '#F6F0FD',
    padding: 7,
    width: 100,
    height: 33,
    borderRadius: 22,
  },
  btntext: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    color: '#3B2645',
  },
  btntext1: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
    color: '#3B2645',
  },
  flexcenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#B668E7',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  headflex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 16,
    color: '#1D1617',
    marginBottom: 8,
  },
  stitle: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#7B6F72',
    fontSize: 12,
  },
  btnn: {
    borderWidth: 1,
    borderColor: '#B668E7',
    padding: 11,
    borderRadius: 6,
  },
  boxbor: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    width: '90%',
  },
  mainbg: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
