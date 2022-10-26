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
  ImageBackground,
} from 'react-native';
import SimilarProduct from '../component/SimilarProduct';
import {Column as Col, Row} from 'react-native-responsive-grid';
import {LinearGradient} from 'react-native-gradients';
import {useNavigation} from '@react-navigation/native';
import Fonts from '../constants/Fonts';
import {connect} from 'react-redux';
import {addToCartRequest, getCartRequest} from '../modules/Shop/actions';
import Loader from '../common/Loader';
import Config from '../constants/Config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Counter from './Counter';

const ProductDetails = props => {
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

  const [counter, setCounter] = useState(1);

  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [isColorSelected, setIsColorSelected] = useState(false);

  const [isLoading, setLoader] = useState(false);
  const [data, setData] = useState({});
  const [sizeList, setSizeList] = useState([]);
  const [colorList, setColorList] = useState([]);

  const [featuredImages, setFeaturedImages] = useState([]);
  const [similar_products, setSimilarProducts] = useState([]);

  useEffect(() => {
    props.getCartRequest(props.loginData.token);
  }, []);

  const onPressMinus = () => {
    setCounter(counter - 1);
  };

  const onPressPlus = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    setSelectedSize('');
    setSelectedColor('');
    setIsColorSelected(false);
    setIsSizeSelected(false);
    setCounter(1);

    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    setLoader(true);

    // let size_id1 = '';
    // let color_id1 = '';
    // if (size_id != '') {
    //   size_id1 = '?size_id=' + size_id;
    // }
    // if (color_id != '') {
    //   color_id1 = '&color_id=' + color_id;
    // }

    // fetch(
    //   `${Config.BASE_URL + Config.single_product}/${
    //     props.selectedProduct.id
    //   }${size_id1}${color_id1}`,
    //   requestOptions,
    // )

    fetch(
      `${Config.BASE_URL + Config.single_product}/${props.selectedProduct.id}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setLoader(false);
        setData(result.data[0]);
        setFeaturedImages(result.featured_images);
        setSizeList(result.filter.sizes);
        setColorList(result.filter.colors);
        setSelectedProductImage(
          result.featured_images
            ? result?.featured_images[0]?.feature_image
            : null,
        );
        setSimilarProducts(result.similar_products);
      })
      .catch(error => {
        setLoader(false);
        console.log('error', error);
      });
  }, [props.selectedProduct]);

  const onAddToCart = () => {
    if (sizeList.length != 0 || colorList.length != 0) {
      if (sizeList.length != 0 && colorList.length != 0) {
        if (!selectedSize || !selectedColor) {
          setIsSizeSelected(true);
          setIsColorSelected(true);
          if (selectedSize) {
            setIsSizeSelected(false);
          }
          if (selectedColor) {
            setIsColorSelected(false);
          }
          return;
        }
      }
      if (sizeList.length != 0 && colorList.length == 0) {
        if (!selectedSize) {
          setIsSizeSelected(true);
          if (selectedSize) {
            setIsSizeSelected(false);
          }
          return;
        }
      }
      if (sizeList.length == 0 && colorList.length != 0) {
        if (!selectedColor) {
          setIsColorSelected(true);
          if (selectedColor) {
            setIsColorSelected(false);
          }
          return;
        }
      }
    }

    let productData = {
      product_id: data.id,
      size_variation_id: selectedSize ? selectedSize : 0,
      color_variation_id: selectedColor ? selectedColor : 0,
      quantity: counter,
      token: props.loginData.token,
      // callBack: () => navigation.navigate('Root', {screen: 'TabThree'}),
    };
    let isInCart = false;
    let itemToChange = false;
    props.cartItemData.forEach(element => {
      if (element.product_id == data.id) {
        if (
          element.variation_color == (selectedColor ? selectedColor : 0) &&
          element.variation_size == (selectedSize ? selectedSize : 0)
        ) {
          itemToChange = element;
          isInCart = true;
        }
      }
    });

    if (isInCart) {
      console.log('Edit');
      var myHeaders = new Headers();
      myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

      var formdata = new FormData();
      formdata.append('cart_id', itemToChange.cart_id);
      formdata.append('product_id', itemToChange.product_id);
      formdata.append('size_variation_id', selectedSize ? selectedSize : 0);
      formdata.append('color_variation_id', selectedColor ? selectedColor : 0);
      formdata.append('quantity', counter + itemToChange.add_cart_stock);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };
      setLoader(true);

      fetch(Config.BASE_URL + Config.update_product_cart, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setLoader(false);
        })
        .catch(error => {
          setLoader(false);
          console.log('error', error);
        });
    } else {
      console.log('Add');
      props.addToCartRequest(productData);
      setLoader(false);
    }

    setTimeout(() => {
      props.getCartRequest(props.loginData.token);
      navigation.navigate('Root', {screen: 'TabThree'});
    }, 1000);
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
          console.log(item);
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
          // console.log(item);
          setSelectedColor(item.id);
          setIsColorSelected(false);
        }}
        backgroundColor={{backgroundColor}}
        borderColor={{borderColor}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.relative}>
      <ScrollView style={styles.relative}>
        <View style={styles.container}>
          <View style={styles.startimg}>
            <ImageBackground
              resizeMode="cover"
              source={{
                uri: selectedProductImage
                  ? `${Config.IMAGE_BASE_URL}products/${selectedProductImage}`
                  : `${Config.IMAGE_BASE_URL}products/${data.main_image}`,
              }}
              style={{
                width: '100%',
                height: 369,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'transparent',
                  zIndex: 5,
                  flexDirection: 'row',
                  padding: 14,
                  alignItems: 'center',
                }}
                onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back"
                  size={18}
                  color="#fff"
                  style={{
                    position: 'relative',
                    marginRight: 6,
                  }}
                />
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Bold,
                    color: '#fff',
                    fontSize: 16,
                    // alignSelf: 'center',
                  }}>
                  {data.name != undefined ? data.name : ''}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
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

            <Counter
              counter={counter}
              onPressMinus={onPressMinus}
              onPressPlus={onPressPlus}
              disabledPlus={counter == 1}
              disabledMinus={counter >= data.quantity}
            />
            {similar_products.length > 0 && (
              <>
                <Text
                  style={[styles.modaltitle, {marginTop: 15, marginBottom: 8}]}>
                  Similar Products
                </Text>

                <SimilarProduct data={similar_products} />
              </>
            )}

            <Row>
              <Col size={48}>
                <TouchableOpacity
                  onPress={() => {
                    onAddToCart();
                  }}
                  style={styles.button}>
                  <LinearGradient colorList={colorList1} angle={360} />
                  <Text style={styles.text}>Add To Cart</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

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
