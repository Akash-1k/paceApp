import React, {useState, useEffect} from 'react';
import Fonts from '../constants/Fonts';
import {
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {LinearGradient} from 'react-native-gradients';
import {useNavigation, useRoute} from '@react-navigation/native';
import {connect} from 'react-redux';
import Config from '../constants/Config';
import {startWorkoutRequest} from '../modules/Workout/actions';

const Rest = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const [timeLeft, setTimeLeft] = useState(3);
  const [type, setType] = useState('set');
  const {width, height} = Dimensions.get('window');

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '.8'},
    {offset: '100%', color: '#5D6AFC', opacity: '.8'},
  ];

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const workoutStatus = () => {
    var formdata = new FormData();
    formdata.append('workout_id', props.nextWorkoutDetails.workout_id);
    formdata.append('excersice_id', props.nextWorkoutDetails.id);

    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(Config.BASE_URL + Config.workout_status, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    if (route.params.nav == '30') {
      setTimeLeft(3);
    } else if (route.params.nav == '60') {
      workoutStatus();
      if (props.nextWorkoutDetails != null) {
        setTimeLeft(6);
        const data = {
          token: props.loginData.token,
          exersiseId: props.nextWorkoutDetails.id,
          workout_id: props.nextWorkoutDetails.workout_id,
          loader: false,
        };
        props.startWorkoutRequest(data);
      }
    }
  }, []);

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

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) {
      if (route.params.nav == '30') {
        props.navigation.navigate('VideoPlayer', {
          count: route.params.count,
        });
      } else if (route.params.nav == '60') {
        if (props.nextWorkoutDetails == null) {
          hitApiAfterVideoEnd();
        } else {
          props.navigation.navigate('StartWorkout', {screen: 'Rest60'});
        }
      }

      return;
    }
    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            right: 20,
            top: 15,
            zIndex: 2,
          }}
          onPress={() => setTimeLeft(0)}>
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
        <View style={styles.box}>
          <Text style={styles.title}>Rest</Text>
          {/* <Text style={styles.subtitle}> Next {type} starts in</Text> */}
          <Text style={styles.btitle}>{timeLeft}</Text>
        </View>
        {route?.params?.nav == '30' && (
          <TouchableOpacity
            onPress={() => setTimeLeft(0)}
            style={{flex: 0.16, alignItems: 'center'}}>
            <Text style={styles.title}>{'Next >>'}</Text>

            {props?.playVideoDetails?.title && (
              <Text style={styles.subtitle}>
                {props.playVideoDetails.title}
              </Text>
            )}
            <Text>{`SET ${route.params.count + 1} OF 3`}</Text>
          </TouchableOpacity>
        )}
        {route?.params?.nav == '60' && (
          <TouchableOpacity
            onPress={() => setTimeLeft(0)}
            style={{flex: 0.16, alignItems: 'center'}}>
            <Text style={styles.title}>{'Next >>'}</Text>

            {props?.nextWorkoutDetails?.title && (
              <Text style={styles.subtitle}>
                {props.nextWorkoutDetails.title}
              </Text>
            )}
            {/* <Text>{`SET ${route.params.count + 1} OF 3`}</Text> */}
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.gradient}>
        <LinearGradient colorList={colorList1} angle={360} />
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
  playVideoDetails: state.workoutReducer.playVideoDetails,
  nextWorkoutDetails: state.workoutReducer.nextWorkoutDetails,
  isStatusBar: state.workoutReducer.isStatusBar,
});

const mapDispatchToProps = dispatch => ({
  // setPlayVideoDetails: data => dispatch(setPlayVideoDetails(data)),
  // setIsStatusBar: data => dispatch(setIsStatusBar(data)),
  startWorkoutRequest: data => dispatch(startWorkoutRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rest);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  relative1: {
    position: 'relative',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  box: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 34,
    lineHeight: 38,
  },
  subtitle: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 16,
  },
  btitle: {
    fontSize: 95,
    fontFamily: Fonts.Poppins_Bold,
    color: '#3B2645',
  },
});
