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
import {Row, Column as Col, Grid} from 'react-native-responsive-grid';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';
import {
  toPercent,
  inMilsec,
  calculateCaloriesBurnt,
  inSec,
} from '../common/Functions/Func';
import ProgressCircle from 'react-native-progress-circle';
import {connect} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import Config from '../constants/Config';
import {useEffect} from 'react';
import Loader from '../common/Loader';

const WalkingTimerMilestone = props => {
  const navigation = useNavigation();
  const route = useRoute();

  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [mintues, setMintues] = useState('00');
  const [timeUnit, setTimeUnit] = useState('sec');
  const [time, setTime] = useState('00:00:00');

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const colorList = [
    {offset: '0%', color: '#5D6AFC', opacity: '1'},
    {offset: '100%', color: '#C069E5', opacity: '1'},
  ];

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  const props1 = {
    radius: 25,
    activeStrokeWidth: 6,
    inActiveStrokeWidth: 6,
    inActiveStrokeColor: '#F2F5F8',
    activeStrokeColor: '#5D6AFC',
    activeStrokeSecondaryColor: '#C068E5',
  };

  const props2 = {
    radius: 140,
    activeStrokeWidth: 8,
    inActiveStrokeWidth: 6,
    activeStrokeColor: '#F2F5F8',
    inActiveStrokeColor: 'rgba(255,255,255,0.3)',
  };

  useEffect(() => {
    getSingleMilestone();
  }, []);

  const getSingleMilestone = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var formdata = new FormData();

    formdata.append('milestone_id', route.params.id);
    console.log(formdata);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      headers: myHeaders,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(Config.BASE_URL + Config.show_milestone, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setData(result.data);
        getTimeFun(result.data.time);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);
      });
  };
  const getTimeFun = time => {
    const timeArr = String(time).split(':');
    const timeInSec = inSec(time);
    console.log(timeInSec);
    if (timeInSec < 60) {
      setTime(timeArr[2]);
      setTimeUnit('sec');
    } else if (timeInSec > 60 && timeInSec < 3600) {
      setTime(timeArr[1]);
      setTimeUnit('min');
    } else {
      setTime(timeArr[0]);
      setTimeUnit('hour');
    }
    console.log(timeArr);
  };
  console.log(time);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View
          style={{
            flex: 1,
          }}>
          <View style={[styles.items, {flex: 1}]}>
            <CircularProgressBase
              duration={0}
              {...props2}
              value={toPercent(data.distance, data.total_target)}>
              <View
                style={{
                  width: 205,
                  height: 205,
                  borderStyle: 'dashed',
                  borderRadius: 100,
                  borderWidth: 5,
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: Fonts.Poppins_Bold,
                  }}>
                  {data.title}
                </Text>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/images/RunningWhite.png')}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 35,
                    marginBottom: -17,
                    fontFamily: Fonts.Poppins_Bold,
                  }}>
                  {data.distance && data.distance.toFixed(1)}km
                </Text>

                <Text
                  style={{
                    color: '#fff',
                    fontSize: 12,
                    fontFamily: Fonts.Poppins_Regular,
                  }}>
                  out of Target: {data.total_target}km
                </Text>
              </View>
            </CircularProgressBase>
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              marginTop: 'auto',
              position: 'relative',
              top: -8,
            }}>
            <View style={styles.topheader}>
              <View style={styles.flex}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/images/star.png')}
                  style={{
                    width: 19,
                    height: 19,
                    position: 'relative',
                    top: -2,
                    marginRight: 5,
                  }}
                />
                <Text style={styles.title}>
                  Longest Run :
                  <Text style={styles.subtitle}>
                    {' '}
                    {data.longest_run}
                    <Text style={{fontSize: 12}}>km</Text>
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.body, {flex: 0.4, marginTop: -10}]}>
          <Row>
            <Col size={32}>
              <View style={styles.items}>
                <CircularProgressBase
                  {...props1}
                  value={toPercent(data.distance, data.total_target)}>
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
                  <Text>{data.distance}km</Text>
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
                  value={toPercent(
                    data.calories,
                    calculateCaloriesBurnt(
                      data.total_target,
                      props.userDetails.user.age,
                      props.userDetails.user.current_weight,
                    ),
                  )}>
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
                  <Text>{data.calories}kcal</Text>
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
                  value={toPercent(inMilsec(data.time), 100000)}>
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

                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Bold,
                    fontSize: 18,
                    color: '#C068E5',
                    paddingTop: 4,
                  }}>
                  <Text>
                    {time}
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
              width: '100%',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <View style={{width: '90%'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                  // navigation.navigate('Congratulations')
                }}
                style={styles.button}>
                <LinearGradient colorList={colorList1} angle={200} />
                <Text style={styles.text}>End</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.gradient}>
        <LinearGradient colorList={colorList} angle={360} />
      </View>
      <Loader loading={isLoading} transparent={false} />
    </View>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalkingTimerMilestone);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // position: 'relative',
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
    borderRadius: 32,
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
  topheader: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '80%',
    padding: 10,
    borderColor: '#FFF',
    borderWidth: 1,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    paddingTop: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// import React, {useState} from 'react';
// import Fonts from '../constants/Fonts';
// import {
//   Text,
//   View,
//   ScrollView,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Pressable,
// } from 'react-native';
// import {LinearGradient} from 'react-native-gradients';
// import RunningTimer from './RunningTimer';
// import {Row, Column as Col, Grid} from 'react-native-responsive-grid';
// import {CircularProgressBase} from 'react-native-circular-progress-indicator';
// import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
// import {toPercent, inMilsec} from '../common/Functions/Func';
// import ProgressCircle from 'react-native-progress-circle';
// import {useNavigation} from '@react-navigation/native';

// const WalkingTimerMilestone = () => {
//   const navigation = useNavigation();

//   const [isStopwatchStart, setIsStopwatchStart] = useState(false);
//   const [resetStopwatch, setResetStopwatch] = useState(false);
//   const [mintues, setMintues] = useState('00');
//   const [timeUnit, setTimeUnit] = useState('sec');
//   const [time, setTime] = useState('');

//   const colorList = [
//     {offset: '0%', color: '#5D6AFC', opacity: '1'},
//     {offset: '100%', color: '#C069E5', opacity: '1'},
//   ];

//   const colorList1 = [
//     {offset: '0%', color: '#C068E5', opacity: '1'},
//     {offset: '100%', color: '#5D6AFC', opacity: '1'},
//   ];

//   const options = {
//     container: {
//       padding: 5,
//       borderRadius: 5,
//       width: 200,
//       alignItems: 'center',
//     },
//     text: {
//       marginLeft: 7,
//       fontSize: 40,
//       fontFamily: Fonts.Poppins_Bold,
//     },
//   };

//   let hour = 0;
//   let min = 0;
//   let sec = 0;

//   const props1 = {
//     radius: 25,
//     activeStrokeWidth: 6,
//     inActiveStrokeWidth: 6,
//     inActiveStrokeColor: '#F2F5F8',
//     activeStrokeColor: '#5D6AFC',
//     activeStrokeSecondaryColor: '#C068E5',
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.box}>
//         <View
//           style={{
//             flex: 1,
//           }}>
//           <RunningTimer />
//         </View>

//         <View style={[styles.body, {height: 310, marginTop: -10}]}>
//           <ScrollView>
//             <Row>
//               <Col size={32}>
//                 <View style={styles.items}>
//                   <CircularProgressBase {...props1} value={70}>
//                     <View style={styles.flexprog}>
//                       <Image
//                         resizeMode="contain"
//                         source={require('../../assets/images/walk.png')}
//                         style={{
//                           width: 20,
//                           height: 20,
//                         }}
//                       />
//                     </View>
//                   </CircularProgressBase>
//                   {/* <ProgressCircle
//                     percent={70}
//                     radius={25}
//                     borderWidth={4}
//                     color="#C068E5"
//                     shadowColor="#F2F5F8"
//                     bgColor="#fff">
//                     <View style={styles.flexprog}>
//                       <Image
//                         resizeMode="contain"
//                         source={require('../../assets/images/sicon1.png')}
//                         style={{
//                           width: 20,
//                           height: 20,
//                         }}
//                       />
//                     </View>
//                   </ProgressCircle> */}
//                   <Text
//                     style={{
//                       fontFamily: Fonts.Poppins_Bold,
//                       fontSize: 18,
//                       color: '#C068E5',
//                       paddingTop: 4,
//                     }}>
//                     <Text>1.6km</Text>
//                   </Text>

//                   <Text
//                     style={[
//                       styles.titlemins,
//                       {
//                         color: '#000',
//                         fontSize: 10,
//                         opacity: 0.5,
//                         position: 'relative',
//                         top: -4,
//                       },
//                     ]}>
//                     Distance
//                   </Text>
//                 </View>
//               </Col>

//               <Col size={32} offset={2}>
//                 <View style={styles.items}>
//                   <CircularProgressBase {...props1} value={40}>
//                     <View style={styles.flexprog}>
//                       <Image
//                         resizeMode="contain"
//                         source={require('../../assets/images/sicon2.png')}
//                         style={{
//                           width: 20,
//                           height: 20,
//                         }}
//                       />
//                     </View>
//                   </CircularProgressBase>
//                   {/* <ProgressCircle
//                     percent={70}
//                     radius={25}
//                     borderWidth={4}
//                     color="#C068E5"
//                     shadowColor="#F2F5F8"
//                     bgColor="#fff">
//                     <View style={styles.flexprog}>
//                       <Image
//                         resizeMode="contain"
//                         source={require('../../assets/images/sicon2.png')}
//                         style={{
//                           width: 20,
//                           height: 20,
//                         }}
//                       />
//                     </View>
//                   </ProgressCircle> */}
//                   <Text
//                     style={{
//                       fontFamily: Fonts.Poppins_Bold,
//                       fontSize: 18,
//                       color: '#C068E5',
//                       paddingTop: 4,
//                     }}>
//                     <Text>110kcal</Text>
//                   </Text>

//                   <Text
//                     style={[
//                       styles.titlemins,
//                       {
//                         color: '#000',
//                         fontSize: 10,
//                         opacity: 0.5,
//                         position: 'relative',
//                         top: -4,
//                       },
//                     ]}>
//                     Calories
//                   </Text>
//                 </View>
//               </Col>

//               <Col size={32} offset={2}>
//                 <View style={styles.items}>
//                   <CircularProgressBase
//                     {...props1}
//                     value={toPercent(inMilsec(time), 100000)}>
//                     <View style={styles.flexprog}>
//                       <Image
//                         resizeMode="contain"
//                         source={require('../../assets/images/sicon3.png')}
//                         style={{
//                           width: 20,
//                           height: 20,
//                         }}
//                       />
//                     </View>
//                   </CircularProgressBase>
//                   {/* <ProgressCircle
//                     percent={70}
//                     radius={25}
//                     borderWidth={4}
//                     color="#C068E5"
//                     shadowColor="#F2F5F8"
//                     bgColor="#fff">
//                     <View style={styles.flexprog}>
//                       <Image
//                         resizeMode="contain"
//                         source={require('../../assets/images/sicon3.png')}
//                         style={{
//                           width: 20,
//                           height: 20,
//                         }}
//                       />
//                     </View>
//                   </ProgressCircle> */}
//                   <Text
//                     style={{
//                       fontFamily: Fonts.Poppins_Bold,
//                       fontSize: 18,
//                       color: '#C068E5',
//                       paddingTop: 4,
//                     }}>
//                     <Text>
//                       {mintues}
//                       {timeUnit}
//                     </Text>
//                   </Text>

//                   <Text
//                     style={[
//                       styles.titlemins,
//                       {
//                         color: '#000',
//                         fontSize: 10,
//                         opacity: 0.5,
//                         position: 'relative',
//                         top: -4,
//                       },
//                     ]}>
//                     Time
//                   </Text>
//                 </View>
//               </Col>
//             </Row>

//             <View
//               style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 marginTop: 5,
//               }}>
//               <Stopwatch
//                 start={isStopwatchStart}
//                 reset={resetStopwatch}
//                 getTime={time => {
//                   let currTimeArray = time.split(':').map(v => {
//                     return parseInt(v);
//                   });
//                   setTime(time);
//                   if (currTimeArray[0] > 0) {
//                     if (hour < currTimeArray[0]) {
//                       hour = currTimeArray[0];
//                       console.log('hour ::::::::', hour);
//                       setMintues(hour);
//                       setTimeUnit('hour');
//                     }
//                   } else if (currTimeArray[1] > 0) {
//                     // console.log('min,', min);

//                     if (min < currTimeArray[1]) {
//                       min = currTimeArray[1];
//                       console.log('min 1111,', currTimeArray[2], min);
//                       setMintues(min);
//                       setTimeUnit('min');
//                     }
//                     // min
//                   } else if (sec < currTimeArray[2]) {
//                     sec = currTimeArray[2];
//                     console.log('sec,', sec);
//                     setMintues(sec);
//                     setTimeUnit('sec');
//                   }
//                 }}
//                 options={options}
//               />
//             </View>

//             <View
//               style={{
//                 width: '100%',
//               }}>
//               <Row>
//                 <Col size={20}>
//                   <Pressable
//                     onPress={() => {
//                       setIsStopwatchStart(!isStopwatchStart);
//                       setResetStopwatch(false);
//                     }}>
//                     <Image
//                       resizeMode="contain"
//                       source={
//                         !isStopwatchStart
//                           ? require('../../assets/images/play.png')
//                           : require('../../assets/images/pause.png')
//                       }
//                       style={{
//                         width: 60,
//                         height: 60,
//                       }}
//                     />
//                   </Pressable>
//                 </Col>
//                 <Col size={72} offset={5}>
//                   <View style={{width: '100%'}}>
//                     <TouchableOpacity
//                       onPress={() => navigation.navigate('Congratulations')}
//                       style={styles.button}>
//                       <LinearGradient colorList={colorList1} angle={200} />
//                       <Text style={styles.text}>End</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </Col>
//               </Row>
//             </View>
//           </ScrollView>
//         </View>
//       </View>
//       <View style={styles.gradient}>
//         <LinearGradient colorList={colorList} angle={360} />
//       </View>
//     </View>
//   );
// };

// export default WalkingTimerMilestone;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     flex: 1,
//     position: 'relative',
//   },
//   gradient: {
//     position: 'absolute',
//     flex: 1,
//     height: '100%',
//     width: '100%',
//   },
//   box: {
//     position: 'relative',
//     zIndex: 1,
//     width: '100%',
//     flex: 1,
//   },
//   title: {
//     color: '#fff',
//     fontFamily: Fonts.Poppins_Regular,
//     fontSize: 16,
//   },
//   subtitle: {
//     color: '#fff',
//     fontFamily: Fonts.Poppins_Bold,
//     fontSize: 16,
//   },
//   flex: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   body: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderTopStartRadius: 15,
//     borderTopEndRadius: 15,
//   },
//   items: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(0, 0, 0, 0.06)',
//     borderRadius: 14,
//     padding: 10,
//     paddingTop: 14,
//   },
//   titlemins: {
//     fontFamily: Fonts.Poppins_Medium,
//     fontSize: 12,
//     color: '#fff',
//     opacity: 0.7,
//   },
//   button: {
//     position: 'relative',
//     height: 60,
//     borderRadius: 1000,
//     overflow: 'hidden',
//     width: '100%',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     position: 'absolute',
//     zIndex: 1,
//     fontFamily: Fonts.Poppins_Bold,
//     color: '#fff',
//     fontSize: 16,
//   },
// });
