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

const OrderDetails = () => {
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

  // API CALL
  useEffect(() => {
    SingleOrderHistoryDetails.map(item => {
      if (item.id == route.params.id) {
        if (item.status == 'Deliverd') {
          setStatus(item.status);
          setStatusColor('#63C501');
        } else if (item.status == 'Pending') {
          setStatus(item.status);
          setStatusColor('#F7B551');
        } else if (item.status == 'Canceled') {
          setStatus(item.status);
          setStatusColor('#FF0145');
        } else {
          setStatus(item.status);
          setStatusColor('#FFF');
        }
        setSelectedProduct(item);
      }
    });
  }, []);

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

  return (
    <SafeAreaView style={styles.relative}>
      <ScrollView style={styles.relative}>
        {selectedProduct && (
          <View style={styles.container}>
            <View style={styles.blogitem1}>
              <View style={[styles.blogitem, {marginBottom: 10}]}>
                <Image
                  resizeMode="cover"
                  source={selectedProduct.url}
                  style={{
                    width: 106,
                    height: 126,
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
                      {selectedProduct.title}
                    </Text>
                  </View>
                  <View>
                    {selectedProduct.options.quantity && (
                      <ListOptions
                        option="Quantity"
                        value={selectedProduct.options.quantity}
                      />
                    )}

                    {selectedProduct.options.color && (
                      <ListOptions
                        option="Color"
                        value={selectedProduct.options.color}
                      />
                    )}

                    {selectedProduct.options.size && (
                      <ListOptions
                        option="Size"
                        value={selectedProduct.options.size}
                      />
                    )}
                    {selectedProduct.options.weight && (
                      <ListOptions
                        option="Weight"
                        value={selectedProduct.options.weight}
                      />
                    )}
                    {selectedProduct.orderId && (
                      <ListOptions
                        option="Order ID"
                        value={selectedProduct.orderId}
                      />
                    )}
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.deladdress}>
              <View style={styles.delbody}>
                <Text style={styles.title1}>Order info</Text>
                <Text style={styles.textgray}>Order Address</Text>
                <Text
                  style={[
                    styles.subtitle1,
                    {fontFamily: Fonts.Poppins_Medium},
                  ]}>
                  {selectedProduct.orderInfo.orderAddress}
                </Text>
                <Text style={[styles.textgray, {marginTop: 6}]}>
                  Receiver's Name
                </Text>
                <Text
                  style={[
                    styles.subtitle1,
                    {fontFamily: Fonts.Poppins_Medium, marginBottom: 6},
                  ]}>
                  {selectedProduct.orderInfo.receiverName}
                </Text>
                <Text style={styles.textgray}>Payment Method</Text>
                <Text
                  style={[
                    styles.subtitle1,
                    {fontFamily: Fonts.Poppins_Medium},
                  ]}>
                  {selectedProduct.orderInfo.paymentMethod}
                </Text>
              </View>
            </View>

            <Text style={[styles.sText, {marginBottom: 5}]}>Order Info</Text>

            <View style={styles.flexdir}>
              <Text style={styles.sText1}>{selectedProduct.title}</Text>
              <Text style={styles.sPrice1}>${selectedProduct.price}.00</Text>
            </View>

            <View style={styles.flexdir}>
              <Text style={styles.sText1}>Taxes</Text>
              <Text style={styles.sPrice1}>
                ${selectedProduct.orderInfo.taxes}.00
              </Text>
            </View>

            <View style={styles.flexdir}>
              <Text style={styles.sText1}>Shipping</Text>
              <Text style={styles.sPrice1}>
                ${selectedProduct.orderInfo.shipping}.00
              </Text>
            </View>

            <View style={[styles.flexdir, {marginBottom: 10}]}>
              <Text style={styles.sGoal2}>
                Total ({selectedProduct.options.quantity} items)
              </Text>
              <Text style={styles.sText2}>
                <Text style={{fontSize: 12}}>$</Text>
                {selectedProduct.price +
                  selectedProduct.orderInfo.taxes +
                  selectedProduct.orderInfo.shipping}
                .<Text style={{fontSize: 12}}>00</Text>
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      {selectedProduct && selectedProduct.status == 'Deliverd' && (
        <TouchableOpacity style={styles.button}>
          <LinearGradient
            style={styles.granew}
            colorList={colorList1}
            angle={200}></LinearGradient>
          <Text style={styles.text}>Buy Again</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default OrderDetails;

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
    paddingLeft: 15,
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
