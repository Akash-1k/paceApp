import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {LinearGradient} from 'react-native-gradients';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {contactSupportRequest} from '../modules/Login/actions';
import Fonts from '../constants/Fonts';
import Config from '../constants/Config';

const ContactSupport = props => {
  const countries = [
    'Organization',
    'Organization 1',
    'Organization 2',
    'Organization 3',
  ];

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  const [name, setName] = useState('');
  const [govt_id, setGovtId] = useState('');
  const [organization_id, setOrganizationId] = useState('');
  const [organization, setOrganization] = useState('Select Organization');

  const [isNameValid, setIsNameValid] = useState('');
  const [isGovtId, setIsValidGovtId] = useState('');
  const [isOrganization, setIsOrganization] = useState('');
  const [organizationList, setOrganizationList] = useState([]);
  const [isOpened, setOpenOrg] = useState(false);
  const [layout, setLayout] = useState({});

  useEffect(() => {
    getOrganizationList();
  }, []);

  const nameValidation = txt => {
    if (txt == '') {
      setIsNameValid('Please Enter Name *');
    } else if (txt.length < 3) {
      setIsNameValid('Name must be 3 letters *');
    } else {
      setIsNameValid('valid');
    }
  };

  const getOrganizationList = () => {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
    };

    fetch(Config.BASE_URL + Config.organizations, requestOptions)
      .then(response => response.json())
      .then(result => {
        setOrganizationList(result.data);
        console.log('ORG::', result.data);
      })
      .catch(error => console.log('error', error));
  };

  const onSendForAproval = () => {
    if (name == '' && govt_id == '' && organization_id == '') {
      setIsNameValid('Please Enter Name *');
      setIsValidGovtId('Please Enter Govt. ID *');
      setIsOrganization('Please Select Organization *');
      return;
    }

    if (name == '') {
      setIsNameValid('Please Enter Name *');
      if (govt_id == '') {
        setIsValidGovtId('Please Enter Govt. ID *');
        if (organization_id == '') {
          setIsOrganization('Please Select Organization *');
        }
      } else {
        if (organization_id == '') {
          setIsOrganization('Please Select Organization *');
        }
      }
      return;
    } else {
      if (govt_id == '') {
        setIsValidGovtId('Please Enter Govt. ID *');

        if (organization_id == '') {
          setIsOrganization('Please Select Organization *');
        }
      }
    }

    if (name == '') {
      setIsNameValid('Please Enter Name *');
      return;
    }

    if (govt_id == '') {
      setIsNameValid('valid');
      setIsValidGovtId('Please Enter Govt. ID *');
      return;
    }

    if (organization_id == '') {
      setIsValidGovtId('valid');
      setIsOrganization('Please Select Organization *');
      return;
    }

    setIsNameValid('valid');
    setIsValidGovtId('valid');
    setIsOrganization('valid');

    var formdata = new FormData();
    formdata.append('name', name);
    formdata.append('govt_id', govt_id);
    formdata.append('organization_id', organization_id);

    let navigation = {
      navigation: () => props.navigation.navigate('Pending'),
    };
    props.contactSupportRequest(formdata, navigation);
  };

  // console.log('contactSupportData::1', props.contactSupportData);
  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          setOrganization(item.item.name);
          setOrganizationId(item.item.id);
          setIsOrganization('valid');
          setOpenOrg(false);
        }}
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          backgroundColor: '#F7F8F8',
          height: 54,
          alignItems: 'center',
          borderRadius: 5,
          marginTop: 10,
        }}>
        <Image
          resizeMode="contain"
          source={require('../../assets/images/org.png')}
          style={{height: 20, width: 20}}
        />
        <Text style={[styles.subtitle, {marginLeft: 10}]}>
          {item.item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainbg}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.conatiner}>
          <View style={styles.lgcontainer}>
            <View style={styles.inputconatiner}>
              <TextInput
                onChangeText={txt => {
                  setName(txt);
                  nameValidation(txt);
                }}
                style={styles.input}
                underlineColor={'transparent'}
                selectionColor="#3B2645"
                placeholderTextColor={'#3B2645'}
                placeholder="Name"
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
              <Image
                resizeMode="contain"
                source={require('../../assets/images/user.png')}
                style={styles.icon}
              />
            </View>
            {isNameValid != 'valid' ? (
              <Text style={[styles.subtitle, {color: 'red', bottom: 15}]}>
                {isNameValid}
              </Text>
            ) : null}

            <View style={styles.inputconatiner}>
              <TextInput
                onChangeText={txt => {
                  setGovtId(txt);
                  if (txt == '') {
                    setIsValidGovtId('Please Enter Govt. ID *');
                  } else {
                    setIsValidGovtId('');
                    setIsValidGovtId('valid');
                  }
                }}
                style={styles.input}
                underlineColor={'transparent'}
                selectionColor="#3B2645"
                placeholderTextColor={'#3B2645'}
                placeholder="Enter Govt. ID"
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
              <Image
                resizeMode="contain"
                source={require('../../assets/images/email.png')}
                style={styles.icon}
              />
            </View>
            {isGovtId != 'valid' ? (
              <Text style={[styles.subtitle, {color: 'red', bottom: 15}]}>
                {isGovtId}
              </Text>
            ) : null}

            <TouchableOpacity
              onLayout={e => setLayout(e.nativeEvent.layout)}
              onPress={() => {
                setOpenOrg(!isOpened);
              }}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                backgroundColor: '#F7F8F8',
                height: 54,
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 15,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/images/org.png')}
                  style={{height: 20, width: 20}}
                />
                <Text style={[styles.subtitle, {marginLeft: 10}]}>
                  {organization}
                </Text>
              </View>
              <FontAwesome
                name={isOpened ? 'chevron-up' : 'chevron-down'}
                color={'#3B2645'}
                size={14}
                style={{
                  position: 'relative',
                  right: -5,
                }}
              />
            </TouchableOpacity>

            {isOpened ? (
              <View>
                <FlatList
                  contentContainerStyle={{paddingVertical: 5}}
                  data={organizationList}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => 'key' + index}
                />
              </View>
            ) : null}
            {isOrganization != 'valid' ? (
              <Text style={[styles.subtitle, {color: 'red'}]}>
                {isOrganization}
              </Text>
            ) : null}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => onSendForAproval()}
        style={styles.button}>
        <LinearGradient colorList={colorList1} angle={200} />
        <Text style={styles.text}>Send For Approval</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  contactSupportData: state.loginReducer.contactSupportData,

  signupSucessData: state.signupReducer.signupSucessData,
});

const mapDispatchToProps = dispatch => ({
  contactSupportRequest: (data, navigation) =>
    dispatch(contactSupportRequest(data, navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactSupport);

const styles = StyleSheet.create({
  mainbg: {
    backgroundColor: '#fff',
    flex: 1,
  },
  conatiner: {
    position: 'relative',
    flex: 1,
    paddingTop: 8,
  },
  lgcontainer: {
    paddingHorizontal: 20,
  },
  inputconatiner: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
  },
  inputconatiner1: {
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 15,
    width: '100%',
  },
  input: {
    height: 54,
    backgroundColor: '#F7F8F8',
    paddingLeft: 40,
    fontSize: 14,
    color: '#3B2645',
  },
  icon: {
    position: 'absolute',
    top: 18,
    left: 20,
    width: 16,
    height: 16,
  },
  icon1: {
    position: 'absolute',
    top: 18,
    left: 20,
    width: 18,
    height: 18,
  },
  lefttext: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  button: {
    position: 'relative',
    height: 60,
    borderRadius: 1000,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
    marginHorizontal: 15,
  },
  text: {
    position: 'absolute',
    zIndex: 1,
    fontFamily: Fonts.Poppins_Bold,
    color: '#fff',
    fontSize: 16,
  },
});
