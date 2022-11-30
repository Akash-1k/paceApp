import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
} from 'react-native';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';
import ProgressCircle from 'react-native-progress-circle';
import {LinearGradient} from 'react-native-gradients';
import {useNavigation} from '@react-navigation/native';
import Fonts from '../constants/Fonts';
import Config from '../constants/Config';
import {connect} from 'react-redux';
import Loader from '../common/Loader';

const DoubleYourCoins = props => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const props1 = {
    radius: 35,
    activeStrokeWidth: 6,
    inActiveStrokeWidth: 6,
    inActiveStrokeColor: '#F2F5F8',
    activeStrokeColor: '#5D6AFC',
    activeStrokeSecondaryColor: '#C068E5',
  };

  useEffect(() => {
    getMilestone();
  }, []);

  const getMilestone = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(Config.BASE_URL + Config.get_milestone, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        setData(result.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);
      });
  };
  const navigation = useNavigation();
  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  const Milestone = ({item}) => {
    console.log('aa', item);
    return (
      <View
        style={[
          styles.boxbor,
          item.running_status == null || item.running_status == 'in-progress'
            ? styles.boxbor1
            : {},
        ]}>
        <View style={styles.relative}>
          <CircularProgressBase {...props1} value={50}>
            <View style={styles.flexprog}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/run1.png')}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </View>
          </CircularProgressBase>
        </View>
        <View style={{paddingLeft: 16}}>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Bold,
              fontSize: 20,
              lineHeight: 25,
              color: '#C068E5',
            }}>
            <Text> {item.title}</Text>
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Regular,
              color: '#3B2645',
            }}>
            Total Distance :
            <Text
              style={{
                fontWeight: '600',
                color: '#3B2645AA',
                // opacity: 0.8,
                fontFamily: Fonts.Poppins_Bold,
              }}>
              {' '}
              {item.distance}
              {''} km
            </Text>
          </Text>
        </View>
        {item.running_status == 'completed' && (
          <TouchableOpacity style={[styles.nbtn]}>
            <Image
              resizeMode="contain"
              source={require('../../assets/images/completed.png')}
              style={{
                width: 15,
                height: 15,
              }}
            />
            <Text
              style={{
                fontFamily: Fonts.Poppins_Bold,
                color: '#62516A',
                fontSize: 12,
                paddingLeft: 6,
              }}>
              Completed
            </Text>
          </TouchableOpacity>
        )}
        {item.running_status == null && (
          <View style={styles.nbtn1}>
            <TouchableOpacity
              onPress={() => navigation.navigate('WalkingTimerMilestone')}
              style={styles.button}>
              <LinearGradient colorList={colorList1} angle={200} />
              <Text style={styles.text}>Start Streak</Text>
            </TouchableOpacity>
          </View>
        )}
        {item.running_status == 'in-progress' && (
          <View style={styles.nbtn1}>
            <TouchableOpacity
              onPress={() => navigation.navigate('WalkingTimerMilestone')}
              style={styles.button}>
              <LinearGradient colorList={colorList1} angle={200} />
              <Text style={styles.text}>Resume Streak</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainbg}>
      <ScrollView>
        <View style={styles.detailbox}>
          <View style={styles.radius}>
            <ImageBackground
              source={require('../../assets/images/coinsbg.png')}
              style={styles.walletbg}>
              <View
                style={{
                  width: 270,
                  height: 270,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 500,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 210,
                    height: 210,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: 500,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 140,
                      height: 140,
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderRadius: 500,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/runner.png')}
                      style={{
                        width: 180,
                        height: 180,
                      }}
                    />
                  </View>
                </View>
              </View>

              <View style={{marginTop: 15}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 0,
                  }}>
                  <Text
                    style={[
                      styles.titlemins,
                      {
                        color: '#fff',
                        fontSize: 21,
                        fontFamily: Fonts.Poppins_Bold,

                        textAlign: 'center',
                      },
                    ]}>
                    How this works
                  </Text>
                </View>

                <Text
                  style={[
                    styles.titlemins,
                    {
                      color: '#fff',
                      fontSize: 14,
                      fontFamily: Fonts.Poppins_Regular,
                      textAlign: 'center',
                    },
                  ]}>
                  Running <Text style={{fontWeight: '600'}}>3 times</Text> in a
                  week
                </Text>
                <Text
                  style={[
                    styles.titlemins,
                    {
                      color: '#fff',
                      fontSize: 14,
                      fontFamily: Fonts.Poppins_Regular,
                      textAlign: 'center',
                    },
                  ]}>
                  Continue for <Text style={{fontWeight: '600'}}>3 times</Text>{' '}
                  in a row
                </Text>
                <Text
                  style={[
                    styles.titlemins,
                    {
                      color: '#fff',
                      fontSize: 14,
                      fontFamily: Fonts.Poppins_Regular,
                      textAlign: 'center',
                    },
                  ]}>
                  Run atleast <Text style={{fontWeight: '600'}}>1 time</Text> in
                  a week
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.container}>
            <FlatList
              data={data}
              renderItem={({item, index}) => <Milestone item={item} />}
              keyExtractor={item => item.id}
            />
            {/* <View style={[styles.boxbor, styles.boxbor1]}>
              <View style={styles.relative}>
                <ProgressCircle
                  percent={100}
                  radius={35}
                  borderWidth={5}
                  color="#C068E5"
                  shadowColor="#F2F5F8"
                  bgColor="#fff">
                  <View style={styles.flexprog}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/run1.png')}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </View>
                </ProgressCircle>
              </View>
              <View style={{paddingLeft: 16}}>
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Bold,
                    fontSize: 20,
                    lineHeight: 25,
                    color: '#C068E5',
                  }}>
                  <Text>Milestone 2</Text>
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Regular,
                    color: '#3B2645',
                  }}>
                  Total Distance :
                  <Text
                    style={{
                      fontWeight: '600',
                      color: '#3B2645',
                      opacity: 0.8,
                      fontFamily: Fonts.Poppins_Bold,
                    }}>
                    {''} 10 km
                  </Text>
                </Text>
              </View>
              <View style={styles.nbtn1}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('WalkingTimerMilestone')}
                  style={styles.button}>
                  <LinearGradient colorList={colorList1} angle={200} />
                  <Text style={styles.text}>Start Streak</Text>
                </TouchableOpacity>
              </View>
            </View> */}
          </View>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Regular,
              textAlign: 'center',
              fontSize: 12,
              color: '#62516A',
              opacity: 0.7,
              marginTop: 20,
            }}>
            Completing this streak will earn you double.
          </Text>
        </View>
      </ScrollView>
      <Loader loading={isLoading} transparent={false} />
    </SafeAreaView>
  );
};
const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DoubleYourCoins);

const styles = StyleSheet.create({
  radius: {
    overflow: 'hidden',
    height: 550,
  },
  walletbg: {
    height: 800,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 50,
  },
  detailbox: {
    position: 'relative',
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 15,
    marginTop: -100,
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 13,
  },
  startbtn: {
    backgroundColor: '#F6F0FD',
    padding: 7,
    width: 100,
    height: 33,
    borderRadius: 22,
  },
  btntext: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    color: '#3B2645',
  },
  btntext1: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
    color: '#3B2645',
  },
  flexcenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#B668E7',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  headflex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 16,
    color: '#1D1617',
    marginBottom: 8,
  },
  stitle: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#7B6F72',
    fontSize: 12,
  },
  btnn: {
    borderWidth: 1,
    borderColor: '#B668E7',
    padding: 11,
    borderRadius: 6,
  },
  boxbor1: {
    borderColor: '#fff',
  },
  boxbor: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    paddingVertical: 20,
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 45,
    borderColor: '#C068E5',
    borderWidth: 1,
  },
  mainbg: {
    backgroundColor: '#fff',
    flex: 1,
  },
  relative: {
    position: 'relative',
    zIndex: 1,
  },
  flexprog: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nbtn: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    padding: 12,
    paddingHorizontal: 22,
    borderRadius: 1000,
    borderColor: '#C068E5',
    position: 'absolute',
    left: 100,
    bottom: -25,
    width: '50%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nbtn1: {
    borderColor: '#C068E5',
    position: 'absolute',
    left: 100,
    bottom: -25,
    width: '50%',
  },
  button: {
    position: 'relative',
    height: 48,
    borderRadius: 1000,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    zIndex: 1,
    fontFamily: Fonts.Poppins_Bold,
    color: '#fff',
    fontSize: 12,
  },
});
