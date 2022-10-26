import React from 'react';
import Fonts from '../constants/Fonts';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {LinearGradient} from 'react-native-gradients';
import RunningTimer from './RunningTimer';
import {Row, Column as Col, Grid} from 'react-native-responsive-grid';
import ProgressCircle from 'react-native-progress-circle';
import {useNavigation} from '@react-navigation/native';

const WalkingTimerMilestone = () => {
  const navigation = useNavigation();
  const colorList = [
    {offset: '0%', color: '#5D6AFC', opacity: '1'},
    {offset: '100%', color: '#C069E5', opacity: '1'},
  ];

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];
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
                  <ProgressCircle
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
                  </ProgressCircle>
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Bold,
                      fontSize: 18,
                      color: '#C068E5',
                      paddingTop: 4,
                    }}>
                    <Text>1.6k</Text>
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
                  <ProgressCircle
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
                  </ProgressCircle>
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
                  <ProgressCircle
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
                  </ProgressCircle>
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Bold,
                      fontSize: 18,
                      color: '#C068E5',
                      paddingTop: 4,
                    }}>
                    <Text>03min</Text>
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
              <Text
                style={[
                  styles.titlemins,
                  {
                    color: 'rgba(59, 38, 69, 0.3)',
                    fontSize: 40,
                    fontFamily: Fonts.Poppins_Bold,
                  },
                ]}>
                {' '}
                00:
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Bold,
                  fontSize: 40,
                }}
                locations={[0, 1]}
                colors={['#BD68E6', '#5D6AFC']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}>
                <Text>03:19</Text>
              </Text>
            </View>

            <View
              style={{
                width: '100%',
              }}>
              <Row>
                <Col size={20}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/pause.png')}
                    style={{
                      width: 60,
                      height: 60,
                    }}
                  />
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
