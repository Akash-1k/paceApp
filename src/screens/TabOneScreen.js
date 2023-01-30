import React, {useEffect, useState} from 'react';
import {
  createNavigationContainerRef,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  BackHandler,
  Pressable,
  Button,
  Alert,
  Dimensions,
} from 'react-native';
import {Row, Column as Col, Grid} from 'react-native-responsive-grid';
import {LinearGradient} from 'react-native-gradients';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';
import Blog from '../component/Blog';
import ShopSlider from '../component/ShopSlider';
import Fonts from '../constants/Fonts';
import {connect} from 'react-redux';
import Config from '../constants/Config';
import {userDetailsRequest} from '../modules/Profile/actions';
import {
  setSteps,
  stepsRequest,
  getWaterGlassRequested,
  getHomeRequested,
} from '../modules/Home/actions';
import {toPercent} from '../common/Functions/Func';
import useTracking from '../utils/useTracking';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../env';
import ThreeOptionAlert from '../common/ThreeOptionAlert';

const {width, height} = Dimensions.get('window');

function TabOneScreen(props) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);

  const colorList = [
    {offset: '0%', color: '#5D6AFC', opacity: '1'},
    {offset: '100%', color: '#C068E5', opacity: '1'},
  ];

  const colorList1 = [
    {offset: '0%', color: '#5D6AFC', opacity: '1'},
    {offset: '30%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#C068E5', opacity: '1'},
  ];

  const {location, history, distance} = useTracking(true);

  // console.log('Location', location, history, distance);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Bold,
              color: '#3B2645',
              fontSize: 17,
            }}>
            <Text style={{fontFamily: Fonts.Poppins_Regular}}>Hey</Text>{' '}
            {props.userDetails != [] ? props?.userDetails?.user?.name : 'User'}!
          </Text>
          <Pressable
            onPress={() => {
              props.navigation.navigate('TabFour');
            }}>
            <Image
              resizeMode="contain"
              source={
                props.userDetails?.user?.image
                  ? {
                      uri:
                        Config.IMAGE_BASE_URL +
                        'profile/' +
                        props.userDetails.user.image,
                    }
                  : require('../../assets/images/userpro.png')
              }
              style={{
                width: 34,
                height: 34,
                marginLeft: 12,
                borderRadius: 100,
              }}
            />
          </Pressable>
        </View>
      ),
    });
  }, [props.userDetails]);

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  console.log(props.loginData.token);
  const check = async () => {
    try {
      const deviceToken = await AsyncStorage.getItem('fcmToken');
      console.log(deviceToken);
      await updateDeviceToken(deviceToken);
    } catch (e) {
      // navigation.navigate('PleaseSelectOne');
      console.error(e);
    }
  };

  const updateDeviceToken = async token => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var data = new FormData();
    data.append('device_token', token);

    var requestOptions = {
      method: 'POST',
      body: data,
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(BASE_URL + Config.device_token, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('Update Token', result);
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    if (isFocused) {
      check();
      props.getHomeRequested(props.loginData.token);
      props.userDetailsRequest({token: props.loginData.token});
    }
  }, [isFocused]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.mainbg}>
      <ScrollView style={styles.mainbg}>
        {props.homeData.water_glass != undefined && (
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
                      {props.runningSteps ? props.runningSteps.calories : 0}
                      kcal
                      <Text style={styles.titlemins}>
                        / {props.runningSteps ? props.runningSteps.time : 0}{' '}
                        mins
                      </Text>
                    </Text>
                    <TouchableOpacity
                      style={styles.startbtn}
                      onPress={() => {
                        if (
                          props.userDetails.user.dob == null ||
                          props.userDetails.user.current_weight == null
                        ) {
                          setModalVisible(true);
                        } else {
                          navigation.navigate('StartRunning');
                        }
                      }}>
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
                        {props.homeData?.water_glass != [] &&
                          props.homeData?.water_glass[0]?.fill_glass *
                            props.homeData?.water_glass[0]?.glass_val}
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
                        {props.homeData?.water_glass != [] &&
                          parseInt(
                            props.homeData?.water_glass[0]?.default_glass,
                          ) * props.homeData?.water_glass[0]?.glass_val}{' '}
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

                {props.walkingSteps && (
                  <View
                    style={[
                      styles.boxwhite,
                      {height: 140, alignItems: 'center'},
                    ]}
                    onStartShouldSetResponder={() => {
                      if (
                        props.userDetails.user.dob == null ||
                        props.userDetails.user.current_weight == null
                      ) {
                        setModalVisible(true);
                      } else {
                        navigation.navigate('StartWalking');
                      }
                    }}>
                    <View style={styles.relative}>
                      <CircularProgressBase
                        value={toPercent(
                          props.walkingSteps.completed_steps,
                          props.walkingSteps.goal_steps,
                        )}
                        radius={57}
                        activeStrokeColor={'#5D6AFC'}
                        activeStrokeSecondaryColor={'#C068E5'}
                        inActiveStrokeColor={'rgba(192,203,222,.2)'}>
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
                            {props.walkingSteps?.completed_steps == null
                              ? 0
                              : props.walkingSteps?.completed_steps}
                          </Text>
                          <Text style={styles.sText}>Steps Today</Text>
                          <Text style={styles.sGoal}>
                            {'Goal'} {props.walkingSteps.goal_steps}
                          </Text>
                        </View>
                      </CircularProgressBase>
                    </View>
                  </View>
                )}
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
                    {'Let’s Go'}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    if (
                      props.userDetails.user.dob == null ||
                      props.userDetails.user.current_weight == null
                    ) {
                      setModalVisible(true);
                    } else {
                      navigation.navigate('DoubleYourCoins');
                    }
                  }}
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
        )}
      </ScrollView>
      {modalVisible ? (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            height: 250,
            width: width - 20,
            borderRadius: 10,
            top: width / 2,
            elevation: 5,
            zIndex: 55,
            alignSelf: 'center',
          }}>
          <ThreeOptionAlert
            title="Update"
            msg="Please Provide your details!"
            // firstTitle=""
            secondTitle="OK"
            thirdTitle="Cancel"
            // onPressFirst={() => {
            //   setModalVisible(false);
            // }}
            onPressSecond={() => {
              navigation.navigate('PersonalData');
              setModalVisible(false);
            }}
            onPressThird={() => {
              setModalVisible(false);
            }}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  state: state,
  loginData: state.loginReducer?.loginData,
  userDetails: state.profileReducer?.userDetails,
  sendStepsSuccess: state.homeReducer?.sendStepsSuccess,
  steps: state.homeReducer?.steps,
  homeData: state.homeReducer?.homeData,
  walkingSteps: state.homeReducer?.homeData?.walking_steps,
  runningSteps: state.homeReducer?.homeData?.running_steps,
  cartItemData: state.shopReducer.cartItemData,
});

const mapDispatchToProps = dispatch => ({
  stepsRequest: data => dispatch(stepsRequest(data)),
  setSteps: data => dispatch(setSteps(data)),
  getWaterGlassRequested: data => dispatch(getWaterGlassRequested(data)),
  getHomeRequested: data => dispatch(getHomeRequested(data)),
  userDetailsRequest: data => dispatch(userDetailsRequest(data)),
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
