import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import {Row, Column as Col} from 'react-native-responsive-grid';
import Fonts from '../constants/Fonts';
import {connect} from 'react-redux';
import Loader from '../common/Loader';
import Config from '../constants/Config';
import {getCartRequest} from '../modules/Shop/actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TabThreeScreen = props => {
  const [data, setData] = useState('');
  const [total, setTotal] = useState(0);
  let totalAmount = 0;

  const [isLoading, setLoader] = useState(false);

  // console.log('TAB THREE SCREEN STATE PROPS ::::::::::', props.cartItemData);
  useEffect(() => {
    props.getCartRequest(props.loginData.token);
  }, []);
  // props.getCartRequest(props.loginData.token);

  useEffect(() => {
    if (props.cartItemData.length <= 0) {
      props.navigation.setOptions({
        headerRight: () => <View />,
      });
    } else {
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate('PaymentMethod')}
            style={styles.checkbtn}>
            <Text
              style={{
                fontFamily: Fonts.Poppins_Medium,
                fontSize: 11,
                color: '#876BF3',
              }}>
              Checkout
            </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={16}
              color="#876BF3"
              style={{
                position: 'relative',
                bottom: 1.2,
              }}
            />
          </TouchableOpacity>
        ),
      });
    }
  }, [props.cartItemData]);
  {
    props.cartItemData.map(e => (totalAmount += e.price * e.add_cart_stock));
  }
  const onGetCart = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    setLoader(true);
    fetch(Config.BASE_URL + Config.cart, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 'Token is Expired') {
          showLogoutAlert();
        } else {
          // console.log(result);
          setData(result);
          setTotal(result.data.length);
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

  const removeProduct = cart_id => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var formdata = new FormData();
    formdata.append('cart_id', cart_id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setLoader(true);
    fetch(Config.BASE_URL + Config.remove_product, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 1) {
          props.getCartRequest(props.loginData.token);
        }
        setLoader(false);
        console.log(result);
      })
      .catch(error => {
        setLoader(false);
        console.log('error', error);
      });
  };

  const renderItem = data => {
    return (
      <View style={styles.blogitem1}>
        <View style={[styles.blogitem, {marginBottom: 10}]}>
          <Image
            resizeMode="cover"
            source={{
              uri: `${Config.IMAGE_BASE_URL}workouts/${data.item.product_image}`,
            }}
            style={{
              width: 79,
              height: 79,
              borderRadius: 3,
            }}
          />
          <View style={styles.blogbody}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text numberOfLines={1} style={styles.title}>
                {data.item.product_name}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Bold,
                  fontSize: 18,
                  marginLeft: 5,
                  color: '#C068E5',
                }}>
                <Text style={{fontSize: 13}}>$</Text>
                {data.item.price}
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '200',
                    fontFamily: Fonts.Poppins_Regular,
                  }}>
                  {'.00'}
                </Text>
              </Text>
            </View>
            <Text style={styles.subtitle}>
              {data.item.size_name}
              {data.item.color_name ? ` | ${data.item.color_name}` : ''} {'| x'}
              {data.item.add_cart_stock}{' '}
            </Text>
          </View>
        </View>
        <Row>
          <Col size={49}>
            <TouchableOpacity
              onPress={() => {
                console.log(data.item);
                props.navigation.navigate('EditProductDetails', {
                  cart_id: data.item.cart_id,
                  product_id: data.item.product_id,
                });
              }}
              style={styles.btn}>
              <Text style={styles.btntext}>{'Edit'}</Text>
            </TouchableOpacity>
          </Col>

          <Col size={49} offset={2}>
            <TouchableOpacity
              onPress={() => {
                removeProduct(data.item.cart_id);
              }}
              style={styles.btn}>
              <Text style={styles.btntext}>{'Remove'}</Text>
            </TouchableOpacity>
          </Col>
        </Row>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainbg}>
      <View style={styles.container}>
        {props.cartItemData.length > 0 && (
          <View style={[styles.flexdir, {marginBottom: 10}]}>
            <Text style={styles.sGoal}>
              {`Total (${props.cartItemData.length}`}
              {props.cartItemData.length <= 1 ? ' item)' : ' items)'}
            </Text>
            <Text style={styles.sText}>
              <Text style={{fontSize: 12}}>$</Text>
              {totalAmount}.<Text style={{fontSize: 12}}>00</Text>
            </Text>
          </View>
        )}

        {props.cartItemData.length > 0 ? (
          <FlatList
            data={props.cartItemData}
            renderItem={renderItem}
            keyExtractor={item => item.cart_id}
            showsVerticalScrollIndicator={false}
          />
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
            <Text
              style={[
                styles.title1,
                {fontSize: 25, marginTop: 50, textAlign: 'center'},
              ]}>
              {'Your cart is empty!'}
            </Text>
          </View>
        )}
      </View>
      <Loader loading={isLoading} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
  shopCategoryList: state.shopReducer.shopCategoryList,
  cartItemData: state.shopReducer.cartItemData,
});

const mapDispatchToProps = dispatch => ({
  // userDetailsRequest: (data) => dispatch(userDetailsRequest(data)),
  getCartRequest: data => dispatch(getCartRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabThreeScreen);

const styles = StyleSheet.create({
  mainbg: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 8,
  },
  flexdir: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sText: {
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 20,
    color: '#3B2645',
  },
  sGoal: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 12,
    color: '#3B2645',
  },
  blogitem1: {
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
    position: 'relative',
    padding: 15,
  },
  blogitem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  blogbody: {
    position: 'relative',
    flex: 1,
    paddingLeft: 15,
  },
  title: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 16,
    width: 140,
    marginBottom: 16,
  },
  subtitle: {
    color: '#3B2645',
    fontSize: 14,
    opacity: 0.7,
    fontFamily: Fonts.Poppins_Medium,
  },
  btntext: {
    color: '#3B2645',
    fontSize: 13,
    fontFamily: Fonts.Poppins_Medium,
    textAlign: 'center',
  },
  btn: {
    borderRadius: 6,
    backgroundColor: '#F7F8F8',
    padding: 10,
  },
  checkbtn: {
    borderWidth: 2,
    borderColor: '#B668E7',
    padding: 8,
    paddingHorizontal: 13,
    borderRadius: 1000,
    paddingLeft: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6FF',
  },
});
