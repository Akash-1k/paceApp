import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Entypo from 'react-native-vector-icons/Entypo';
import Zocial from 'react-native-vector-icons/Zocial';
import {TextInput} from 'react-native-paper';
import {LinearGradient} from 'react-native-gradients';
import {useNavigation, useRoute} from '@react-navigation/native';
import Fonts from '../constants/Fonts';
import {connect} from 'react-redux';
import {
  getCardListRequest,
  getAddressListRequest,
} from '../modules/Profile/actions';
import {PaymentIcon} from 'react-native-payment-icons';

const exampleItems = [
  {
    title: 'Item 1',
    text: 'Text 1',
  },
  {
    title: 'Item 2',
    text: 'Text 2',
  },
  {
    title: 'Item 3',
    text: 'Text 3',
  },
  {
    title: 'Item 4',
    text: 'Text 4',
  },
  {
    title: 'Item 5',
    text: 'Text 5',
  },
];

const PaymentMethod = props => {
  const navigation = useNavigation();
  const route = useRoute();

  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState(exampleItems);
  const [address, setAddress] = useState();
  const [card, setCard] = useState();
  const [showAddress, setShowAddress] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showSelectedCoins, setShowSelectedCoins] = useState(false);

  const [coinsValid, setCoinsValid] = useState('valid');
  const [addressVaild, setAddressVaild] = useState('valid');
  const [cardVaild, setCardVaild] = useState('valid');
  const ref = useRef(null);

  const [coins, setCoins] = useState('0');

  useEffect(() => {
    props.getCardListRequest(props.loginData.token);
    props.getAddressListRequest(props.loginData.token);
  }, []);
  let totalAmount = 0;
  {
    props.cartItemData.map(e => (totalAmount += e.price * e.add_cart_stock));
  }

  useEffect(() => {
    if (props.addressList != []) {
      props.addressList.forEach((e, i) => {
        if (e.set_default == 1) {
          setAddress(e);
        }
      });
    }
    if (props.addressList.length > 0) {
      setAddressVaild('valid');
    }
  }, [props.addressList]);

  useEffect(() => {
    if (props.cardList != []) {
      props.cardList.forEach((e, i) => {
        if (e.default == '1') {
          setCard(e);
        }
      });
    }
    if (props.cardList.length > 0) {
      setCardVaild('valid');
    }
  }, [props.cardList]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: !showAddress,
    });
  }, [showAddress]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: !showCard,
    });
  }, [showCard]);

  const AddressItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          setAddress(item);
          setShowAddress(false);
        }}
        style={styles.blogitem}>
        <View style={styles.blogbody}>
          <Text style={styles.title1}>
            {item.name} - {item.address_type == '1' ? 'Work' : 'Home'}
          </Text>
          <Text style={styles.subtitle1}>
            {item.house_no} {item.city}, {item.country} {'\n'}
            Zip Code {item.zip_code}
          </Text>
        </View>
        {item.set_default == 1 && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              backgroundColor: '#FEF7ECAA',
              // opacity: 0.6,
              padding: 5,
              paddingHorizontal: 10,
              borderBottomLeftRadius: 16,
            }}>
            <Text
              style={[
                styles.title,
                {
                  fontSize: 10,
                  color: '#F4AC3E',
                },
              ]}>
              Default
            </Text>
          </TouchableOpacity>
        )}
      </Pressable>
    );
  };

  const CardItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          setCard(item);
          setShowCard(false);
        }}
        style={{
          width: 360,
          overflow: 'hidden',
          borderRadius: 25,
          margin: 5,
          alignSelf: 'center',
        }}>
        <ImageBackground
          resizeMode="cover"
          source={require('../../assets/images/card.png')}
          style={{
            width: 360,
            height: 199,
            padding: 15,
            paddingHorizontal: 18,
            paddingVertical: 25,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 30,
            }}>
            <Text
              style={[
                styles.cardtext,
                {fontFamily: Fonts.Poppins_Medium, fontSize: 20},
              ]}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/bank_logo.png')}
                style={{
                  height: 30,
                  width: 30,
                  position: 'relative',
                  top: 5,
                }}
              />
              {'  ' + item.bank_name}
            </Text>
            {/* <Entypo name="dots-three-horizontal" color={'#fff'} size={20} /> */}
          </View>
          <Text style={styles.cardtext}>**** **** **** {item.last_four}</Text>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.cardtext1}>Platinum Plus</Text>
            <Text style={styles.cardtextsub}>Exp {item.expiry_date}</Text>
          </View>

          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 'auto',
            }}>
            <Text style={styles.username}>{item.customer_name}</Text>
            <PaymentIcon type={item.brand.toLowerCase()} width={37} />
          </View>
          {item.default == '1' && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                backgroundColor: '#FEF7EC33',
                padding: 5,
                paddingHorizontal: 12,
                borderBottomLeftRadius: 16,
              }}>
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: 10,
                    color: '#F4AC3E',
                  },
                ]}>
                Default
              </Text>
            </TouchableOpacity>
          )}
        </ImageBackground>
      </Pressable>
    );
  };

  const onProceed = () => {
    var cardVaild1 = false;
    var addressVaild1 = false;

    if (props.cardList.length == 0) {
      cardVaild1 = true;
    }
    if (props.addressList.length == 0) {
      addressVaild1 = true;
    }
    if (addressVaild1) {
      setAddressVaild('Please Add Address to proceed further !!!!');
    } else {
      setAddressVaild('valid');
    }
    if (cardVaild1) {
      setCardVaild('Please Add Card to proceed further !!!!');
    } else {
      setCardVaild('valid');
    }
    if (cardVaild1 || addressVaild1 || coinsValid != 'valid') {
      return;
    }
    navigation.navigate('Checkout', {
      cardDetails: card,
      addressDetails: address,
      redeemedCoins: coins == '0' ? 0 : coins,
      pervScreen: route.params == undefined ? false : true,
    });
  };

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  return (
    <SafeAreaView style={styles.relative}>
      {showCard && (
        <View style={{flex: 1, padding: 20}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingBottom: 20,
            }}>
            <Text>Please Select Card</Text>
            <Pressable onPress={() => setShowCard(false)}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/mcross.png')}
                style={{
                  width: 18,
                  height: 18,
                }}
              />
            </Pressable>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('AddCard')}
            style={[
              styles.addcard,
              {
                marginBottom: 20,
              },
            ]}>
            <Text style={styles.addtitle}>Add Card</Text>
          </TouchableOpacity>

          <FlatList
            data={props.cardList}
            renderItem={({item, index}) => <CardItem item={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      )}
      {showAddress && (
        <View style={{flex: 1, padding: 20}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingBottom: 20,
            }}>
            <Text>Please Select Address</Text>
            <Pressable onPress={() => setShowAddress(false)}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/mcross.png')}
                style={{
                  width: 18,
                  height: 18,
                }}
              />
            </Pressable>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddAddress')}
            style={[styles.addcard, {marginBottom: 20}]}>
            <Text style={styles.addtitle}>Add Address</Text>
          </TouchableOpacity>
          <FlatList
            data={props.addressList}
            renderItem={({item, index}) => <AddressItem item={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      )}
      {!(showAddress || showCard) && (
        <>
          <ScrollView style={styles.relative}>
            <View style={styles.container}>
              {/* <Carousel
                layout="default"
                ref={ref}
                data={props.cardList}
                sliderWidth={400}
                activeSlideAlignment="center"
                itemWidth={320}
                renderItem={renderItem}
                onSnapToItem={index => setActiveIndex(index)}
              /> */}
              {props.cardList.length > 1 && (
                <View style={[styles.flexdir, {marginBottom: 7}]}>
                  <Text style={[styles.sText, {fontSize: 16}]}>
                    Select Card
                  </Text>
                  <TouchableOpacity onPress={() => setShowCard(true)}>
                    <Text
                      style={[styles.sGoal, {fontSize: 12, color: '#B4B4B4'}]}>
                      Choose Another {'>'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {card && <CardItem item={card} />}

              {props.cardList.length <= 1 && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddCard')}
                  style={[
                    styles.addcard,
                    {
                      marginBottom: 20,
                      borderColor:
                        props.cardList.length == 0 ? '#F00' : '#C068E5',
                    },
                  ]}>
                  <Text style={styles.addtitle}>Add Card</Text>
                </TouchableOpacity>
              )}
              {cardVaild != 'valid' ? (
                <Text style={[styles.subtitle, {color: 'red', bottom: 12}]}>
                  {cardVaild}
                </Text>
              ) : null}

              <View style={styles.card}>
                {showSelectedCoins ? (
                  <>
                    <Text style={styles.cardtitle}>
                      How many coins your want to use? {'\n'}
                      <Text style={{color: '#3ABB25'}}>
                        Total Coins: {props.homeData?.wallet?.earn_coins}
                      </Text>
                    </Text>
                    <View style={styles.inputconatiner}>
                      <TextInput
                        style={styles.input}
                        underlineColor={'transparent'}
                        selectionColor="#3B2645"
                        value={coins}
                        keyboardType="numeric"
                        onChangeText={coins => {
                          setCoins(coins);
                          if (
                            parseInt(coins) <=
                              props.homeData.wallet.earn_coins &&
                            parseInt(coins) > 0
                          ) {
                            setCoinsValid(`valid`);
                          } else {
                            if (coins == '0') {
                              setCoinsValid(`O Coin cannot be redeemed.`);
                            } else if (coins == '') {
                              setCoinsValid(`valid`);
                            } else {
                              setCoinsValid(`You don't ${coins} Coins!!!!`);
                            }
                          }
                        }}
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
                  </>
                ) : (
                  <View style={styles.cardheader}>
                    <View style={styles.flex1}>
                      <Image
                        resizeMode="contain"
                        source={require('../../assets/images/coins1.png')}
                        style={{
                          width: 14,
                          height: 14,
                          marginRight: 4,
                          position: 'relative',
                          top: -1,
                        }}
                      />
                      <Text style={styles.title}>
                        Reward Coins: {''}
                        <Text style={{color: '#3B2645'}}>
                          {' '}
                          {props.homeData?.wallet?.earn_coins} Coins
                        </Text>
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        setCoins(props.homeData?.wallet?.earn_coins)
                      }
                      style={styles.checkbtn}>
                      <Text
                        style={{
                          fontFamily: Fonts.Poppins_Medium,
                          fontSize: 11,
                          color: '#8869F2',
                          top: 1,
                        }}>
                        {props.homeData?.wallet?.earn_coins == parseInt(coins)
                          ? 'Redeemed'
                          : 'Redeem'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                <Pressable
                  onPress={() => setShowSelectedCoins(!showSelectedCoins)}>
                  <Text style={[styles.cardtitle, {fontSize: 14}]}>
                    {'Redeem selected coins >'}
                  </Text>
                </Pressable>
                {coinsValid != 'valid' ? (
                  <Text
                    style={[
                      styles.subtitle,
                      {color: 'red', bottom: 5, left: 15},
                    ]}>
                    {coinsValid}
                  </Text>
                ) : null}
              </View>

              {props.addressList.length > 1 && (
                <View style={[styles.flexdir, {marginBottom: 7}]}>
                  <Text style={[styles.sText, {fontSize: 16}]}>
                    Select Address
                  </Text>
                  <TouchableOpacity onPress={() => setShowAddress(true)}>
                    <Text
                      style={[styles.sGoal, {fontSize: 12, color: '#B4B4B4'}]}>
                      Choose Another {'>'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {address && <AddressItem item={address} />}
              {props.addressList.length <= 1 && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddAddress')}
                  style={[
                    styles.addcard,
                    {
                      marginBottom: 20,
                      borderColor:
                        props.addressList.length == 0 ? '#F00' : '#C068E5',
                    },
                  ]}>
                  <Text style={styles.addtitle}>Add Address</Text>
                </TouchableOpacity>
              )}
              {addressVaild != 'valid' ? (
                <Text style={[styles.subtitle, {color: 'red', bottom: 12}]}>
                  {addressVaild}
                </Text>
              ) : null}
              <View style={[styles.flexdir, {marginTop: 13, marginBottom: 7}]}>
                <Text style={[styles.sText, {fontSize: 16}]}>
                  Payment Method
                </Text>
              </View>

              <View style={styles.blogitem}>
                <View style={styles.blogbody}>
                  <Text style={styles.title1}>
                    <Zocial name="stripe" size={14} color="#3E3E40" />
                    {''} Stripe
                  </Text>
                </View>
              </View>
              {coinsValid == 'valid' && coins != '' && (
                <View style={[styles.flexdir, {marginTop: 5, marginBottom: 7}]}>
                  <Text style={[styles.sText, {fontSize: 12}]}>
                    <Text style={{color: '#B1A8B5'}}>
                      Discounted with reward coins ........{' '}
                    </Text>
                    {coins} coins =
                    <Text
                      style={{
                        color: '#3ABB25',
                      }}>
                      ${(parseInt(coins) * 0.2).toFixed(2)}
                    </Text>
                  </Text>
                </View>
              )}
              {route.params != undefined ? (
                <View style={[styles.flexdir, {marginBottom: 10}]}>
                  <Text style={styles.sGoal1}>Premium Workout</Text>

                  {coinsValid == 'valid' && coins != '' ? (
                    <View style={styles.flexdir}>
                      <Text
                        style={[
                          styles.redtext,
                          coinsValid == 'valid' &&
                            coins != '' && {
                              textDecorationLine: 'line-through',
                              textDecorationStyle: 'solid',
                            },
                        ]}>
                        $9.90
                      </Text>
                      <Text style={styles.sText1}>
                        {'  '}
                        <Text style={{fontSize: 12}}>$</Text>
                        {(9.9 - parseInt(coins) * 0.2).toFixed(2)}
                        {/* <Text style={{fontSize: 12}}>00</Text> */}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.flexdir}>
                      <Text style={styles.sText1}>
                        {'  '}
                        <Text style={{fontSize: 12}}>$</Text>
                        {totalAmount.toFixed(2)}
                        {/* <Text style={{fontSize: 12}}>00</Text> */}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View style={[styles.flexdir, {marginBottom: 10}]}>
                  <Text style={styles.sGoal1}>
                    Total ( {props?.cartItemData?.length}{' '}
                    {props?.cartItemData?.length > 1 ? 'items' : 'item'} )
                  </Text>

                  {coinsValid == 'valid' && coins != '' ? (
                    <View style={styles.flexdir}>
                      <Text
                        style={[
                          styles.redtext,
                          coinsValid == 'valid' &&
                            coins != '' && {
                              textDecorationLine: 'line-through',
                              textDecorationStyle: 'solid',
                            },
                        ]}>
                        $ {totalAmount.toFixed(2)}
                      </Text>
                      <Text style={styles.sText1}>
                        {'  '}
                        <Text style={{fontSize: 12}}>$</Text>
                        {(totalAmount - parseInt(coins) * 0.2).toFixed(2)}
                        {/* <Text style={{fontSize: 12}}>00</Text> */}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.flexdir}>
                      <Text style={styles.sText1}>
                        {'  '}
                        <Text style={{fontSize: 12}}>$</Text>
                        {totalAmount.toFixed(2)}
                        {/* <Text style={{fontSize: 12}}>00</Text> */}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </ScrollView>
          <TouchableOpacity onPress={() => onProceed()} style={styles.button}>
            <LinearGradient colorList={colorList1} angle={200} />
            <Text style={styles.text}>Proceed</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  cardList: state.profileReducer.cardList,
  addressList: state.profileReducer.addressList,
  homeData: state.homeReducer?.homeData,
  cartItemData: state.shopReducer.cartItemData,
});

const mapDispatchToProps = dispatch => ({
  getCardListRequest: data => dispatch(getCardListRequest(data)),
  getAddressListRequest: data => dispatch(getAddressListRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    padding: 18,
    paddingTop: 0,
  },
  relative: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#fff',
  },
  cardtext: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 14,
    color: '#fff',
  },
  cardtext1: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 12,
    color: '#fff',
  },
  cardtextsub: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 12,
    color: '#fff',
  },
  subtitle: {
    color: '#3B2645',
    opacity: 0.5,
    fontSize: 14,
    fontFamily: Fonts.Poppins_Regular,
  },
  username: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 14,
    color: '#fff',
  },
  checkbtn: {
    borderWidth: 2,
    borderColor: '#B668E7',
    padding: 5,
    paddingHorizontal: 13,
    borderRadius: 1000,
    paddingLeft: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6FF',
  },
  cardheader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2EDFF',
    borderWidth: 1,
    borderColor: '#B668E7',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 14,
  },
  flex1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 20,
    marginVertical: 15,
  },
  title: {
    fontFamily: Fonts.Poppins_SemiBold,
    color: '#686AFA',
    fontSize: 12,
  },
  cardtitle: {
    fontFamily: Fonts.Poppins_SemiBold,
    color: '#3B2645',
    fontSize: 11,
    textAlign: 'center',
    paddingTop: 8,
    paddingBottom: 5,
  },
  inputconatiner: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
  },
  input: {
    height: 45,
    backgroundColor: '#fff',
    fontSize: 14,
    borderWidth: 1,
    marginHorizontal: 15,
    borderColor: '#DDDFDF',
    color: '#3B2645',
    textAlign: 'center',
  },
  flexdir: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sText: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 10,
    color: '#3B2645',
  },
  sGoal: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 7,
    color: '#737A7B',
  },
  blogitem: {
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
    position: 'relative',
    padding: 15,
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
  sText1: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 20,
    color: '#3B2645',
  },
  sGoal1: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 12,
    color: '#737A7B',
  },
  redtext: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 14,
    color: '#EF206A',
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
  },
  addtitle: {
    fontFamily: Fonts.Poppins_Medium,
    color: '#000',
    textAlign: 'center',
    fontSize: 13,
  },
  addcard: {
    borderWidth: 1,
    borderColor: '#C068E5',
    padding: 15,
    borderRadius: 6,
  },
});

// const renderItem = useCallback(
//   ({item, index}) => (
//     <View
//       style={{
//         width: 300,
//         overflow: 'hidden',
//         borderRadius: 25,
//         margin: 5,
//       }}>
//       <ImageBackground
//         resizeMode="cover"
//         source={require('../../assets/images/card.png')}
//         style={{
//           width: 300,
//           height: 199,
//           padding: 15,
//           paddingHorizontal: 18,
//           paddingVertical: 25,
//           display: 'flex',
//           flexDirection: 'column',
//         }}>
//         <View
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             marginBottom: 30,
//           }}>
//           <Image
//             resizeMode="contain"
//             source={require('../../assets/images/clogo.png')}
//             style={{
//               width: 140,
//               height: 30,
//               position: 'relative',
//               top: 5,
//             }}
//           />
//           <Entypo name="dots-three-horizontal" color={'#fff'} size={20} />
//         </View>
//         <Text style={styles.cardtext}>**** **** **** {item.last4}</Text>
//         <View
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}>
//           <Text style={styles.cardtext1}>Platinum Plus</Text>
//           <Text style={styles.cardtextsub}>Exp {item.expiry_date}</Text>
//         </View>

//         <View
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             marginTop: 'auto',
//           }}>
//           <Text style={styles.username}>{item.brand}</Text>
//           <PaymentIcon type={item.brand.toLowerCase()} width={37} />
//         </View>
//       </ImageBackground>
//     </View>
//   ),
//   [],
// );
