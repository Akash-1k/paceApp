import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LinearGradient} from 'react-native-gradients';
import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Fonts from '../constants/Fonts';
import {loginRequest} from '../modules/Login/actions';

const Login = props => {
  const navigation = useNavigation();
  // console.log('logout state', props.state);
  const colorList = [
    {offset: '0%', color: '#C068E5', opacity: '0.9'},
    {offset: '100%', color: '#5D6AFC', opacity: '0.9'},
  ];

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  const [userId, setUserItd] = useState('');
  const [pass, setPass] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPass, setIsValidPass] = useState(false);
  const [emailValidText, setEmailValidText] = useState('');
  const [passwordMsg, setVerifiedPasswordMsg] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUserItd('');
      setPass('');
    });
    return unsubscribe;
  }, [navigation]);

  // console.log('props.loginData Login.js :::', props.loginData);

  const onPressLogin = () => {
    if (userId == '' && pass == '') {
      setEmailValidText('Govt ID or Email is required *');
      setVerifiedPasswordMsg('Please Enter Password *');
      setIsValidEmail(true);
      setIsValidPass(true);
    }
    if (userId == '') {
      setEmailValidText('Govt ID or Email is required *');
      setIsValidEmail(true);
      return;
    }

    if (pass == '') {
      setVerifiedPasswordMsg('Please Enter Password *');
      setIsValidEmail(false);
      setIsValidPass(true);
      return;
    }

    setIsValidEmail(false);
    setIsValidPass(false);

    let data = new FormData();
    data.append('email', userId);
    data.append('password', pass);
    // console.log('data:::: ', data);
    let params = {
      navigation: () => navigation.navigate('Root', {screen: 'TabOne'}),
    };
    props.loginRequest(data, params);
  };

  const passValidation = txt => {
    if (txt == '') {
      setVerifiedPasswordMsg('Please Enter Password *');
      setIsValidPass(true);
    } else {
      setVerifiedPasswordMsg('');
      setIsValidPass(false);
    }
  };

  const emailValidation = text => {
    if (text == '') {
      setEmailValidText('Govt ID or Email is required *');
      setIsValidEmail(true);
    } else {
      setEmailValidText('');
      setIsValidEmail(false);
    }

    if (text.includes('@')) {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(text) === false) {
        setEmailValidText('Please provide an valid Email *');
        setIsValidEmail(true);
        return false;
      } else {
        setEmailValidText('');
        setIsValidEmail(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.mainbg}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.conatiner}>
          <View style={styles.linearGradient1}>
            {/* Banner Background Image */}
            <Image
              resizeMode="cover"
              source={require('../../assets/images/logiinbg.png')}
              style={{
                width: '100%',
                height: 250,
              }}
            />

            {/* Logo */}
            <Image
              resizeMode="cover"
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
            />
            <View style={styles.gradientBg}>
              <LinearGradient colorList={colorList} angle={-90} />
            </View>
          </View>

          {/* Shape */}
          <Image
            resizeMode="cover"
            source={require('../../assets/images/bottomshape.png')}
            style={{
              width: '100%',
              height: 125,
              marginTop: -55,
            }}
          />

          <View style={styles.lgcontainer}>
            <Text style={styles.title}>Welcome Back!</Text>

            <Text style={[styles.subtitle, {marginBottom: 25}]}>
              Login To Your Account
            </Text>

            <View style={styles.inputconatiner}>
              <TextInput
                placeholder="Govt ID or Email"
                style={styles.input}
                underlineColor={'transparent'}
                selectionColor="#3B2645"
                value={userId}
                onChangeText={e => {
                  setUserItd(e);
                  emailValidation(e);
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
              <Image
                resizeMode="contain"
                source={require('../../assets/images/email.png')}
                style={styles.icon}
              />
              {isValidEmail ? (
                <Text style={[styles.subtitle, {color: 'red'}]}>
                  {emailValidText}
                </Text>
              ) : null}
            </View>

            <View style={styles.inputconatiner}>
              <TextInput
                placeholder="Password"
                style={styles.input}
                secureTextEntry={hidePass ? true : false}
                underlineColor={'transparent'}
                selectionColor="#3B2645"
                value={pass}
                onChangeText={txt => {
                  setPass(txt);
                  passValidation(txt);
                }}
                right={
                  <TextInput.Icon
                    onPress={() => setHidePass(!hidePass)}
                    name={() => (
                      <Ionicons
                        name={hidePass ? 'eye-off-outline' : 'eye-outline'}
                        color="#ADA4A5"
                        size={20}
                      />
                    )}
                  />
                }
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
              <Image
                resizeMode="contain"
                source={require('../../assets/images/lock.png')}
                style={styles.icon1}
              />
              {isValidPass ? (
                <Text style={[styles.subtitle, {color: 'red'}]}>
                  {passwordMsg}
                </Text>
              ) : null}
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.lefttext}>
              <Text style={styles.fortext}>Forgot your password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onPressLogin();
              }}>
              <LinearGradient colorList={colorList1} angle={200} />
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.textfooter}>Or Login With</Text>

            <View style={styles.flex}>
              <TouchableOpacity
                onPress={() => {
                  alert('Coming soon...');
                  console.log(props.loginData);
                }}
                style={{marginRight: 15}}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/images/facebook.png')}
                  style={{
                    width: 45,
                    height: 45,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/images/google.png')}
                  style={{
                    width: 45,
                    height: 45,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.footflex}>
              <Text style={[styles.textfooter, {marginBottom: 15}]}>
                {"Don't have an account?"}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Medium,
                    fontSize: 14,
                    color: '#C068E5',
                  }}>
                  {'Signup'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  otpVerificationData: state.loginReducer.otpVerificationData,
  state: state,
});

const mapDispatchToProps = dispatch => ({
  loginRequest: (data, navigation) => dispatch(loginRequest(data, navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  mainbg: {
    backgroundColor: '#fff',
    flex: 1,
  },
  logo: {
    width: '100%',
    width: 210,
    height: 63,
    position: 'absolute',
    zIndex: 1,
    left: '22%',
    top: '37%',
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
    marginTop: -30,
  },
  title: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 26,
    lineHeight: 32,
  },
  subtitle: {
    color: '#3B2645',
    opacity: 0.5,
    fontSize: 14,
    fontFamily: Fonts.Poppins_Regular,
  },
  inputconatiner: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
  },
  input: {
    height: 54,
    backgroundColor: '#F7F8F8',
    paddingLeft: 40,
    fontSize: 14,
    color: '#3B2645',
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
    alignItems: 'flex-end',
  },
  button: {
    position: 'relative',
    height: 60,
    borderRadius: 1000,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },
  text: {
    position: 'absolute',
    zIndex: 1,
    fontFamily: Fonts.Poppins_Bold,
    color: '#fff',
    fontSize: 16,
  },
  textfooter: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#3B2645',
    textAlign: 'center',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  footflex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fortext: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#3B2645',
    textAlign: 'center',
    color: '#C068E5',
  },
});
