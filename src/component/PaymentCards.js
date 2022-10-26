import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Fonts from '../constants/Fonts';
import {PaymentIcon} from 'react-native-payment-icons';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import {getCardListRequest} from '../modules/Profile/actions';
import Loader from '../common/Loader';
import Config from '../constants/Config';

const PaymentCards = props => {
  const navigation = useNavigation();
  const [selectedIndex, setIndex] = useState(null);
  const [cardDetails, setCardDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    props.getCardListRequest(props.loginData.token);
  }, []);

  const onSetDefault = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var formdata = new FormData();
    formdata.append('customerid', cardDetails.customerid);
    formdata.append('type', cardDetails.type);
    formdata.append('brand', cardDetails.brand);
    formdata.append('token', cardDetails.token);
    formdata.append('last4', cardDetails.last4);
    formdata.append('card_id', cardDetails.id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    setIsLoading(true);
    fetch(Config.BASE_URL + Config.set_deault_payment_cards, requestOptions)
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        props.getCardListRequest(props.loginData.token);
        setIndex('');
        // console.log(result)
      })
      .catch(error => console.log('error', error));
  };

  const onDeletecard = id => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);
    var formdata = new FormData();
    formdata.append('card_id', id);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(Config.BASE_URL + Config.delete_payment_card, requestOptions)
      .then(response => response.json())
      .then(result => {
        setIsLoading(false);
        props.getCardListRequest(props.loginData.token);
      })
      .catch(error => console.log('error', error));
  };

  const renderItem = item => {
    return (
      <Pressable
        onPress={() => {
          setIndex(null);
        }}
        style={styles.cardbox}>
        <ImageBackground
          // source={{uri: 'https://picsum.photos/id/237/200/300'}}
          source={require('../../assets/images/card.png')}
          style={{flex: 1}}
          // style={{flex: 1, transform: [{scale: 1.03}]}}
          resizeMode="cover"
          imageStyle={{}}>
          <View style={styles.maincontainer}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 27,
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
                {'  ' + item.item.brand}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setCardDetails(item.item);
                  console.log(item.item);
                  setIndex(item.index);
                }}>
                <Entypo name="dots-three-horizontal" color={'#fff'} size={20} />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardtext}>
              **** **** **** {item.item.last4}
            </Text>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.cardtext1}>Platinum Plus</Text>
              <Text style={styles.cardtextsub}>{item.item.expiry_date}</Text>
            </View>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 'auto',
              }}>
              <Text style={styles.username}>{item.item.type}</Text>
              <PaymentIcon type={item.item.brand.toLowerCase()} width={37} />

              {/* <Image
                resizeMode="contain"
                source={require('../../assets/images/cardr.png')}
                style={{
                  width: 37,
                  height: 22,
                }}
              /> */}
            </View>
          </View>
          {selectedIndex == item.index ? (
            <View style={styles.showBox}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditCard', {cardDetails: cardDetails})
                }>
                <Text style={styles.droptitle}>Edit</Text>
              </TouchableOpacity>

              {item.item.set_default != 1 && (
                <TouchableOpacity
                  onPress={() => {
                    onSetDefault();
                  }}
                  style={{
                    paddingVertical: 10,
                  }}>
                  <Text style={styles.droptitle}>Set Default</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => {
                  onDeletecard(item.item.id);
                }}>
                <Text style={[styles.droptitle, {color: '#DF0707'}]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {item.item.set_default == 1 && (
            <Text
              style={[
                styles.cardtext,
                {
                  alignSelf: 'flex-end',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  fontFamily: Fonts.Poppins_SemiBold,
                  fontSize: 12,
                  paddingVertical: 4,
                  paddingHorizontal: 12,
                  borderTopLeftRadius: 15,
                  marginRight: -1,
                },
              ]}>
              {'Default'}
            </Text>
          )}
        </ImageBackground>
        <Loader loading={isLoading} />
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={styles.relative}>
      <View style={styles.container}>
        <FlatList
          data={props.cardList}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => 'key' + index}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  cardList: state.profileReducer.cardList,
});

const mapDispatchToProps = dispatch => ({
  getCardListRequest: data => dispatch(getCardListRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentCards);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  relative: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardtext: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 16,
    color: '#fff',
  },
  cardtext1: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 14,
    color: '#fff',
  },
  cardtextsub: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 12,
    color: '#fff',
  },
  username: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 16,
    color: '#fff',
  },
  maincontainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flex: 1,
    flexDirection: 'column',
  },
  cardbox: {
    overflow: 'hidden',
    height: 200,
    borderRadius: 20,
    marginBottom: 10,
  },
  showBox: {
    position: 'absolute',
    top: 40,
    right: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    zIndex: 2,
    textAlign: 'left',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
  },
  droptitle: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 12,
    color: '#000',
  },
});
