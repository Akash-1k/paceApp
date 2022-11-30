import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import {connect} from 'react-redux';
import Config from '../constants/Config';
import Fonts from '../constants/Fonts';
import {
  setProductDetailsToAddInCart,
  getCartRequest,
} from '../modules/Shop/actions';

const ShopSlider = props => {
  const navigation = useNavigation();
  const [index, setIndex] = React.useState(0);
  const [shopList, setShopList] = React.useState([]);
  const [routes, setRoutes] = React.useState([
    {key: 'first', title: 'New'},
    {key: 'second', title: 'Hot'},
    {key: 'third', title: 'Sale'},
  ]);

  useEffect(() => {
    if (props.data != undefined) {
      setShopList(props.data[index].products_list);
    }
  }, [props.data]);

  const onProductDetails = item => {
    props.setProductDetailsToAddInCart(item);
    navigation.navigate('ProductDetails');
  };

  const reanderItemShop = item => {
    return (
      <View style={styles.items}>
        <TouchableOpacity onPress={() => onProductDetails(item.item)}>
          <Image
            resizeMode="cover"
            source={{
              uri: `${Config.IMAGE_BASE_URL}products/${item.item.main_image}`,
            }}
            style={{
              width: 112,
              height: 141,
              borderRadius: 16,
            }}
          />
          <Text style={styles.title} numberOfLines={1}>
            {item.item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const FirstRoute = () => {
    return (
      <SafeAreaView>
        <View style={{paddingTop: 15}}>
          <FlatList
            initialNumToRender={0}
            renderItem={reanderItemShop}
            // keyExtractor={index => {
            //   return index;
            // }}
            data={shopList}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    );
  };

  const layout = useWindowDimensions();

  const onChangeIndex = index => {
    setIndex(index);
    setShopList(props.data[index].products_list);
  };

  return (
    <TabView
      swipeEnabled={false}
      navigationState={{index, routes}}
      renderScene={FirstRoute}
      onIndexChange={onChangeIndex}
      style={{
        height: 230,
      }}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          style={{
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
          }}
          indicatorStyle={{
            backgroundColor: '#C068E5',
          }}
          activeColor="#C068E5"
          labelStyle={{
            fontFamily: Fonts.Poppins_SemiBold,
            fontSize: 12,
            color: '#3B2645',
            textTransform: 'capitalize',
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#3B2645',
    fontSize: 12,
    paddingTop: 4,
    paddingLeft: 6,
  },
  items: {
    marginRight: 10,
    width: 112,
  },
});

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
  cartItemData: state.shopReducer.cartItemData,
});

const mapDispatchToProps = dispatch => ({
  setProductDetailsToAddInCart: data =>
    dispatch(setProductDetailsToAddInCart(data)),
  getCartRequest: data => dispatch(getCartRequest(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShopSlider);
