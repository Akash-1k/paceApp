import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Fonts from '../constants/Fonts';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import {
  getAddressListRequest,
  userDetailsRequest,
} from '../modules/Profile/actions';
import Config from '../constants/Config';
import Loader from '../common/Loader';
import {Header} from '../common/Header';
import {LinearGradient} from 'react-native-gradients';

const ManageAddress = props => {
  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(null);
  const [isIndex, setIsIndex] = useState(false);

  useEffect(() => {
    props.getAddressListRequest(props.loginData.token);
  }, []);

  const AddAddress = () => {
    props.navigation.navigate('AddAddress');
  };

  const deleteAddress = id => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var formdata = new FormData();
    formdata.append('id', id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setIsLoading(true);

    fetch(Config.BASE_URL + Config.delete_address, requestOptions)
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        props.getAddressListRequest(props.loginData.token);
        setIsIndex(!isIndex);
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  const setDefaultAddress = item => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var formdata = new FormData();
    formdata.append('id', item.id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(Config.BASE_URL + Config.set_default_address, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('result2', result);
        setIsLoading(false);
        setIndex(null);
        setIsIndex(!isIndex);
        props.getAddressListRequest(props.loginData.token);
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  const renderItem = data => {
    return (
      <View style={styles.blogitem}>
        <TouchableOpacity
          onPress={() => {
            setIndex(null);
            setIsIndex(!isIndex);
          }}
          style={styles.blogbody}>
          <Text style={[styles.title1, {paddingBottom: 6}]}>
            {data.item.house_no}, {data.item.city}
          </Text>
          <Text style={styles.subtitle1}>{data.item.country}</Text>
          <Text style={styles.subtitle1}>Zip Code {data.item.zip_code}</Text>
          <Text style={styles.subtitle1}>{data.item.name}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setIsIndex(!isIndex);
            setIndex(data.index);
          }}
          style={styles.dotspos}>
          <Entypo name="dots-three-horizontal" color={'#000'} size={20} />
        </TouchableOpacity>

        {data.index == index && isIndex ? (
          <View style={styles.showBox}>
            <TouchableOpacity
              onPress={() => {
                setIndex(null);
                setIsIndex(!isIndex);
                navigation.navigate('EditAddress', {data: data.item});
              }}>
              <Text style={styles.droptitle}>Edit</Text>
            </TouchableOpacity>
            {data.item.set_default != 1 && (
              <TouchableOpacity
                onPress={() => setDefaultAddress(data.item)}
                style={{
                  paddingVertical: 11,
                }}>
                <Text style={styles.droptitle}>Set Default</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => deleteAddress(data.item.id)}>
              <Text style={[styles.droptitle, {color: '#DF0707'}]}>Delete</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {data.item.set_default == 1 && (
          <View
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(244,172,62,.1)',
              padding: 5,
              paddingHorizontal: 10,
              borderTopStartRadius: 13,
              borderBottomRightRadius: 13,
            }}>
            <Text
              style={[
                styles.title1,
                {
                  fontSize: 12,
                  color: '#F4AC3E',
                },
              ]}>
              {'Default'}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.relative}>
      <Header
        title={'Manage Address'}
        isAdd={true}
        onAddPress={() => AddAddress()}
        onBackPress={() => {
          props.navigation.navigate('Root', {screen: 'TabFour'});
        }}
      />

      {props.addressList.length > 0 ? (
        <FlatList data={props.addressList} renderItem={renderItem} />
      ) : (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/images/empty.png')}
            style={{width: 100, height: 100}}
          />
          <Text style={[styles.title1, {fontSize: 25, textAlign: 'center'}]}>
            {'Please click on +Add button to add address'}
          </Text>
        </View>
      )}
      <Loader loading={isLoading} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
  addressList: state.profileReducer.addressList,
});

const mapDispatchToProps = dispatch => ({
  userDetailsRequest: data => dispatch(userDetailsRequest(data)),
  getAddressListRequest: data => dispatch(getAddressListRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageAddress);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 18,
  },
  relative: {
    flex: 1,
    backgroundColor: '#fff',
  },
  blogitem: {
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 15,
    marginBottom: 20,
    position: 'relative',
    padding: 15,
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  blogbody: {
    position: 'relative',
  },
  title1: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 16,
  },
  subtitle1: {
    color: '#7B6F72',
    fontSize: 12,
    fontFamily: Fonts.Poppins_Regular,
    paddingRight: 50,
  },
  showBox: {
    position: 'absolute',
    top: 32,
    right: 12,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    width: 100,
    zIndex: 2,
    textAlign: 'left',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 5,
  },
  droptitle: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 12,
    color: '#000',
  },
  dotspos: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
});
