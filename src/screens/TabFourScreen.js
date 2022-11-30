import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import Loader from '../common/Loader';
import {Paragraph} from 'react-native-paper';
import {
  userDetailsRequest,
  personalDataRequest,
} from '../modules/Profile/actions';
import {connect} from 'react-redux';
import Fonts from '../constants/Fonts';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {requestCameraPermission} from '../common/Functions/Permissions';
import ThreeOptionAlert from '../common/ThreeOptionAlert';
import Config from '../constants/Config';
import {showAlert} from '../utils/CommonFunctions';

function TabFourScreen(props) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log('TabFour props :::::::', props.userDetails);

  useEffect(() => {
    getUserDetails();
  }, []);
  // console.log('props ::::::::', props);

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

  const onOpenCamera = async () => {
    try {
      launchCamera({mediaType: 'photo', cameraType: 'back'}, response => {
        console.log(response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          onUpdateProfile(response.assets[0]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onOpenGallery = () => {
    try {
      //   setTimeout(() => {
      launchImageLibrary({mediaType: 'photo'}, response => {
        if (response.didCancel) {
          // this.setState({ isOpenPicker: false });
        } else if (response.error) {
          // this.setState({ isOpenPicker: false });
        } else if (response.customButton) {
          // this.setState({ isOpenPicker: false });
        } else {
          onUpdateProfile(response.assets[0]);
          // this.setState({ isOpenPicker: false });
        }
      });
      //   }, 500);
    } catch (error) {
      console.log(error);
      //   this.setState({ isOpenPicker: false });
    }
  };

  const onUpdateProfile = files => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var formdata = new FormData();

    console.log('image', files);

    formdata.append('image', {
      name: files.fileName,
      type: files.type,
      uri:
        Platform.OS === 'android'
          ? files.uri
          : files.uri.replace('file://', ''),
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setModalVisible(false);
    setIsLoading(true);
    fetch(Config.BASE_URL + Config.update_profile_image, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 1) {
          // reloadUserDetails();
          getUserDetails();
        }
        setIsLoading(false);
        console.log(result);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);
      });
  };

  const reloadUserDetails = () => {
    Alert.alert('Profile', 'Profile Updated Successfully!', [
      {
        text: 'OK',
        onPress: () => getUserDetails(),
      },
    ]);
  };
  // console.log('userDetails:::2', props.userDetails);
  var year = new Date().getFullYear();
  //   alert(year - parseInt(props.userDetails.user.dob.slice(0, 4)));
  // console.log('TAB FOUR STATE::::::::: ', props.state);
  return (
    <>
      {props.userDetails && (
        <SafeAreaView style={styles.mainbg}>
          <ScrollView style={styles.mainbg}>
            <ImageBackground
              resizeMode="cover"
              source={require('../../assets/images/profile.png')}
              style={{
                width: '100%',
                height: 205,
              }}></ImageBackground>
            <View style={styles.container}>
              <View style={styles.userimg}>
                <TouchableOpacity
                  // onPress={onOpenCamera}
                  onPress={async () => {
                    await requestCameraPermission().then(res => {
                      if (res.isGraned) {
                        setModalVisible(true);
                      } else {
                        showAlert('Permission Denied');
                      }
                    });
                  }}
                  style={{
                    position: 'absolute',
                    elevation: 10,
                    zIndex: 10,
                    right: '29%',
                  }}>
                  <Image
                    source={require('../../assets/images/camera.png')}
                    style={{
                      width: 40,
                      height: 40,
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>

                <Image
                  resizeMode="contain"
                  source={
                    props.userDetails?.user?.image
                      ? {
                          uri:
                            Config.IMAGE_BASE_URL +
                            'profile/' +
                            props.userDetails.user.image,
                        }
                      : require('../../assets/images/userpro.png')
                  }
                  style={{
                    width: 125,
                    height: 125,
                    borderRadius: 100,
                  }}
                />
                <Text style={styles.usertitle}>
                  {props.userDetails?.user?.name}
                </Text>
              </View>

              <View style={styles.flexwrap}>
                <View style={styles.innerbox}>
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Bold,
                      fontSize: 18,
                      color: '#C068E5',
                    }}>
                    {props.userDetails?.user?.height == null ? (
                      <Text>{'NA'}</Text>
                    ) : (
                      <Text>
                        {props.userDetails?.user?.height}
                        {/* {personalD.user.height} */}
                        {' cm'}
                      </Text>
                    )}
                  </Text>
                  <Paragraph style={styles.para}>Height</Paragraph>
                </View>
                <View style={[styles.innerbox, styles.border]}>
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Bold,
                      fontSize: 18,
                      color: '#C068E5',
                    }}>
                    {props.userDetails?.user?.current_weight == null ? (
                      <Text>{'NA'}</Text>
                    ) : (
                      <Text>
                        {props.userDetails?.user?.current_weight}
                        {/* {personalD.user.current_weight} */}
                        {' kg'}
                      </Text>
                    )}
                  </Text>
                  <Paragraph style={styles.para}>Weight</Paragraph>
                </View>
                <View style={styles.innerbox}>
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Bold,
                      fontSize: 18,
                      color: '#C068E5',
                    }}>
                    {/* {props.userDetails?.user?.dob && (
                      <Text>
                        {year -
                          parseInt(props.userDetails.user.dob.slice(0, 4))}
                        {' Years'}
                      </Text>
                    )} */}
                    {props.userDetails?.user?.dob == null ? (
                      <Text>{'NA'}</Text>
                    ) : (
                      <Text>
                        {year -
                          parseInt(props.userDetails.user.dob.slice(0, 4))}
                        {' Years'}
                      </Text>
                    )}
                  </Text>
                  <Paragraph style={styles.para}>Age</Paragraph>
                </View>
              </View>

              <View style={styles.itembox}>
                <TouchableOpacity
                  style={styles.itemlist}
                  onPress={() => navigation.navigate('Account')}>
                  <View style={styles.itemleftcontent}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/account.png')}
                      style={{
                        width: 49,
                        height: 49,
                        borderRadius: 16,
                      }}
                    />
                    <Text style={styles.title}>Account</Text>
                  </View>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/proarrow.png')}
                    style={{
                      width: 8,
                      height: 14,
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.itemlist}
                  onPress={() => navigation.navigate('PersonalData')}>
                  <View style={styles.itemleftcontent}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/pdata.png')}
                      style={{
                        width: 49,
                        height: 49,
                        borderRadius: 16,
                      }}
                    />
                    <Text style={styles.title}>Personal Data</Text>
                  </View>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/proarrow.png')}
                    style={{
                      width: 8,
                      height: 14,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.itemlist}
                  onPress={() => navigation.navigate('MyGovtId')}>
                  <View style={styles.itemleftcontent}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/idcard.png')}
                      style={{
                        width: 49,
                        height: 49,
                        borderRadius: 16,
                      }}
                    />
                    <Text style={styles.title}>My Govt. Id</Text>
                  </View>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/proarrow.png')}
                    style={{
                      width: 8,
                      height: 14,
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.itemlist}
                  onPress={() => navigation.navigate('PaymentCards')}>
                  <View style={styles.itemleftcontent}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/paymentcard.png')}
                      style={{
                        width: 49,
                        height: 49,
                        borderRadius: 16,
                      }}
                    />
                    <Text style={styles.title}>Payment Cards</Text>
                  </View>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/proarrow.png')}
                    style={{
                      width: 8,
                      height: 14,
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.itemlist}
                  onPress={() => navigation.navigate('ManageAddress')}>
                  <View style={styles.itemleftcontent}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/address.png')}
                      style={{
                        width: 49,
                        height: 49,
                        borderRadius: 16,
                      }}
                    />
                    <Text style={styles.title}>Manage Address</Text>
                  </View>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/proarrow.png')}
                    style={{
                      width: 8,
                      height: 14,
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.itemlist}
                  onPress={() => navigation.navigate('HowToUse')}>
                  <View style={styles.itemleftcontent}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/howtouse.png')}
                      style={{
                        width: 49,
                        height: 49,
                        borderRadius: 16,
                      }}
                    />
                    <Text style={styles.title}>How to use</Text>
                  </View>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/proarrow.png')}
                    style={{
                      width: 8,
                      height: 14,
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.itemlist}
                  onPress={() => navigation.navigate('TermsOfService')}>
                  <View style={styles.itemleftcontent}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/tersm.png')}
                      style={{
                        width: 49,
                        height: 49,
                        borderRadius: 16,
                      }}
                    />
                    <Text style={styles.title}>Terms of Service</Text>
                  </View>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/proarrow.png')}
                    style={{
                      width: 8,
                      height: 14,
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.itemlist}
                  onPress={() => navigation.navigate('PrivacyPolicy')}>
                  <View style={styles.itemleftcontent}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/privacy.png')}
                      style={{
                        width: 49,
                        height: 49,
                        borderRadius: 16,
                      }}
                    />
                    <Text style={styles.title}>Privacy Policy</Text>
                  </View>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/proarrow.png')}
                    style={{
                      width: 8,
                      height: 14,
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.itemlist}
                  onPress={() => navigation.navigate('Faqs')}>
                  <View style={styles.itemleftcontent}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/faq.png')}
                      style={{
                        width: 49,
                        height: 49,
                        borderRadius: 16,
                      }}
                    />
                    <Text style={styles.title}>FAQs</Text>
                  </View>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/proarrow.png')}
                    style={{
                      width: 8,
                      height: 14,
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.itemlist}
                  onPress={() => navigation.navigate('AboutMission')}>
                  <View style={styles.itemleftcontent}>
                    <Image
                      resizeMode="contain"
                      source={require('../../assets/images/mission.png')}
                      style={{
                        width: 49,
                        height: 49,
                        borderRadius: 16,
                      }}
                    />
                    <Text style={styles.title}>{'About & Mission'}</Text>
                  </View>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/proarrow.png')}
                    style={{
                      width: 8,
                      height: 14,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {modalVisible ? (
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: 'white',
                  height: 250,
                  width: width - 20,
                  borderRadius: 10,
                  top: width / 2,
                  elevation: 5,
                  zIndex: 55,
                  alignSelf: 'center',
                }}>
                <ThreeOptionAlert
                  title="Update Profile"
                  msg="Please select Camera or Gallery!"
                  firstTitle="Cancel"
                  secondTitle="Camera"
                  thirdTitle="Gallery"
                  onPressFirst={() => {
                    setModalVisible(false);
                  }}
                  onPressSecond={() => {
                    onOpenCamera();
                  }}
                  onPressThird={() => {
                    onOpenGallery();
                  }}
                />
              </View>
            ) : null}
          </ScrollView>
          <Loader loading={isLoading} />
        </SafeAreaView>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
});

const mapDispatchToProps = dispatch => ({
  userDetailsRequest: data => dispatch(userDetailsRequest(data)),
  personalDataRequest: data => dispatch(personalDataRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabFourScreen);

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainbg: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 15,
    paddingHorizontal: 20,
    marginTop: -140,
  },
  userimg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  usertitle: {
    fontSize: 22,
    fontFamily: Fonts.Poppins_SemiBold,
    color: '#3B2645',
    marginTop: 9,
    marginBottom: 12,
  },
  flexwrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 13,
    borderWidth: 1,
    padding: 20,
    borderColor: '#BC68E5',
    borderRadius: 12,
  },
  innerbox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  border: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.20)',
    paddingHorizontal: 15,
  },
  title1: {
    color: '#000',
    marginBottom: 4,
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 16,
  },
  para: {
    color: '#7B6F72',
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 12,
    opacity: 0.7,
  },
  border: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#BC68E5',
    paddingHorizontal: 30,
  },
  title: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Medium,
    fontSize: 14,
    paddingLeft: 10,
  },
  itembox: {
    marginTop: 25,
    marginBottom: 10,
  },
  itemlist: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  itemleftcontent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

// import React, {useEffect, useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
//   ImageBackground,
//   Image,
//   Platform,
//   Alert,
//   Dimensions,
// } from 'react-native';
// import Loader from '../common/Loader';
// import {Paragraph} from 'react-native-paper';
// import {userDetailsRequest} from '../modules/Profile/actions';
// import {connect} from 'react-redux';
// import Fonts from '../constants/Fonts';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import {requestCameraPermission} from '../common/Functions/Permissions';
// import ThreeOptionAlert from '../common/ThreeOptionAlert';
// import Config from '../constants/Config';

// function TabFourScreen(props) {
//   const navigation = useNavigation();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   console.log('TabFour props :::::::', props);

//   useEffect(() => {
//     if (Platform.OS == 'android') {
//       requestCameraPermission();
//     }
//   }, []);

//   useEffect(() => {
//     console.log(props.userDetails);
//     getUserDetails();
//   }, []);
//   console.log('props ::::::::', props);

//   const getUserDetails = () => {
//     let data = {
//       logout: () => onTokenExpire(),
//       token: props.loginData.token,
//     };
//     props.userDetailsRequest(data);
//   };

//   const onTokenExpire = () => {
//     props.navigation.navigate('Login');
//   };

//   const onOpenCamera = async () => {
//     try {
//       launchCamera({mediaType: 'photo', cameraType: 'back'}, response => {
//         console.log(response);
//         if (response.didCancel) {
//           // console.log('User cancelled image picker');
//         } else if (response.errorCode) {
//           // console.log('ImagePicker Error: ', response.error);
//         } else if (response.customButton) {
//           // console.log('User tapped custom button: ', response.customButton);
//         } else {
//           onUpdateProfile(response.assets[0]);
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const onOpenGallery = () => {
//     try {
//       //   setTimeout(() => {
//       launchImageLibrary({mediaType: 'photo'}, response => {
//         if (response.didCancel) {
//           // this.setState({ isOpenPicker: false });
//         } else if (response.error) {
//           // this.setState({ isOpenPicker: false });
//         } else if (response.customButton) {
//           // this.setState({ isOpenPicker: false });
//         } else {
//           onUpdateProfile(response.assets[0]);
//           // this.setState({ isOpenPicker: false });
//         }
//       });
//       //   }, 500);
//     } catch (error) {
//       console.log(error);
//       //   this.setState({ isOpenPicker: false });
//     }
//   };

//   const onUpdateProfile = files => {
//     var myHeaders = new Headers();
//     myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

//     var formdata = new FormData();
//     // formdata.append("image", files, files.fileName);

//     formdata.append('image', {
//       name: files.fileName,
//       type: files.type,
//       uri:
//         Platform.OS === 'android'
//           ? files.uri
//           : files.uri.replace('file://', ''),
//     });

//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: formdata,
//       redirect: 'follow',
//     };

//     fetch(Config.BASE_URL + Config.update_profile_image, requestOptions)
//       .then(response => response.json())
//       .then(result => {
//         console.log('TabFour Upload Image ::::::::: ', result);
//         if (result.status == 1) {
//           reloadUserDetails();
//           setModalVisible(false);
//         }
//         console.log(result);
//       })
//       .catch(error => console.log('error', error));
//   };

//   const reloadUserDetails = () => {
//     Alert.alert('Profile', 'Profile Updated Successfully!', [
//       {
//         text: 'OK',
//         onPress: () => getUserDetails(),
//       },
//     ]);
//   };
//   //   console.log('userDetails:::2', props.userDetails);
//   var year = new Date().getFullYear();
//   //   alert(year - parseInt(props.userDetails.user.dob.slice(0, 4)));
//   return (
//     <>
//       {props.userDetails.user && (
//         <SafeAreaView style={styles.mainbg}>
//           <ScrollView style={styles.mainbg}>
//             <ImageBackground
//               resizeMode="cover"
//               source={require('../../assets/images/profile.png')}
//               style={{
//                 width: '100%',
//                 height: 205,
//               }}></ImageBackground>
//             <View style={styles.container}>
//               <View style={styles.userimg}>
//                 <TouchableOpacity
//                   // onPress={onOpenCamera}
//                   onPress={() => setModalVisible(true)}
//                   style={{
//                     position: 'absolute',
//                     elevation: 10,
//                     zIndex: 10,
//                     right: '29%',
//                   }}>
//                   <Image
//                     source={require('../../assets/images/camera.png')}
//                     style={{
//                       width: 40,
//                       height: 40,
//                       resizeMode: 'contain',
//                     }}
//                   />
//                 </TouchableOpacity>

//                 <Image
//                   resizeMode="cover"
//                   source={
//                     props.userDetails?.user?.image
//                       ? {
//                           uri:
//                             'https://dev.indiit.solutions/pace/public/assets/images/profile/' +
//                             props.userDetails.user.image,
//                         }
//                       : require('../../assets/images/userpro.png')
//                   }
//                   style={{
//                     width: 125,
//                     height: 125,
//                     borderRadius: 100,
//                   }}
//                 />
//                 <Text style={styles.usertitle}>
//                   {props.userDetails?.user?.first_name}
//                 </Text>
//               </View>

//               <View style={styles.flexwrap}>
//                 <View style={styles.innerbox}>
//                   <Text
//                     style={{
//                       fontFamily: Fonts.Poppins_Bold,
//                       fontSize: 18,
//                       color: '#C068E5',
//                     }}>
//                     <Text>
//                       {props.userDetails.user.height}
//                       {' cm'}
//                     </Text>
//                   </Text>
//                   <Paragraph style={styles.para}>Height</Paragraph>
//                 </View>
//                 <View style={[styles.innerbox, styles.border]}>
//                   <Text
//                     style={{
//                       fontFamily: Fonts.Poppins_Bold,
//                       fontSize: 18,
//                       color: '#C068E5',
//                     }}>
//                     <Text>
//                       {props.userDetails.user.current_weight}
//                       {' kg'}
//                     </Text>
//                   </Text>
//                   <Paragraph style={styles.para}>Weight</Paragraph>
//                 </View>
//                 <View style={styles.innerbox}>
//                   <Text
//                     style={{
//                       fontFamily: Fonts.Poppins_Bold,
//                       fontSize: 18,
//                       color: '#C068E5',
//                     }}>
//                     {props.userDetails.user.dob && (
//                       <Text>
//                         {year -
//                           parseInt(props.userDetails.user.dob.slice(0, 4))}
//                       </Text>
//                     )}
//                     {' Year'}
//                   </Text>
//                   <Paragraph style={styles.para}>Age</Paragraph>
//                 </View>
//               </View>

//               <View style={styles.itembox}>
//                 <TouchableOpacity
//                   style={styles.itemlist}
//                   onPress={() => navigation.navigate('Account')}>
//                   <View style={styles.itemleftcontent}>
//                     <Image
//                       resizeMode="contain"
//                       source={require('../../assets/images/account.png')}
//                       style={{
//                         width: 49,
//                         height: 49,
//                         borderRadius: 16,
//                       }}
//                     />
//                     <Text style={styles.title}>Account</Text>
//                   </View>
//                   <Image
//                     resizeMode="contain"
//                     source={require('../../assets/images/proarrow.png')}
//                     style={{
//                       width: 8,
//                       height: 14,
//                     }}
//                   />
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={styles.itemlist}
//                   onPress={() => navigation.navigate('PersonalData')}>
//                   <View style={styles.itemleftcontent}>
//                     <Image
//                       resizeMode="contain"
//                       source={require('../../assets/images/pdata.png')}
//                       style={{
//                         width: 49,
//                         height: 49,
//                         borderRadius: 16,
//                       }}
//                     />
//                     <Text style={styles.title}>Personal Data</Text>
//                   </View>
//                   <Image
//                     resizeMode="contain"
//                     source={require('../../assets/images/proarrow.png')}
//                     style={{
//                       width: 8,
//                       height: 14,
//                     }}
//                   />
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={styles.itemlist}
//                   onPress={() => navigation.navigate('MyGovtId')}>
//                   <View style={styles.itemleftcontent}>
//                     <Image
//                       resizeMode="contain"
//                       source={require('../../assets/images/idcard.png')}
//                       style={{
//                         width: 49,
//                         height: 49,
//                         borderRadius: 16,
//                       }}
//                     />
//                     <Text style={styles.title}>My Govt. Id</Text>
//                   </View>
//                   <Image
//                     resizeMode="contain"
//                     source={require('../../assets/images/proarrow.png')}
//                     style={{
//                       width: 8,
//                       height: 14,
//                     }}
//                   />
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={styles.itemlist}
//                   onPress={() => navigation.navigate('PaymentCards')}>
//                   <View style={styles.itemleftcontent}>
//                     <Image
//                       resizeMode="contain"
//                       source={require('../../assets/images/paymentcard.png')}
//                       style={{
//                         width: 49,
//                         height: 49,
//                         borderRadius: 16,
//                       }}
//                     />
//                     <Text style={styles.title}>Payment Cards</Text>
//                   </View>
//                   <Image
//                     resizeMode="contain"
//                     source={require('../../assets/images/proarrow.png')}
//                     style={{
//                       width: 8,
//                       height: 14,
//                     }}
//                   />
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={styles.itemlist}
//                   onPress={() => navigation.navigate('ManageAddress')}>
//                   <View style={styles.itemleftcontent}>
//                     <Image
//                       resizeMode="contain"
//                       source={require('../../assets/images/address.png')}
//                       style={{
//                         width: 49,
//                         height: 49,
//                         borderRadius: 16,
//                       }}
//                     />
//                     <Text style={styles.title}>Manage Address</Text>
//                   </View>
//                   <Image
//                     resizeMode="contain"
//                     source={require('../../assets/images/proarrow.png')}
//                     style={{
//                       width: 8,
//                       height: 14,
//                     }}
//                   />
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={styles.itemlist}
//                   onPress={() => navigation.navigate('HowToUse')}>
//                   <View style={styles.itemleftcontent}>
//                     <Image
//                       resizeMode="contain"
//                       source={require('../../assets/images/howtouse.png')}
//                       style={{
//                         width: 49,
//                         height: 49,
//                         borderRadius: 16,
//                       }}
//                     />
//                     <Text style={styles.title}>How to use</Text>
//                   </View>
//                   <Image
//                     resizeMode="contain"
//                     source={require('../../assets/images/proarrow.png')}
//                     style={{
//                       width: 8,
//                       height: 14,
//                     }}
//                   />
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={styles.itemlist}
//                   onPress={() => navigation.navigate('TermsOfService')}>
//                   <View style={styles.itemleftcontent}>
//                     <Image
//                       resizeMode="contain"
//                       source={require('../../assets/images/tersm.png')}
//                       style={{
//                         width: 49,
//                         height: 49,
//                         borderRadius: 16,
//                       }}
//                     />
//                     <Text style={styles.title}>Terms of Service</Text>
//                   </View>
//                   <Image
//                     resizeMode="contain"
//                     source={require('../../assets/images/proarrow.png')}
//                     style={{
//                       width: 8,
//                       height: 14,
//                     }}
//                   />
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={styles.itemlist}
//                   onPress={() => navigation.navigate('PrivacyPolicy')}>
//                   <View style={styles.itemleftcontent}>
//                     <Image
//                       resizeMode="contain"
//                       source={require('../../assets/images/privacy.png')}
//                       style={{
//                         width: 49,
//                         height: 49,
//                         borderRadius: 16,
//                       }}
//                     />
//                     <Text style={styles.title}>Privacy Policy</Text>
//                   </View>
//                   <Image
//                     resizeMode="contain"
//                     source={require('../../assets/images/proarrow.png')}
//                     style={{
//                       width: 8,
//                       height: 14,
//                     }}
//                   />
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={styles.itemlist}
//                   onPress={() => navigation.navigate('Faqs')}>
//                   <View style={styles.itemleftcontent}>
//                     <Image
//                       resizeMode="contain"
//                       source={require('../../assets/images/faq.png')}
//                       style={{
//                         width: 49,
//                         height: 49,
//                         borderRadius: 16,
//                       }}
//                     />
//                     <Text style={styles.title}>FAQs</Text>
//                   </View>
//                   <Image
//                     resizeMode="contain"
//                     source={require('../../assets/images/proarrow.png')}
//                     style={{
//                       width: 8,
//                       height: 14,
//                     }}
//                   />
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={styles.itemlist}
//                   onPress={() => navigation.navigate('AboutMission')}>
//                   <View style={styles.itemleftcontent}>
//                     <Image
//                       resizeMode="contain"
//                       source={require('../../assets/images/mission.png')}
//                       style={{
//                         width: 49,
//                         height: 49,
//                         borderRadius: 16,
//                       }}
//                     />
//                     <Text style={styles.title}>{'About & Mission'}</Text>
//                   </View>
//                   <Image
//                     resizeMode="contain"
//                     source={require('../../assets/images/proarrow.png')}
//                     style={{
//                       width: 8,
//                       height: 14,
//                     }}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {modalVisible ? (
//               <View
//                 style={{
//                   position: 'absolute',
//                   backgroundColor: 'white',
//                   height: 250,
//                   width: width - 20,
//                   borderRadius: 10,
//                   top: width / 2,
//                   elevation: 5,
//                   zIndex: 55,
//                   alignSelf: 'center',
//                 }}>
//                 <ThreeOptionAlert
//                   title="Update Profile"
//                   msg="Please select Camera or Gallery!"
//                   firstTitle="Cancel"
//                   secondTitle="Camera"
//                   thirdTitle="Gallery"
//                   onPressFirst={() => {
//                     setModalVisible(false);
//                   }}
//                   onPressSecond={() => {
//                     onOpenCamera();
//                   }}
//                   onPressThird={() => {
//                     onOpenGallery();
//                   }}
//                 />
//               </View>
//             ) : null}
//           </ScrollView>
//           <Loader loading={isLoading} />
//         </SafeAreaView>
//       )}
//     </>
//   );
// }

// const mapStateToProps = state => ({
//   loginData: state.loginReducer.loginData,
//   userDetails: state.profileReducer.userDetails,
// });

// const mapDispatchToProps = dispatch => ({
//   userDetailsRequest: data => dispatch(userDetailsRequest(data)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(TabFourScreen);

// const {width, height} = Dimensions.get('window');

// const styles = StyleSheet.create({
//   mainbg: {
//     backgroundColor: '#fff',
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     padding: 15,
//     paddingHorizontal: 20,
//     marginTop: -140,
//   },
//   userimg: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   usertitle: {
//     fontSize: 22,
//     fontFamily: Fonts.Poppins_SemiBold,
//     color: '#3B2645',
//     marginTop: 9,
//     marginBottom: 12,
//   },
//   flexwrap: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//     marginTop: 13,
//     borderWidth: 1,
//     padding: 20,
//     borderColor: '#BC68E5',
//     borderRadius: 12,
//   },
//   innerbox: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 10,
//   },
//   border: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderColor: 'rgba(255,255,255,0.20)',
//     paddingHorizontal: 15,
//   },
//   title1: {
//     color: '#000',
//     marginBottom: 4,
//     fontFamily: Fonts.Poppins_Regular,
//     fontSize: 16,
//   },
//   para: {
//     color: '#7B6F72',
//     fontFamily: Fonts.Poppins_Regular,
//     fontSize: 12,
//     opacity: 0.7,
//   },
//   border: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderColor: '#BC68E5',
//     paddingHorizontal: 30,
//   },
//   title: {
//     color: '#3B2645',
//     fontFamily: Fonts.Poppins_Medium,
//     fontSize: 14,
//     paddingLeft: 10,
//   },
//   itembox: {
//     marginTop: 25,
//     marginBottom: 10,
//   },
//   itemlist: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 13,
//   },
//   itemleftcontent: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
// });
