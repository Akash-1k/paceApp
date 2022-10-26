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
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import {TextInput, Provider, Checkbox} from 'react-native-paper';
import {LinearGradient} from 'react-native-gradients';
import {Dropdown} from 'react-native-element-dropdown';
import {connect} from 'react-redux';
import Loader from '../common/Loader';
import Config from '../constants/Config';
import {getAddressListRequest} from '../modules/Profile/actions';
import {showAlert} from '../utils/CommonFunctions';

const AddAddress = props => {
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
  const [house_no, setHousNo] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [address_type, setAddressType] = useState('');

  const [defaultAddress, setDefaultAddress] = useState(false);

  const [nameMsg, setNameMsg] = useState('');
  const [house_noMsg, setHousNoMsg] = useState('');
  const [cityMsg, setCityMsg] = useState('');
  const [countryMsg, setCountryMsg] = useState('');
  const [zip_codeMsg, setZipCodeMsg] = useState('');
  const [address_typeMsg, setAddressTypeMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCountryPopup, setIsCountryPopup] = useState(false);
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    getCountryList();
  }, []);

  const onAddAddress = () => {
    var nameValid = false;
    var houseValid = false;
    var cityValid = false;
    var zipValid = false;
    var countryValid = false;
    var addressTypeValid = false;

    if (name == '') {
      nameValid = true;
    }
    if (house_no == '') {
      houseValid = true;
    }
    if (city == '') {
      cityValid = true;
    }
    if (zip_code == '') {
      zipValid = true;
    }

    if (nameValid) {
      setNameMsg('Please Enter name');
      nameValid = true;
    } else {
      setNameMsg('');
    }

    if (houseValid) {
      setHousNoMsg('Please Enter House Number');
      houseValid = true;
    } else {
      setHousNoMsg('');
    }

    if (cityValid) {
      setCityMsg('Please Enter City');
      cityValid = false;
    } else {
      setCityMsg('');
    }

    if (zipValid) {
      setZipCodeMsg('Please Enter Zip Code');
      zipValid = true;
    } else {
      setZipCodeMsg('');
    }

    if (country == '') {
      setCountryMsg('Please Enter Country');
      countryValid = true;
    } else {
      setCountryMsg('');
    }

    if (address_type == '') {
      setAddressTypeMsg('Please Select Address Type');
      addressTypeValid = true;
    } else {
      setAddressTypeMsg('');
    }
    if (
      zipValid ||
      cityValid ||
      houseValid ||
      nameValid ||
      countryValid ||
      addressTypeValid
    ) {
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var formdata = new FormData();
    formdata.append('name', name);
    formdata.append('house_no', house_no);
    formdata.append('city', city);
    formdata.append('country', country);
    formdata.append('zip_code', zip_code);
    formdata.append('address_type', address_type);
    formdata.append('set_default', defaultAddress ? 1 : 0);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    setIsLoading(true);
    fetch(Config.BASE_URL + Config.add_address, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 1) {
          showAlert('Address added successfully!');
          props.getAddressListRequest(props.loginData.token);
          props.navigation.goBack();
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);
      });
  };

  // const showAlert = msg => {
  //   Alert.alert('Add address', msg, [
  //     {
  //       text: 'OK',
  //       onPress: () => {
  //         props.getAddressListRequest(props.loginData.token);
  //         props.navigation.goBack();
  //       },
  //     },
  //   ]);
  // };

  const getCountryList = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://dev.indiit.solutions/pace/public/api/countries',
      requestOptions,
    )
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
          setCountry(dataItem.item.name);
          setCountryMsg('');
          setIsCountryPopup(false);
        }}>
        <Text style={styles.selectedTextStyle}>{dataItem.item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Provider>
      <SafeAreaView style={styles.relative}>
        <ScrollView style={styles.relative}>
          <View style={styles.container}>
            <View style={styles.inputconatiner}>
              <Text style={styles.labelname}>Name</Text>
              <TextInput
                onChangeText={txt => {
                  setName(txt);
                  if (txt == '') {
                    setNameMsg('Please Enter name');
                  } else {
                    setNameMsg('');
                  }
                }}
                style={[styles.input, {}]}
                underlineColor={'transparent'}
                selectionColor="#3B2645"
                placeholder="Enter Name"
                value={name}
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
            {nameMsg != '' ? (
              <Text style={styles.onAlert}>{nameMsg}</Text>
            ) : null}

            <View style={styles.inputconatiner}>
              <Text style={styles.labelname}>House no.</Text>
              <TextInput
                keyboardType="number-pad"
                onChangeText={txt => {
                  setHousNo(txt);
                  if (txt != '') {
                    setHousNoMsg('');
                  } else {
                    setHousNoMsg('Please Enter House Number');
                  }
                }}
                style={[styles.input, {paddingLeft: 100}]}
                underlineColor={'transparent'}
                selectionColor="#3B2645"
                placeholder="House no."
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
            {house_noMsg != '' ? (
              <Text style={styles.onAlert}>{house_noMsg}</Text>
            ) : null}

            <View style={styles.inputconatiner}>
              <Text style={styles.labelname}>City</Text>
              <TextInput
                onChangeText={txt => {
                  setCity(txt);
                  if (txt != '') {
                    setCityMsg('');
                  } else {
                    setCityMsg('Please Enter City');
                  }
                }}
                style={[styles.input, {paddingLeft: 90}]}
                underlineColor={'transparent'}
                selectionColor="#3B2645"
                placeholder="City"
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
            {cityMsg != '' ? (
              <Text style={styles.onAlert}>{cityMsg}</Text>
            ) : null}

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
            {countryMsg != '' ? (
              <Text style={styles.onAlert}>{countryMsg}</Text>
            ) : null}

            <View style={styles.inputconatiner}>
              <Text style={styles.labelname}>Zip Code</Text>
              <TextInput
                keyboardType="number-pad"
                onChangeText={txt => {
                  setZipCode(txt);
                  if (txt != '') {
                    setZipCodeMsg('');
                  } else {
                    setZipCodeMsg('Please Enter Zip Code');
                  }
                }}
                style={[styles.input, {paddingLeft: 80}]}
                underlineColor={'transparent'}
                selectionColor="#3B2645"
                placeholder="Zip Code"
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
            {zip_codeMsg != '' ? (
              <Text style={styles.onAlert}>{zip_codeMsg}</Text>
            ) : null}

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
                // search
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Choose' : '...'}
                searchPlaceholder="Search"
                value={address_type}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setAddressTypeMsg('');
                  setAddressType(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
            {address_typeMsg != '' ? (
              <Text style={[styles.onAlert, {top: 0}]}>{address_typeMsg}</Text>
            ) : null}
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                // justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Checkbox
                status={defaultAddress ? 'checked' : 'unchecked'}
                color={'rgba(50,50,50,0.5)'}
                onPress={() => {
                  setDefaultAddress(!defaultAddress);
                }}
              />
              <Text>Set Default Address</Text>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity onPress={onAddAddress} style={styles.button}>
          <LinearGradient
            style={styles.granew}
            colorList={colorList1}
            angle={200}></LinearGradient>
          <Text style={styles.text}>Add Address</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isCountryPopup}
          onRequestClose={() => {
            setIsCountryPopup(!isCountryPopup);
          }}>
          <View style={[styles.centeredView]}>
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
    </Provider>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
});

const mapDispatchToProps = dispatch => ({
  //   userDetailsRequest: data => dispatch(userDetailsRequest(data)),
  getAddressListRequest: data => dispatch(getAddressListRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);

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

  inputconatiner12: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
  },

  onAlert: {
    opacity: 0.5,
    fontSize: 14,
    fontFamily: Fonts.Poppins_Regular,
    color: 'red',
    top: -10,
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
