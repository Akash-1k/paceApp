import React, {useState} from 'react';
import Fonts from '../constants/Fonts';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {LinearGradient} from 'react-native-gradients';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SingleOrderHistoryDetails} from '../staticData/History';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import Config, {PLACEHOLDER_IMAGE_COMP} from '../constants/Config';
import Loader from '../common/Loader';

const OrderDetails = props => {
  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];
  const navigation = useNavigation();
  const route = useRoute();

  console.log(route.params.id);
  const [selectedProduct, setSelectedProduct] = useState();
  const [status, setStatus] = useState('');
  const [statusColor, setStatusColor] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const getOrderDetail = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(
      `${Config.BASE_URL}${Config.order}/${route.params.id}/detail`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setSelectedProduct(result.orders);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  // API CALL
  useEffect(() => {
    getOrderDetail();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.status == 2) {
        setStatus('Delivered');
        setStatusColor('#63C501');
      } else if (selectedProduct.status == 0) {
        setStatus('Pending');
        setStatusColor('#F7B551');
      } else if (selectedProduct.status == 3) {
        setStatus('Canceled');
        setStatusColor('#FF0145');
      } else {
        setStatus(selectedProduct.status);
        setStatusColor('#FFF');
      }
    }
  }, [selectedProduct]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[styles.delivered, {backgroundColor: statusColor + '22'}]}>
          <Text style={[styles.title11, {color: statusColor}]}>{status}</Text>
        </View>
      ),
    });
  }, [statusColor]);

  const ListOptions = props => {
    return (
      <Text
        style={[
          styles.subtitle,
          {
            fontSize: 12,
          },
        ]}
        numberOfLines={1}>
        <Text
          style={[
            styles.subtitle,
            {
              fontWeight: '300',
              fontFamily: Fonts.Poppins_Regular,
              color: '#3B2645',
              fontSize: 12,
            },
          ]}>
          {props.option} :{' '}
        </Text>{' '}
        {props.value}
      </Text>
    );
  };

  const Product = ({item}) => {
    return (
      <View style={styles.blogitem1}>
        <View style={[styles.blogitem, {marginBottom: 10}]}>
          <Image
            resizeMode="cover"
            source={
              item.main_image == null
                ? PLACEHOLDER_IMAGE_COMP
                : {uri: `${Config.IMAGE_BASE_URL}products/${item.main_image}`}
            }
            style={{
              width: 106,
              height: 106,
              borderRadius: 5,
            }}
          />
          <View style={styles.blogbody}>
            <Text numberOfLines={1} style={styles.title}>
              {item.name == null ? 'Premium' : item.name}
            </Text>
            <View>
              {Boolean(item.qty) && (
                <ListOptions option="Quantity" value={`x${item.qty}`} />
              )}

              {Boolean(item.color) && (
                <ListOptions option="Color" value={item.color} />
              )}

              {Boolean(item.size) && (
                <ListOptions option="Size" value={item.size} />
              )}
              {Boolean(item.weight) && (
                <ListOptions option="Weight" value={item.weight} />
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const premiumItem = {
    name: 'Premium',
    main_image: null,
    total_price: 9.9,
  };
  return (
    <SafeAreaView style={styles.relative}>
      <ScrollView style={styles.relative}>
        {Boolean(selectedProduct) && (
          <View style={styles.container}>
            {selectedProduct.type == '1' ? (
              selectedProduct.products.map(item => (
                <Product key={item.id} item={item} />
              ))
            ) : (
              <Product item={premiumItem} />
            )}

            <View style={styles.deladdress}>
              <View style={styles.delbody}>
                <Text style={styles.title1}>Order info</Text>
                <Text style={styles.textgray}>Order ID</Text>
                <Text
                  style={[
                    styles.subtitle1,
                    {fontFamily: Fonts.Poppins_Medium},
                  ]}>
                  {selectedProduct.order_id.slice(1)}
                </Text>
                <Text style={styles.textgray}>Order Address</Text>
                <Text
                  style={[
                    styles.subtitle1,
                    {fontFamily: Fonts.Poppins_Medium},
                  ]}>
                  {selectedProduct.address.house_no}{' '}
                  {selectedProduct.address.city}
                  {','}
                  {selectedProduct.address.country}
                  {'.\nZip Code '}
                  {selectedProduct.address.zip_code}
                </Text>
                <Text style={[styles.textgray, {marginTop: 6}]}>
                  Receiver's Name
                </Text>
                <Text
                  style={[
                    styles.subtitle1,
                    {fontFamily: Fonts.Poppins_Medium, marginBottom: 6},
                  ]}>
                  {selectedProduct.user_name}
                </Text>
                <Text style={styles.textgray}>Payment Method</Text>
                <Text
                  style={[
                    styles.subtitle1,
                    {fontFamily: Fonts.Poppins_Medium},
                  ]}>
                  {selectedProduct.card_info}
                </Text>
              </View>
            </View>

            <Text style={[styles.sText, {marginBottom: 5}]}>Order Info</Text>

            {selectedProduct.type == '2' ? (
              <View style={styles.flexdir}>
                <Text style={styles.sText1}>Premium</Text>
                <Text style={styles.sPrice1}>
                  ${parseFloat(selectedProduct.premium_price).toFixed(2)}
                </Text>
              </View>
            ) : (
              <>
                {selectedProduct.products.map(item => (
                  <View style={styles.flexdir}>
                    <Text style={styles.sText1}>{item.name}</Text>
                    <Text style={styles.sPrice1}>
                      ${parseFloat(item.total_price).toFixed(2)}
                    </Text>
                  </View>
                ))}
              </>
            )}

            {selectedProduct.taxes != '0' && (
              <View style={styles.flexdir}>
                <Text style={styles.sText1}>Taxes</Text>
                <Text style={styles.sPrice1}>${selectedProduct.taxes}</Text>
              </View>
            )}
            {selectedProduct.shipping != '0' && (
              <View style={styles.flexdir}>
                <Text style={styles.sText1}>Shipping</Text>
                <Text style={styles.sPrice1}>${selectedProduct.shipping}</Text>
              </View>
            )}
            {selectedProduct.coins_used != '0' && (
              <View style={styles.flexdir}>
                <Text style={styles.sText1}>Wallet Discount</Text>
                <Text style={[styles.sPrice1, {color: '#3ABB25'}]}>
                  -$
                  {(
                    parseInt(selectedProduct.coins_used) *
                    Config.reward_coin_value
                  ).toFixed(2)}
                </Text>
              </View>
            )}

            <View style={[styles.flexdir, {marginBottom: 10}]}>
              <Text style={styles.sGoal2}>
                Total{' '}
                {selectedProduct.type == '1' &&
                  `(${selectedProduct.products.length} ${
                    selectedProduct.products.length > 1 ? 'items' : 'item'
                  })`}
              </Text>
              <Text style={styles.sText2}>
                <Text style={{fontSize: 12}}>$</Text>
                {selectedProduct.total_amount}
                {/* .<Text style={{fontSize: 12}}></Text> */}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      {selectedProduct && selectedProduct.status == 2 && (
        <TouchableOpacity style={styles.button}>
          <LinearGradient
            style={styles.granew}
            colorList={colorList1}
            angle={200}></LinearGradient>
          <Text style={styles.text}>Buy Again</Text>
        </TouchableOpacity>
      )}
      <Loader loading={isLoading} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer?.userDetails,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 18,
  },
  title11: {
    fontFamily: Fonts.Poppins_SemiBold,
    color: '#63C501',
    fontSize: 12,
  },
  delivered: {
    backgroundColor: '#EFF9E6',
    padding: 10,
    paddingHorizontal: 13,
    borderBottomStartRadius: 50,
    borderTopStartRadius: 50,
    right: -10,
  },
  relative: {
    position: 'relative',
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  blogitem1: {
    overflow: 'hidden',
    marginBottom: 10,
    position: 'relative',
    padding: 0,
  },
  blogitem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  blogbody: {
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: 15,
    height: 106,
  },
  title: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 16,
  },
  subtitle: {
    color: '#3B2645',
    fontSize: 14,
    opacity: 0.7,
    fontFamily: Fonts.Poppins_Bold,
  },
  deladdress: {
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
    position: 'relative',
    padding: 20,
  },
  delbody: {
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
  flexdir: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
