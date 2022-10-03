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

const {width, height} = Dimensions.get('window');

const Account = props => {
  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  const [name, setName] = useState('Stefani Wong');
  const [email, setEmail] = useState('Stefaniwong@gmail.com');
  const [oldPassword, setCpassword] = useState('');
  const [npassword, setNpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [validEmailMSG, setValidEmailMSG] = useState('valid');
  const [oldPassMSG, setOldPassMSG] = useState('valid');
  const [newPassMSG, setNewPassMSG] = useState('valid');
  const [confPassMSG, setConfPassMSG] = useState('valid');
  const [matchNewConfPassMSG, setMatchNewConfPassMSG] = useState('valid');

  useEffect(() => {
    setName(props.userDetails?.user?.first_name);
    setEmail(props.userDetails?.user?.email);
  }, []);

  const onSave = () => {
    if (!validateEmail(email)) {
      setValidEmailMSG('Invalid Email');
      return;
    }
    setValidEmailMSG('valid');

    let valid = false;
    if (npassword != '' || confirmPassword != '') {
      if (oldPassword == '') {
        setOldPassMSG('Please Enter Current Password');
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
        setNewPassMSG('Please Enter New Password');
        valid1 = true;
        return;
      }
      if (confirmPassword == '') {
        setConfPassMSG('Please Enter Confirm Password');
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
        'New Password and Confirm Password do not matched',
      );
      return;
    } else {
      setMatchNewConfPassMSG('valid');
    }

    if (
      props.userDetails?.user?.first_name == name &&
      props.userDetails?.user?.email == email &&
      confirmPassword == '' &&
      npassword == '' &&
      oldPassword == ''
    ) {
      // alert('hg');
      return;
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
      setOldPassMSG('valid');
      props.userDetailsRequest({token: props.loginData.token});
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
              onChangeText={setName}
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

          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Email id</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 80}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={email}
              onChangeText={setEmail}
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

          <Text style={[styles.label, {paddingTop: 10}]}>Change Password</Text>

          {oldPassMSG != 'valid' ? (
            <Text style={[styles.subtitle, {color: 'red'}]}>{oldPassMSG}</Text>
          ) : null}
          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Current Password</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 140}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={oldPassword}
              onChangeText={setCpassword}
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
            <Text style={styles.labelname}>New Password</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 140}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={npassword}
              onChangeText={setNpassword}
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
          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Confirm Password</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 140}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={confirmPassword}
              onChangeText={setconfirmPassword}
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
