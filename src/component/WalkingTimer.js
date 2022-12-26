import React, {useState, useEffect} from 'react';
import Fonts from '../constants/Fonts';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Config from '../constants/Config';
import {LinearGradient} from 'react-native-gradients';
import RunningTimer from './RunningTimer';
import {Row, Column as Col, Grid} from 'react-native-responsive-grid';
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
import RunningTimerWalking from './RunningTimerWalking';
import {getHomeRequested} from '../modules/Home/actions';

const WalkingTimer = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const [targetData, setTargetData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [isStopwatchStart, setIsStopwatchStart] = useState(true);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [mintues, setMintues] = useState('00');
  const [timeUnit, setTimeUnit] = useState('sec');

  const [lastData, setLastData] = useState();

  const [currCalBurn, setCurrCalBurn] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [time, setTime] = useState([]);

  const [changeSec, setChangeSec] = useState(0);

  const [showButton, setShowButton] = useState(false);
  let totalCal = 0;

  useEffect(() => {
    setLastData(route.params.lastData);
  }, []);

  useEffect(() => {
    if (lastData != null) {
      setCurrCalBurn(
        parseFloat(lastData.calories == null ? 0 : lastData.calories),
      );
      let v = parseFloat(lastData.steps == null ? 0 : lastData.steps);
      setCurrentStep(v);
    }
  }, [lastData]);

  // console.log('currentStep, currCalBurn', currentStep, currCalBurn);
  const d = new Date();
  let a = props.userDetails.user.dob.split(':');
  if (targetData) {
    totalCal = calculateCaloriesBurnt(
      targetData.distance * 1000,
      d.getFullYear() - parseInt(a[0]),
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
      fontSize: 38,
      fontFamily: Fonts.Poppins_Bold,
    },
  };

  const colorList = [
    {offset: '0%', color: '#5D6AFC', opacity: '1'},
    {offset: '100%', color: '#C069E5', opacity: '1'},
  ];

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  const getTimeFun = time => {
    let currTimeArray = time.split(':').map(v => {
      return parseInt(v);
    });

    if (currTimeArray[0] > 0) {
      if (hour < currTimeArray[0]) {
        hour = currTimeArray[0];
        // console.log('hour ::::::::', hour);
        setMintues(hour);
        setTimeUnit('hour');
        setChangeSec(currTimeArray[2]);
      }
    } else if (currTimeArray[1] > 0) {
      // console.log('min,', min);

      if (min < currTimeArray[1]) {
        min = currTimeArray[1];
        // console.log('min 1111,', currTimeArray[2], min);
        setMintues(min);
        setTimeUnit('min');
        setChangeSec(currTimeArray[2]);
      }
      // min
    } else if (sec < currTimeArray[2]) {
      sec = currTimeArray[2];
      setMintues(sec);
      setTimeUnit('sec');
      setChangeSec(currTimeArray[2]);
    }
  };

  useEffect(() => {
    getTarget();
  }, [lastData]);

  const getTarget = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${props.loginData.token}`);

    var formdata = new FormData();
    console.log('getTarget else ::::::::', lastData, route.params.id);
    if (lastData == null) {
      console.log('getTarget ::::::::', route.params);

      formdata.append('step_id', route.params.id);
    } else {
      console.log('getTarget else ::::::::', lastData.step_id);

      formdata.append('step_id', lastData.step_id);
    }

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
        console.log(result);
        if (result.status == 1) {
          console.log('BHVJH', result.data);
          setTargetData(result.data);
        } else {
          // onEndProcess;
          console.log('Config.get_step_process error');
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log('get-step-process error WalkingTimer1', error);
        setIsLoading(false);
      });
  };

  // console.log('next out id', route.params);

  const onEndProcess = endStatus => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${props.loginData.token}`);
    console.log(targetData);
    var formdata = new FormData();
    // formdata.append("milestone_id", "1");
    formdata.append(
      'distance',
      endStatus
        ? targetData.distance
        : (currentStep * 0.000769).toFixed(2).toString(),
    );
    formdata.append('calories', currCalBurn.toString());
    formdata.append('time', time);
    formdata.append('id', lastData == null ? '' : lastData.id);
    formdata.append('steps', endStatus ? targetData.steps : currentStep);
    formdata.append('status', endStatus ? 'completed' : 'in-progress');

    // if (lastData == null) {
    // } else {
    //   formdata.append('id', lastData.id);
    // }
    // console.log('next .id', formdata);
    console.log('formdata onEndProcess', formdata);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(
      `${Config.BASE_URL}${
        targetData.type == 'running' ? '/user-running' : '/user-walking'
      }`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log('ONENDPROCESS :::::::::::::::::', result);
        setIsLoading(false);
        props.getHomeRequested(props.loginData.token);
        navigation.navigate('Root', {screen: 'TabOne'});
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  useEffect(() => {
    if (targetData) {
      // if (targetData.type == 'walking') {
      if (currentStep >= targetData.steps) {
        setIsStopwatchStart(false);
        showAlert('Target completed...');
        onEndProcess(true);
      }
      // }
    }
    setCurrCalBurn(
      calculateCaloriesBurnt(
        currentStep * 0.762,
        d.getFullYear() - parseInt(a[0]),
        props.userDetails.user.current_weight,
      ),
    );
  }, [changeSec]);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View
          style={{
            flex: 1,
          }}>
          {targetData && (
            <>
              {targetData.type == 'running' && (
                <RunningTimer
                  targetData={targetData}
                  isStopwatchStart={isStopwatchStart}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              )}

              {targetData.type == 'walking' && (
                <RunningTimerWalking
                  targetData={targetData}
                  isStopwatchStart={isStopwatchStart}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              )}
            </>
          )}
        </View>

        <View style={[styles.body, {height: 310, marginTop: -10}]}>
          <ScrollView>
            <Row>
              <Col size={32}>
                <View style={styles.items}>
                  <CircularProgressBase
                    {...props1}
                    value={
                      targetData ? toPercent(currentStep, targetData.steps) : 0
                    }>
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

                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Bold,
                      fontSize: 18,
                      color: '#C068E5',
                      paddingTop: 4,
                    }}>
                    <Text>{(currentStep * 0.000769).toFixed(2)}km</Text>
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
                  {targetData && (
                    <CircularProgressBase
                      {...props1}
                      value={toPercent(
                        inMilsec(time),
                        targetData.time != null
                          ? inMilsec(targetData.time)
                          : 100000,
                      )}>
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
                  )}

                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Bold,
                      fontSize: 18,
                      color: '#C068E5',
                      paddingTop: 4,
                    }}>
                    <Text>
                      {mintues}
                      {timeUnit}
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
              {lastData && (
                <Stopwatch
                  startTime={lastData && inMilsec(lastData.time)}
                  start={isStopwatchStart}
                  reset={resetStopwatch}
                  getTime={time => {
                    setTime(time);
                    getTimeFun(time);
                  }}
                  options={options}
                />
              )}
              {lastData == null && (
                <Stopwatch
                  start={isStopwatchStart}
                  reset={resetStopwatch}
                  getTime={time => {
                    setTime(time);
                    getTimeFun(time);
                  }}
                  options={options}
                />
              )}
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
                        if (currentStep >= targetData.steps) {
                          onEndProcess(true);
                        } else {
                          onEndProcess(false);
                        }
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
          </ScrollView>
        </View>
      </View>
      <View style={styles.gradient}>
        <LinearGradient colorList={colorList} angle={300} />
      </View>
      <Loader loading={isLoading} transparent={false} />
    </View>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
});

const mapDispatchToProps = dispatch => ({
  getHomeRequested: data => dispatch(getHomeRequested(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalkingTimer);

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
