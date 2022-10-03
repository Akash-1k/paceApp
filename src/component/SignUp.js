import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'react-native-gradients';
import { BarIndicator } from 'react-native-indicators';
import Modal from "react-native-modal";
import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Colors from '../constants/Colors';
import Config from '../constants/Config';
import Fonts from '../constants/Fonts';
import { BASE_URL } from '../env';
import { signupRequest, signupSuccess } from '../modules/Signup/actions';

const SignUp = (props) => {

  const navigation = useNavigation();

  const colorList = [
    { offset: '0%', color: '#C068E5', opacity: '0.9' },
    { offset: '100%', color: '#5D6AFC', opacity: '0.9' },
  ];

  const colorList1 = [
    { offset: '0%', color: '#C068E5', opacity: '1' },
    { offset: '100%', color: '#5D6AFC', opacity: '1' },
  ];

  const colorList2 = [
    { offset: '0%', color: '#C068E5', opacity: '1' },
    { offset: '100%', color: '#5D6AFC', opacity: '1' },
  ];

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [hidePass, setHidePass] = useState(true);
  const [first_name, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [govt_id, setGovtId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerifyingLoader, setIsVerifyingLoader] = useState(false);

  const [govtIdVerified, setGovtIdVerified] = useState({});

  const [isNameValid, setIsNameValid] = useState(false);
  const [isGovtId, setIsValidGovtId] = useState(false);
  const [govtIdMsg, setVerifiedMsg] = useState(false);

  const [isValidPass, setIsValidPass] = useState(false);
  const [isLoading, setLoading] = useState(false);



  const onVerify = () => {
    var formdata = new FormData();
    formdata.append("govt_id", govt_id);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    // console.log('govt_id',govt_id);654789321023
    setIsVerifyingLoader(true)
    // return
    fetch(BASE_URL + Config.verify_id, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 1) {
          setGovtIdVerified(result)
          setIsVerifying(true)
          setIsValidGovtId(false)
          setIsVerifyingLoader(false)

        } else {
          setIsVerifying(false)
          setIsVerifyingLoader(false)

          toggleModal()
        }
      })
      .catch(error => {
        setIsVerifyingLoader(false)
        console.log('error', error)
      });
  }


  const onPressSignUp = () => {

    if (first_name == '') {
      setIsNameValid(true)
      return
    }

    if (govt_id == '') {
      setVerifiedMsg('Please Enter Govt ID')
      setIsNameValid(false)
      setIsValidGovtId(true)
      return
    }

    if (isVerifying == false) {
      setVerifiedMsg('Please Verify Govt ID')
      setIsValidGovtId(true)
      return
    }

    if (password == '') {
      setIsValidGovtId(false)
      setIsValidPass(true)
      return
    }

    setIsValidGovtId(false)
    setIsNameValid(false)
    setIsValidPass(false)

    setLoading(true)
    var formdata = new FormData();
    formdata.append("first_name", first_name);
    formdata.append("password", password);
    formdata.append("govt_id", govt_id);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(Config.BASE_URL + Config.do_signup, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 2) {
          setVerifiedMsg(result.msg)
          setIsValidGovtId(true)
          setLoading(false)

        }
        if (result.status == 1) {
          console.log('signupSuccess result:::', result);
          props.signupSuccess(result)
          setLoading(false)

          // navigation.navigate('ContactSupport', { govt_id: govt_id })
          navigation.navigate('Pending')
        }
      })
      .catch(error => {
        setLoading(false)
        console.log('error', error)
      });
  }
  // console.log('signupSucessData::::', props.signupSucessData);

  return (
    <SafeAreaView style={styles.mainbg}>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={styles.conatiner}>
          <View style={styles.linearGradient1}>
            {/* Banner Background Image */}
            <Image
              resizeMode='cover'
              source={require('../../assets/images/logiinbg.png')}
              style={{
                width: '100%',
                height: 250
              }}
            />

            {/* Logo */}
            <Image
              resizeMode='cover'
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
            />
            <View style={styles.gradientBg}>
              <LinearGradient colorList={colorList} angle={-90} />
            </View>
          </View>

          {/* Shape */}
          <Image
            resizeMode='cover'
            source={require('../../assets/images/bottomshape.png')}
            style={{
              width: '100%',
              height: 125,
              marginTop: -55
            }}
          />

          <View style={styles.lgcontainer}>
            <Text
              style={styles.title}
            >
              Sign Up
            </Text>

            <Text
              style={[styles.subtitle, { marginBottom: 25 }]}
            >
              Signup To Your Account
            </Text>

            {isNameValid ?
              <Text style={[styles.subtitle, { color: 'red' }]} >
                {"Please enter name"}
              </Text>
              : null
            }

            <View
              style={styles.inputconatiner}
            >
              <TextInput
                onChangeText={(name) => setFirstName(name)}
                style={styles.input}
                underlineColor={'transparent'}
                selectionColor="#3B2645"
                placeholder='First Name'
                theme={{
                  colors: {
                    primary: '#F7F8F8',
                    text: '#3B2645'
                  },
                  fonts: {
                    regular: {
                      fontFamily: Fonts.Poppins_Regular
                    }
                  }
                }}
              />
              <Image
                resizeMode='contain'
                source={require('../../assets/images/user.png')}
                style={styles.icon}
              />

            </View>

            {isGovtId ?
              <Text style={[styles.subtitle, { color: 'red' }]} >
                {govtIdMsg}
              </Text>
              : null
            }


            <View
              style={styles.inputconatiner}
            >
              <TextInput
                onChangeText={(txt) => setGovtId(txt)}
                style={[styles.input, { paddingRight: 50 }]}
                underlineColor={'transparent'}
                selectionColor="#3B2645"
                placeholder='Govt ID'
                theme={{
                  colors: {
                    primary: '#F7F8F8',
                    text: '#3B2645'
                  },
                  fonts: {
                    regular: {
                      fontFamily: Fonts.Poppins_Regular
                    }
                  }
                }}
              />

              <TouchableOpacity
                onPress={onVerify}
                style={{
                  position: 'absolute',
                  right: 15,
                  top: 17
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Medium,
                    fontSize: 14,
                    color: "#C068E5"
                  }}
                >
                  {
                    isVerifying ?
                      <Text>
                        <Image
                          style={{ height: 15, width: 15, resizeMode: 'contain' }}
                          source={require('../../assets/images/Verifed.png')} />
                        {" | Verifed"}</Text>
                      : isVerifyingLoader ?
                        <ActivityIndicator size={'small'} color="#C068E5" />
                        :
                        <Text>| Verify</Text>
                  }

                </Text>
              </TouchableOpacity>

              <Image
                resizeMode='contain'
                source={require('../../assets/images/email.png')}
                style={styles.icon}
              />

            </View>

            {
              isVerifying ?
                <View
                  style={[styles.inputconatiner, { alignItems: 'center', paddingVertical: 15, backgroundColor: '#F2EDFF' }]}
                >
                  <Text style={[styles.textfooter]} >{govtIdVerified.msg}</Text>
                </View> : null
            }

            {isValidPass ?
              <Text style={[styles.subtitle, { color: 'red' }]} >
                {"Please Enter Password"}
              </Text>
              : null
            }

            <View
              style={styles.inputconatiner}
            >
              <TextInput
                onChangeText={(txt) => setPassword(txt)}
                style={styles.input}
                secureTextEntry={hidePass ? true : false}
                underlineColor={'transparent'}
                selectionColor="#3B2645"
                placeholder='Password'
                right={<TextInput.Icon onPress={() => setHidePass(!hidePass)} name={() =>
                  <Ionicons name={hidePass ? 'eye-off-outline' : 'eye-outline'} color="#ADA4A5" size={20} />} />}
                theme={{
                  colors: {
                    primary: '#F7F8F8',
                    text: '#3B2645'
                  },
                  fonts: {
                    regular: {
                      fontFamily: Fonts.Poppins_Regular
                    }
                  }
                }}
              />
              <Image
                resizeMode='contain'
                source={require('../../assets/images/lock.png')}
                style={styles.icon1}
              />

            </View>

            <TouchableOpacity
              // onPress={toggleModal}
              onPress={onPressSignUp}
              style={styles.button}>
              <LinearGradient colorList={colorList1} angle={200} />
              <Text style={styles.text}>Signup</Text>
            </TouchableOpacity>

            <Text style={styles.textfooter}>Or Signup With</Text>

            <View style={styles.flex}>
              <TouchableOpacity
                style={{ marginRight: 15 }}
              >
                <Image
                  resizeMode='contain'
                  source={require('../../assets/images/facebook.png')}
                  style={{
                    width: 45,
                    height: 45,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  resizeMode='contain'
                  source={require('../../assets/images/google.png')}
                  style={{
                    width: 45,
                    height: 45,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.footflex}>
              <Text
                style={[styles.textfooter, { marginBottom: 15 }]}>
                Already have an account? {''}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{ fontFamily: Fonts.Poppins_Medium, fontSize: 14, color: "#C068E5" }}
                >
                  <Text>Login</Text>
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => { setModalVisible(false) }}
          animationIn="pulse"
          animationInTiming={700}
        >
          <View style={styles.modalview}>
            {/* Cross Btn */}
            <TouchableOpacity
              style={styles.crossbtn}
              onPress={toggleModal}>
              <Image
                resizeMode='contain'
                source={require('../../assets/images/mcross.png')}
                style={{
                  width: 20,
                  height: 20
                }}
              />
            </TouchableOpacity>

            <Image
              resizeMode='contain'
              source={require('../../assets/images/oops.png')}
              style={{
                width: 165,
                height: 165
              }}
            />

            <Text style={[styles.title, { marginVertical: 12, marginTop: 40 }]}>Opps!</Text>

            <Text style={[styles.subtitle,
            {
              textAlign: 'center',
              color: "#321C1C",
              fontSize: 14
            }]}>
              Your Govt. ID doesn’t exists in our records.
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('ContactSupport', { govt_id: govt_id })}
              style={[styles.button, { width: '100%', marginBottom: 0 }]}>
              <LinearGradient colorList={colorList2} angle={200} />
              <Text style={styles.text}>Contact Support</Text>
            </TouchableOpacity>

          </View>
        </Modal>

        <Modal isVisible={isLoading} >
          <View style={{ backgroundColor: 'white', height: 100, width: 200, borderRadius: 20, alignSelf: 'center' }} >
            <BarIndicator count={4} color={Colors.PrimaryColor} size={30} />
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
};


const mapStateToProps = (state) => ({
  loginData: state.loginReducer.loginData,
  signupSucessData: state.signupReducer.signupSucessData
});

const mapDispatchToProps = (dispatch) => ({
  signupRequest: (data, navigation) => dispatch(signupRequest(data, navigation)),
  signupSuccess: (data) => dispatch(signupSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);


const styles = StyleSheet.create({
  mainbg: {
    backgroundColor: "#fff",
    flex: 1
  },
  logo: {
    width: '100%',
    width: 210,
    height: 63,
    position: 'absolute',
    zIndex: 1,
    left: '22%',
    top: '37%'
  },
  conatiner: {
    position: 'relative',
    flex: 1,
  },
  linearGradient1: {
    position: 'relative',
  },
  gradientBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#fff',
    backgroundColor: 'transparent',
    position: 'relative',
    zIndex: 1,
  },
  lgcontainer: {
    paddingHorizontal: 20,
    marginTop: -30
  },
  title: {
    color: "#3B2645",
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 26,
    lineHeight: 32
  },
  subtitle: {
    color: '#3B2645',
    opacity: 0.5,
    fontSize: 14,
    fontFamily: Fonts.Poppins_Regular
  },
  inputconatiner: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15
  },
  input: {
    height: 54,
    backgroundColor: "#F7F8F8",
    paddingLeft: 40,
    fontSize: 14,
    color: '#3B2645'
  },
  icon: {
    position: 'absolute',
    top: 18,
    left: 20,
    width: 16,
    height: 16,
  },
  icon1: {
    position: 'absolute',
    top: 18,
    left: 20,
    width: 18,
    height: 18,
  },
  lefttext: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  button: {
    position: 'relative',
    height: 60,
    borderRadius: 1000,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25
  },
  text: {
    position: 'absolute',
    zIndex: 1,
    fontFamily: Fonts.Poppins_Bold,
    color: "#fff",
    fontSize: 16
  },
  textfooter: {
    fontFamily: Fonts.Poppins_Regular,
    color: "#3B2645",
    textAlign: 'center'
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20
  },
  footflex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  modalview: {
    backgroundColor: "#fff",
    borderRadius: 26,
    padding: 26,
    paddingHorizontal: 35,
    paddingTop: 50,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  crossbtn: {
    position: 'absolute',
    top: 25,
    right: 25
  }
});
