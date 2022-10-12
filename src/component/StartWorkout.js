import React, {useEffect, useState, useCallback} from 'react';
import Fonts from '../constants/Fonts';
import {
  Text,
  SafeAreaView,
  useWindowDimensions,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Timeline from 'react-native-timeline-flatlist';
import {useNavigation, useRoute} from '@react-navigation/native';
import {connect} from 'react-redux';
import Config from '../constants/Config';
import Loader from '../common/Loader';
import ProgressCircle from 'react-native-progress-circle';
import VideoPlayer from './VideoPlayer';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import {setPlayVideoDetails} from '../modules/Workout/actions';
import {toUpperCaseFirst, inMilsec} from '../common/Functions/Func';

const StartWorkout = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const windowHeight = useWindowDimensions().height;
  const [howToDoIt, setStepList] = useState([]);
  const [data, setData] = useState({});
  const [nextworkout, setNextWorkout] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayVideo, setIsPlayVideo] = useState(false);

  const [timePercent, setTimePercent] = useState(0);

  const [isTimerStart, setIsTimerStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState();
  const [resetTimer, setResetTimer] = useState(false);

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => true,
  //   );
  //   return () => backHandler.remove();
  // }, []);

  const options = {
    text: {
      color: '#fff',
      fontFamily: Fonts.Poppins_Bold,
      fontSize: 16,
      lineHeight: 22,
    },
  };

  // Read more & Read less... (START)
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 3 lines or not
    // console.log(e.nativeEvent);
  }, []);
  // Read more & Read less... (END)

  useEffect(() => {
    setTimerDuration(0);
    hitApi(props.exersiseId.id, props.exersiseId.workout_id);
  }, [route.params?.currentTime]);

  console.log('timerDuration,', timerDuration);
  const hitApi = (exersiseId, workout_id) => {
    // console.log(exersiseId, workout_id);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(
      Config.BASE_URL +
        Config.start_workout +
        `?id=${exersiseId}&workout_id=${workout_id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        setData(result.workout_excersices[0]);
        setStepData(result.how_do_it);
        setNextWorkout(result.nextworkout);
        setIsLoading(false);
        if (route.params?.currentTime) {
          const inMillisec = inMilsec(result.workout_excersices[0].duration);
          setTimerDuration(inMillisec - route.params?.currentTime * 1000);
          onTimePercent(inMillisec, route.params?.currentTime * 1000);
        } else if (result.workout_excersices[0].duration) {
          const inMillisec = inMilsec(result.workout_excersices[0].duration);
          setTimerDuration(inMillisec);
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  const setStepData = data => {
    // let rawData = JSON.parse(data)
    if (data == null || data == undefined) {
      return;
    }
    let newData = [];
    data.map((item, index) => {
      let index1 = index + 1;
      newData.push({
        time: index <= 9 ? '0' + index1 : index1,
        title: item.title,
        description: item.description,
      });
    });
    setStepList(newData);
  };

  const onNexExercise = () => {
    hitApi(nextworkout?.id, nextworkout?.workout_id);
  };

  const onTimePercent = (totalDur, currDur) => {
    var percent = Math.ceil((100 * currDur) / totalDur);
    setTimePercent(percent);
  };

  return (
    <SafeAreaView style={styles.relative}>
      <ScrollView style={styles.relative}>
        <View style={styles.container}>
          <View
            style={{
              width: '100%',
              height: windowHeight,
              flex: 1,
              borderBottomStartRadius: 20,
              borderBottomEndRadius: 20,
              overflow: 'hidden',
            }}>
            <ImageBackground
              resizeMode="cover"
              source={
                data.thumb_image
                  ? {
                      uri: `${Config.IMAGE_BASE_URL}workouts/${data.thumb_image}`,
                    }
                  : require('../../assets/images/exercise_img.png')
              }
              style={{
                width: '100%',
                height: windowHeight,
                flex: 1,
              }}>
              <View style={styles.workcenter}>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 20,
                    top: 15,
                    zIndex: 2,
                  }}
                  onPress={() => navigation.navigate('WorkoutDetails')}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/whitecross.png')}
                    style={{
                      width: 20,
                      height: 20,
                      opacity: 0.5,
                    }}
                  />
                </TouchableOpacity>
                <View style={styles.innercontainer}>
                  <View style={styles.workitem}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/knees.png')}
                      style={{
                        width: 17,
                        height: 31,
                      }}
                    />
                    <View style={styles.workbody}>
                      <Text style={styles.subtitle}>Exercise</Text>
                      <Text style={styles.title1}>
                        {data.title && toUpperCaseFirst(data.title)}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[styles.subtitle, {paddingLeft: 27, paddingTop: 6}]}>
                    {data.difficulity_level &&
                      toUpperCaseFirst(data.difficulity_level)}{' '}
                    {data.calories && `| ${data.calories} Calories Burn`}
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    left: windowHeight / 5.2,
                    top: windowHeight / 2.5,
                  }}
                  onPress={() => {
                    setIsPlayVideo(true);
                    console.log('Play Button', data);
                    props.setPlayVideoDetails(data);
                    navigation.navigate('VideoPlayer', {
                      video_url: data.video_url,
                      thumb_image: data.thumb_image,
                    });
                  }}>
                  <Ionicons name="play-circle" size={70} color="#fff" />
                </TouchableOpacity>
                <View
                  style={{
                    top: 85,
                    right: 70,
                    flex: 1,
                    justifyContent: 'flex-end',
                  }}>
                  <ProgressCircle
                    percent={timePercent * 0.4 + 5}
                    radius={55}
                    borderWidth={15}
                    color="#C068E5"
                    shadowColor="#F2F5F8"
                    bgColor="rgb(125,125,125)"
                  />
                </View>
                <View style={[styles.innercontainer, styles.innercontainer1]}>
                  <View style={styles.timeflex}>
                    <View style={styles.workitem1}>
                      <View style={styles.workbody1}>
                        {/* <Text
                          style={[
                            styles.title1,
                            {
                              lineHeight: 22,
                            },
                          ]}>
                          {data.duration}
                        </Text> */}
                        {Boolean(timerDuration) && (
                          <Timer
                            totalDuration={timerDuration}
                            // Time Duration
                            start={isTimerStart}
                            // To start
                            reset={resetTimer}
                            // To reset
                            options={options}
                            // Options for the styling
                            handleFinish={() => {
                              alert('Custom Completion Function');
                            }}
                          />
                        )}
                        {/* <TouchableHighlight
                          onPress={() => {
                            setIsTimerStart(!isTimerStart);
                            setResetTimer(false);
                          }}>
                          <Text style={styles.buttonText}>
                            {!isTimerStart ? 'START' : 'STOP'}
                          </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                          onPress={() => {
                            setIsTimerStart(false);
                            setResetTimer(true);
                          }}>
                          <Text style={styles.buttonText}>RESET</Text>
                        </TouchableHighlight> */}

                        <Text
                          style={[
                            styles.title1,
                            {
                              fontSize: 12,
                            },
                          ]}>
                          minutes left
                        </Text>
                      </View>
                    </View>

                    <View style={styles.workitem1}>
                      <View style={styles.workbody1}>
                        <TouchableOpacity
                          onPress={() => {
                            onNexExercise();
                          }}>
                          <Text
                            style={[
                              styles.title1,
                              {
                                lineHeight: 22,
                                fontSize: 10,
                                textAlign: 'right',
                                fontFamily: Fonts.Poppins_Regular,
                              },
                            ]}>
                            Next Exercise {'>>'}
                          </Text>
                        </TouchableOpacity>
                        <Text
                          style={[
                            styles.title1,
                            {
                              fontSize: 12,
                            },
                          ]}>
                          {nextworkout?.title &&
                            toUpperCaseFirst(nextworkout?.title)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    left: windowHeight / 8,
                    bottom: -10,
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/tapbtn.png')}
                    style={{
                      width: 198,
                      height: 41,
                    }}
                  />
                </TouchableOpacity>

                {/* <Image
                  resizeMode="contain"
                  source={require('../../assets/images/startgrad.png')}
                  style={{
                    width: 129,
                    height: 129,
                    position: 'absolute',
                    left: -90,
                    bottom: 20,
                  }}
                /> */}
              </View>
            </ImageBackground>
          </View>

          <View style={styles.box}>
            <Text style={[styles.title2, {marginBottom: 8}]}>Descriptions</Text>
            <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 3}
              style={[styles.subtitle, {color: '#7B6F72'}]}>
              {data.description}{' '}
            </Text>
            {lengthMore ? (
              <Text
                onPress={toggleNumberOfLines}
                style={[styles.subtitle, {color: '#C068E5'}]}>
                {textShown ? 'Read less...' : 'Read more...'}
              </Text>
            ) : null}
            {howToDoIt.length > 0 && (
              <>
                <View style={[styles.flexdir, {marginBottom: 15}]}>
                  <Text style={[styles.sText, {fontSize: 16}]}>
                    How To Do It
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={[styles.sGoal, {fontSize: 12, color: '#B4B4B4'}]}>
                      {howToDoIt?.length} Steps
                    </Text>
                  </TouchableOpacity>
                </View>

                <Timeline
                  timeContainerStyle={{
                    minWidth: 18,
                    padding: 0,
                  }}
                  style={{
                    padding: 0,
                    margin: 0,
                    left: -30,
                  }}
                  innerCircle={'dot'}
                  data={howToDoIt}
                  separatorStyle={{borderColor: 'red'}}
                  circleColor="#fff"
                  lineColor="#C068E5"
                  timeStyle={styles.timestyle}
                  titleStyle={styles.titlestyle}
                  descriptionStyle={styles.descstyle}
                />
              </>
            )}
          </View>
        </View>
      </ScrollView>

      <Loader loading={isLoading} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
  // workoutDetails: state.workoutReducer.workoutDetails,
  exersiseId: state.workoutReducer.exersiseId,
});

const mapDispatchToProps = dispatch => ({
  setPlayVideoDetails: data => dispatch(setPlayVideoDetails(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartWorkout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  relative: {
    position: 'relative',
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  workitem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  workitem1: {},
  workbody: {
    position: 'relative',
    paddingHorizontal: 10,
    flex: 1,
  },
  workbody1: {
    paddingHorizontal: 10,
  },
  title: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 16,
  },
  title1: {
    color: '#fff',
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 16,
  },
  subtitle: {
    color: '#fff',
    // opacity: 0.4,
    fontSize: 12,
    fontFamily: Fonts.Poppins_Regular,
  },
  innercontainer: {
    padding: 15,
  },
  innercontainer1: {
    marginTop: 'auto',
    marginBottom: 40,
    paddingLeft: 40,
  },
  workcenter: {
    flex: 1,
    flexDirection: 'column',
  },
  timeflex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title2: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 18,
    lineHeight: 32,
  },
  box: {
    backgroundColor: '#fff',
    marginTop: 0,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    padding: 25,
  },
  flexdir: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
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
  titlestyle: {
    paddingTop: 0,
    color: '#1D1617',
    marginTop: -11,
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 14,
  },
  descstyle: {
    color: '#7B6F72',
    marginTop: 5,
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 14,
  },
  timestyle: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#BC68E5',
    position: 'absolute',
    top: 0,
    left: 30,
    zIndex: 2,
    height: 20,
    backgroundColor: '#fff',
  },
});
