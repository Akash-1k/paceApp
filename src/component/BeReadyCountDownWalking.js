import React, {useState, useEffect} from 'react';
import Fonts from '../constants/Fonts';
import {
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const BeReadyCountDownWalking = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [timeLeft, setTimeLeft] = useState(3);
  const {width, height} = Dimensions.get('window');
  console.log(route.params.id);
  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) {
      navigation.navigate('WalkingTimer1', {id: route.params.id});
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
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 0,
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
        <Text style={styles.title}>Be Ready</Text>
        <Text style={styles.subtitle}>Walking Timer Starts in</Text>
        <Text style={styles.btitle}>{timeLeft}</Text>
      </View>

      <View
        style={{
          width: '100%',
          marginTop: 'auto',
        }}>
        <Image
          resizeMode="stretch"
          source={require('../../assets/images/ready.png')}
          style={{
            width: width / 1,
            height: height / 1.6,
          }}
        />
      </View>
    </View>
  );
};

export default BeReadyCountDownWalking;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 24,
    lineHeight: 38,
  },
  subtitle: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 14,
  },
  btitle: {
    fontSize: 95,
    fontFamily: Fonts.Poppins_Bold,
    color: '#3B2645',
  },
});
