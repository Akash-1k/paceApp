import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {LinearGradient} from 'react-native-gradients';
import {connect} from 'react-redux';
import {personalDataRequest} from '../modules/Profile/actions';
import Fonts from '../constants/Fonts';

const PersonalData = props => {
  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  const [dob, setDob] = useState('');
  const [cweight, setCweight] = useState('');
  const [gweight, setGweight] = useState('');
  const [yweight, setYweight] = useState('');
  const [hours, setHours] = useState('');

  useEffect(() => {
    setDob(props.userDetails?.user?.dob);
    setCweight(props.userDetails?.user?.current_weight);
    setGweight(props.userDetails?.user?.goal_weight);
    setYweight(props.userDetails?.user?.height);
    setHours(props.userDetails?.user?.sleep_per_night_hours);
  }, []);

  const onSave = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var formdata = new FormData();
    formdata.append('dob', dob);
    formdata.append('current_weight', cweight);
    formdata.append('goal_weight', gweight);
    formdata.append('your_height', yweight);
    formdata.append('sleep_per_night_hours', hours);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://dev.indiit.solutions/pace/public/api/personal-data',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // setIsLoading(false);
        if (result.status == 1) {
          showAlert('Personal data added successfully!');
        }
      })
      .catch(error => console.log('error', error));
  };

  const showAlert = msg => {
    Alert.alert('Update data', msg, [
      {
        text: 'OK',
        onPress: () => {
          props.personalDataRequest(props.loginData.token);
          // props.getAddressListRequest(props.loginData.token);
          props.navigation.navigate('TabFour');
        },
      },
    ]);
  };
  const onTokenExpire = () => {
    props.navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.relative}>
      <ScrollView style={styles.relative}>
        <View style={styles.container}>
          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>DOB</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 80}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={dob}
              onChangeText={setDob}
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

          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Current Weight (kg)</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 80}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={cweight}
              onChangeText={setCweight}
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

          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Goal Weight (kg)</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 80}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={gweight}
              onChangeText={setGweight}
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

          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Your Height (cm)</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 80}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={yweight}
              onChangeText={setYweight}
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

          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Hours of sleep per night</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 80}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={hours}
              onChangeText={setHours}
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
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          onSave();
        }}
        style={styles.button}>
        <LinearGradient
          style={styles.granew}
          colorList={colorList1}
          angle={200}></LinearGradient>
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
  personalData: state.profileReducer.personalData,
});

const mapDispatchToProps = dispatch => ({
  personalDataRequest: data => dispatch(personalDataRequest(data)),
  userDetailsRequest: data => dispatch(userDetailsRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalData);

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

// import React, {useEffect, useState} from 'react';
// import {
//   Text,
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import {TextInput} from 'react-native-paper';
// import {LinearGradient} from 'react-native-gradients';
// import {connect} from 'react-redux';
// import {personalDataRequest} from '../modules/Profile/actions';
// import Fonts from '../constants/Fonts';

// const PersonalData = props => {
//   const colorList1 = [
//     {offset: '0%', color: '#C068E5', opacity: '1'},
//     {offset: '100%', color: '#5D6AFC', opacity: '1'},
//   ];

//   const [dob, setDob] = useState('');
//   const [cweight, setCweight] = useState('');
//   const [gweight, setGweight] = useState('');
//   const [yweight, setYweight] = useState('');
//   const [hours, setHours] = useState('');

//   useEffect(() => {
//     setDob(props.userDetails.user.dob);
//     setCweight(props.userDetails.user.current_weight);
//     setGweight(props.userDetails.user.goal_weight);
//     setYweight(props.userDetails.user.height);
//     setHours(props.userDetails.user.sleep_per_night_hours);
//   }, []);

//   const onSave = () => {
//     let params = {
//       dob: dob,
//       current_weight: cweight,
//       goal_weight: gweight,
//       your_height: yweight,
//       sleep_per_night_hours: hours,
//       token: props.loginData.token,
//       callback: () => props.userDetailsRequest(props.loginData.token),
//       logout: () => onTokenExpire(),
//     };
//     props.personalDataRequest(params);
//   };

//   const onTokenExpire = () => {
//     props.navigation.navigate('Login');
//   };

//   return (
//     <SafeAreaView style={styles.relative}>
//       <ScrollView style={styles.relative}>
//         <View style={styles.container}>
//           <View style={styles.inputconatiner}>
//             <Text style={styles.labelname}>DOB</Text>
//             <TextInput
//               style={[styles.input, {paddingLeft: 80}]}
//               underlineColor={'transparent'}
//               selectionColor="#3B2645"
//               value={dob}
//               onChangeText={setDob}
//               theme={{
//                 colors: {
//                   primary: '#F7F8F8',
//                   text: '#3B2645',
//                 },
//                 fonts: {
//                   regular: {
//                     fontFamily: Fonts.Poppins_Regular,
//                   },
//                 },
//               }}
//             />
//           </View>

//           <View style={styles.inputconatiner}>
//             <Text style={styles.labelname}>Current Weight (kg)</Text>
//             <TextInput
//               style={[styles.input, {paddingLeft: 80}]}
//               underlineColor={'transparent'}
//               selectionColor="#3B2645"
//               value={cweight}
//               onChangeText={setCweight}
//               theme={{
//                 colors: {
//                   primary: '#F7F8F8',
//                   text: '#3B2645',
//                 },
//                 fonts: {
//                   regular: {
//                     fontFamily: Fonts.Poppins_Regular,
//                   },
//                 },
//               }}
//             />
//           </View>

//           <View style={styles.inputconatiner}>
//             <Text style={styles.labelname}>Goal Weight (kg)</Text>
//             <TextInput
//               style={[styles.input, {paddingLeft: 80}]}
//               underlineColor={'transparent'}
//               selectionColor="#3B2645"
//               value={gweight}
//               onChangeText={setGweight}
//               theme={{
//                 colors: {
//                   primary: '#F7F8F8',
//                   text: '#3B2645',
//                 },
//                 fonts: {
//                   regular: {
//                     fontFamily: Fonts.Poppins_Regular,
//                   },
//                 },
//               }}
//             />
//           </View>

//           <View style={styles.inputconatiner}>
//             <Text style={styles.labelname}>Your Height (cm)</Text>
//             <TextInput
//               style={[styles.input, {paddingLeft: 80}]}
//               underlineColor={'transparent'}
//               selectionColor="#3B2645"
//               value={yweight}
//               onChangeText={setYweight}
//               theme={{
//                 colors: {
//                   primary: '#F7F8F8',
//                   text: '#3B2645',
//                 },
//                 fonts: {
//                   regular: {
//                     fontFamily: Fonts.Poppins_Regular,
//                   },
//                 },
//               }}
//             />
//           </View>

//           <View style={styles.inputconatiner}>
//             <Text style={styles.labelname}>Hours of sleep per night</Text>
//             <TextInput
//               style={[styles.input, {paddingLeft: 80}]}
//               underlineColor={'transparent'}
//               selectionColor="#3B2645"
//               value={hours}
//               onChangeText={setHours}
//               theme={{
//                 colors: {
//                   primary: '#F7F8F8',
//                   text: '#3B2645',
//                 },
//                 fonts: {
//                   regular: {
//                     fontFamily: Fonts.Poppins_Regular,
//                   },
//                 },
//               }}
//             />
//           </View>
//         </View>
//       </ScrollView>
//       <TouchableOpacity
//         onPress={() => {
//           onSave();
//         }}
//         style={styles.button}>
//         <LinearGradient
//           style={styles.granew}
//           colorList={colorList1}
//           angle={200}></LinearGradient>
//         <Text style={styles.text}>Save</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const mapStateToProps = state => ({
//   loginData: state.loginReducer.loginData,
//   userDetails: state.profileReducer.userDetails,
//   personalData: state.profileReducer.personalData,
// });

// const mapDispatchToProps = dispatch => ({
//   personalDataRequest: data => dispatch(personalDataRequest(data)),
//   userDetailsRequest: data => dispatch(userDetailsRequest(data)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(PersonalData);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//     paddingHorizontal: 18,
//   },
//   relative: {
//     position: 'relative',
//     width: '100%',
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   labelname: {
//     fontFamily: Fonts.Poppins_Regular,
//     color: '#7B6F72',
//     fontSize: 12,
//     position: 'absolute',
//     zIndex: 2,
//     top: 17,
//     left: 20,
//   },
//   label: {
//     fontFamily: Fonts.Poppins_SemiBold,
//     color: '#1D1617',
//     fontSize: 12,
//     marginBottom: 10,
//   },
//   inputconatiner: {
//     position: 'relative',
//     borderRadius: 15,
//     overflow: 'hidden',
//     marginBottom: 15,
//     position: 'relative',
//   },
//   input: {
//     height: 54,
//     backgroundColor: '#F7F8F8',
//     fontSize: 14,
//     color: '#3B2645',
//     textAlign: 'right',
//   },
//   button: {
//     position: 'relative',
//     height: 60,
//     borderRadius: 1000,
//     overflow: 'hidden',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 5,
//     marginHorizontal: 15,
//   },
//   text: {
//     position: 'absolute',
//     zIndex: 1,
//     fontFamily: Fonts.Poppins_Bold,
//     color: '#fff',
//     fontSize: 16,
//     zIndex: 3,
//   },
//   granew: {
//     flex: 1,
//     flexGrow: 1,
//   },
// });
