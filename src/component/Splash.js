import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {connect} from 'react-redux';
import Fonts from '../constants/Fonts';

function Splash(props) {
  const navigation = useNavigation();

  useEffect(() => {
    console.log('loginData:::::', props);

    setTimeout(() => {
      // console.log('props.loginData::', props.loginData);
      // navigation.navigate("Login")

      if (props.loginData.success == true) {
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
