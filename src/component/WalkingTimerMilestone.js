import React, {useState} from 'react';
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
import {LinearGradient} from 'react-native-gradients';
import RunningTimer from './RunningTimer';
import {Row, Column as Col, Grid} from 'react-native-responsive-grid';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import {toPercent, inMilsec} from '../common/Functions/Func';
import ProgressCircle from 'react-native-progress-circle';
import {useNavigation} from '@react-navigation/native';

const WalkingTimerMilestone = () => {
  const navigation = useNavigation();

  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [mintues, setMintues] = useState('00');
  const [timeUnit, setTimeUnit] = useState('sec');
  const [time, setTime] = useState('');

  const colorList = [
    {offset: '0%', color: '#5D6AFC', opacity: '1'},
    {offset: '100%', color: '#C069E5', opacity: '1'},
  ];

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

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

  let hour = 0;
  let min = 0;
  let sec = 0;

  const props1 = {
    radius: 25,
    activeStrokeWidth: 6,
    inActiveStrokeWidth: 6,
    inActiveStrokeColor: '#F2F5F8',
    activeStrokeColor: '#5D6AFC',
    activeStrokeSecondaryColor: '#C068E5',
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View
          style={{
            flex: 1,
          }}>
          <RunningTimer />
        </View>

        <View style={[styles.body, {height: 310, marginTop: -10}]}>
          <ScrollView>
            <Row>
              <Col size={32}>
                <View style={styles.items}>
                  <CircularProgressBase {...props1} value={70}>
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
                  {/* <ProgressCircle
                    percent={70}
                    radius={25}
                    borderWidth={4}
                    color="#C068E5"
                    shadowColor="#F2F5F8"
                    bgColor="#fff">
                    <View style={styles.flexprog}>
                      <Image
                        resizeMode="contain"
                        source={require('../../assets/images/sicon1.png')}
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
                    <Text>1.6km</Text>
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
                  <CircularProgressBase {...props1} value={40}>
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
                    percent={70}
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
                    <Text>110kcal</Text>
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
                    percent={70}
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
                      console.log('hour ::::::::', hour);
                      setMintues(hour);
                      setTimeUnit('hour');
                    }
                  } else if (currTimeArray[1] > 0) {
                    // console.log('min,', min);

                    if (min < currTimeArray[1]) {
                      min = currTimeArray[1];
                      console.log('min 1111,', currTimeArray[2], min);
                      setMintues(min);
                      setTimeUnit('min');
                    }
                    // min
                  } else if (sec < currTimeArray[2]) {
                    sec = currTimeArray[2];
                    console.log('sec,', sec);
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
                      onPress={() => navigation.navigate('Congratulations')}
                      style={styles.button}>
                      <LinearGradient colorList={colorList1} angle={200} />
                      <Text style={styles.text}>End</Text>
                    </TouchableOpacity>
                  </View>
                </Col>
              </Row>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.gradient}>
        <LinearGradient colorList={colorList} angle={360} />
      </View>
    </View>
  );
};

export default WalkingTimerMilestone;

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
