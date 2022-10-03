import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Paragraph} from 'react-native-paper';
import {connect} from 'react-redux';
import Loader from '../common/Loader';
import Config from '../constants/Config';
import Fonts from '../constants/Fonts';

const AboutMission = props => {
  const [data, setData] = useState({});
  const [isLoading, setLoader] = useState(false);

  useEffect(() => {
    getHowToUse();
  }, []);

  const getHowToUse = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    setLoader(true);
    fetch(Config.BASE_URL + '/about-mission?id=4', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('AboutMission ::::', result);
        if (result.status == 'Token is Expired') {
          showLogoutAlert();
        } else {
          let res1 = result.data[0].description;
          setData(res1);
        }
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        console.log('error', error);
      });
  };

  const showLogoutAlert = () =>
    Alert.alert(
      'PaceApp',
      'Login session expired please logout and login again!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Logout', onPress: () => props.navigation.navigate('Login')},
      ],
    );

  return (
    <SafeAreaView style={styles.relative}>
      <ScrollView style={styles.relative}>
        <View style={styles.container}>
          <View style={styles.startimg}>
            <Image
              source={{uri: data.image}}
              style={{
                width: '100%',
                height: 390,
                resizeMode: 'cover',
              }}
            />
            <Image
              resizeMode="cover"
              source={require('../../assets/images/topshadow.png')}
              style={{
                width: '100%',
                height: 355,
                position: 'absolute',
                top: 0,
              }}
            />
          </View>

          <View style={styles.box}>
            <Text style={styles.title}>{data.title}</Text>
            <Paragraph style={[styles.subtitle, {marginBottom: 10}]}>
              {data.description}
            </Paragraph>
          </View>
        </View>
      </ScrollView>

      <Loader loading={isLoading} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
  shopCategoryList: state.shopReducer.shopCategoryList,
});

const mapDispatchToProps = dispatch => ({
  // userDetailsRequest: (data) => dispatch(userDetailsRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutMission);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  relative: {
    position: 'relative',
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  box: {
    backgroundColor: '#fff',
    padding: 25,
  },
  startimg: {},
  title: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 18,
    lineHeight: 32,
  },
  subtitle: {
    color: '#7B6F72',
    fontSize: 13,
    fontFamily: Fonts.Poppins_Regular,
  },
});
