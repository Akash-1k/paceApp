import React, {useState, useEffect} from 'react';
import Fonts from '../constants/Fonts';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Config from '../constants/Config';
import {LinearGradient} from 'react-native-gradients';
import RunningTimerWalking from './RunningTimerWalking';
import {Row, Column as Col, Grid} from 'react-native-responsive-grid';
import ProgressCircle from 'react-native-progress-circle';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import {connect} from 'react-redux';
import Loader from '../common/Loader';
import {showAlert} from '../utils/CommonFunctions';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';
import {
  toPercent,
  inMilsec,
  calculateCaloriesBurnt,
} from '../common/Functions/Func';

const WalkingTimer1 = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const [targetData, setTargetData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [isStopwatchStart, setIsStopwatchStart] = useState(true);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [mintues, setMintues] = useState('00');
  const [timeUnit, setTimeUnit] = useState('sec');

  const [currCalBurn, setCurrCalBurn] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [time, setTime] = useState('');

  const [showButton, setShowButton] = useState(false);

  let totalCal = 0;

  let a = props.userDetails.user.dob.split(':');
  if (targetData) {
    totalCal = calculateCaloriesBurnt(
      targetData.distance * 1000,
      2022 - parseInt(a[0]),
      props.userDetails.user.current_weight,
    );
  }

  const props1 = {
    radius: 25,
    activeStrokeWidth: 6,
    inActiveStrokeWidth: 6,
    inActiveStrokeColor: '#F2F5F8',
    activeStrokeColor: '#5D6AFC',
    activeStrokeSecondaryColor: '#C068E5',
  };

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${props.loginData.token}`);

    var formdata = new FormData();
    formdata.append('step_id', route.params.id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(Config.BASE_URL + Config.get_step_process, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 1) {
          setTargetData(result.data[0]);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log('get-step-process error WalkingTimer1', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (targetData) {
      if (currentStep >= targetData.steps) {
        setIsStopwatchStart(false);
        showAlert('Target completed...');
        navigation.navigate('Root', {screen: 'TabOne'});
      }
    }

    setCurrCalBurn(
      calculateCaloriesBurnt(
        currentStep * 0.762,
        2022 - parseInt(a[0]),
        props.userDetails.user.current_weight,
      ),
    );
  }, [mintues]);

  const colorList = [
    {offset: '0%', color: '#5D6AFC', opacity: '1'},
    {offset: '100%', color: '#C069E5', opacity: '1'},
  ];

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  let hour = 0;
  let min = 0;
  let sec = 0;

  const options = {
    container: {
      padding: 5,
      borderRadius: 5,
      width: 200,
      alignItems: 'center',
    },
    text: {
      marginLeft: 7,
      fontSize: 40,
      fontFamily: Fonts.Poppins_Bold,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {/* <TouchableOpacity
          onPress={() => {
            alert('aaaa');
            // navigation.navigate('StartWalking');
          }}>
          <Ionicons
            name="chevron-back"
            size={18}
            color="#fff"
            style={{
              margin: 16,
              position: 'absolute',
              top: 30,
              zIndex: 30,
            }}
          />
        </TouchableOpacity> */}
        <View
          style={{
            flex: 1,
          }}>
          {targetData && (
            <RunningTimerWalking
              targetData={targetData}
              isStopwatchStart={isStopwatchStart}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          )}
        </View>

        <View style={[styles.body, {height: 310, marginTop: -10}]}>
          <ScrollView>
            <Row>
              <Col size={32}>
                <View style={styles.items}>
                  {targetData && (
                    <CircularProgressBase
                      {...props1}
                      value={toPercent(currentStep, targetData.steps)}>
                      <View style={styles.flexprog}>
                        <Image
                          resizeMode="contain"
                          source={require('../../assets/images/walk.png')}
                          style={{
                            width: 20,
                            height: 20,
                          }}
                        />
                      </View>
                    </CircularProgressBase>
                    // <ProgressCircle
                    //   percent={toPercent(currentStep, targetData.steps)}
                    //   radius={25}
                    //   borderWidth={4}
                    //   color="#C068E5"
                    //   shadowColor="#F2F5F8"
                    //   bgColor="#fff">
                    //   <View style={styles.flexprog}>
                    //     <Image
                    //       resizeMode="contain"
                    //       source={require('../../assets/images/walk.png')}
                    //       style={{
                    //         width: 20,
                    //         height: 20,
                    //       }}
                    //     />
                    //   </View>
                    // </ProgressCircle>
                  )}
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Bold,
                      fontSize: 18,
                      color: '#C068E5',
                      paddingTop: 4,
                    }}>
                    <Text>{((currentStep * 0.762) / 1000).toFixed(2)}km</Text>
                  </Text>

                  <Text
                    style={[
                      styles.titlemins,
                      {
                        color: '#000',
                        fontSize: 10,
                        opacity: 0.5,
                        position: 'relative',
                        top: -4,
                      },
                    ]}>
                    Distance
                  </Text>
                </View>
              </Col>

              <Col size={32} offset={2}>
                <View style={styles.items}>
                  <CircularProgressBase
                    {...props1}
                    value={
                      toPercent(currCalBurn, totalCal)
                        ? toPercent(currCalBurn, totalCal)
                        : 0
                    }>
                    <View style={styles.flexprog}>
                      <Image
                        resizeMode="contain"
                        source={require('../../assets/images/sicon2.png')}
                        style={{
                          width: 20,
                          height: 20,
                        }}
                      />
                    </View>
                  </CircularProgressBase>
                  {/* <ProgressCircle
                    percent={toPercent(currCalBurn, totalCal)}
                    radius={25}
                    borderWidth={4}
                    color="#C068E5"
                    shadowColor="#F2F5F8"
                    bgColor="#fff">
                    <View style={styles.flexprog}>
                      <Image
                        resizeMode="contain"
                        source={require('../../assets/images/sicon2.png')}
                        style={{
                          width: 20,
                          height: 20,
                        }}
                      />
                    </View>
                  </ProgressCircle> */}
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Bold,
                      fontSize: 18,
                      color: '#C068E5',
                      paddingTop: 4,
                    }}>
                    <Text>{currCalBurn}kcal</Text>
                  </Text>

                  <Text
                    style={[
                      styles.titlemins,
                      {
                        color: '#000',
                        fontSize: 10,
                        opacity: 0.5,
                        position: 'relative',
                        top: -4,
                      },
                    ]}>
                    Calories
                  </Text>
                </View>
              </Col>

              <Col size={32} offset={2}>
                <View style={styles.items}>
                  <CircularProgressBase
                    {...props1}
                    value={toPercent(inMilsec(time), 100000)}>
                    <View style={styles.flexprog}>
                      <Image
                        resizeMode="contain"
                        source={require('../../assets/images/sicon3.png')}
                        style={{
                          width: 20,
                          height: 20,
                        }}
                      />
                    </View>
                  </CircularProgressBase>
                  {/* <ProgressCircle
                    percent={toPercent(inMilsec(time), 200000)}
                    radius={25}
                    borderWidth={4}
                    color="#C068E5"
                    shadowColor="#F2F5F8"
                    bgColor="#fff">
                    <View style={styles.flexprog}>
                      <Image
                        resizeMode="contain"
                        source={require('../../assets/images/sicon3.png')}
                        style={{
                          width: 20,
                          height: 20,
                        }}
                      />
                    </View>
                  </ProgressCircle> */}
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Bold,
                      fontSize: 18,
                      color: '#C068E5',
                      paddingTop: 4,
                    }}>
                    <Text>
                      {mintues} {timeUnit}
                    </Text>
                  </Text>

                  <Text
                    style={[
                      styles.titlemins,
                      {
                        color: '#000',
                        fontSize: 10,
                        opacity: 0.5,
                        position: 'relative',
                        top: -4,
                      },
                    ]}>
                    Time
                  </Text>
                </View>
              </Col>
            </Row>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 5,
              }}>
              <Stopwatch
                start={isStopwatchStart}
                reset={resetStopwatch}
                getTime={time => {
                  let currTimeArray = time.split(':').map(v => {
                    return parseInt(v);
                  });
                  setTime(time);
                  if (currTimeArray[0] > 0) {
                    if (hour < currTimeArray[0]) {
                      hour = currTimeArray[0];
                      // console.log('hour ::::::::', hour);
                      setMintues(hour);
                      setTimeUnit('hour');
                    }
                  } else if (currTimeArray[1] > 0) {
                    if (min < currTimeArray[1]) {
                      min = currTimeArray[1];
                      // console.log('min 1111,', currTimeArray[2], min);
                      setMintues(min);
                      setTimeUnit('min');
                    }
                    // min
                  } else if (sec < currTimeArray[2]) {
                    sec = currTimeArray[2];
                    // console.log('sec,', sec);
                    setMintues(sec);
                    setTimeUnit('sec');
                  }
                }}
                options={options}
              />
            </View>
            <View
              style={{
                width: '100%',
              }}>
              {showButton ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <View style={{width: '40%'}}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsStopwatchStart(true);
                        setShowButton(false);
                      }}
                      style={styles.button}>
                      <LinearGradient colorList={colorList1} angle={200} />
                      <Text style={styles.text}>Resume</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{width: '40%'}}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Root', {screen: 'TabOne'});
                      }}
                      style={styles.button}>
                      <LinearGradient colorList={colorList1} angle={200} />
                      <Text style={styles.text}>End</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={{width: '100%'}}>
                  <TouchableOpacity
                    onLongPress={() => {
                      setShowButton(true);
                      setIsStopwatchStart(false);
                    }}
                    style={styles.button}>
                    <LinearGradient colorList={colorList1} angle={200} />
                    <Text style={styles.text}>Long Press To Pause</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {/* <View
              style={{
                width: '100%',
              }}>
              <Row>
                <Col size={20}>
                  <Pressable
                    onPress={() => {
                      setIsStopwatchStart(!isStopwatchStart);
                      setResetStopwatch(false);
                    }}>
                    <Image
                      resizeMode="contain"
                      source={
                        !isStopwatchStart
                          ? require('../../assets/images/play.png')
                          : require('../../assets/images/pause.png')
                      }
                      style={{
                        width: 60,
                        height: 60,
                      }}
                    />
                  </Pressable>
                </Col>
                <Col size={72} offset={5}>
                  <View style={{width: '100%'}}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsStopwatchStart(false);
                        setResetStopwatch(true);
                        navigation.navigate('Root', {screen: 'TabOne'});
                      }}
                      style={styles.button}>
                      <LinearGradient colorList={colorList1} angle={200} />
                      <Text style={styles.text}>End</Text>
                    </TouchableOpacity>
                  </View>
                </Col>
              </Row>
            </View> */}
          </ScrollView>
        </View>
      </View>
      <View style={styles.gradient}>
        <LinearGradient colorList={colorList} angle={300} />
      </View>
      <Loader loading={isLoading} />
    </View>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WalkingTimer1);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  box: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    flex: 1,
  },
  title: {
    color: '#fff',
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 16,
  },
  subtitle: {
    color: '#fff',
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 16,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  body: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
    borderRadius: 14,
    padding: 10,
    paddingTop: 14,
  },
  titlemins: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: 12,
    color: '#fff',
    opacity: 0.7,
  },
  button: {
    position: 'relative',
    height: 60,
    borderRadius: 1000,
    overflow: 'hidden',
    width: '100%',
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
  },
});
