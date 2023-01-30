import {connect} from 'react-redux';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {logoutRequest} from './modules/Login/actions';
import Fonts from './constants/Fonts';
import {BASE_URL} from './env';
import Config from './constants/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = props => {
  const updateDeviceToken = async token => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var data = new FormData();
    data.append('device_token', '');

    var requestOptions = {
      method: 'POST',
      body: data,
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(BASE_URL + Config.device_token, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('Token removed ', result);
      })
      .catch(error => console.log('error', error));
  };
  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };

  const onPressLogout = () => {
    let data = new FormData();
    data.append('token', props.loginData.token);
    let params = {
      navigation: () => props.navigation.navigate('Login'),
      type: props.loginData.type,
    };
    props.logoutRequest(data, params);
    clearAsyncStorage();
    updateDeviceToken('');
  };

  // console.warn('CustomDrawer ::::::', props);
  const drawerNavigation = props.navigation.getParent('leftdrawer');
  return (
    <ImageBackground
      source={require('./../assets/images/drawer.png')}
      style={styles.walletbg}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            console.log(drawerNavigation?.getState());
            drawerNavigation?.closeDrawer();
          }}>
          <Image
            resizeMode="contain"
            source={require('./../assets/images/whitemenu.png')}
            style={{
              width: 21,
              height: 15,
            }}
          />
        </TouchableOpacity>
        <Image
          resizeMode="contain"
          source={require('./../assets/images/logo.png')}
          style={{
            width: 128,
            height: 37,
            marginLeft: 25,
          }}
        />
      </View>

      <View
        style={{
          marginTop: 'auto',
          paddingHorizontal: 0,
        }}>
        <TouchableOpacity
          style={styles.inbtn}
          onPress={() => {
            drawerNavigation?.closeDrawer();
            props.navigation.navigate('ProgressDaily');
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={require('./../assets/images/myprogress.png')}
              style={{
                width: 22,
                height: 22,
              }}
            />
            <Text style={styles.titledrawer}>My Progress</Text>
          </View>
          <Image
            resizeMode="contain"
            source={require('./../assets/images/whitenav.png')}
            style={{
              width: 12,
              height: 12,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.inbtn}
          onPress={() => {
            drawerNavigation?.closeDrawer();
            props.navigation.navigate('OrderHistory');
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={require('./../assets/images/orderhistory.png')}
              style={{
                width: 22,
                height: 22,
              }}
            />
            <Text style={styles.titledrawer}>Order History</Text>
          </View>
          <Image
            resizeMode="contain"
            source={require('./../assets/images/whitenav.png')}
            style={{
              width: 12,
              height: 12,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.inbtn, styles.activebtn]}
          onPress={() => {
            drawerNavigation?.closeDrawer();
            props.navigation.navigate('Notification');
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={require('./../assets/images/notification.png')}
              style={{
                width: 22,
                height: 22,
              }}
            />
            <Text style={[styles.titledrawer, styles.activetext]}>
              Notifications
            </Text>
          </View>
          <Image
            resizeMode="contain"
            source={require('./../assets/images/back-navs.png')}
            style={{
              width: 12,
              height: 12,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.inbtn}
          onPress={() => {
            drawerNavigation?.closeDrawer();
            props.navigation.navigate('ContactSupportForm');
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={require('./../assets/images/contactsupport1.png')}
              style={{
                width: 22,
                height: 22,
              }}
            />
            <Text style={styles.titledrawer}>Contact Support</Text>
          </View>
          <Image
            resizeMode="contain"
            source={require('./../assets/images/whitenav.png')}
            style={{
              width: 12,
              height: 12,
            }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 'auto',
        }}>
        <TouchableOpacity
          style={styles.dbtn}
          onPress={() => {
            onPressLogout();
          }}>
          <Image
            resizeMode="contain"
            source={require('./../assets/images/logout.png')}
            style={{
              width: 22,
              height: 22,
            }}
          />
          <Text style={styles.titledrawer}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  state: state,
  userDetails: state.profileReducer?.userDetails,
});

const mapDispatchToProps = dispatch => ({
  logoutRequest: (data, navigation) =>
    dispatch(logoutRequest(data, navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.Poppins_Bold,
    color: '#3B2645',
    fontSize: 17,
  },
  titledrawer: {
    fontFamily: Fonts.Poppins_Medium,
    color: '#fff',
    fontSize: 14,
    paddingLeft: 12,
    paddingTop: 5,
  },
  title1: {
    fontFamily: Fonts.Poppins_SemiBold,
    color: '#63C501',
    fontSize: 10,
  },
  innertitle: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#3B2645',
    fontSize: 17,
  },
  checkbtn: {
    borderWidth: 2,
    borderColor: '#B668E7',
    padding: 8,
    paddingHorizontal: 13,
    borderRadius: 1000,
    paddingLeft: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6FF',
  },
  delivered: {
    backgroundColor: '#EFF9E6',
    padding: 10,
    paddingHorizontal: 13,
    borderBottomStartRadius: 14,
    borderTopStartRadius: 14,
    right: -10,
  },
  walletbg: {
    flex: 1,
    padding: 25,
    paddingVertical: 60,
  },
  dbtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9389FE',
    padding: 15,
    borderRadius: 25,
    justifyContent: 'center',
    width: '60%',
    marginTop: 'auto',
  },
  inbtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: 15,
  },
  activebtn: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
  },
  activetext: {
    color: '#000',
  },
});
