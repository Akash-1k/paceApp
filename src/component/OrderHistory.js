import React, {useEffect, useState} from 'react';
import Fonts from '../constants/Fonts';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {OrderHistoryDetails} from '../staticData/History';
import {connect} from 'react-redux';
import Loader from '../common/Loader';
import Config, {PLACEHOLDER_IMAGE_COMP} from '../constants/Config';

const SingleProduct = ({item}) => {
  const navigation = useNavigation();

  const [status, setStatus] = useState('');
  const [statusColor, setStatusColor] = useState('');

  useEffect(() => {
    if (item.status == 2) {
      setStatus('Delivered');
      setStatusColor('#63C501');
    } else if (item.status == 0) {
      setStatus('Pending');
      setStatusColor('#F7B551');
    } else if (item.status == 3) {
      setStatus('Canceled');
      setStatusColor('#FF0145');
    } else {
      setStatus(item.status);
      setStatusColor('#FFF');
    }
  }, []);

  return (
    <View style={styles.blogitem1}>
      <View style={[styles.blogitem, {marginBottom: 10}]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('OrderDetails', {id: item.id})}>
          <Image
            resizeMode="cover"
            source={
              item.image == null ? PLACEHOLDER_IMAGE_COMP : {uri: item.image}
            }
            style={{
              width: 79,
              height: 79,
              borderRadius: 3,
            }}
          />
        </TouchableOpacity>
        <View style={styles.blogbody}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              numberOfLines={1}
              style={styles.title}
              onPress={() =>
                navigation.navigate('OrderDetails', {id: item.id})
              }>
              {item.product_name == null ? 'Premium' : item.product_name}
            </Text>
          </View>
          {item.product_name == null ? (
            <Text></Text>
          ) : (
            <Text style={styles.subtitle}>
              {item.size}
              {item.color ? ` | ${item.color}` : ''} {'| x'}
              {item.qty}{' '}
            </Text>
          )}

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.subtitle,
                {
                  width: 140,
                  fontSize: 10,
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
                    fontSize: 10,
                    opacity: 0.7,
                  },
                ]}>
                Order ID :
              </Text>
              {item.order_id.slice(1)}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.Poppins_Bold,
                fontSize: 18,
                color: '#C068E5',
                marginLeft: 5,
                marginTop: -8,
              }}>
              <Text>
                <Text style={{fontSize: 13}}>$</Text>
                {parseFloat(item.price).toFixed(2)}
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '200',
                    fontFamily: Fonts.Poppins_Regular,
                  }}>
                  {/* .00 */}
                </Text>
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            style={{
              position: 'absolute',
              right: -15,
              top: -15,
              backgroundColor: statusColor + '22',
              padding: 5,
              paddingHorizontal: 10,
              borderBottomLeftRadius: 16,
            }}>
            <Text
              style={[
                styles.title1,
                {
                  fontSize: 10,
                  // color: '#564636',
                  color: statusColor,
                },
              ]}>
              {status}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const OrderHistory = props => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getOrderHistory();
  }, []);

  const getOrderHistory = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(Config.BASE_URL + Config.order, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('--------------', result);
        setData(result.orders);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  return (
    <SafeAreaView style={styles.relative}>
      <ScrollView style={styles.relative}>
        <View style={styles.container}>
          <FlatList
            data={data}
            inverted
            renderItem={({item}) => <SingleProduct item={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
      <Loader loading={isLoading} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer?.userDetails,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 18,
  },
  relative: {
    position: 'relative',
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
  },
  blogitem1: {
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
    position: 'relative',
    padding: 15,
    paddingBottom: 5,
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
    justifyContent: 'flex-start',
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
    fontFamily: Fonts.Poppins_Bold,
  },
  title1: {
    fontFamily: Fonts.Poppins_SemiBold,
    color: '#686AFA',
    fontSize: 12,
  },
});
