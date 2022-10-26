import React, {useEffect, useState, useCallback} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import Loader from '../common/Loader';
import Config from '../constants/Config';
import Fonts from '../constants/Fonts';

const HowToUse = props => {
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
    fetch(Config.BASE_URL + '/how-to-use?id=1', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 'Token is Expired') {
          showLogoutAlert();
        } else {
          console.log(result.data[0].description);
          let res = result.data[0].description;
          setData(res);
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
  const Item = ({item}) => {
    // Read more & Read less... (START)
    const [textShown, setTextShown] = useState(false);
    const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
    const toggleNumberOfLines = () => {
      //To toggle the show text or hide it
      setTextShown(!textShown);
    };

    const onTextLayout = useCallback(e => {
      setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 3 lines or not
      // console.log(e.nativeEvent);
    }, []);
    // Read more & Read less... (END)
    return (
      <View style={{marginBottom: 15}}>
        <Text style={styles.title}>{item.title}</Text>
        <Image
          resizeMode="contain"
          source={{uri: item.image}}
          style={{
            width: '100%',
            height: 227,
          }}
        />
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={textShown ? undefined : 3}
          style={styles.subtitle}>
          {item.description}{' '}
        </Text>
        {lengthMore ? (
          <Text onPress={toggleNumberOfLines} style={{color: '#C068E5'}}>
            {textShown ? 'Read less...' : 'Read more...'}
          </Text>
        ) : null}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.relative}>
      <ScrollView style={styles.relative}>
        <View style={styles.container}>
          {data && (
            <FlatList
              data={data}
              renderItem={({item}) => <Item item={item} />}
            />
          )}
          {/* <Text style={styles.title}>{data.step_1_title}</Text>
          <Image
            resizeMode="contain"
            source={{uri: data.step_1_image}}
            style={{
              width: '100%',
              height: 227,
            }}
          />
          <Text
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : 3}
            style={styles.subtitle}>
            {data.step_1_description}{' '}
          </Text>
          {lengthMore ? (
            <Text onPress={toggleNumberOfLines} style={{color: '#C068E5'}}>
              {textShown ? 'Read less...' : 'Read more...'}
            </Text>
          ) : null}

          <Text style={styles.title}>{data.step_2_title}</Text>
          <Image
            resizeMode="contain"
            source={{uri: data.step_2_image}}
            style={{
              width: '100%',
              height: 125,
            }}
          /> */}

          {/* <Text
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : 3}
            style={styles.subtitle}>
            {data.step_2_description}{' '}
          </Text>
          {lengthMore ? (
            <Text onPress={toggleNumberOfLines} style={{color: '#C068E5'}}>
              {textShown ? 'Read less...' : 'Read more...'}
            </Text>
          ) : null} */}
          {/* <Text style={{color: '#C068E5'}}>Know More...</Text> */}

          {/* <Text style={styles.title}>{data.step_3_title}</Text>
          <Image
            resizeMode="contain"
            source={{uri: data.step_3_image}}
            style={{
              width: '100%',
              height: 227,
            }}
          />
          <Text
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : 3}
            style={styles.subtitle}>
            {data.step_3_description}{' '}
          </Text>
          {lengthMore ? (
            <Text onPress={toggleNumberOfLines} style={{color: '#C068E5'}}>
              {textShown ? 'Read less...' : 'Read more...'}
            </Text>
          ) : null} */}
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

export default connect(mapStateToProps, mapDispatchToProps)(HowToUse);

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
    // marginVertical: 10,
  },
});
