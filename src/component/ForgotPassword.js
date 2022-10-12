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
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {forgotPassRequest} from '../modules/Login/actions';
import {validateEmail} from '../common/Functions/Func';
import Fonts from '../constants/Fonts';

const ForgotPassword = props => {
  const navigation = useNavigation();

  const colorList = [
    {offset: '0%', color: '#C068E5', opacity: '0.9'},
    {offset: '100%', color: '#5D6AFC', opacity: '0.9'},
  ];

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  const [email, setEmail] = useState('');
  const [validationMsg, setMsg] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);

  const emailValidation = text => {
    if (text == '') {
      setMsg('Email is required *');
      setIsValidEmail(true);
    } else {
      setMsg('');
      setIsValidEmail(false);
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setMsg('Please provide an valid Email *');
      setIsValidEmail(true);
      return false;
    } else {
      setMsg('');
      setIsValidEmail(false);
    }
  };

  const onPressContinue = () => {
    if (email == '') {
      setMsg('Email is required *');
      setIsValidEmail(true);
      return;
    }

    if (!validateEmail(email)) {
      setMsg('Invalid Email');
      setIsValidEmail(true);
      return;
    }

    setIsValidEmail(false);

    var data = new FormData();
    data.append('email', email);

    let params = {
      callback: () => navigation.navigate('Otp', {email: email}),
    };
    props.forgotPassRequest(data, params);
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
            <Text style={styles.title}>Forgot Password?</Text>

            <Text style={[styles.subtitle, {marginBottom: 25}]}>
              Enter your email to get the verification code.
            </Text>

            <View style={styles.inputconatiner}>
              <TextInput
                onChangeText={txt => {
                  setEmail(txt);
                  emailValidation(txt);
                }}
                style={styles.input}
                underlineColor={'transparent'}
                selectionColor="#3B2645"
                placeholder="Email"
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
                source={require('../../assets/images/email1.png')}
                style={styles.icon}
              />
              {isValidEmail ? (
                <Text style={[styles.subtitle, {color: 'red'}]}>
                  {validationMsg}
                </Text>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          onPressContinue();
        }}
        style={styles.button}>
        <LinearGradient colorList={colorList1} angle={200} />
        <Text style={styles.text}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.footflex}>
        <Text style={[styles.textfooter, {marginBottom: 15}]}>
          Back To {''}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Medium,
              fontSize: 14,
              color: '#C068E5',
            }}>
            <Text>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  forgotPassData: state.loginReducer.forgotPassData,
});

const mapDispatchToProps = dispatch => ({
  forgotPassRequest: (data, navigation) =>
    dispatch(forgotPassRequest(data, navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

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
