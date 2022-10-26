import React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import {LinearGradient} from 'react-native-gradients';
import {useNavigation} from '@react-navigation/native';
import Fonts from '../constants/Fonts';

const DoubleYourCoins = () => {
  const navigation = useNavigation();
  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];
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
              <View style={styles.relative}>
                <ProgressCircle
                  percent={50}
                  radius={35}
                  borderWidth={5}
                  color="#C068E5"
                  shadowColor="#F2F5F8"
                  bgColor="#fff">
                  <View style={styles.flexprog}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/run1.png')}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </View>
                </ProgressCircle>
              </View>
              <View style={{paddingLeft: 16}}>
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Bold,
                    fontSize: 20,
                    lineHeight: 25,
                    color: '#C068E5',
                  }}>
                  <Text>Milestone 1</Text>
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
                    {''} 5 km
                  </Text>
                </Text>
              </View>
              <TouchableOpacity style={styles.nbtn}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/images/completed.png')}
                  style={{
                    width: 15,
                    height: 15,
                  }}
                />
                {/* isCompleted ? 'Completed' : 'Start Streak' */}
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Bold,
                    color: '#62516A',
                    fontSize: 12,
                    paddingLeft: 6,
                  }}>
                  Completed
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.boxbor, styles.boxbor1]}>
              <View style={styles.relative}>
                <ProgressCircle
                  percent={100}
                  radius={35}
                  borderWidth={5}
                  color="#C068E5"
                  shadowColor="#F2F5F8"
                  bgColor="#fff">
                  <View style={styles.flexprog}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/run1.png')}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </View>
                </ProgressCircle>
              </View>
              <View style={{paddingLeft: 16}}>
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Bold,
                    fontSize: 20,
                    lineHeight: 25,
                    color: '#C068E5',
                  }}>
                  <Text>Milestone 2</Text>
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
              </View>
              <View style={styles.nbtn1}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('WalkingTimerMilestone')}
                  style={styles.button}>
                  <LinearGradient colorList={colorList1} angle={200} />
                  <Text style={styles.text}>Start Streak</Text>
                </TouchableOpacity>
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
              Completing this streak will earn you double.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoubleYourCoins;

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
  boxbor1: {
    borderColor: '#fff',
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
    paddingVertical: 20,
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 45,
    borderColor: '#C068E5',
    borderWidth: 1,
  },
  mainbg: {
    backgroundColor: '#fff',
    flex: 1,
  },
  relative: {
    position: 'relative',
    zIndex: 1,
  },
  flexprog: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nbtn: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    padding: 12,
    paddingHorizontal: 22,
    borderRadius: 1000,
    borderColor: '#C068E5',
    position: 'absolute',
    left: 100,
    bottom: -25,
    backgroundColor: '#fff',
  },
  nbtn1: {
    borderColor: '#C068E5',
    position: 'absolute',
    left: 100,
    bottom: -25,
    width: '50%',
  },
  button: {
    position: 'relative',
    height: 48,
    borderRadius: 1000,
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
    fontSize: 12,
  },
});
