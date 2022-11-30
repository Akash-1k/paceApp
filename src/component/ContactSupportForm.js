import React, {useState} from 'react';
import Fonts from '../constants/Fonts';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {LinearGradient} from 'react-native-gradients';
import {connect} from 'react-redux';
import Loader from '../common/Loader';
import Config from '../constants/Config';
import {validateEmail} from '../common/Functions/Func';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const ContactSupportForm = props => {
  const navigation = useNavigation();

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  const [fname, setFname] = useState('');
  const [eid, setEid] = useState('');
  const [message, setMessage] = useState('');
  const [fnameError, setFnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const onSend = () => {
    var fnameValid = false;
    var emailValid = false;
    var msgValid = false;

    if (fname == '') {
      fnameValid = true;
    }
    if (eid == '') {
      emailValid = true;
    }
    if (message == '') {
      msgValid = true;
    }

    if (fnameValid) {
      setFnameError('Please Enter name');
      fnameValid = true;
    } else {
      setFnameError('');
    }

    if (emailValid) {
      setEmailError('Please Enter Email');
      emailValid = true;
    } else {
      setEmailError('');
    }

    if (msgValid) {
      setMessageError('Please Enter Message');
      msgValid = false;
    } else {
      setMessageError('');
    }

    if (fnameValid || emailValid || msgValid) {
      return;
    }

    if (!validateEmail(eid)) {
      setEmailError('Invalid Email');
      return;
    }

    setEmailError('');
    if (message.length <= 4) {
      setMessageError('Message length should be 5 charector!');
      return;
    }
    setMessageError('');

    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var formdata = new FormData();
    formdata.append('name', fname);
    formdata.append('email', eid);
    formdata.append('message', message);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(Config.BASE_URL + Config.contact_email, requestOptions)
      .then(response => response.text())
      .then(result => {
        setIsLoading(false);
        console.log(result);
        navigation.goBack();
      })
      .catch(error => console.log('error', error));
  };

  return (
    <SafeAreaView style={styles.relative}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{flexDirection: 'row', alignItems: 'center', height: 55}}>
        <Ionicons
          name="chevron-back"
          size={22}
          color="#3B2645"
          style={{
            position: 'relative',
          }}
        />
        <Text
          style={{
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          }}>
          {'Contact Support'}{' '}
        </Text>
      </TouchableOpacity>

      <ScrollView style={styles.relative}>
        <View style={styles.container}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              paddingVertical: 20,
            }}>
            <Image
              resizeMode="contain"
              source={require('../../assets/images/contactsupport.png')}
              style={{
                width: 188,
                height: 140,
              }}
            />
          </View>

          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Full Name</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 80}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={fname}
              onChangeText={txt => setFname(txt)}
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
          {fnameError ? (
            <Text style={[styles.subtitle, {color: 'red', bottom: 14}]}>
              {fnameError}
            </Text>
          ) : null}

          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Email id</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 80}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={eid}
              onChangeText={txt => setEid(txt)}
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
          {emailError ? (
            <Text style={[styles.subtitle, {color: 'red', bottom: 14}]}>
              {emailError}
            </Text>
          ) : null}

          <View style={styles.inputconatiner1}>
            <TextInput
              onChangeText={txt => {
                setMessage(txt);
              }}
              style={styles.input1}
              secureTextEntry={true}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              placeholder="Message"
              multiline
              numberOfLines={8}
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
          {messageError ? (
            <Text style={[styles.subtitle, {color: 'red'}]}>
              {messageError}
            </Text>
          ) : null}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => onSend()} style={styles.button}>
        <LinearGradient
          style={styles.granew}
          colorList={colorList1}
          angle={200}></LinearGradient>
        <Text style={styles.text}>Send</Text>
      </TouchableOpacity>

      <Loader loading={isLoading} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
});

const mapDispatchToProps = dispatch => ({
  // workoutDetailsRequest: (data) => dispatch(workoutDetailsRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactSupportForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  subtitle: {
    color: '#3B2645',
    opacity: 0.5,
    fontSize: 14,
    fontFamily: Fonts.Poppins_Regular,
  },
  relative: {
    position: 'relative',
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
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
  labelname: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#7B6F72',
    fontSize: 12,
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
  inputconatiner1: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
    width: '100%',
  },
  input1: {
    backgroundColor: '#F7F8F8',
    padding: 8,
    fontSize: 12,
    color: '#3B2645',
  },
});
