import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import Config from '../constants/Config';
import Fonts from '../constants/Fonts';
import {setProductDetailsToAddInCart} from '../modules/Shop/actions';

const SimilarProduct = props => {
  const navigation = useNavigation();

  const onProductDetails = item => {
    props.setProductDetailsToAddInCart(item);
    navigation.navigate('ProductDetails');
  };
  console.log('HELKEJEBIBI ::::::::::', props.data);
  const renderItem = item => {
    return (
      <TouchableOpacity
        // onPress={() => { console.log(item) }}
        onPress={() => onProductDetails(item.item)}
        style={styles.items}>
        <Image
          resizeMode="cover"
          source={
            item.item.main_image
              ? {
                  uri:
                    Config.IMAGE_BASE_URL + 'products/' + item.item.main_image,
                }
              : require('../../assets/images/shop1.png')
          }
          style={{
            width: 125,
            height: 141,
            borderRadius: 16,
          }}
        />
        <TouchableOpacity>
          <Text style={styles.title}>{item.item.name}</Text>
        </TouchableOpacity>
        <View style={styles.flexDirection}>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Bold,
              fontSize: 20,
              color: '#C068E5',
            }}>
            <Text>
              <Text style={{fontSize: 14}}>$</Text>
              {item.item.price.split('.00')}.
            </Text>
          </Text>
          <Text style={[styles.subtitle, {bottom: 5, color: '#C068E5'}]}>
            00
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{paddingTop: 4}}>
      <FlatList
        data={props.data}
        renderItem={renderItem}
        horizontal
        keyExtractor={item => item.cart_id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
});

const mapDispatchToProps = dispatch => ({
  setProductDetailsToAddInCart: data =>
    dispatch(setProductDetailsToAddInCart(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SimilarProduct);

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.Poppins_SemiBold,
    color: '#3B2645',
    fontSize: 16,
    paddingTop: 4,
    paddingLeft: 6,
  },
  items: {
    marginRight: 10,
    width: 125,
    display: 'flex',
    flexDirection: 'column',
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
    paddingLeft: 6,
    marginTop: 'auto',
  },
});
