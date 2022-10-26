import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  LogBox,
  Button,
} from 'react-native';
import {Row, Column as Col, Grid} from 'react-native-responsive-grid';
import {LinearGradient} from 'react-native-gradients';
import ProgressCircle from 'react-native-progress-circle';
import Blog from '../component/Blog';
import ShopSlider from '../component/ShopSlider';
import Fonts from '../constants/Fonts';
import {connect} from 'react-redux';
import Config from '../constants/Config';
import Loader from '../common/Loader';
import axios from 'axios';

import {startCounter, stopCounter} from 'react-native-accurate-step-counter';

import {
  setSteps,
  stepsRequest,
  getWaterGlassRequested,
  getHomeRequested,
} from '../modules/Home/actions';

function TabOneScreen(props) {
  const navigation = useNavigation();
  const colorList = [
    {offset: '0%', color: '#5D6AFC', opacity: '1'},
    {offset: '100%', color: '#C068E5', opacity: '1'},
  ];
  const colorList1 = [
    {offset: '0%', color: '#5D6AFC', opacity: '1'},
    {offset: '30%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#C068E5', opacity: '1'},
  ];
  const [homeData, setHomeData] = useState({});
  const [water, setWaterData] = useState({});

  const [stepsTarget, setStepsTarget] = useState(0);
  const [stepsPercent, setStepsPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   onGetHomeData();
  //   props.getHomeRequested(props.loginData.token);
  // }, []);
  // console.log('Tabonescreen.js props.loginData', props.loginData);
  const onHitSteps = () => {
    let params = {
      token: props.loginData.token,
      steps: props.steps,
    };
    if (props.steps > 0) {
      props.stepsRequest(params);
    }
  };

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // The screen is focused
  //     // Call any action
  //     setTimeout(() => {
  //       props.getHomeRequested(props.loginData.token);
  //     }, 1000);
  //     onGetHomeData();
  //   });

  // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    const config = {
      default_threshold: 100.0,
      default_delay: 550000000,
      cheatInterval: 3000,
      onStepCountChange: stepCount => {
        props.setSteps(stepCount);
      },
      onCheat: () => {
        console.log('User is Cheating');
      },
    };

    startCounter(config);
    return () => {
      stopCounter();
    };
  }, []);

  useEffect(() => {
    onStepPercent(props.steps);
  }, [props.steps, stepsTarget]);

  const onStepPercent = stepCount => {
    var percent = Math.ceil((stepCount / stepsTarget) * 100);

    setStepsPercent(percent);
    onHitSteps();
  };

  const onGetHomeData = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(Config.BASE_URL + Config.home, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log("result.water_glass[0]:::", result.water_glass.glass[0]);
        setHomeData(result);
        setIsLoading(false);
        setStepsTarget(result.steps[0].goal_steps);
        setWaterData(result.water_glass.glass[0]);
      })
      .catch(error => console.log('error 1', error));
  };

  // useEffect(() => {
  //   console.log('sendStepsSuccess:::::::', props.sendStepsSuccess);
  //   if (props.sendStepsSuccess.completed_steps) {
  //     onStepPercent(props.sendStepsSuccess?.completed_steps)
  //   }
  // }, [props.sendStepsSuccess]);

  useEffect(() => {
    props.getWaterGlassRequested(props.loginData.token);
  }, []);

  return (
    <SafeAreaView style={styles.mainbg}>
      <ScrollView style={styles.mainbg}>
        <View style={styles.container}>
          <Row>
            <Col size={47}>
              <View style={[styles.boxgradient, {marginBottom: 7}]}>
                <View style={styles.relative}>
                  <View style={styles.headflex}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/running.png')}
                      style={{
                        width: 41,
                        height: 41,
                      }}
                    />
                    <Text style={styles.title}>Running</Text>
                  </View>

                  <Text style={styles.titlecal}>
                    238kcal
                    <Text style={styles.titlemins}>/ 30 mins</Text>
                  </Text>
                  <TouchableOpacity
                    style={styles.startbtn}
                    onPress={() => navigation.navigate('StartRunning')}>
                    <Text style={styles.btntext}>Start</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.gradient}>
                  <LinearGradient colorList={colorList} angle={300} />
                </View>
              </View>

              <View
                style={styles.boxwhite}
                onStartShouldSetResponder={() => {
                  console.log(water?.glass_val, water?.fill_glass);
                  navigation.navigate('WaterGlasses');
                }}>
                <View style={styles.relative}>
                  <View style={styles.headflex}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/water.png')}
                      style={{
                        width: 41,
                        height: 41,
                      }}
                    />
                    <Text style={[styles.title, {color: '#3B2645'}]}>
                      Water
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      height: 25,
                      marginTop: 8,
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts.Poppins_Bold,
                        fontSize: 20,
                        color: '#C068E5',
                      }}>
                      {/* {props.glassInfo?.glass[0]?.fill_glass * 250} */}
                      {props.homeData?.water_glass?.glass[0]?.fill_glass *
                        props.homeData?.water_glass?.glass[0]?.glass_val}
                    </Text>

                    <Text
                      style={[
                        styles.titlemins,
                        {
                          color: '#3B2645',
                          fontSize: 12,
                          position: 'relative',
                          top: 4,
                          opacity: 0.3,
                        },
                      ]}>
                      {' /'}{' '}
                      {parseInt(
                        props.homeData?.water_glass?.glass[0]?.default_glass,
                      ) * props.homeData?.water_glass?.glass[0]?.glass_val}{' '}
                      {/* {parseInt(props.glassInfo?.glass[0]?.default_glass) * 250}{' '} */}
                      {'ml'}
                    </Text>
                  </View>
                </View>
              </View>
            </Col>
            <Col size={49} offset={2}>
              <View
                style={[styles.boxwhite, {marginBottom: 8}]}
                onStartShouldSetResponder={() =>
                  navigation.navigate('WalletRewards')
                }>
                <View style={styles.relative}>
                  <View style={styles.headflex}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/wallet.png')}
                      style={{
                        width: 41,
                        height: 41,
                      }}
                    />
                    <Text style={[styles.title, {color: '#3B2645'}]}>
                      Wallet
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      height: 25,
                      marginTop: 8,
                    }}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/coins.png')}
                      style={{
                        width: 22,
                        height: 22,
                        marginRight: 4,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: Fonts.Poppins_Bold,
                        fontSize: 20,
                        color: '#C068E5',
                      }}>
                      {props.homeData?.wallet?.earn_coins}
                    </Text>

                    <Text
                      style={[
                        styles.titlemins,
                        {
                          color: '#3B2645',
                          fontSize: 12,
                          position: 'relative',
                          top: 4,
                          opacity: 0.3,
                        },
                      ]}>
                      {' '}
                      Coins
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={[styles.boxwhite, {height: 140, alignItems: 'center'}]}
                onStartShouldSetResponder={() =>
                  navigation.navigate('StartWalking')
                }>
                <View style={styles.relative}>
                  <ProgressCircle
                    percent={stepsPercent}
                    radius={57}
                    borderWidth={8}
                    color="#C068E5"
                    shadowColor="#F2F5F8"
                    bgColor="#fff">
                    <View style={styles.flexprog}>
                      <Image
                        resizeMode="contain"
                        source={require('../../assets/images/walk.png')}
                        style={{
                          width: 19,
                          height: 19,
                        }}
                      />
                      <Text
                        style={{
                          fontFamily: Fonts.Poppins_Bold,
                          fontSize: 20,
                          lineHeight: 26,
                          color: '#C068E5',
                        }}>
                        {props.steps}
                      </Text>
                      <Text style={styles.sText}>Steps Today</Text>
                      <Text style={styles.sGoal}>
                        {'Goal'} {stepsTarget}
                      </Text>
                    </View>
                  </ProgressCircle>
                </View>
              </View>
            </Col>
          </Row>
          <View style={styles.boxgradient1}>
            <View style={styles.relative}>
              <View style={[styles.headflex, {paddingTop: 25}]}>
                <Text
                  style={[
                    styles.title,
                    {
                      fontSize: 16,
                      paddingLeft: 0,
                      fontFamily: Fonts.Poppins_SemiBold,
                    },
                  ]}>
                  Double your coins
                </Text>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/images/coins.png')}
                  style={{
                    width: 21,
                    height: 21,
                    marginLeft: 5,
                  }}
                />
              </View>
              <View style={{width: '65%', marginBottom: 8}}>
                <Text style={[styles.titlecal, {fontSize: 12}]}>
                  <Text style={[styles.titlemins, {color: '#F0EDFF'}]}>
                    You can get double amount of coins from your runs
                  </Text>{' '}
                  Let’s Go
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('DoubleYourCoins')}
                style={[styles.startbtn, {width: 120}]}>
                <Text style={styles.btntext}>Join the streak</Text>
              </TouchableOpacity>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/girl.png')}
                style={{
                  width: 98,
                  height: 180,
                  marginLeft: 5,
                  position: 'absolute',
                  right: 0,
                }}
              />
            </View>
            <View style={styles.gradient1}>
              <LinearGradient colorList={colorList1} angle={300} />
            </View>
          </View>

          <View style={[styles.flexdir, {marginBottom: 5}]}>
            <Text style={[styles.sText, {fontSize: 16}]}>Shop</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
              <Text style={[styles.sGoal, {fontSize: 10, color: '#B4B4B4'}]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <ShopSlider data={props.homeData.products} />

          <View style={[styles.flexdir, {marginBottom: 5, marginTop: 25}]}>
            <Text style={[styles.sText, {fontSize: 16}]}>Blog</Text>
            <TouchableOpacity onPress={() => navigation.navigate('BlogList')}>
              <Text style={[styles.sGoal, {fontSize: 10, color: '#B4B4B4'}]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <Blog data={props.homeData.blogs} />
        </View>
      </ScrollView>
      <Loader loading={isLoading} />
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  loginData: state.loginReducer?.loginData,
  userDetails: state.profileReducer?.userDetails,
  sendStepsSuccess: state.homeReducer?.sendStepsSuccess,
  steps: state.homeReducer?.steps,
  glassInfo: state.homeReducer?.waterGlassInfo,
  homeData: state.homeReducer?.homeData,
  state,
});

const mapDispatchToProps = dispatch => ({
  stepsRequest: data => dispatch(stepsRequest(data)),
  setSteps: data => dispatch(setSteps(data)),
  getWaterGlassRequested: data => dispatch(getWaterGlassRequested(data)),
  getHomeRequested: data => dispatch(getHomeRequested(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabOneScreen);

const styles = StyleSheet.create({
  mainbg: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 13,
    color: '#fff',
    paddingLeft: 10,
  },
  boxgradient: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
    height: 144,
    padding: 15,
  },
  gradient: {
    position: 'absolute',
    height: '100%',
    width: 180,
    height: 144,
    top: 0,
  },
  boxgradient1: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
    width: '100%',
    flex: 1,
    padding: 25,
    paddingEnd: 0,
    paddingTop: 0,
    backgroundColor: '#000',
    marginVertical: 15,
  },
  gradient1: {
    position: 'absolute',
    width: 850,
    height: 400,
    flex: 1,
  },
  headflex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  relative: {
    position: 'relative',
    zIndex: 1,
  },
  titlecal: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 18,
    color: '#fff',
    opacity: 1,
    marginVertical: 8,
    marginBottom: 4,
  },
  titlemins: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 12,
    color: '#fff',
    opacity: 0.7,
  },
  startbtn: {
    backgroundColor: '#B496F5',
    padding: 7,
    width: 70,
    height: 33,
    borderRadius: 22,
  },
  btntext: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  boxwhite: {
    backgroundColor: '#fff',
    margin: 4,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 20.48,
    shadowRadius: 20.95,
    elevation: 7,
    padding: 15,
    borderRadius: 15,
  },
  sText: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 10,
    color: '#3B2645',
  },
  sGoal: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 7,
    color: '#737A7B',
  },
  flexprog: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexdir: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
