import {useNavigation} from '@react-navigation/native';
import {CardField, createToken} from '@stripe/stripe-react-native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {LinearGradient} from 'react-native-gradients';
import {TextInput, Checkbox} from 'react-native-paper';
import {connect} from 'react-redux';
import Loader from '../common/Loader';
import Config from '../constants/Config';
import Fonts from '../constants/Fonts';
import {
  getCardListRequest,
  userDetailsRequest,
} from '../modules/Profile/actions';
import {showAlert} from '../utils/CommonFunctions';

const AddCard = props => {
  const navigation = useNavigation();

  const [cardName, setCardName] = useState('');
  const [bankName, setBankName] = useState('');
  const [cardInput, setCardInput] = useState({});
  //   const [cvv, setCvv] = useState('');
  //   const [cardNumber, setCardNumber] = useState('');
  //   const [expiryDate, setExpiryDate] = useState('');
  const [defaultCard, setDefaultCard] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  useEffect(() => {
    if (props.userDetails.user.email == null) {
      Alert.alert('Please Provide Email !!!', '', [
        {
          text: 'Cancel',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => navigation.navigate('Account')},
      ]);
      return;
    }
  }, []);

  const onSave = () => {
    setIsLoading(true);
    createToken({
      type: 'Card',
      address: {country: 'IN'},
      name: cardName,
    })
      .then(result => {
        if (result.error) {
          showAlert(result.error.message);
          setIsLoading(false);
        } else {
          if (props.userDetails.user.customerid == null) {
            setIsLoading(true);
            createCustomer()
              .then(response => response.json())
              .then(res => {
                if (res.error) {
                  console.log(res.error);
                  setIsLoading(false);
                } else {
                  addCardDetails(result.token, res.id);
                  setIsLoading(false);
                }
              })
              .catch(error => {
                console.log('error', error);
                showAlert('Add to fail card!!!!');
                setIsLoading(false);
              });
          } else {
            addCardDetails(result.token, props.userDetails.user.customerid);
          }
        }
      })
      .catch(err => {
        console.log('errrrrerrerrerrer ADD CARD Comp', err);
        // alert('Something went wrong');
      });
  };

  const createCustomer = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + Config.Strip_SK);
    myHeaders.append(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=UTF-8',
    );

    var details = {
      email: props.userDetails.user.email,
      name: props.userDetails.user.name,
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formBody,
      redirect: 'follow',
    };

    const res = await fetch(
      Config.STRIP_BASE_URL + Config.strip_create_customers,
      requestOptions,
    );
    return res;
  };

  const attachCardToCustomer = async (token, customerid) => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + Config.Strip_SK);
    myHeaders.append(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=UTF-8',
    );

    var details = {
      source: token,
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formBody,
      redirect: 'follow',
    };

    const res = await fetch(
      `${Config.STRIP_BASE_URL}${Config.strip_create_customers}/${customerid}/sources`,
      requestOptions,
    );
    return res;
  };

  const addCardDetails = (token, customerid) => {
    setIsLoading(true);
    attachCardToCustomer(token.id, customerid)
      .then(response => response.json())
      .then(res => {
        if (res.error) {
          console.log(res.error.message);
        } else {
          var myHeaders = new Headers();
          myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

          var formdata = new FormData();
          formdata.append('type', token.type);
          formdata.append('bank_name', bankName);
          formdata.append('brand', token.card.brand);
          formdata.append('token', res.id);
          formdata.append('last_four', token.card.last4);
          formdata.append('default', defaultCard ? '1' : '0');

          formdata.append('customer_id', customerid);
          formdata.append(
            'expiry_date',
            token.card.expMonth + '/' + token.card.expYear,
          );
          formdata.append('cvv', cardInput.validCVC);
          formdata.append('customer_name', token.card.name);

          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
          };
          setIsLoading(true);

          fetch(Config.BASE_URL + Config.add_payment_cards, requestOptions)
            .then(response => response.json())
            .then(result => {
              if (result.status == 1) {
                setIsLoading(false);
                props.getCardListRequest(props.loginData.token);
                props.userDetailsRequest({token: props.loginData.token});
                navigation.goBack();

                console.log('resultresult:::', result);
              } else {
                alert(result.error);
                setIsLoading(false);
              }
            })
            .catch(error => {
              setIsLoading(false);
              console.log('error', error);
            });
        }
      })
      .catch(err => console.log('ERROR :::', err));
  };

  return (
    <SafeAreaView style={styles.relative}>
      <ScrollView style={styles.relative}>
        <View style={styles.container}>
          <View style={styles.inputconatiner}>
            <Text style={styles.labelname}>Card Holder Name</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 130}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              placeholder="Card Holder Name"
              onChangeText={txt => setCardName(txt)}
              value={cardName}
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
            <Text style={styles.labelname}>Bank Name</Text>
            <TextInput
              style={[styles.input, {paddingLeft: 90}]}
              underlineColor={'transparent'}
              selectionColor="#3B2645"
              placeholder="Enter Bank Name"
              onChangeText={txt => setBankName(txt)}
              value={bankName}
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

          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{backgroundColor: '#F7F8F8', borderRadius: 15}}
            style={{
              width: '100%',
              height: 54,
            }}
            onCardChange={card => {
              // console.log(card);
              setCardInput(card);
            }}
          />
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              // justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Checkbox
              status={defaultCard ? 'checked' : 'unchecked'}
              color={'rgba(50,50,50,0.5)'}
              onPress={() => {
                setDefaultCard(!defaultCard);
              }}
            />
            <Text>Set Default Card</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => onSave()} style={styles.button}>
        <LinearGradient
          style={styles.granew}
          colorList={colorList1}
          angle={200}></LinearGradient>
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>

      <Loader loading={isLoading} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
});

const mapDispatchToProps = dispatch => ({
  getCardListRequest: data => dispatch(getCardListRequest(data)),
  userDetailsRequest: data => dispatch(userDetailsRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);

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
    marginBottom: 15,
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
});
