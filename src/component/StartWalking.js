import React, {useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import {LinearGradient} from 'react-native-gradients';
import {useNavigation} from '@react-navigation/native';
import {Row, Column as Col, Grid} from 'react-native-responsive-grid';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../common/Loader';
import {connect} from 'react-redux';
import {
  WheelPicker,
  TimePicker,
  DatePicker,
} from 'react-native-wheel-picker-android';
import Modal from 'react-native-modal';
import Fonts from '../constants/Fonts';

const StartWalking = props => {
  const navigation = useNavigation();
  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  const [isLoading, setIsLoading] = useState(false);

  const wheelPickerData = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
  ];

  const [isModalVisible, setModalVisible] = useState(false);
  const [isDistanceUnitVisible, setDistanceUnitVisible] = useState(false);
  const [steps, setSteps] = useState('6500');
  const [distance, setDistance] = useState('5.0');
  const [distanceUnit, setDistanceUnit] = useState('Km');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const changeUnit = value => {
    if (distanceUnit == 'Km') {
      let v = value * 0.62;
      setDistance(String(v.toFixed(1)));
    }
    if (distanceUnit == 'Miles') {
      let v = value / 0.62;
      setDistance(String(v.toFixed(1)));
    }
  };

  const [selectedItem, setItems] = useState(0);

  const onItemSelected = selectedItem => {
    setItems(selectedItem);
  };

  const onPress = () => {
    setItems(selectedItem);
  };

  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

  const colorList = [
    {offset: '0%', color: '#5D6AFC', opacity: '1'},
    {offset: '100%', color: '#C069E5', opacity: '1'},
  ];
  return (
    <>
      <SafeAreaView style={styles.relative}>
        <ScrollView style={styles.relative}>
          <View style={styles.container}>
            <View style={styles.startimg}>
              <Image
                resizeMode="cover"
                source={require('../../assets/images/startbg.png')}
                style={{
                  width: 243,
                  height: 355,
                }}
              />
            </View>
            <View style={styles.box}>
              <View style={styles.boxFlex}>
                {/* <Image
                    resizeMode="contain"
                    source={require('../../assets/images/walk1.png')}
                    style={{
                      width: 200,
                      height: 200,
                    }}
                  /> */}
                <View
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                    backgroundColor: '#FFF',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -70,
                  }}>
                  <View
                    style={{
                      width: 185,
                      height: 185,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: 'rgba(192,104,229,0.1)',
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 170,
                        height: 170,
                        borderRadius: 100,
                        borderWidth: 1,
                        borderColor: 'rgba(192,104,229,0.3)',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: 155,
                          height: 155,
                          borderRadius: 100,
                          borderWidth: 1,
                          borderColor: 'rgba(192,104,229,0.5)',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity onPress={toggleModal}>
                          <View
                            style={{
                              width: 142,
                              height: 142,
                              borderRadius: 100,
                              backgroundColor: 'rgba(192,104,229,1)',
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
                                color: '#FFF',
                                fontFamily: Fonts.Poppins_Bold,
                                fontSize: 22,
                                textAlign: 'center',
                              }}>
                              Start Walking
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                {/* <WheelPicker
                  selectedItem={selectedItem}
                  data={wheelPickerData}
                  onItemSelected={onItemSelected}
                /> */}
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Regular,
                    color: '#8F8893',
                    lineHeight: 30,
                  }}>
                  Total Steps:{' '}
                  <Text
                    style={{fontFamily: Fonts.Poppins_Bold, color: '#3B2645'}}>
                    80,547
                  </Text>
                </Text>
              </View>
              <Row>
                <Col size={32}>
                  <View style={styles.items}>
                    <Text
                      style={{
                        fontFamily: Fonts.Poppins_Bold,
                        fontSize: 16,
                        color: '#C068E5',
                      }}>
                      <Text>
                        3.5<Text style={{fontSize: 13}}>km</Text>
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
                      Total Distance
                    </Text>
                  </View>
                </Col>
                <Col size={32} offset={2}>
                  <View style={styles.items}>
                    <Text
                      style={{
                        fontFamily: Fonts.Poppins_Bold,
                        fontSize: 16,
                        color: '#C068E5',
                      }}>
                      <Text>00:23:00</Text>
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
                <Col size={32} offset={2}>
                  <View style={styles.items}>
                    <Text
                      style={{
                        fontFamily: Fonts.Poppins_Bold,
                        fontSize: 16,
                        color: '#C068E5',
                      }}>
                      <Text>118</Text>
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
              </Row>
              <Row style={{marginVertical: 7, marginBottom: 14}}>
                <Col size={32}>
                  <View style={styles.items}>
                    <Text
                      style={{
                        fontFamily: Fonts.Poppins_Bold,
                        fontSize: 16,
                        color: '#C068E5',
                      }}>
                      <Text>91,361Steps</Text>
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
                      Best Streak
                    </Text>
                  </View>
                </Col>
                <Col size={32} offset={2}>
                  <View style={styles.items}>
                    <Text
                      style={{
                        fontFamily: Fonts.Poppins_Bold,
                        fontSize: 16,
                        color: '#C068E5',
                      }}>
                      <Text>
                        1,715.5<Text style={{fontSize: 13}}>/hr</Text>
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
                      Avg Pace
                    </Text>
                  </View>
                </Col>
                <Col size={32} offset={2}>
                  <View style={styles.items}>
                    <Text
                      style={{
                        fontFamily: Fonts.Poppins_Bold,
                        fontSize: 16,
                        color: '#C068E5',
                      }}>
                      <Text>4 km</Text>
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
                      Daily Avg Run
                    </Text>
                  </View>
                </Col>
              </Row>

              <Text style={styles.sText}>Recent Activity</Text>

              <View style={[styles.card, {marginTop: 9}]}>
                <View style={styles.cardheader}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/calender.png')}
                      style={{
                        width: 12,
                        height: 12,
                      }}
                    />
                    <Text style={styles.carddate}>Date</Text>
                  </View>

                  <Text
                    style={[
                      styles.sText,
                      {
                        fontSize: 10,
                      },
                    ]}>
                    {yesterday.toDateString()}
                  </Text>
                </View>
                <View style={{padding: 15}}>
                  <Row>
                    <Col size={25}>
                      <View style={styles.cardflex}>
                        <Image
                          resizeMode="contain"
                          source={require('../../assets/images/steps.png')}
                          style={{
                            width: 20,
                            height: 15,
                            marginBottom: 6,
                          }}
                        />
                        <Text style={styles.cardbText}>3,431</Text>
                        <Text style={styles.cardbText1}>Steps</Text>
                      </View>
                    </Col>

                    <Col size={25}>
                      <View style={styles.cardflex}>
                        <Image
                          resizeMode="contain"
                          source={require('../../assets/images/sicon1.png')}
                          style={{
                            width: 20,
                            height: 15,
                            marginBottom: 6,
                          }}
                        />
                        <Text style={styles.cardbText}>1.6km</Text>
                        <Text style={styles.cardbText1}>Distance</Text>
                      </View>
                    </Col>

                    <Col size={25}>
                      <View style={styles.cardflex}>
                        <Image
                          resizeMode="contain"
                          source={require('../../assets/images/sicon.png')}
                          style={{
                            width: 20,
                            height: 15,
                            marginBottom: 6,
                          }}
                        />
                        <Text style={styles.cardbText}>110kcal</Text>
                        <Text style={styles.cardbText1}>Calories</Text>
                      </View>
                    </Col>

                    <Col size={25}>
                      <View style={styles.cardflex}>
                        <Image
                          resizeMode="contain"
                          source={require('../../assets/images/sicon.png')}
                          style={{
                            width: 20,
                            height: 15,
                            marginBottom: 6,
                          }}
                        />
                        <Text style={styles.cardbText}>03min</Text>
                        <Text style={styles.cardbText1}>Time</Text>
                      </View>
                    </Col>
                  </Row>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.gradient}>
            <LinearGradient colorList={colorList} angle={360} />
          </View>
        </ScrollView>
      </SafeAreaView>
      <Modal
        isVisible={isDistanceUnitVisible}
        onBackdropPress={() => {
          setDistanceUnitVisible(false);
        }}
        backdropOpacity={0}
        animationIn="fadeIn"
        animationOut="fadeOut"
        style={{
          top: 258,
          left: 127,
        }}>
        <View
          style={{
            backgroundColor: 'rgb(0, 0, 0)',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            width: '17%',
            height: 75,
            borderRadius: 5,
          }}>
          <Text
            onPress={() => {
              setDistanceUnitVisible(!isDistanceUnitVisible);
              setDistanceUnit('Km');
              if (distanceUnit == 'Miles') {
                changeUnit(distance);
              }
            }}
            style={{
              color: '#F7F8F8',
              fontSize: 16,
              marginBottom: 3,
              padding: 5,
            }}>
            Km
          </Text>
          <View
            style={{
              borderWidth: 1,
              width: '90%',
              height: 1,
              borderColor: '#fff',
              backgroundColor: '#fff',
            }}
          />
          <Text
            onPress={() => {
              setDistanceUnitVisible(!isDistanceUnitVisible);
              setDistanceUnit('Miles');
              if (distanceUnit == 'Km') {
                changeUnit(distance);
              }
            }}
            style={{
              color: '#F7F8F8',
              fontSize: 16,
              marginBottom: 2,
              padding: 5,
            }}>
            Miles
          </Text>
        </View>
      </Modal>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          toggleModal();
        }}
        animationIn="pulse"
        animationInTiming={700}
        style={{
          margin: 0,
          marginVertical: 0,
          marginHorizontal: 0,
          padding: 0,
          bottom: 0,
        }}>
        <View style={styles.modalview}>
          <View style={styles.modalContainer}>
            <Text style={styles.targetText}>Set Target</Text>
            <View style={styles.inputconatiner}>
              <Text style={styles.labelname}>Distance</Text>
              <TextInput
                style={[styles.input, {paddingRight: 85}]}
                underlineColor={'transparent'}
                selectionColor="#3B2645"
                value={distance}
                keyboardType={'numeric'}
                onChangeText={dist => {
                  setDistance(dist);
                  if (distanceUnit == 'Km') {
                    setSteps(String(Math.round(dist * 1300)));
                  }
                  if (distanceUnit == 'Miles') {
                    setSteps(String(Math.round((dist / 0.62) * 1300)));
                  }
                }}
                theme={{
                  colors: {
                    primary: '#F7F8F8',
                    text: '#3B2645',
                  },
                  fonts: {
                    regular: {
                      fontFamily: Fonts.Poppins_Regular,
                    },
                  },
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  zIndex: 2,
                  top: 16,
                  left: '78%',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    width: 0.1,
                    height: 24,
                    borderColor: '#C4C4C4',
                    backgroundColor: '#C4C4C4',
                    marginRight: 8,
                  }}
                />
                <Text
                  style={{
                    color: '#9A909F',
                    fontSize: 14,
                  }}>
                  {distanceUnit}
                </Text>
                <Ionicons
                  onPress={() => setDistanceUnitVisible(true)}
                  name="chevron-back"
                  size={20}
                  color="#9A909F"
                  style={{
                    transform: [{rotate: '270deg'}],
                    position: 'absolute',
                    zIndex: 2,
                    left: 42,
                  }}
                />
              </View>
            </View>
            <View style={[styles.inputconatiner, {marginBottom: 30}]}>
              <Text style={styles.labelname}>Steps</Text>
              <TextInput
                style={[styles.input, {paddingRight: 15}]}
                underlineColor={'transparent'}
                keyboardType={'numeric'}
                editable={false}
                selectionColor="#3B2645"
                value={steps}
                onChangeText={setSteps}
                theme={{
                  colors: {
                    primary: '#F7F8F8',
                    text: '#3B2645',
                  },
                  fonts: {
                    regular: {
                      fontFamily: Fonts.Poppins_Regular,
                    },
                  },
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                // toggleModal();
                console.log(
                  `distance - ${distance} distanceUnit - ${
                    distanceUnit == 'Km' ? '1' : '2'
                  } steps - ${steps}, today - ${today}`,
                );
                var myHeaders = new Headers();
                myHeaders.append(
                  'Authorization',
                  `Bearer ${props.loginData.token}`,
                );

                var formdata = new FormData();
                formdata.append('distance', String(distance));
                formdata.append(
                  'distance_in',
                  distanceUnit == 'Km' ? '1' : '2',
                );
                formdata.append('steps', String(steps));
                formdata.append('created_at', String(today));

                var requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: formdata,
                  redirect: 'follow',
                };
                setIsLoading(true);
                fetch(
                  'https://dev.indiit.solutions/pace/public/api/step-process',
                  requestOptions,
                )
                  .then(response => response.json())
                  .then(result => {
                    console.log(result);
                    if (result.status == 1) {
                      navigation.navigate('BeReadyCountDownWalking', {
                        id: result.id,
                      });
                    }
                    setIsLoading(false);
                  })
                  .catch(error => console.log('error', error));
              }}
              style={styles.button}>
              <LinearGradient
                style={styles.granew}
                colorList={colorList1}
                angle={200}></LinearGradient>
              <Text style={styles.text}>Start Walking</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Loader loading={isLoading} />
    </>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StartWalking);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
    paddingTop: 15,
  },
  relative: {
    position: 'relative',
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  gradient: {
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  startimg: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 15,
  },
  box: {
    position: 'relative',
    backgroundColor: '#fff',
    flex: 1,
    marginTop: -100,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    padding: 18,
  },
  boxFlex: {
    display: 'flex',
    alignItems: 'center',
  },
  titlecal: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 16,
    color: '#fff',
    opacity: 1,
    marginVertical: 8,
    marginBottom: 4,
  },
  titlemins: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: 12,
    color: '#fff',
    opacity: 0.7,
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F8F8',
    borderRadius: 14,
    padding: 10,
  },
  sText: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 16,
    color: '#3B2645',
  },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
  },
  cardheader: {
    backgroundColor: '#F7F8F8',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  carddate: {
    opacity: 0.5,
    color: '#000000',
    fontFamily: Fonts.Poppins_Medium,
    fontSize: 10,
    paddingRight: 4,
    paddingLeft: 4,
  },
  cardflex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardbText: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 12,
    color: '#3B2645',
    lineHeight: 20,
  },
  cardbText1: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 10,
    color: '#3B2645',
    opacity: 0.66,
    position: 'relative',
    top: -5,
  },
  modalview: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalContainer: {
    width: '92%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 355,
    padding: 18,
    backgroundColor: '#fff',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },
  targetText: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 24,
    marginBottom: 40,
    alignSelf: 'center',
  },
  crossbtn: {
    position: 'absolute',
    top: 25,
    left: 25,
  },
  inputconatiner: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
  },
  input: {
    height: 54,
    backgroundColor: '#F7F8F8',
    fontSize: 14,
    color: '#3B2645',
    width: '100%',
    textAlign: 'right',
  },
  labelname: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#7B6F72',
    opacity: 0.6,
    fontSize: 14,
    position: 'absolute',
    zIndex: 2,
    top: 17,
    left: 20,
  },
  button: {
    position: 'relative',
    height: 60,
    borderRadius: 1000,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  text: {
    position: 'absolute',
    zIndex: 1,
    fontFamily: Fonts.Poppins_Bold,
    color: '#fff',
    fontSize: 16,
    zIndex: 3,
  },
  granew: {
    flex: 1,
    flexGrow: 1,
  },
});
