import React, {useState} from 'react';
import Fonts from '../constants/Fonts';
import {connect} from 'react-redux';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {LinearGradient} from 'react-native-gradients';
import {useNavigation, useRoute} from '@react-navigation/native';
import Loader from '../common/Loader';
import {
  useStripe,
  useConfirmPayment,
  usePaymentSheet,
} from '@stripe/stripe-react-native';
import {useEffect} from 'react';
import Config from '../constants/Config';
import {getCartRequest} from '../modules/Shop/actions';
import {getHomeRequested} from '../modules/Home/actions';
import {workoutListRequest} from '../modules/Workout/actions';
import {showAlert} from '../utils/CommonFunctions';

const Checkout = props => {
  const navigation = useNavigation();
  const route = useRoute();

  const {addressDetails, cardDetails, redeemedCoins, pervScreen} = route.params;

  const [tax, setTax] = useState(8);
  const [shipping, setShipping] = useState(5);
  const [totalAmount1, setTotalAmount1] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  //   let totalAmount1 = 0;
  let totalAmount = 0;
  {
    props.cartItemData.map(e => (totalAmount += e.price * e.add_cart_stock));
  }

  const onCheckout = async ({id, status}) => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${props.loginData.token}`);

    var formdata = new FormData();

    formdata.append(
      'products',
      JSON.stringify(pervScreen ? [] : props.cartItemData),
    );

    formdata.append('status', status == 'succeeded' ? 1 : 0); // '0' --> fail and '1' --> success
    formdata.append('payment_status', status == 'succeeded' ? 1 : 0); //'0' --> fail and '1' --> success
    formdata.append('type', pervScreen ? 2 : 1); // ('1 = Products, 2 = Workout')
    formdata.append('shipping_tax', pervScreen ? 0 : shipping);
    formdata.append('additional_tax', tax);
    formdata.append('coins_used', parseInt(redeemedCoins));
    formdata.append(
      'discount_applied',
      parseInt(redeemedCoins) * Config.reward_coin_value,
    ); // redeemedCoins * 0.2
    formdata.append('total_amount', parseFloat(totalAmount1));
    formdata.append(
      'card_info',
      `  ${cardDetails.brand} ends with ${cardDetails.last_four}`,
    ); // last line in payment card ends with 0000
    formdata.append('transaction_id', id);
    formdata.append('address_id', addressDetails.id);
    {
      pervScreen && formdata.append('premium_price', 9.9);
    }
    formdata.append('order_notes', '');
    formdata.append('link', 'Workout');

    // formdata.append('type', addressDetails.id);

    console.log('formdata ::::::', formdata);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      headers: myHeaders,
      redirect: 'follow',
    };

    const res = await fetch(Config.BASE_URL + Config.checkout, requestOptions);
    // console.log('res ====>', res.json());
    return res;
  };

  const createPaymentIntents = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + Config.Strip_SK);
    myHeaders.append(
      'Content-Type',
      'application/x-www-form-urlencoded;charset=UTF-8',
    );

    var details = {
      // amount: parseInt(totalAmount1).toFixed(0) * 100,
      amount: parseInt((totalAmount1 * 100).toFixed(0)),
      currency: 'usd',
      // payment_method_types: ['card'],
      customer: props.userDetails.user.customerid,
      payment_method: cardDetails.token,
      off_session: true,
      confirm: true,
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
    setIsLoading(true);
    fetch(
      Config.STRIP_BASE_URL + Config.strip_create_payment_intents,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          console.log('ADD transaction failed screen', result);
          navigation.navigate('OrderFail');
          setIsLoading(false);
        } else {
          console.log(result);
          onCheckout(result)
            .then(res => res.json())
            .then(res => {
              console.log('onCheckout ----- result', res);
              setIsLoading(false);
              if (res.status) {
                if (pervScreen) {
                  props.workoutListRequest({
                    token: props.loginData.token,
                    search: '',
                  });
                  navigation.navigate('TabTwo');
                } else {
                  props.getCartRequest(props.loginData.token);
                  props.getHomeRequested(props.loginData.token);
                  navigation.navigate('OrderSuccess');
                }
              } else {
                console.log('ADD transaction failed screen', result);
                navigation.navigate('OrderFail');
                // setIsLoading(false);
              }
            })
            .catch(error => console.log('error', error));
        }
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (pervScreen) {
      setTotalAmount1(
        (9.9 + tax - parseInt(redeemedCoins ? redeemedCoins : 0) * 0.2).toFixed(
          2,
        ),
      );
    } else {
      setTotalAmount1(
        (
          totalAmount +
          tax +
          shipping -
          parseInt(redeemedCoins ? redeemedCoins : 0) * 0.2
        ).toFixed(2),
      );
    }
  }, []);

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];
  return (
    <SafeAreaView style={styles.relative}>
      <ScrollView style={styles.relative}>
        <View style={styles.container}>
          <View style={styles.blogitem}>
            <View style={styles.blogbody}>
              <Text style={styles.title1}>Delivery Address</Text>
              <Text style={styles.textgray}>Order Address</Text>
              <Text
                style={[styles.subtitle1, {fontFamily: Fonts.Poppins_Medium}]}>
                {addressDetails.house_no} {addressDetails.city},{' '}
                {addressDetails.country}
                {'\n'}Zip Code {addressDetails.zip_code}
              </Text>
              <Text style={[styles.textgray, {marginTop: 6}]}>
                Receiver's Name
              </Text>
              <Text
                style={[
                  styles.subtitle1,
                  {fontFamily: Fonts.Poppins_Medium, marginBottom: 6},
                ]}>
                {addressDetails.name}
              </Text>
              <Text style={styles.textgray}>Payment Method</Text>
              <Text
                style={[styles.subtitle1, {fontFamily: Fonts.Poppins_Medium}]}>
                {cardDetails.brand} ends with {cardDetails.last_four}
              </Text>
            </View>
          </View>

          <Text style={[styles.sText, {marginBottom: 5}]}>Order Info</Text>
          {pervScreen ? (
            <>
              <View style={styles.flexdir}>
                <Text style={styles.sText1}>Premium Workout</Text>
                <Text style={styles.sPrice1}>$9.90</Text>
              </View>
              {redeemedCoins != 0 && (
                <View style={styles.flexdir}>
                  <Text style={styles.sText1}>Wallet Discount</Text>
                  <Text style={[styles.sPrice1, {color: '#3ABB25'}]}>
                    -${(parseInt(redeemedCoins) * 0.2).toFixed(2)}
                  </Text>
                </View>
              )}
              <View style={styles.flexdir}>
                <Text style={styles.sText1}>Taxes</Text>
                <Text style={styles.sPrice1}>${tax.toFixed(2)}</Text>
              </View>
              <View style={[styles.flexdir, {marginBottom: 10}]}>
                <Text style={styles.sGoal2}> Total</Text>
                <Text style={styles.sText2}>${totalAmount1}</Text>
              </View>
            </>
          ) : (
            <>
              <FlatList
                data={props.cartItemData}
                renderItem={({item}) => (
                  <View style={styles.flexdir}>
                    <Text style={styles.sText1}>
                      {item.product_name}
                      {'\n'}
                      {item.size_name} | {item.color_name} | x
                      {item.add_cart_stock}
                    </Text>
                    <Text style={styles.sPrice1}>
                      ${(item.price * item.add_cart_stock).toFixed(2)}
                    </Text>
                  </View>
                )}
              />
              <View style={styles.flexdir}>
                <Text style={styles.sText1}>Taxes</Text>
                <Text style={styles.sPrice1}>${tax.toFixed(2)}</Text>
              </View>

              <View style={styles.flexdir}>
                <Text style={styles.sText1}>Shipping</Text>
                <Text style={styles.sPrice1}>${shipping.toFixed(2)}</Text>
              </View>

              {redeemedCoins != 0 && (
                <View style={styles.flexdir}>
                  <Text style={styles.sText1}>Wallet Discount</Text>
                  <Text style={[styles.sPrice1, {color: '#3ABB25'}]}>
                    -${(parseInt(redeemedCoins) * 0.2).toFixed(2)}
                  </Text>
                </View>
              )}
              <View style={[styles.flexdir, {marginBottom: 10}]}>
                <Text style={styles.sGoal2}>
                  {' '}
                  Total ( {props?.cartItemData?.length}{' '}
                  {props?.cartItemData?.length > 1 ? 'items' : 'item'} )
                </Text>
                <Text style={styles.sText2}>${totalAmount1}</Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          createPaymentIntents();
          // openPaymentSheet();
        }}
        style={styles.button}>
        <LinearGradient
          style={styles.granew}
          colorList={colorList1}
          angle={200}></LinearGradient>
        <Text style={styles.text}>Confirm and pay</Text>
      </TouchableOpacity>
      <Loader loading={isLoading} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  cardList: state.profileReducer.cardList,
  addressList: state.profileReducer.addressList,
  homeData: state.homeReducer?.homeData,
  cartItemData: state.shopReducer.cartItemData,
  userDetails: state.profileReducer.userDetails,
});

const mapDispatchToProps = dispatch => ({
  getCardListRequest: data => dispatch(getCardListRequest(data)),
  getAddressListRequest: data => dispatch(getAddressListRequest(data)),
  getCartRequest: data => dispatch(getCartRequest(data)),
  getHomeRequested: data => dispatch(getHomeRequested(data)),
  workoutListRequest: data => dispatch(workoutListRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 15,
  },
  relative: {
    position: 'relative',
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  blogitem: {
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
    position: 'relative',
    padding: 20,
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
    paddingRight: 30,
  },
  textgray: {
    color: '#7B6F72',
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 12,
    opacity: 0.6,
  },
  sText: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 16,
    color: '#3B2645',
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
  text1: {
    position: 'absolute',
    zIndex: 2,
  },
  sText: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 16,
    color: '#3B2645',
  },
  sText1: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 14,
    color: '#3B2645',
    opacity: 0.4,
  },
  sPrice1: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: 14,
    color: '#3B2645',
  },
  flexdir: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sGoal1: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 12,
    color: '#737A7B',
  },
  sGoal2: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 12,
    color: '#3B2645',
  },
  sText2: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 20,
    color: '#3B2645',
  },
  granew: {
    flex: 1,
    flexGrow: 1,
  },
});
