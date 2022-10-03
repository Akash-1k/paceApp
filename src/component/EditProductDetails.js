import React, {useEffect, useState} from 'react';
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
import {Column as Col, Row} from 'react-native-responsive-grid';
import {LinearGradient} from 'react-native-gradients';
import Counter from 'react-native-counters';
import {useNavigation} from '@react-navigation/native';
import Fonts from '../constants/Fonts';
import {connect} from 'react-redux';
import {addToCartRequest, getCartRequest} from '../modules/Shop/actions';
import Loader from '../common/Loader';
import Config from '../constants/Config';

const EditProductDetails = props => {
  // console.log('EditProductDetails STATE props ::::::::', props.cartItemData);
  const navigation = useNavigation();
  const colorList1 = [
    {offset: '0%', color: '#5D6AFC', opacity: '1'},
    {offset: '100%', color: '#C068E5', opacity: '1'},
  ];

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedProductImage, setSelectedProductImage] = useState('');
  const [size_id, setSizeId] = useState('');
  const [color_id, setColorId] = useState('');

  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [isColorSelected, setIsColorSelected] = useState(false);

  const [isLoading, setLoader] = useState(false);
  const [data, setData] = useState({});
  const [sizeList, setSizeList] = useState([]);
  const [colorList, setColorList] = useState([]);

  const [featuredImages, setFeaturedImages] = useState([]);

  const [counter, setCounter] = useState(1);

  const onPressMinus = () => {
    setCounter(counter - 1);
  };

  const onPressPlus = () => {
    setCounter(counter + 1);
  };

  const Item = ({item, onPress, backgroundColor, borderColor, textColor}) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, backgroundColor, borderColor]}>
      <Text style={[styles.title, textColor]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderItemSize = ({item}) => {
    const backgroundColor = item.id === selectedSize ? '#F9F6FE' : '#F9F6FE';
    const borderColor = item.id === selectedSize ? '#B668E7' : '#EAE1FC';
    const color = item.id === selectedSize ? '#3B2645' : '#3B2645';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedSize(item.id);
          setIsSizeSelected(false);
        }}
        backgroundColor={{backgroundColor}}
        borderColor={{borderColor}}
      />
    );
  };

  const renderItemColor = ({item}) => {
    const backgroundColor = item.id === selectedColor ? '#F9F6FE' : '#F9F6FE';
    const borderColor = item.id === selectedColor ? '#B668E7' : '#EAE1FC';
    const color = item.id === selectedColor ? '#3B2645' : '#3B2645';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedColor(item.id);
          setIsColorSelected(false);
        }}
        backgroundColor={{backgroundColor}}
        borderColor={{borderColor}}
      />
    );
  };

  useEffect(() => {
    console.log('ROUTES :::::::::', props.route.params);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var formdata = new FormData();
    formdata.append('cart_id', props.route.params.cart_id);
    formdata.append('id', props.route.params.product_id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setLoader(true);

    fetch(
      `https://dev.indiit.solutions/pace/public/api/edit-product-cart`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        setLoader(false);
        setData(result?.data[0]);
        setSizeList(result.filter.sizes);
        setColorList(result.filter.colors);
        setFeaturedImages(result.featured_images);
        setSelectedSize(result.cart_selected_val.size_variation_id);
        setSelectedColor(result.cart_selected_val.color_variation_id);
        setCounter(result.cart_selected_val.quantity);
        setSelectedProductImage(
          result.featured_images
            ? result?.featured_images[0]?.feature_image
            : null,
        );
      })
      .catch(error => {
        setLoader(false);
        console.log('error', error);
      });
  }, []);

  const onUpdateCart = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var formdata = new FormData();
    formdata.append('cart_id', props.route.params.cart_id);
    formdata.append('product_id', props.route.params.product_id);
    formdata.append('size_variation_id', selectedSize ? selectedSize : 0);
    formdata.append('color_variation_id', selectedColor ? selectedColor : 0);
    formdata.append('quantity', counter);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setLoader(true);

    fetch(
      `https://dev.indiit.solutions/pace/public/api/update-product-cart`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        setLoader(false);
        console.log('error', error);
      });

    setLoader(false);

    setTimeout(() => {
      props.getCartRequest(props.loginData.token);
      navigation.navigate('Root', {screen: 'TabThree'});
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.relative}>
      <ScrollView style={styles.relative}>
        <View style={styles.container}>
          <View style={styles.startimg}>
            <Image
              resizeMode="cover"
              source={{
                uri: selectedProductImage
                  ? `${Config.IMAGE_BASE_URL}products/${selectedProductImage}`
                  : `${Config.IMAGE_BASE_URL}products/${data.main_image}`,
              }}
              style={{
                width: '100%',
                height: 369,
              }}
            />
            {/* Shadow */}
            <Image
              resizeMode="cover"
              source={require('../../assets/images/topshadow.png')}
              style={{
                width: '100%',
                height: 355,
                position: 'absolute',
                top: 0,
              }}
            />
          </View>

          <View style={styles.box}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {featuredImages != undefined && featuredImages.length > 0
                ? featuredImages.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedProductImage(item.feature_image);
                        }}
                        style={[
                          styles.prolist,
                          selectedProductImage == item.feature_image
                            ? styles.activeBorder
                            : {
                                borderRadius: 10,
                                padding: 1,
                                position: 'relative',
                                top: -2,
                              },
                        ]}>
                        <Image
                          resizeMode="cover"
                          source={{
                            uri: `https://dev.indiit.solutions/pace/public/assets/images/products/${item.feature_image}`,
                          }}
                          style={{width: 50, height: 72, borderRadius: 10}}
                        />
                      </TouchableOpacity>
                    );
                  })
                : null}
            </ScrollView>

            <View
              style={[styles.headflex, {marginVertical: 12, marginBottom: 0}]}>
              <Text style={styles.title}>
                {data.name != undefined ? data.name : ''}
              </Text>
              <View style={styles.flexDirection}>
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Bold,
                    fontSize: 20,
                    color: '#C068E5',
                  }}>
                  <Text style={{fontSize: 14}}>$</Text>
                  {data.price != undefined ? data.price : ''}
                  {'.'}
                </Text>
                <Text
                  style={[styles.subtitle, {position: 'relative', bottom: 5}]}>
                  00
                </Text>
              </View>
            </View>

            <Text style={[styles.title1, {fontFamily: Fonts.Poppins_SemiBold}]}>
              Descriptions
            </Text>
            <Text style={styles.textpara}>
              {data.description != undefined ? data.description : ''}
            </Text>
            {sizeList.length != 0 && (
              <React.Fragment>
                <Text
                  style={[styles.modaltitle, {marginTop: 12, marginBottom: 8}]}>
                  Sizes
                </Text>
                <FlatList
                  data={sizeList}
                  renderItem={renderItemSize}
                  keyExtractor={item => item.id}
                  extraData={selectedSize}
                  horizontal
                />
                {isSizeSelected ? (
                  <Text style={[styles.subtitle, {color: 'red'}]}>
                    {'Size is required *'}
                  </Text>
                ) : null}
              </React.Fragment>
            )}
            {colorList.length != 0 && (
              <React.Fragment>
                <Text
                  style={[styles.modaltitle, {marginTop: 12, marginBottom: 8}]}>
                  Colors
                </Text>
                <FlatList
                  data={colorList}
                  renderItem={renderItemColor}
                  keyExtractor={item => item.id}
                  extraData={selectedSize}
                  horizontal
                />
                {isColorSelected ? (
                  <Text style={[styles.subtitle, {color: 'red'}]}>
                    {'Color is required *'}
                  </Text>
                ) : null}
              </React.Fragment>
            )}
            <Text style={[styles.modaltitle, {marginTop: 15, marginBottom: 8}]}>
              Quantity
            </Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                onPress={onPressMinus}
                disabled={counter == 1}
                style={[
                  styles.touchable,
                  styles.buttonStyle,
                  {opacity: counter == 1 ? 0.2 : 1},
                ]}>
                <Text
                  style={[
                    styles.icon,
                    {color: counter == 1 ? '#000' : '#3B2645'},
                  ]}>
                  -
                </Text>
              </TouchableOpacity>
              <View style={styles.count}>
                <Text style={styles.countTextStyle}>{counter}</Text>
              </View>
              <TouchableOpacity
                onPress={onPressPlus}
                disabled={counter >= data.quantity}
                style={[
                  styles.touchable,
                  styles.buttonStyle,
                  {opacity: counter >= data.quantity == 1 ? 0.2 : 1},
                ]}>
                <Text
                  style={[
                    styles.icon,
                    {color: counter >= data.quantity == 1 ? '#000' : '#3B2645'},
                  ]}>
                  +
                </Text>
              </TouchableOpacity>
            </View>

            <Row>
              <Col size={48}>
                <TouchableOpacity
                  onPress={() => {
                    onUpdateCart();
                  }}
                  style={styles.button}>
                  <LinearGradient colorList={colorList1} angle={360} />
                  <Text style={styles.text}>Update Cart</Text>
                </TouchableOpacity>
              </Col>
              <Col size={48} offset={4}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Checkout')}
                  style={[
                    styles.button,
                    {
                      backgroundColor: '#FAF6FE',
                      borderWidth: 1,
                      borderColor: '#B668E7',
                    },
                  ]}>
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Bold,
                      fontSize: 16,
                      color: '#C068E5',
                    }}>
                    Checkout
                  </Text>
                </TouchableOpacity>
              </Col>
            </Row>
          </View>
        </View>
      </ScrollView>

      <Loader loading={isLoading} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
  shopCategoryList: state.shopReducer.shopCategoryList,
  addToCartData: state.shopReducer.addToCartData,
  selectedProduct: state.shopReducer.selectedProduct,
  cartItemData: state.shopReducer.cartItemData,
});

const mapDispatchToProps = dispatch => ({
  addToCartRequest: data => dispatch(addToCartRequest(data)),
  getCartRequest: data => dispatch(getCartRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProductDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  relative: {
    position: 'relative',
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  subtitle: {
    color: '#3B2645',
    opacity: 0.5,
    fontSize: 14,
    fontFamily: Fonts.Poppins_Regular,
  },
  box: {
    backgroundColor: '#fff',
    marginTop: -40,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    padding: 25,
  },
  proflex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prolist: {
    marginTop: 3,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 4,
    // width: 57,
  },
  activeBorder: {
    borderWidth: 2,
    borderColor: '#B668E7',
    borderRadius: 10,
    padding: 1,
    position: 'relative',
    top: -2,
  },
  title1: {
    fontFamily: Fonts.Poppins_Bold,
    color: '#3B2645',
    fontSize: 16,
  },
  headflex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexDirection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  subtitle: {
    color: '#C4BEC7',
    fontSize: 12,
    fontFamily: Fonts.Poppins_Regular,
  },
  textpara: {
    color: '#7B6F72',
    fontSize: 12,
    fontFamily: Fonts.Poppins_Regular,
  },
  modaltitle: {
    fontFamily: Fonts.Poppins_SemiBold,
    color: '#3B2645',
    fontSize: 16,
  },
  item: {
    padding: 6,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 12,
    marginRight: 4,
  },
  title: {
    fontSize: 16,
    color: '#3B2645',
    fontFamily: Fonts.Poppins_SemiBold,
    textAlign: 'center',
  },
  button: {
    position: 'relative',
    height: 60,
    borderRadius: 100,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 2,
  },
  text: {
    position: 'absolute',
    zIndex: 1,
    fontFamily: Fonts.Poppins_Bold,
    color: '#fff',
    fontSize: 16,
  },

  // counter
  counterContainer: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 18,
  },
  buttonStyle: {
    backgroundColor: '#F9F6FE',
    borderColor: '#F9F6FE',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  buttonTextStyle: {
    color: '#3B2645',
  },
  countTextStyle: {
    color: '#3B2645',
    textAlign: 'center',
    fontSize: 18,
  },
  count: {
    borderWidth: 1,
    height: 42,
    borderColor: '#B668E7',
    borderRadius: 12,
    width: 250,
    marginHorizontal: 10,
    minWidth: 40,
    justifyContent: 'center',
  },
  touchable: {
    minWidth: 35,
    minHeight: 35,
    borderWidth: 1,
    borderColor: '#27AAE1',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
