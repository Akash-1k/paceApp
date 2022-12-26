import React, {useEffect, useState} from 'react';
import Fonts from '../constants/Fonts';
import {
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import Config from '../constants/Config';
import Loader from '../common/Loader';

const CongratulationsWorkout = props => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [earnedData, setEarnedData] = useState({});

  useEffect(() => {
    getEarnedQuains();
  }, []);

  const getEarnedQuains = () => {
    // console.log('props.exersiseId.id::',props.exersiseId.id);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var formdata = new FormData();
    formdata.append('workout_id', props.playVideoDetails.workout_id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(Config.BASE_URL + Config.earned_coins, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setIsLoading(false);
        setEarnedData(result);
        // console.log('resultresultresult::::::', result)
      })
      .catch(error => console.log('error', error));
  };

  return (
    <ImageBackground
      source={require('../../assets/images/congrts.png')}
      style={styles.walletbg}>
      <Image
        resizeMode="contain"
        source={require('../../assets/images/congrts1.png')}
        style={{
          width: 360,
          height: 360,
        }}
      />
      <View style={styles.flexcoin}>
        <Image
          resizeMode="contain"
          source={require('../../assets/images/coins.png')}
          style={{
            width: 74,
            height: 74,
          }}
        />
        <Text style={styles.heading}>Congratulations</Text>
        <View
          style={{
            width: '80%',
            display: 'flex',
            alignItems: 'center',
          }}>
          <Text style={styles.stitle}>You have completed this workout</Text>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={styles.stitle}>You have earned</Text>
            <ImageBackground
              source={require('../../assets/images/roundbg.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 6,
                marginLeft: 6,
              }}>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Bold,
                  color: '#EC9613',
                  fontSize: 12,
                  position: 'relative',
                  top: 1,
                }}>
                {earnedData.coins != undefined ? earnedData.coins : '0'}
              </Text>
            </ImageBackground>
            <Text style={styles.stitle}>Coins</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Root', {screen: 'TabTwo'})}
        style={styles.btnn}>
        <Text
          style={{
            color: '#A375EF',
            fontSize: 14,
            fontFamily: Fonts.Poppins_SemiBold,
          }}>
          Explore other workouts
        </Text>
      </TouchableOpacity>
      <Loader loading={isLoading} />
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
  playVideoDetails: state.workoutReducer.playVideoDetails,
  exersiseId: state.workoutReducer.exersiseId,
});

const mapDispatchToProps = dispatch => ({
  // workoutDetailsRequest: (data) => dispatch(workoutDetailsRequest(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CongratulationsWorkout);

const styles = StyleSheet.create({
  walletbg: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 24,
    color: '#fff',
    marginVertical: 12,
    marginBottom: 0,
  },
  stitle: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  flexcoin: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
  },
  btnn: {
    position: 'relative',
    backgroundColor: '#fff',
    padding: 20,
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 1000,
    marginTop: 70,
  },
});
