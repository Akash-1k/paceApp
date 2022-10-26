import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {LinearGradient} from 'react-native-gradients';
import {useNavigation} from '@react-navigation/native';
import {Row, Column as Col, Grid} from 'react-native-responsive-grid';
import {
  WheelPicker,
  TimePicker,
  DatePicker,
} from 'react-native-wheel-picker-android';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import Fonts from '../constants/Fonts';

const StartRunning = () => {
  const navigation = useNavigation();

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  const wheelPickerData = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
  ];

  const minutes = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
  ];

  const hours = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  const [isModalVisible, setModalVisible] = useState(false);
  const [steps, setSteps] = useState('6500');
  const [distance, setDistance] = useState('5.0');
  const [distanceUnit, setDistanceUnit] = useState('Km');
  const [isDistanceUnitVisible, setDistanceUnitVisible] = useState(false);

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

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const colorList = [
    {offset: '0%', color: '#5D6AFC', opacity: '1'},
    {offset: '100%', color: '#C069E5', opacity: '1'},
  ];

  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

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
                <TouchableOpacity
                  onPress={toggleModal}
                  style={{
                    marginTop: -70,
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/start.png')}
                    style={{
                      width: 200,
                      height: 200,
                    }}
                  />
                </TouchableOpacity>
                {/* <WheelPicker
                  selectedItem={selectedItem}
                  data={wheelPickerData}
                  onItemSelected={onItemSelected}
                /> */}
              </View>
              <Row>
                <Col size={32}>
                  <View style={styles.items}>
                    <Text
                      style={{
                        fontFamily: Fonts.Poppins_Bold,
                        fontSize: 18,
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
                        fontSize: 18,
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
                        fontSize: 18,
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
                        fontSize: 18,
                        color: '#C068E5',
                      }}>
                      <Text>5,000</Text>
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
                      Longest Run
                    </Text>
                  </View>
                </Col>
                <Col size={32} offset={2}>
                  <View style={styles.items}>
                    <Text
                      style={{
                        fontFamily: Fonts.Poppins_Bold,
                        fontSize: 18,
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
                        fontSize: 18,
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
                          source={require('../../assets/images/sicon.png')}
                          style={{
                            width: 20,
                            height: 15,
                            marginBottom: 6,
                          }}
                        />
                        <Text style={styles.cardbText}>3,431/hr</Text>
                        <Text style={styles.cardbText1}>Avg Pace</Text>
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
          top: 150,
          right: 25,
        }}>
        <View
          style={{
            backgroundColor: 'rgb(0, 0, 0)',
            alignItems: 'center',
            alignSelf: 'flex-end',
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
          setModalVisible(false);
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
            <Text style={styles.targetText}>{'Choose Time & Distance'}</Text>
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
            <View
              style={{
                width: '50%',
                height: 200,
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <TimePicker
                format24
                minutes={minutes}
                hours={hours}
                onTimeSelected={t => {
                  console.log(t.getHours(), t.getMinutes());
                }}
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('BeReadyCountDown', {
                  nextScreen: 'WalkingTimer',
                });
              }}
              style={styles.button}>
              <LinearGradient
                style={styles.granew}
                colorList={colorList1}
                angle={200}
              />
              <Text style={styles.text}>Start Running</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default StartRunning;

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
    fontSize: 18,
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
    position: 'relative',
  },
  crossbtn: {
    position: 'absolute',
    top: 25,
    left: 25,
  },
  modalContainer: {
    width: '92%',
    alignSelf: 'center',
    justifyContent: 'center',
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
    paddingHorizontal: 10,
    paddingTop: 20,
    alignSelf: 'center',
    textAlign: 'center',
    width: '70%',
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
