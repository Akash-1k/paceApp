import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {LinearGradient} from 'react-native-gradients';
import {TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import Fonts from '../constants/Fonts';
import {otpVerificationRequest} from '../modules/Login/actions';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

const Otp = props => {
  const navigation = useNavigation();

  const colorList = [
    {offset: '0%', color: '#C068E5', opacity: '0.9'},
    {offset: '100%', color: '#5D6AFC', opacity: '0.9'},
  ];

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];
  const [OTP, setOtp] = useState('');
  const [otpVerifiedMsg, setOtpVerifiedMsg] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);

  const onPressContinue = () => {
    if (OTP == '') {
      setOtpVerifiedMsg('Please Enter Otp *');
      setIsOtpValid(true);
      return;
    }
    if (OTP.length < 4) {
      return;
    }

    var data = new FormData();
    data.append('email', props.route.params.email);
    data.append('otp', OTP);

    let params = {
      callback: () =>
        navigation.navigate('ResetPassword', {email: props.route.params.email}),
    };
    props.otpVerificationRequest(data, params);
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
            <Text style={styles.title}>Enter Code</Text>

            <Text style={[styles.subtitle, {marginBottom: 25}]}>
              Please enter the verification code, that we have sent on your
              registered email
            </Text>
            <View style={{alignItems: 'center'}}>
              <SmoothPinCodeInput
                value={OTP}
                onTextChange={code => {
                  setOtp(code);
                  if (code == '') {
                    setOtpVerifiedMsg('Please Enter Otp *');
                    setIsOtpValid(true);
                  } else if (code.length < 4) {
                    setOtpVerifiedMsg('Enter complete Otp *');
                    setIsOtpValid(true);
                  } else {
                    setOtpVerifiedMsg('');
                    setIsOtpValid(false);
                  }
                }}
                onFulfill={props.onFulfill}
                cellStyle={[
                  {
                    borderRadius: 10,
                    backgroundColor: '#F7F8F8',
                    height: 50,
                    width: 50,
                  },
                ]}
                cellStyleFocused={{
                  borderColor: '#5D6AFC',
                  borderBottomWidth: 4,
                }}
                cellSpacing={15}
                textStyle={[
                  styles.buttonText,
                  {fontSize: 22, color: '#3B2645'},
                ]}
                autoFocus={true}
              />
              {isOtpValid ? (
                <Text style={[styles.subtitle, {color: 'red', marginTop: 20}]}>
                  {otpVerifiedMsg}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity onPress={() => onPressContinue()} style={styles.button}>
        <LinearGradient colorList={colorList1} angle={200} />
        <Text style={styles.text}>Verify</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
});

const mapDispatchToProps = dispatch => ({
  otpVerificationRequest: (data, navigation) =>
    dispatch(otpVerificationRequest(data, navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Otp);

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
    marginTop: -45,
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
    height: 57,
    width: 57,
    marginHorizontal: 8,
  },
  input: {
    height: 57,
    backgroundColor: '#F7F8F8',
    paddingHorizontal: 18,
    fontSize: 14,
    color: '#3B2645',
    textAlign: 'center',
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
  flexinput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 0,
  },
  footflex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
