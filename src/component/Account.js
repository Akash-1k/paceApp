import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LinearGradient} from 'react-native-gradients';
import {TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {validateEmail} from '../common/Functions/Func';
import Fonts from '../constants/Fonts';
import {accountRequest, userDetailsRequest} from '../modules/Profile/actions';
import Loader from '../common/Loader';
import {isEmpty, showAlert} from '../utils/CommonFunctions';

const {width, height} = Dimensions.get('window');

const Account = props => {
  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setCpassword] = useState('');
  const [npassword, setNpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [validEmailMSG, setValidEmailMSG] = useState('valid');
  const [oldPassMSG, setOldPassMSG] = useState('valid');
  const [newPassMSG, setNewPassMSG] = useState('valid');
  const [confPassMSG, setConfPassMSG] = useState('valid');
  const [matchNewConfPassMSG, setMatchNewConfPassMSG] = useState('valid');

  const [isNameValid, setIsNameValid] = useState(false);
  const [nameMsg, setVerifiedNameMsg] = useState(false);

  useEffect(() => {
    setName(props.userDetails?.user?.name);
    setEmail(props.userDetails?.user?.email);
  }, []);

  const nameValidation = txt => {
    if (txt == '') {
      setVerifiedNameMsg('Please enter name *');
      setIsNameValid(true);
      return true;
    } else if (txt.length < 3) {
      setVerifiedNameMsg('Name must be 3 letters *');
      setIsNameValid(true);
      return true;
    } else {
      setVerifiedNameMsg('');
      setIsNameValid(false);
      return false;
    }
  };

  const onSave = () => {
    if (nameValidation(name)) {
      return;
    }
    if (isEmpty(email)) {
      setValidEmailMSG('Please enter email *');
      return;
    }
    if (!validateEmail(email)) {
      setValidEmailMSG('Invalid Email *');
      return;
    }
    setValidEmailMSG('valid');

    if (
      props.userDetails?.user?.name == name &&
      props.userDetails?.user?.email == email &&
      confirmPassword == '' &&
      npassword == '' &&
      oldPassword == ''
    ) {
      showAlert('No Changes');
      return;
    }

    let valid = false;
    if (npassword != '' || confirmPassword != '') {
      if (oldPassword == '') {
        setOldPassMSG('Please enter current password *');
        if (npassword == '') {
          setNewPassMSG('Please enter new password *');
        }
        if (confirmPassword == '') {
          setConfPassMSG('Please enter confirm password *');
        }
        return;
      }
    }

    if (valid == true) {
      return;
    } else {
      setOldPassMSG('valid');
    }

    let valid2 = false;
    let valid1 = false;
    if (oldPassword != '') {
      if (npassword == '') {
        setNewPassMSG('Please enter new password *');
        valid1 = true;
        // return;
      }
      if (confirmPassword == '') {
        setConfPassMSG('Please enter confirm password *');
        valid2 = true;
      }
    }
    if (valid1 == true) {
      return;
    } else {
      setNewPassMSG('valid');
    }

    if (valid2 == true) {
      return;
    } else {
      setConfPassMSG('valid');
    }

    if (!(npassword == confirmPassword)) {
      setMatchNewConfPassMSG(
        'New Password and Confirm Password do not matched *',
      );
      return;
    } else {
      setMatchNewConfPassMSG('valid');
    }

    let data = {
      email: email,
      first_name: name,
      password: npassword,
      old_password: oldPassword,
      token: props.loginData.token,

      callback: () => reloadProfile(),
      logout: () => onTokenExpire(),
    };
    props.accountRequest(data);
  };

  const onTokenExpire = () => {
    props.navigation.navigate('Login');
  };

  const reloadProfile = () => {
    if (props.accountDeta.status == 3) {
      console.log('props.accountDeta.4', props.accountDeta);
      setOldPassMSG(props.accountDeta.msg);
    } else {
      let data = {
        logout: () => onTokenExpire(),
        token: props.loginData.token,
      };
      props.userDetailsRequest(data);
      console.log('reloadProfile');
      props.navigation.navigate('TabFour');
    }
  };

  return (
    <SafeAreaView style={styles.relative}>
      <ScrollView style={styles.relative}>
        <View style={styles.container}>
          <Text style={styles.label}>Basic Info</Text>
          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Fullname</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 80}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={name}
              onChangeText={txt => {
                setName(txt);
                nameValidation(txt);
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
          </View>
          {isNameValid ? (
            <Text style={[styles.subtitle, {color: 'red'}]}>{nameMsg}</Text>
          ) : null}

          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Email id</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 80}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={email}
              onChangeText={txt => {
                setEmail(txt);
                if (isEmpty(txt)) {
                  setValidEmailMSG('Please enter email *');
                } else if (!validateEmail(txt)) {
                  setValidEmailMSG('Invalid Email *');
                } else {
                  setValidEmailMSG('valid');
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
          </View>
          {validEmailMSG != 'valid' ? (
            <Text style={[styles.subtitle, {color: 'red'}]}>
              {validEmailMSG}
            </Text>
          ) : null}

          <Text style={[styles.label, {paddingTop: 10}]}>Change Password</Text>

          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Current Password</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 140}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={oldPassword}
              onChangeText={txt => {
                setCpassword(txt);
                if (txt != '') {
                  setOldPassMSG('valid');
                } else {
                  setOldPassMSG('Please enter current password *');
                }
              }}
              secureTextEntry={true}
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
          {oldPassMSG != 'valid' ? (
            <Text style={[styles.subtitle, {color: 'red'}]}>{oldPassMSG}</Text>
          ) : null}

          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>New Password</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 140}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={npassword}
              onChangeText={txt => {
                setNpassword(txt);
                if (txt.length < 6) {
                  setNewPassMSG('Must be 6 character *  ');
                } else {
                  setNewPassMSG('valid');
                }
              }}
              secureTextEntry={true}
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
          {newPassMSG != 'valid' ? (
            <Text style={[styles.subtitle, {color: 'red'}]}>{newPassMSG}</Text>
          ) : null}

          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Confirm Password</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 140}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={confirmPassword}
              onChangeText={txt => {
                setconfirmPassword(txt);
                if (txt != '') {
                  setConfPassMSG('valid');
                }
              }}
              secureTextEntry={true}
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
          {confPassMSG != 'valid' ? (
            <Text style={[styles.subtitle, {color: 'red'}]}>{confPassMSG}</Text>
          ) : null}
          {matchNewConfPassMSG != 'valid' ? (
            <Text style={[styles.subtitle, {color: 'red'}]}>
              {matchNewConfPassMSG}
            </Text>
          ) : null}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => onSave()} style={styles.button}>
        <LinearGradient
          style={styles.granew}
          colorList={colorList1}
          angle={200}></LinearGradient>
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>
      <Loader loading={isLoading} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  accountDeta: state.profileReducer.accountDeta,
  userDetails: state.profileReducer.userDetails,
  accountFail: state.profileReducer.accountFail,
});

const mapDispatchToProps = dispatch => ({
  accountRequest: data => dispatch(accountRequest(data)),
  userDetailsRequest: data => dispatch(userDetailsRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 18,
  },
  relative: {
    position: 'relative',
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  subtitle: {
    color: '#3B2645',
    opacity: 0.5,
    fontSize: 14,
    top: -14,
    fontFamily: Fonts.Poppins_Regular,
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
});
