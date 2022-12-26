import React, {useState, useRef, useEffect} from 'react';

// import all the components we are going to use
import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {LinearGradient} from 'react-native-gradients';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fonts from '../constants/Fonts';
//Import React Native Video to play video
import Video from 'react-native-video';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';

//Media Controls to control Play/Pause/Seek and full screen
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {connect} from 'react-redux';
import {setIsStatusBar, setPlayVideoDetails} from '../modules/Workout/actions';
import Config from '../constants/Config';
import Colors from '../constants/Colors';
import Orientation from 'react-native-orientation';

const CustomTimer = props => {
  // Timer
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [timerDuration, setTimerDuration] = useState();
  const [resetTimer, setResetTimer] = useState(false);

  const options = {
    text: {
      color: '#7B6F72',
      fontSize: 16,
      fontFamily: Fonts.Poppins_Bold,
      lineHeight: 22,
    },
  };

  // Timer
  return (
    <Timer
      totalDuration={800000}
      start={true}
      reset={resetTimer}
      options={options}
      getTime={t => console.log(t)}
    />
  );
};

const VideoPlayer = props => {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [buffering, setBuffring] = useState(false);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('contain');

  let count = 0;
  // console.log(
  //   ' props.nextWorkoutDetails ------------------ ',
  //   props.nextWorkoutDetails,
  // );

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  // console.log(' Video PLayer, props.playVideoDetails ', props.playVideoDetails);
  useEffect(() => {
    // Orientation.lockToLandscape();
    props.setIsStatusBar(true);
  }, []);

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? ':' : ':') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? ':' : ':') : '';
    var sDisplay = s > 0 ? s + (s == 1 ? '' : '') : '';
    return hDisplay + mDisplay + sDisplay;
  }

  function handleBackButtonClick(curTime) {
    Orientation.lockToPortrait();
    props.setIsStatusBar(false);
    console.log('currentTime ::::::', curTime);
    // props.navigation.goBack();
    props.navigation.navigate({
      name: 'StartWorkout',
      params: {currentTime: curTime},
      merge: true,
    });
    return true;
  }
  // console.log(props.loginData.token);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', () =>
  //     handleBackButtonClick(currentTime),
  //   );
  //   return () => {
  //     BackHandler.removeEventListener(
  //       'hardwareBackPress',
  //       handleBackButtonClick,
  //     );
  //   };
  // }, [currentTime]);

  const hitApiAfterVideoEnd = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var formdata = new FormData();
    formdata.append('workout_id', props.playVideoDetails.workout_id);
    formdata.append('workout_video_id', props.playVideoDetails.id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(Config.BASE_URL + Config.viewed_workouts_video, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 1) {
          props.navigation.navigate('CongratulationsWorkout');
        }
        console.log('viewed_workouts_video:: ', result);
      })
      .catch(error => console.log('error', error));
  };

  const onSeek = seek => {
    videoPlayer.current.seek(seek);
  };

  const onPaused = playerState => {
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };
  // const [hour, setHour] = useState();
  let hour;
  const onProgress = data => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      // console.log(data);
      let currTimeArray = String(data.currentTime)
        .split('.')
        .map(v => {
          return parseInt(v);
        });

      if (currTimeArray[0] > 0) {
        // console.log('currTimeArray[0]', hour, currTimeArray[0]);
        if (hour > currTimeArray[0]) {
          hour += currTimeArray[0];
          // setHour(hour + currTimeArray[0]);
          // console.log('first222222', hour, currTimeArray[0]);
        } else {
          // setHour(currTimeArray[0]);
          hour = currTimeArray[0];
          // console.log('first', hour, currTimeArray[0]);
        }
      } else {
        hour += currTimeArray[0];
        // setHour(hour + currTimeArray[0]);
        // console.log('first1111', hour, currTimeArray[0]);
      }
      setCurrentTime(secondsToHms(hour));
    }
  };

  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = data => setIsLoading(true);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    onReload();
    hitApiAfterVideoEnd();
  };

  const onReload = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    videoPlayer.current.seek(0);
  };

  const onFullScreen = () => {
    if (isFullScreen == true) {
      Orientation.lockToPortrait();
      setIsFullScreen(false);
      setScreenType('contain');
    } else {
      setIsFullScreen(true);
      Orientation.lockToLandscape();
      setScreenType('cover');
    }
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = currentTime => setCurrentTime(currentTime);

  const onBuffer = ({isBuffering}) => {
    console.log('isBuffering::', isBuffering);
    setBuffring(isBuffering);
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}>
      <StatusBar hidden={props.isStatusBar} />
      <View
        style={{
          width: '100%',
          height: '50%',
          marginBottom: 60,
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            right: 20,
            top: 15,
            zIndex: 2,
          }}
          onPress={() => props.navigation.navigate('StartWorkout')}>
          <MaterialIcons
            name="cancel"
            size={25}
            color="#0007"
            // style={{
            //   position: 'relative',
            //   bottom: 1.2,
            // }}
          />
          {/* <Image
            resizeMode="contain"
            source={require('../../assets/images/whitecross.png')}
            style={{
              width: 20,
              height: 20,
              opacity: 0.5,
            }}
          /> */}
        </TouchableOpacity>
        <Video
          onBuffer={onBuffer}
          // onEnd={onEnd}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          useTextureView={false}
          paused={paused}
          ref={ref => (videoPlayer.current = ref)}
          resizeMode={screenType}
          onFullScreen={isFullScreen}
          repeat
          source={{
            uri:
              Config.VIDEO_BASE_URL +
              'workout_vid/' +
              props.playVideoDetails.video_url,
          }}
          // source={{
          //   uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          // }}
          style={[
            {
              backgroundColor: Colors.fontColor,
            },
            StyleSheet.absoluteFill,
          ]}
          volume={10}
          bufferConfig={{
            minBufferMs: 3000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000,
          }}
        />
        {/* <MediaControls
          duration={duration}
          isLoading={isLoading}
          mainColor="#333"
          onFullScreen={onFullScreen}
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          playerState={playerState}
          progress={currentTime}
          toolbar={renderToolbar()}
        /> */}
        {buffering ? (
          <View
            style={[
              {
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 10,
                zIndex: 10,
              },
              StyleSheet.absoluteFill,
            ]}>
            <ActivityIndicator
              animating
              size={'large'}
              color={Colors.PrimaryColor}
            />
          </View>
        ) : null}
      </View>
      <View style={{alignItems: 'center', flex: 1}}>
        {props.playVideoDetails && (
          <>
            <Text style={styles.title}>{props.playVideoDetails.title}</Text>

            <Text style={styles.subtitle}>
              {'Set'}{' '}
              {props?.route?.params?.count
                ? props?.route?.params?.count + 1
                : count + 1}
            </Text>
            {/* <CustomTimer /> */}
          </>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          if (props?.route?.params?.count) {
            count = props?.route?.params?.count;
          }
          count += 1;
          console.log(count);
          if (count == 3) {
            if (props.nextWorkoutDetails == null) {
              props.navigation.navigate('CongratulationsWorkout');
            } else {
              props.navigation.navigate('Rest', {nav: '60'});
            }
          } else {
            props.navigation.navigate('Rest', {count, nav: '30'});
          }
        }}
        style={styles.button}>
        <Text style={styles.text}>Done</Text>
        <LinearGradient colorList={colorList1} angle={200} />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
  playVideoDetails: state.workoutReducer.playVideoDetails,
  nextWorkoutDetails: state.workoutReducer.nextWorkoutDetails,
  workoutReducer: state.workoutReducer,
  isStatusBar: state.workoutReducer.isStatusBar,
});

const mapDispatchToProps = dispatch => ({
  setPlayVideoDetails: data => dispatch(setPlayVideoDetails(data)),
  setIsStatusBar: data => dispatch(setIsStatusBar(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    position: 'relative',
    height: 50,
    width: '60%',
    borderRadius: 1000,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 25,
    // marginTop: 25,
    // marginHorizontal: 15,
  },
  text: {
    position: 'absolute',
    zIndex: 1,
    fontFamily: Fonts.Poppins_Bold,
    color: '#fff',
    fontSize: 26,
  },
  title: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 26,
    lineHeight: 32,
    // marginBottom: 180,
  },
  subtitle: {
    color: '#7B6F72',
    fontSize: 42,
    margin: 15,
    fontFamily: Fonts.Poppins_Bold,
  },
});
