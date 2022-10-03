import React, {useState, useEffect} from 'react';
import Fonts from '../constants/Fonts';
import {
  StyleSheet,
  useWindowDimensions,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProgressCircle from 'react-native-progress-circle';
import {LinearGradient} from 'react-native-gradients';
import {startCounter, stopCounter} from 'react-native-accurate-step-counter';

const colorList = [
  {offset: '0%', color: '#5D6AFC', opacity: '1'},
  {offset: '100%', color: '#C069E5', opacity: '1'},
];

const RunningTimerWalking = ({isStopwatchStart, targetData}) => {
  const [index, setIndex] = React.useState(0);
  const [stepsTarget, setStepsTarget] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepsPercent, setStepsPercent] = useState(0);

  let count = 0;

  const config = {
    default_threshold: 50.0,
    default_delay: 550000,
    cheatInterval: 3000,
    onStepCountChange: stepCount => {
      setCurrentStep(currentStep + stepCount);
    },
    onCheat: () => {
      console.log('User is Cheating');
    },
  };

  console.log('count', count, 'currentStep', currentStep);
  useEffect(() => {
    if (targetData) {
      setStepsTarget(targetData.steps);
    }
  }, []);

  useEffect(() => {
    count = currentStep;
    if (!isStopwatchStart) {
      setCurrentStep(count);
    }

    if (isStopwatchStart) {
      startCounter(config);
    }
    return () => {
      stopCounter();
    };
  }, [isStopwatchStart]);

  useEffect(() => {
    onStepPercent(currentStep);
  }, [currentStep]);

  const onStepPercent = stepCount => {
    var percent = Math.ceil((stepCount / stepsTarget) * 100);
    setStepsPercent(percent);
  };

  const FirstRoute = () => (
    <SafeAreaView style={{paddingTop: 40, flex: 1}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <View style={styles.items}>
          <ProgressCircle
            percent={stepsPercent}
            radius={140}
            borderWidth={4}
            shadowColor="#BB68E6"
            color="rgb(255, 255, 255)"
            bgColor="#756AF6">
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
              <Image
                resizeMode="contain"
                source={require('../../assets/images/walkWhite.png')}
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
                {currentStep}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  fontFamily: Fonts.Poppins_Regular,
                }}>
                Steps out of {stepsTarget}
              </Text>
            </View>
          </ProgressCircle>
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
                Best Streak :
                <Text style={styles.subtitle}>
                  {' '}
                  91,361<Text style={{fontSize: 12}}>Steps</Text>
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );

  const SecondRoute = () => (
    <SafeAreaView style={{paddingTop: 0}}>
      <View style={[styles.items, {marginRight: 0}]}>
        <Image
          resizeMode="cover"
          source={require('../../assets/images/map.png')}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 0,
          }}
        />
      </View>
    </SafeAreaView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const [routes] = React.useState([
    {key: 'first', title: 'Progress', icon: 'bar-chart'},
    {key: 'second', title: 'Map', icon1: 'location-pin'},
  ]);

  const renderIcon = ({route}) => {
    return (
      <>
        <MaterialIcons
          name={route.icon}
          size={20}
          color="#fff"
          style={{
            position: 'absolute',
            left: -50,
            top: 0,
          }}
        />
        <MaterialIcons
          name={route.icon1}
          size={20}
          color="#fff"
          style={{
            position: 'absolute',
            left: -38,
            top: 0,
          }}
        />
      </>
    );
  };

  const layout = useWindowDimensions();

  return (
    <TabView
      swipeEnabled={false}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      tabBarPosition="top"
      renderTabBar={props => (
        <TabBar
          {...props}
          style={{
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
            marginHorizontal: 90,
            position: 'relative',
          }}
          renderIcon={renderIcon}
          indicatorStyle={{
            backgroundColor: '#FFFFFF',
            height: 3,
            opacity: 0.67,
          }}
          activeColor="#FFFFFF"
          inactiveColor="#CBB4F8"
          labelStyle={{
            fontFamily: Fonts.Poppins_SemiBold,
            fontSize: 12,
            color: '#3B2645',
            textTransform: 'capitalize',
          }}
        />
      )}
    />
  );
};

export default RunningTimerWalking;

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#3B2645',
    fontSize: 12,
    paddingTop: 4,
    paddingLeft: 6,
  },
  items: {
    display: 'flex',
    alignItems: 'center',
  },
  topheader: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '80%',
    padding: 10,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    paddingTop: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
  gradient: {
    position: 'absolute',
    flex: 1,
    height: '50%',
    width: '100%',
  },
});
