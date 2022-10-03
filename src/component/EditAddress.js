import React, {useEffect, useState} from 'react';
import Fonts from '../constants/Fonts';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Image,
  FlatList,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {LinearGradient} from 'react-native-gradients';
import {Dropdown} from 'react-native-element-dropdown';
import {connect} from 'react-redux';
import Loader from '../common/Loader';
import {Header} from '../common/Header';
import {getAddressListRequest} from '../modules/Profile/actions';
import Config from '../constants/Config';

const EditAddress = props => {
  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  const data = [
    {value: '1', label: 'Work'},
    {value: '2', label: 'Home'},
  ];

  const [isFocus, setIsFocus] = useState(false);
  const [name, setName] = useState('');
  const [house, setHouse] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [addresstype, setAddresstype] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isCountryPopup, setIsCountryPopup] = useState(false);
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    getCountryList();
    console.log('params', props.route.params.data);
    let data = props.route.params.data;
    setName(data.name);
    setHouse(data.house_no);
    setCity(data.city);
    setCountry(data.country);
    setZipcode(data.zip_code);
    setAddresstype(data.address_type);
  }, []);

  const onUpdateAddress = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var formdata = new FormData();
    formdata.append('name', name);
    formdata.append('house_no', house);
    formdata.append('city', city);
    formdata.append('country', country);
    formdata.append('zip_code', zipcode);
    formdata.append('address_type', addresstype);
    formdata.append('id', props.route.params.data.id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(Config.BASE_URL + Config.update_address, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 1) {
          showAlert(result.msg);
          // if no need of alert then use below code and comment showAlert
          // props.getAddressListRequest(props.loginData.token);
          // goBack();
        }
        // console.log('result', result)
        setIsLoading(false);
      })
      .catch(error => console.log('error', error));
  };

  const showAlert = msg => {
    Alert.alert('Add address', msg, [
      {
        text: 'OK',
        onPress: () => {
          props.getAddressListRequest(props.loginData.token);
          goBack();
        },
      },
    ]);
  };

  const goBack = () => {
    props.navigation.navigate('ManageAddress');
  };

  const getCountryList = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(Config.BASE_URL + Config.countries, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log('country_list_api_response', result);
        setCountryList(result.data);
      })
      .catch(error => console.log('error', error));
  };

  const _renderItem = dataItem => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: '#fafaff',
          justifyContent: 'center',
          paddingLeft: 10,
          marginBottom: 2,
          borderRadius: 20,
          height: 45,
        }}
        onPress={() => {
          setCountry(dataItem.item.name), setIsCountryPopup(false);
        }}>
        <Text style={styles.selectedTextStyle}>{dataItem.item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.relative}>
      <Header
        title={'Edit Address'}
        onBackPress={() => {
          goBack();
        }}
      />

      <ScrollView style={styles.relative}>
        <View style={styles.container}>
          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Name</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 130}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={name}
              onChangeText={txt => setName(txt)}
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
            <Text style={styles.labelname}>House no.</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 100}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={house}
              onChangeText={txt => setHouse(txt)}
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
            <Text style={styles.labelname}>City</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 90}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={city}
              onChangeText={txt => setCity(txt)}
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

          <TouchableOpacity
            onPress={() => setIsCountryPopup(true)}
            style={[
              styles.inputconatiner,
              styles.input,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: 20,
                paddingRight: 10,
              },
            ]}>
            <Text
              style={{
                fontFamily: Fonts.Poppins_Regular,
                color: '#7B6F72',
                fontSize: 14,
              }}>
              Country
            </Text>

            <Text
              style={[
                {
                  fontFamily: Fonts.Poppins_Regular,
                  color: '#7B6F72',
                  fontSize: 14,
                },
              ]}>
              {country}{' '}
            </Text>
          </TouchableOpacity>

          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Zip Code</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 80}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              value={zipcode}
              onChangeText={txt => setZipcode(txt)}
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

          <View style={styles.inputconatiner12}>
            <Text style={[styles.labelname, styles.labelname1]}>
              Address Type
            </Text>

            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={data}
              search
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? addresstype : '...'}
              searchPlaceholder="Search"
              value={addresstype}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setAddresstype(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => onUpdateAddress()} style={styles.button}>
        <LinearGradient
          style={styles.granew}
          colorList={colorList1}
          angle={200}></LinearGradient>
        <Text style={styles.text}>Update</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isCountryPopup}
        onRequestClose={() => {
          setIsCountryPopup(!isCountryPopup);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {height: 200}]}>
            <TouchableOpacity
              onPress={() => setIsCountryPopup(!isCountryPopup)}
              style={{
                position: 'absolute',
                elevation: 10,
                padding: 10,
                zIndex: 10,
                right: 0,
                top: 0,
              }}>
              <Image
                style={{height: 25, width: 25, tintColor: 'red'}}
                source={require('../../assets/images/whitecross.png')}
              />
            </TouchableOpacity>
            <FlatList data={countryList} renderItem={_renderItem} />
          </View>
        </View>
      </Modal>

      <Loader loading={isLoading} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
});

const mapDispatchToProps = dispatch => ({
  // userDetailsRequest: (data) => dispatch(userDetailsRequest(data)),
  getAddressListRequest: data => dispatch(getAddressListRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAddress);

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
  labelname1: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#7B6F72',
    fontSize: 12,
    position: 'absolute',
    zIndex: 2,
    top: 20,
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
    marginBottom: 10,
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
  inputconatiner12: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
  },
  dropdown: {
    margin: 0,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#F7F8F8',
    paddingHorizontal: 15,
    paddingLeft: 225,
  },
  inputSearchStyle: {
    fontSize: 14,
    top: 0,
    fontFamily: Fonts.Poppins_Regular,
    color: '#3B2645',
  },
  placeholderStyle: {
    fontSize: 14,
    textAlign: 'right',
    fontFamily: Fonts.Poppins_Regular,
    color: '#3B2645',
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: Fonts.Poppins_Regular,
    color: '#3B2645',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
