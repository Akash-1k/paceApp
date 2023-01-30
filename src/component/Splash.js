import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {connect} from 'react-redux';
import Config from '../constants/Config';
import Fonts from '../constants/Fonts';
import {BASE_URL} from '../env';
import {
  notificationListner,
  requestUserPermission,
} from '../utils/notificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Splash(props) {
  const navigation = useNavigation();

  const check = async () => {
    try {
      const deviceToken = await AsyncStorage.getItem('fcmToken');
      await updateDeviceToken(deviceToken);
    } catch (e) {
      // navigation.navigate('PleaseSelectOne');
      console.error(e);
    }
  };
  const updateDeviceToken = async token => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var data = new FormData();
    data.append('device_token', token);

    var requestOptions = {
      method: 'POST',
      body: data,
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(BASE_URL + Config.device_token, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('Update Token', result);
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    requestUserPermission();
    notificationListner(navigation);
    setTimeout(() => {
      if (props.loginData.success == true) {
        // check();
        navigation.navigate('Root', {screen: 'TabOne'});
        return;
      }
      if (props.signupSucessData.status == 1) {
        navigation.navigate('Pending');
        return;
      } else {
        navigation.navigate('Login');
      }
    }, 500);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../../assets/images/spplash.png')}
        style={{flex: 1, width: '100%'}}
      />
    </View>
  );
}

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  signupSucessData: state.signupReducer.signupSucessData,
});

const mapDispatchToProps = dispatch => ({
  // signupSuccess: (data) => dispatch(signupSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
