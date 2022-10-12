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
  ScrollView,
} from 'react-native';
import {LinearGradient} from 'react-native-gradients';
import {useNavigation, useRoute} from '@react-navigation/native';

const Rest = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [timeLeft, setTimeLeft] = useState(30);
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

  //   useEffect(() => {
  //     if (route.params.nextScreen == 'StartWorkout') {
  //       setType('Workout');
  //     } else if (route.params.nextScreen == 'WalkingTimer') {
  //       setType('Running Timer');
  //     }
  //   }, []);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) {
      //   console.log(
      //     'route.params.nextScreen ::::::::::',
      //     route.params.nextScreen,
      //   );
      //   if (route.params.nextScreen == 'StartWorkout') {
      //     navigation.navigate(route.params.nextScreen);
      //   } else if (route.params.nextScreen == 'WalkingTimer') {
      //     navigation.navigate(route.params.nextScreen);
      //   }
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
            right: 20,
            top: 15,
          }}
          onPress={() => navigation.goBack()}>
          <Image
            resizeMode="contain"
            source={require('../../assets/images/mcross.png')}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>

        <View style={styles.box}>
          <Text style={styles.title}>Rest</Text>
          <Text style={styles.subtitle}> Next {type} starts in</Text>
          <Text style={styles.btitle}>{timeLeft}</Text>
        </View>
        <TouchableOpacity style={{flex: 0.1}}>
          <Text style={styles.title}>{'Skip >>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gradient}>
        <LinearGradient colorList={colorList1} angle={360} />
      </View>
    </>
  );
};

export default Rest;

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
