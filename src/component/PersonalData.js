import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  Pressable,
  Button,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {LinearGradient} from 'react-native-gradients';
import {connect} from 'react-redux';
import {personalDataRequest} from '../modules/Profile/actions';
import Fonts from '../constants/Fonts';
import Modal from 'react-native-modal';
import CalendarPicker from 'react-native-calendar-picker';
import {showAlert} from '../utils/CommonFunctions';
import Loader from '../common/Loader';

const PersonalData = props => {
  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  const monthArray = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const [dob, setDob] = useState('');
  const [cweight, setCweight] = useState('');
  const [yweight, setYweight] = useState('');
  const [gweight, setGweight] = useState('');
  const [hours, setHours] = useState('');
  const [isLoading, setLoader] = useState(false);

  const [dobMsg, setDobMsg] = useState('');
  const [cweightMsg, setCweightMsg] = useState('');
  const [yweightMsg, setYweightMsg] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  let dobA = [];

  useEffect(() => {
    if (props.userDetails?.user?.dob) {
      dobA = props.userDetails?.user?.dob.split('-');
      setDob(
        props.userDetails?.user?.dob == null
          ? ''
          : `${dobA[2]} ${monthArray[parseInt(dobA[1])]} ${dobA[0]}`,
      );
    }
    setCweight(
      props.userDetails?.user?.current_weight == null
        ? ''
        : props.userDetails?.user?.current_weight,
    );
    setGweight(
      props.userDetails?.user?.goal_weight == null
        ? ''
        : props.userDetails?.user?.goal_weight,
    );
    setYweight(
      props.userDetails?.user?.height == null
        ? ''
        : props.userDetails?.user?.height,
    );
    setHours(
      props.userDetails?.user?.sleep_per_night_hours == null
        ? 1
        : props.userDetails?.user?.sleep_per_night_hours,
    );
  }, []);

  const onPressMinus = () => {
    setHours(parseInt(hours) - 1);
  };

  const onPressPlus = () => {
    setHours(parseInt(hours) + 1);
  };

  const onSave = () => {
    var dobValid = false;
    var cweightValid = false;
    var yweightValid = false;

    if (dob == '') {
      dobValid = true;
    }
    if (cweight == '') {
      cweightValid = true;
    }
    if (yweight == '') {
      yweightValid = true;
    }

    if (dobValid) {
      setDobMsg('Please select DOB');
      dobValid = true;
    } else {
      setDobMsg('');
    }

    if (cweightValid) {
      setCweightMsg('Please Enter weight');
      cweightValid = true;
    } else {
      setCweightMsg('');
    }

    if (yweightValid) {
      setYweightMsg('Please Enter height');
      yweightValid = true;
    } else {
      setYweightMsg('');
    }

    if (dobValid || cweightValid || yweightValid) {
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var formdata = new FormData();

    const dobArr = dob.split(' ');

    formdata.append(
      'dob',
      `${dobArr[2]}-${monthArray.indexOf(dobArr[1]) + 1}-${dobArr[0]}`,
    );
    formdata.append('current_weight', cweight);
    formdata.append('goal_weight', gweight);
    formdata.append('your_height', yweight);
    formdata.append('sleep_per_night_hours', hours);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setLoader(true);
    fetch(
      'https://dev.indiit.solutions/pace/public/api/personal-data',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result.status == 1) {
          showAlert('Personal data added successfully!');
          props.personalDataRequest(props.loginData.token);
          props.navigation.navigate('TabFour');
          setLoader(false);
        } else {
          showAlert(result.msg);
          setLoader(false);
        }
      })
      .catch(error => console.log('error', error));
  };

  const onTokenExpire = () => {
    props.navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.relative}>
      <ScrollView style={styles.relative}>
        <View style={styles.container}>
          <Pressable
            onPress={() => toggleModal()}
            style={styles.inputconatiner}>
            <Text style={styles.labelname}>DOB</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 80}]}
              disabled
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={dob}
              onChangeText={setDob}
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
          </Pressable>
          {dobMsg != '' ? <Text style={styles.onAlert}>{dobMsg}</Text> : null}

          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Current Weight (kg)</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 80}]}
              underlineColor={'transparent'}
              keyboardType="numeric"
              selectionColor="#3B2645"
              value={cweight}
              onChangeText={setCweight}
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
          {cweightMsg != '' ? (
            <Text style={styles.onAlert}>{cweightMsg}</Text>
          ) : null}

          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Goal Weight (kg)</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 80}]}
              keyboardType="numeric"
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={gweight}
              onChangeText={setGweight}
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

          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Your Height (cm)</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 80}]}
              keyboardType="numeric"
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={yweight}
              onChangeText={setYweight}
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
          {yweightMsg != '' ? (
            <Text style={styles.onAlert}>{yweightMsg}</Text>
          ) : null}

          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Hours of sleep per night</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 80}]}
              underlineColor={'transparent'}
              disabled
              keyboardType="numeric"
              selectionColor="#3B2645"
            />
          </View>

          <View style={styles.counterContainer}>
            <TouchableOpacity
              onPress={onPressMinus}
              disabled={hours == 1}
              style={[
                styles.touchable,
                styles.buttonStyle,
                {opacity: hours == 1 ? 0.2 : 1},
              ]}>
              <Text
                style={{
                  color: hours >= 4 == 1 ? '#000' : '#3B2645',
                  fontSize: 18,
                }}>
                -
              </Text>
            </TouchableOpacity>
            <View style={styles.count}>
              <Text style={styles.countTextStyle}>{hours}</Text>
            </View>
            <TouchableOpacity
              onPress={onPressPlus}
              disabled={hours >= 12}
              style={[
                styles.touchable,
                styles.buttonStyle,
                {opacity: hours >= 12 == 1 ? 0.2 : 1},
              ]}>
              <Text
                style={{
                  color: hours >= 12 == 1 ? '#000' : '#3B2645',
                  fontSize: 18,
                }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          onSave();
        }}
        style={styles.button}>
        <LinearGradient
          style={styles.granew}
          colorList={colorList1}
          angle={200}></LinearGradient>
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        animationIn="pulse"
        animationInTiming={700}>
        <View style={styles.modalview}>
          <CalendarPicker
            // initialDate={'1998-01-18'}
            // selectedStartDate={'1998-01-18'}
            initialDate={
              props.userDetails?.user?.dob
                ? new Date(props.userDetails?.user?.dob)
                : new Date()
            }
            selectedStartDate={
              props.userDetails?.user?.dob
                ? new Date(props.userDetails?.user?.dob)
                : new Date()
            }
            width={370}
            showDayStragglers
            selectedDay
            selectedDayColor="#222"
            selectedDayTextColor="#FFF"
            todayBackgroundColor="#67a"
            onDateChange={currentDate => {
              setDob(
                `${currentDate.date()} ${
                  monthArray[currentDate.month()]
                } ${currentDate.year()}`,
              );
              toggleModal();
            }}
          />
        </View>
      </Modal>
      <Loader loading={isLoading} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
  personalData: state.profileReducer.personalData,
});

const mapDispatchToProps = dispatch => ({
  personalDataRequest: data => dispatch(personalDataRequest(data)),
  userDetailsRequest: data => dispatch(userDetailsRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalData);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 18,
  },
  onAlert: {
    opacity: 0.5,
    fontSize: 14,
    fontFamily: Fonts.Poppins_Regular,
    color: 'red',
    top: -10,
  },

  relative: {
    position: 'relative',
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  labelname: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#7B6F72',
    fontSize: 12,
    position: 'absolute',
    zIndex: 2,
    top: 17,
    left: 20,
  },
  label: {
    fontFamily: Fonts.Poppins_SemiBold,
    color: '#1D1617',
    fontSize: 12,
    marginBottom: 10,
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
    textAlign: 'right',
  },
  button: {
    position: 'relative',
    height: 60,
    borderRadius: 1000,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
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
  modalview: {
    backgroundColor: '#fff',
    borderRadius: 26,
    padding: 26,
    paddingHorizontal: 20,
    paddingTop: 25,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossbtn: {
    alignSelf: 'flex-end',
    bottom: 8,
  },
  touchable: {
    minWidth: 20,
    minHeight: 20,
    borderWidth: 1,
    borderColor: '#27AAE1',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bottom: 53,
  },
  count: {
    borderWidth: 1,
    height: 23,
    borderColor: '#B668E7',
    borderRadius: 12,
    // width: 250,
    marginHorizontal: 10,
    minWidth: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#F9F6FE',
    borderColor: '#F9F6FE',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  countTextStyle: {
    color: '#3B2645',
    textAlign: 'center',
    fontSize: 16,
  },
});
