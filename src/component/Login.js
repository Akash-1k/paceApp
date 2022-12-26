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
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {LinearGradient} from 'react-native-gradients';
import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Fonts from '../constants/Fonts';
import {loginRequest} from '../modules/Login/actions';
import {showAlertWithDelay} from '../utils/CommonFunctions';

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
    GoogleSignin.configure();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUserItd('');
      setPass('');
    });
    return unsubscribe;
  }, [navigation]);

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

    let params = {
      navigation: () => navigation.navigate('Root', {screen: 'TabOne'}),
      loginType: 'appLogin',
    };
    props.loginRequest(data, params);
  };

  const fbLogin = async resCallback => {
    LoginManager.logOut();
    console.log('first');
    return LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      result => {
        console.log('Result FB ----> ', result);
        if (
          result.declinedPermissions &&
          result.declinedPermissions.includes('email')
        ) {
          console.log('firstads');
          resCallback({message: 'Email is required '});
        }
        if (result.isCancelled) {
          console.log('User Cancelled');
        } else {
          const infoRequest = new GraphRequest(
            '/me?fields=email,name,picture',
            null,
            resCallback,
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const onFbLogin = async () => {
    try {
      await fbLogin(_responseInfoCallback);
    } catch (error) {
      console.log('onFbLogin Err', error.message);
    }
  };

  const _responseInfoCallback = async (error, result) => {
    if (error) {
      console.log('_responseInfoCallback err', error);
      return;
    } else {
      const userData = result;
      console.log('User data FB', userData);

      let data = new FormData();
      data.append('name', userData.name);
      data.append('email', userData.email);
      data.append('facebookId', userData.id);
      // data.append('photo', userInfo.user.photo, 'file');

      let params = {
        navigation: () => navigation.navigate('Root', {screen: 'TabOne'}),
        loginType: 'socialLogin',
      };
      props.loginRequest(data, params);
    }
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('GOOGLE RES', userInfo);
      console.log(userInfo.user.photo);

      let data = new FormData();
      data.append('name', userInfo.user.name);
      data.append('email', userInfo.user.email);
      data.append('googleId', userInfo.user.id);
      // data.append('photo', userInfo.user.photo, 'file');

      let params = {
        navigation: () => navigation.navigate('Root', {screen: 'TabOne'}),
        loginType: 'socialLogin',
      };
      props.loginRequest(data, params);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(error);
      } else {
        // some other error happened
        console.log(error);
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
              <TouchableOpacity onPress={onFbLogin} style={{marginRight: 15}}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/images/facebook.png')}
                  style={{
                    width: 45,
                    height: 45,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={googleSignIn}>
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
