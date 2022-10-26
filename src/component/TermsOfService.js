import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import Loader from '../common/Loader';
import Config from '../constants/Config';
import Fonts from '../constants/Fonts';

const TermsOfService = props => {
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
    fetch(Config.BASE_URL + '/terms-of-serives?id=2', requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log('TermsOfService ::: ', result);
        if (result.status == 'Token is Expired') {
          showLogoutAlert();
        } else {
          console.log(result.data[0].description);
          let res1 = result.data[0].description;
          setData(res1);
        }
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        console.error('error', error);
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
          {data && (
            <FlatList
              data={data}
              renderItem={({item}) => {
                return (
                  <>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>{item.description}</Text>
                  </>
                );
              }}
            />
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(TermsOfService);

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
  title: {
    fontFamily: Fonts.Poppins_Medium,
    color: '#1D1617',
    fontSize: 14,
  },
  subtitle: {
    color: '#7B6F72',
    fontSize: 12,
    fontFamily: Fonts.Poppins_Regular,
    marginVertical: 8,
  },
});
