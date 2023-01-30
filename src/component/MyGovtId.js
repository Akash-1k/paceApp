import React, {useEffect, useState} from 'react';
import Fonts from '../constants/Fonts';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import Config from '../constants/Config';
import {BASE_URL} from '../env';
import {showAlert} from '../utils/CommonFunctions';
import {userDetailsRequest} from '../modules/Profile/actions';

const MyGovtId = props => {
  const [govtid, setGovtid] = useState('');
  const [organization, setOrganization] = useState('');
  const [updatemsg, setUpdateMsg] = useState('');

  const [isUpdating, setUpdatingLoader] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerifyingLoader, setIsVerifyingLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [govtIdVerified, setGovtIdVerified] = useState({});

  const [isNameValid, setIsNameValid] = useState(false);
  const [isGovtId, setIsValidGovtId] = useState(false);
  const [govtIdMsg, setVerifiedMsg] = useState(false);
  const [govt_id, setGovtId] = useState('');

  // useEffect(() => {
  //   onVerifyID();
  // }, []);
  const getUserDetails = () => {
    let data = {
      logout: () => onTokenExpire(),
      token: props.loginData.token,
    };
    props.userDetailsRequest(data);
  };

  const onTokenExpire = () => {
    props.navigation.navigate('Login');
  };

  const onVerify = () => {
    if (govt_id == '') {
      setVerifiedMsg('Please Enter Govt ID *');
      setIsValidGovtId(true);
      return;
    }
    var formdata = new FormData();
    formdata.append('govt_id', govt_id);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    setIsVerifyingLoader(true);
    // return
    fetch(BASE_URL + Config.verify_id, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 1) {
          onUpdateID();
          setGovtIdVerified(result);
          setIsVerifying(true);
          setIsValidGovtId(false);
          setIsVerifyingLoader(false);
          showAlert(result.msg);
        } else if (result.status == 2) {
          setVerifiedMsg(result.msg);
          setIsValidGovtId(true);
          setIsVerifying(false);
          setIsLoading(false);
          setIsVerifyingLoader(false);
          showAlert(result.msg);
        } else {
          setIsVerifying(false);
          setIsVerifyingLoader(false);
          showAlert(result.msg);
        }
      })
      .catch(error => {
        setIsVerifyingLoader(false);
        console.log('error', error);
      });
  };

  const onUpdateID = () => {
    // console.log('first');
    // if (isVerified == false) {
    //   setUpdateMsg({msg: 'Please verify Govt. ID'});
    //   console.log('first w');
    //   return;
    // }

    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var formdata = new FormData();
    formdata.append('govt_id', govt_id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    setUpdatingLoader(true);
    fetch(BASE_URL + Config.update_govt_id, requestOptions)
      .then(response => response.json())
      .then(result => {
        setUpdatingLoader(false);
        if (result.status == 0) {
          setUpdateMsg(result);
          setEmpty();
        }
        if (result.status == 1) {
          getUserDetails();
          setUpdateMsg(result);
          setEmpty();
        }
      })
      .catch(error => {
        setUpdatingLoader(false);
        console.log('error', error);
      });
  };

  const setEmpty = () => {
    setTimeout(() => {
      setUpdateMsg('');
      setIsVerified(false);
    }, 5000);
  };

  return (
    <SafeAreaView style={styles.relative}>
      <ScrollView style={styles.relative}>
        {props.userDetails.user.govt_id ? (
          <View style={styles.container}>
            {/* {updatemsg.status == undefined ? (
          <Text
            style={{
              fontFamily: Fonts.Poppins_Medium,
              fontSize: 14,
              color: updatemsg.status == 1 ? '#6759FF' : '#C068E5',
            }}>
            {updatemsg.msg}
          </Text>
        ) : null} */}

            <View style={styles.inputconatiner}>
              <TextInput
                style={[styles.input, {paddingRight: 80}]}
                underlineColor={'transparent'}
                disabled
                placeholder="Enter Govt. ID"
                selectionColor="#3B2645"
                value={props.userDetails.user.govt_id}
                onChangeText={setGovtid}
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

              <View
                style={{
                  position: 'absolute',
                  right: 15,
                  top: 17,
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                {/* {isLoading ? (
              <ActivityIndicator size={'small'} color="#C068E5" />
            ) : null} */}

                <Image
                  resizeMode="contain"
                  source={require('../../assets/images/verfied.png')}
                  style={{
                    width: 14,
                    height: 14,
                    position: 'relative',
                    top: 4,
                    marginRight: 4,
                  }}
                />

                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Medium,
                    fontSize: 14,
                    color: '#C068E5',
                  }}>
                  {' Verifed'}
                </Text>
              </View>

              <Image
                resizeMode="contain"
                source={require('../../assets/images/email.png')}
                style={styles.icon}
              />
            </View>

            {/* {updatemsg.status != undefined ? (
          <Text
            style={{
              fontFamily: Fonts.Poppins_Medium,
              fontSize: 14,
              color: updatemsg.status == 1 ? '#6759FF' : '#C068E5',
            }}>
            {updatemsg.msg}
          </Text>
        ) : null} */}

            <TouchableOpacity disabled style={styles.button}>
              {!props.userDetails.user.organization ? (
                <ActivityIndicator size={30} color="#C068E5" />
              ) : (
                <Text style={styles.text}>
                  {props.userDetails.user.organization}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={[styles.inputconatiner, {marginHorizontal: 15}]}>
              <TextInput
                onChangeText={txt => {
                  setGovtId(txt);
                  if (txt == '') {
                    setVerifiedMsg('Please Enter Govt ID *');
                    setIsValidGovtId(true);
                  } else {
                    setVerifiedMsg('');
                    setIsValidGovtId(false);
                  }
                }}
                keyboardType={'number-pad'}
                editable={!isVerifying}
                style={[styles.input, {paddingRight: 10}]}
                underlineColor={'transparent'}
                selectionColor="#3B2645"
                placeholder="Govt ID"
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

              <TouchableOpacity
                onPress={onVerify}
                style={{
                  position: 'absolute',
                  right: 15,
                  top: 17,
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Medium,
                    fontSize: 14,
                    color: '#C068E5',
                  }}>
                  {isVerifying ? (
                    <Text>
                      <Image
                        style={{height: 15, width: 15, resizeMode: 'contain'}}
                        source={require('../../assets/images/Verifed.png')}
                      />
                      {' | Verifed'}
                    </Text>
                  ) : isVerifyingLoader ? (
                    <ActivityIndicator size={'small'} color="#C068E5" />
                  ) : (
                    <Text>| Verify</Text>
                  )}
                </Text>
              </TouchableOpacity>

              <Image
                resizeMode="contain"
                source={require('../../assets/images/email.png')}
                style={styles.icon}
              />
              {isGovtId ? (
                <Text style={[styles.subtitle, {color: 'red'}]}>
                  {govtIdMsg}
                </Text>
              ) : null}
            </View>
            {props.userDetails.user.organization && (
              <TouchableOpacity disabled style={styles.button}>
                <Text style={styles.text}>
                  {props.userDetails.user.organization}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
  personalData: state.profileReducer.personalData,
});

const mapDispatchToProps = dispatch => ({
  userDetailsRequest: data => dispatch(userDetailsRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyGovtId);

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
  button: {
    position: 'relative',
    height: 50,
    borderRadius: 1000,
    backgroundColor: '#F2EDFF',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginHorizontal: 0,
  },
  text: {
    position: 'absolute',
    zIndex: 1,
    fontFamily: Fonts.Poppins_Regular,
    color: '#9F71F0',
    fontSize: 12,
    zIndex: 3,
  },
  granew: {
    flex: 1,
    flexGrow: 1,
  },
});
