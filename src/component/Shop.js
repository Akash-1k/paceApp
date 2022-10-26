import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import Fonts from '../constants/Fonts';
import {connect} from 'react-redux';
import {
  setProductDetailsToAddInCart,
  shopCategoryListRequest,
} from '../modules/Shop/actions';
import Config from '../constants/Config';
import Loader from '../common/Loader';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {LinearGradient} from 'react-native-gradients';

const Shop = props => {
  const navigation = useNavigation();
  // console.log('props.shopCategoryList', props.shopCategoryList);
  const DATA1 = [
    {
      id: '1',
      title: 'Popular',
    },
    {
      id: '2',
      title: 'Newest',
    },
    {
      id: '3',
      title: 'Price: Low to high',
    },
    {
      id: '4',
      title: 'Price: High to low',
    },
  ];

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const [productList, setProductsList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [allProductData, setAllProductData] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [orderby, setOrderBy] = useState('desc');
  const [min_price, setMinPrice] = useState(0);
  const [max_price, setMaxPrice] = useState('');
  const [cat_id, setCatId] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    props.shopCategoryListRequest(props.loginData);
  }, []);

  useEffect(() => {
    // setProductsList([]);
    getAllProducts();
  }, [cat_id]);

  const getAllProducts = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var formdata = new FormData();

    if (searchQuery != '') {
      formdata.append('search', searchQuery);
    }

    if (cat_id != '') {
      formdata.append('cat_id', cat_id);
    }
    // formdata.append('start', productList.length);
    // formdata.append('recordsPerPage', 2);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata._parts.length > 0 ? formdata : '',
      redirect: 'follow',
    };

    setIsLoading(true);
    fetch(Config.BASE_URL + Config.fetch_products, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setAllProductData(result);
        setProductsList(result.products);
        // setColorList(result.variation.colors);
        // setSizeList(result.variation.sizes);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  const onSelectCategory = (item, index) => {
    console.log(item);
    setSelectedCategory(index);
    setCatId(item.id);
  };
  const Item = ({item, onPress, backgroundColor, borderColor, textColor}) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, backgroundColor, borderColor]}>
      <Text style={[styles.title, textColor]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#F9F6FE' : '#F9F6FE';
    const borderColor = item.id === selectedId ? '#B668E7' : '#EAE1FC';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{backgroundColor}}
        borderColor={{borderColor}}
      />
    );
  };

  const Item1 = ({item, onPress, backgroundColor, borderColor, textColor}) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.item,
        backgroundColor,
        borderColor,
        {
          marginBottom: 7,
          paddingVertical: 12,
        },
      ]}>
      <Text
        style={[
          styles.title,
          textColor,
          {
            textAlign: 'left',
          },
        ]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const [selectedId1, setSelectedId1] = useState(null);

  const renderItem1 = ({item}) => {
    const backgroundColor = item.id === selectedId1 ? '#F9F6FE' : '#fff';
    const borderColor = item.id === selectedId1 ? '#EAE1FC' : '#fff';

    return (
      <Item1
        item={item}
        onPress={() => setSelectedId1(item.id)}
        backgroundColor={{backgroundColor}}
        borderColor={{borderColor}}
      />
    );
  };

  const onProductDetails = item => {
    // console.log(item);
    props.setProductDetailsToAddInCart(item);
    navigation.navigate('ProductDetails');
  };

  const renderItemProducts = data => {
    return (
      <View style={styles.listitems}>
        <View style={styles.itemrealtive}>
          <TouchableOpacity onPress={() => onProductDetails(data.item)}>
            <Image
              resizeMode="cover"
              source={{
                uri: data.item.main_image
                  ? `${Config.IMAGE_BASE_URL}products/${data.item.main_image}`
                  : Config.PLACEHOLDER_IMAGE,
              }}
              style={{
                width: 150,
                height: 178,
                borderRadius: 16,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              right: 0,
              backgroundColor: '#fff',
              opacity: 0.6,
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
              <AntDesign name="staro" color="#F4AC3E" size={10} /> Premium
            </Text>
          </View>
        </View>
        <View style={styles.innerstyle}>
          <Text style={styles.title}>{data.item.name}</Text>
          <View style={styles.flexDirection}>
            <Text
              style={{
                fontFamily: Fonts.Poppins_Bold,
                fontSize: 20,
                color: '#C068E5',
              }}>
              <Text>
                <Text style={{fontSize: 14}}>$</Text>
                {data.item.price}
              </Text>
            </Text>
            {/* <Text style={[styles.subtitle, { color: "#C068E5", bottom: 5 }]}>00</Text> */}
          </View>
        </View>
      </View>
    );
  };

  const CustomSliderMarkerLeft = () => {
    return (
      <View style={{height: 30, width: 30}}>
        <Image
          style={{height: 30, width: 30, resizeMode: 'contain'}}
          source={require('../../assets/images/filter_circle.png')}
        />
      </View>
    );
  };

  const CustomSliderMarkerRight = () => {
    return (
      <View style={{height: 30, width: 30}}>
        <Image
          style={{height: 30, width: 30, resizeMode: 'contain'}}
          source={require('../../assets/images/filter_circle.png')}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainbg}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.searchbar}>
            <Searchbar
              placeholder="Search Product"
              loading
              onChangeText={onChangeSearch}
              onSubmitEditing={t => {
                getAllProducts();
              }}
              value={searchQuery}
              placeholderTextColor="#B5B3B3"
              inputStyle={{
                backgroundColor: '#F7F8F8',
                fontFamily: Fonts.Poppins_Regular,
                fontSize: 14,
              }}
              style={{
                backgroundColor: '#F7F8F8',
                height: 60,
                paddingRight: 38,
              }}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                top: 10,
                right: 18,
              }}>
              <Text style={{color: '#DDDADA', marginRight: 10, fontSize: 25}}>
                |
              </Text>
              <TouchableOpacity onPress={toggleModal}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/images/filter.png')}
                  style={{
                    width: 18,
                    height: 18,
                    position: 'relative',
                    top: 2,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{paddingLeft: 15, marginVertical: 15}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {props.shopCategoryList.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      onSelectCategory(item, index);
                    }}
                    style={[
                      styles.badgeBox,
                      index == selectedCategory ? styles.activeBadge : null,
                    ]}>
                    <Text style={styles.badegtitle}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          {Boolean(productList.length > 0) ? (
            <View style={styles.itemsBox}>
              <FlatList
                data={productList}
                renderItem={renderItemProducts}
                numColumns={2}
                // onEndReached={() => {
                //   getAllProducts();
                // }}
                // onEndReachedThreshold={1}
              />
            </View>
          ) : (
            <View
              style={{
                height: 500,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/empty.png')}
                style={{width: 100, height: 100}}
              />
              <Text
                style={[styles.title1, {fontSize: 25, textAlign: 'center'}]}>
                {'No Product Found'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        animationInTiming={1000}
        coverScreen={true}
        style={{
          padding: 0,
          margin: 0,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}>
        <View style={styles.modalview}>
          <Text style={styles.modalheading}>Filters</Text>
          <Text style={styles.modaltitle}>Price Range</Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={[{fontFamily: Fonts.Poppins_Medium, width: 30}]}>
              {'$'}
              {min_price}{' '}
            </Text>

            <MultiSlider
              sliderLength={width - 150}
              containerStyle={{marginHorizontal: 10}}
              isMarkersSeparated={true}
              max={100}
              min={0}
              values={[min_price, max_price]}
              customMarkerLeft={e => {
                return <CustomSliderMarkerLeft currentValue={e.currentValue} />;
              }}
              customMarkerRight={e => {
                return (
                  <CustomSliderMarkerRight currentValue={e.currentValue} />
                );
              }}
              onValuesChange={value => {
                setMinPrice(value[0]);
                setMaxPrice(value[1]);
              }}
            />
            <Text style={[{fontFamily: Fonts.Poppins_Medium, width: 30}]}>
              {'$'}
              {max_price}{' '}
            </Text>
          </View>

          <Text style={[styles.modaltitle, {marginTop: 12, marginBottom: 8}]}>
            Sizes
          </Text>
          <FlatList
            data={sizeList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
            horizontal
          />

          <Text style={[styles.modaltitle, {marginTop: 18, marginBottom: 8}]}>
            Sort By
          </Text>
          <FlatList
            data={DATA1}
            renderItem={renderItem1}
            keyExtractor={item => item.id}
            extraData={selectedId1}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalVisible(false);
              // getAllProducts();
            }}>
            <Text style={styles.text}>Apply</Text>
            <LinearGradient colorList={colorList1} angle={20} />
          </TouchableOpacity>
        </View>
      </Modal>
      <Loader loading={isLoading} />
    </SafeAreaView>
  );
};

const {width, height} = Dimensions.get('window');
const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
  shopCategoryList: state.shopReducer.shopCategoryList,
});

const mapDispatchToProps = dispatch => ({
  setProductDetailsToAddInCart: data =>
    dispatch(setProductDetailsToAddInCart(data)),
  shopCategoryListRequest: data => dispatch(shopCategoryListRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);

const styles = StyleSheet.create({
  mainbg: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  searchbar: {
    backgroundColor: '#F7F8F8',
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 15,
    position: 'relative',
  },
  badegtitle: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 12,
    color: '#3B2645',
  },
  badgeBox: {
    display: 'flex',
    padding: 8,
    borderRadius: 1000,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  activeBadge: {
    paddingHorizontal: 22,
    backgroundColor: '#F6F0FD',
    borderWidth: 1,
    borderColor: '#B668E7',
  },
  listitems: {
    paddingHorizontal: 15,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: '49%',
  },
  title: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 14,
    textAlign: 'left',
    lineHeight: 20,
  },
  itemrealtive: {
    position: 'relative',
    marginBottom: 5,
    borderRadius: 16,
    overflow: 'hidden',
  },
  subtitle: {
    color: '#C4BEC7',
    fontSize: 12,
    fontFamily: Fonts.Poppins_Regular,
  },
  flexDirection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  itemsBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
  modalview: {
    backgroundColor: '#fff',
    padding: 26,
    marginBottom: 0,
    paddingHorizontal: 25,
    position: 'relative',
    width: '100%',
    borderTopStartRadius: 35,
    borderTopRightRadius: 35,
  },
  modalheading: {
    fontFamily: Fonts.Poppins_Bold,
    color: '#3B2645',
    fontSize: 20,
    textAlign: 'center',
  },
  modaltitle: {
    fontFamily: Fonts.Poppins_SemiBold,
    color: '#3B2645',
    fontSize: 16,
  },
  item: {
    padding: 6,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 12,
    marginRight: 4,
  },
  title: {
    fontSize: 13,
    color: '#3B2645',
    fontFamily: Fonts.Poppins_SemiBold,
  },
  innerstyle: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
