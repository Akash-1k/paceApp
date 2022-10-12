import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {LinearGradient} from 'react-native-gradients';
import {Button, TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {resetPasswordRequest} from '../modules/Login/actions';
import Fonts from '../constants/Fonts';

const ResetPassword = props => {
  const navigation = useNavigation();

  const colorList = [
    {offset: '0%', color: '#C068E5', opacity: '0.9'},
    {offset: '100%', color: '#5D6AFC', opacity: '0.9'},
  ];

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  const [hidePass, setHidePass] = useState(true);
  const [hideConfPass, setHideConfPass] = useState(true);
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const [passMsg, setPassMsg] = useState(false);
  const [confPassMsg, setConfPassMsg] = useState(false);
  const [isValidPass, setIsValidPass] = useState(false);
  const [isValidConfPass, setIsValidConfPass] = useState(false);

  const onPressContinue = () => {
    if (pass == '' && confPass == '') {
      setPassMsg('Please enter password *');
      setConfPassMsg('Please enter confirm password *');
      setIsValidPass(true);
      setIsValidConfPass(true);
    }
    if (pass == '') {
      setPassMsg('Please enter password *');
      setIsValidPass(true);
      return;
    }
    if (confPass == '') {
      setConfPassMsg('Please enter confirm password *');
      setIsValidConfPass(true);
      return;
    }
    if (pass.length < 6) {
      setPassMsg('Password must be 6 digits*');
      setIsValidPass(true);
      return;
    }

    if (pass != confPass) {
      setConfPassMsg('Confirm Passwords do not match! *');
      setIsValidConfPass(true);
      return;
    }

    var data = new FormData();
    data.append('email', props.route.params.email);
    data.append('password', pass);

    let params = {
      callback: () => navigation.navigate('Login'),
    };
    props.resetPasswordRequest(data, params);
  };

  console.log('props.route.params.email', props.route.params.email);

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
            <Text style={styles.title}>Reset Password</Text>

            <Text style={[styles.subtitle, {marginBottom: 25}]}>
              Enter your new password.
            </Text>

            <View style={styles.inputconatiner}>
              <TextInput
                onChangeText={txt => {
                  setPass(txt);
                  if (txt.length < 6) {
                    setPassMsg('Password must be 6 digits*');
                    setIsValidPass(true);
                  } else {
                    setPassMsg('');
                    setIsValidPass(false);
                  }
                }}
                style={styles.input}
                secureTextEntry={hidePass ? true : false}
                underlineColor={'transparent'}
                selectionColor="#3B2645"
                placeholder="New Password"
                right={
                  <TextInput.Icon
                    onPress={() => setHidePass(!hidePass)}
                    name={() => (
                      <Ionicons
                        name={hidePass ? 'eye-off-outline' : 'eye-off'}
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
            </View>
            {isValidPass ? (
              <Text style={[styles.subtitle, {color: 'red', bottom: 12}]}>
                {passMsg}
              </Text>
            ) : null}

            <View style={styles.inputconatiner}>
              <TextInput
                onChangeText={txt => {
                  setConfPass(txt);
                  if (pass != txt) {
                    setConfPassMsg('Confirm Passwords do not match! *');
                    setIsValidConfPass(true);
                  } else {
                    setConfPassMsg('');
                    setIsValidConfPass(false);
                  }
                }}
                style={styles.input}
                secureTextEntry={hideConfPass ? true : false}
                underlineColor={'transparent'}
                selectionColor="#3B2645"
                placeholder="Confirm Password"
                right={
                  <TextInput.Icon
                    onPress={() => setHideConfPass(!hideConfPass)}
                    name={() => (
                      <Ionicons
                        name={hideConfPass ? 'eye-off-outline' : 'eye-off'}
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
            </View>

            {isValidConfPass ? (
              <Text style={[styles.subtitle, {color: 'red', bottom: 12}]}>
                {confPassMsg}
              </Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => onPressContinue()} style={styles.button}>
        <LinearGradient colorList={colorList1} angle={200} />
        <Text style={styles.text}>Reset</Text>
      </TouchableOpacity>

      <View style={styles.footflex}>
        <Text style={[styles.textfooter, {marginBottom: 15}]}>
          Back To {''}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Medium,
              fontSize: 14,
              color: '#C068E5',
            }}>
            Forgot Password
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
});

const mapDispatchToProps = dispatch => ({
  resetPasswordRequest: (data, navigation) =>
    dispatch(resetPasswordRequest(data, navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

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
    marginHorizontal: 15,
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
});
