import React from 'react';
import {
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Row, Column as Col, Grid} from 'react-native-responsive-grid';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import Fonts from '../constants/Fonts';

const WalletRewards = props => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.detailbox}>
          <View style={styles.radius}>
            <ImageBackground
              source={require('../../assets/images/walletbg.png')}
              style={styles.walletbg}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/wallettran.png')}
                style={{
                  width: 85,
                  height: 85,
                }}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  alignItems: 'center',
                  marginVertical: 20,
                  marginBottom: 0,
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../../assets/images/coins.png')}
                  style={{
                    width: 50,
                    height: 50,
                    marginRight: 7,
                  }}
                />

                <Text
                  style={[
                    styles.titlemins,
                    {
                      color: '#fff',
                      fontSize: 43,
                      fontFamily: Fonts.Poppins_SemiBold,
                      position: 'relative',
                      top: 3,
                    },
                  ]}>
                  {props.homeData?.wallet?.earn_coins}{' '}
                  <Text style={{fontSize: 23}}>Coins</Text>
                </Text>
              </View>

              <Text
                style={[
                  styles.titlemins,
                  {
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: Fonts.Poppins_Regular,
                  },
                ]}>
                Current Balance
              </Text>
            </ImageBackground>
          </View>
          <View style={styles.container}>
            <Row>
              <Col size={48}>
                <View style={styles.flexcenter}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/money.png')}
                    style={{
                      width: 85,
                      height: 85,
                    }}
                  />
                  <Text style={[styles.title, {paddingVertical: 8}]}>
                    Spend Money
                  </Text>
                  <TouchableOpacity
                    style={styles.startbtn}
                    onPress={() => navigation.navigate('Shop')}>
                    <Text style={styles.btntext}>Go to shop</Text>
                  </TouchableOpacity>
                </View>
              </Col>

              <Col size={48} offset={4}>
                <View style={styles.flexcenter}>
                  <Image
                    resizeMode="contain"
                    source={require('../../assets/images/startlogo.png')}
                    style={{
                      width: 85,
                      height: 85,
                    }}
                  />
                  <Text style={[styles.title, {paddingVertical: 8}]}>
                    Start Workout
                  </Text>
                  <TouchableOpacity
                    style={styles.startbtn}
                    onPress={() =>
                      navigation.navigate('Root', {screen: 'TabTwo'})
                    }>
                    <Text style={styles.btntext}>Earn More</Text>
                  </TouchableOpacity>
                </View>
              </Col>
            </Row>

            <View style={{paddingVertical: 15}}>
              <Text style={styles.heading}>Earning Summary</Text>
              <View style={styles.boxbor}>
                <View style={styles.headflex}>
                  <Text style={styles.heading}>Today</Text>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={[
                        styles.titlemins,
                        {
                          color: '#3B2645',
                          fontSize: 12,
                          fontFamily: Fonts.Poppins_Medium,
                          position: 'relative',
                          top: -5,
                          paddingRight: 6,
                        },
                      ]}>
                      Earned
                    </Text>
                    <Text
                      style={{
                        fontFamily: Fonts.Poppins_Bold,
                        fontSize: 20,
                        color: '#C068E5',
                      }}>
                      <Text>
                        {props.homeData?.wallet?.earn_coins}{' '}
                        <Text style={{fontSize: 14}}>Coins</Text>
                      </Text>
                    </Text>
                  </View>
                </View>

                <Text style={styles.stitle}>
                  Keep on adding money to your wallet, do more exercises and see
                  the results!
                </Text>

                <TouchableOpacity style={[styles.btnn, {marginTop: 9}]}>
                  <Text style={styles.btntext1}>See All Transactions</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.heading}>Spending History</Text>
            <View style={[styles.boxbor, {paddingBottom: 8, marginBottom: 10}]}>
              <View style={styles.headflex}>
                <Text style={[styles.heading, {fontSize: 14}]}>
                  Order ID: 0706502
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={[
                      styles.titlemins,
                      {
                        color: '#3B2645',
                        fontSize: 14,
                        fontFamily: Fonts.Poppins_SemiBold,
                        position: 'relative',
                        top: -5,
                        paddingRight: 6,
                      },
                    ]}>
                    <Text style={{color: '#E73072'}}>-$18</Text>.00
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.boxbor, {paddingBottom: 8, marginBottom: 10}]}>
              <View style={styles.headflex}>
                <Text style={[styles.heading, {fontSize: 14}]}>
                  Order ID: 0706502
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={[
                      styles.titlemins,
                      {
                        color: '#3B2645',
                        fontSize: 14,
                        fontFamily: Fonts.Poppins_SemiBold,
                        position: 'relative',
                        top: -5,
                        paddingRight: 6,
                      },
                    ]}>
                    <Text style={{color: '#E73072'}}>-$46</Text>.00
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.boxbor, {paddingBottom: 8, marginBottom: 10}]}>
              <View style={styles.headflex}>
                <Text style={[styles.heading, {fontSize: 14}]}>
                  Order ID: 0706502
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={[
                      styles.titlemins,
                      {
                        color: '#3B2645',
                        fontSize: 14,
                        fontFamily: Fonts.Poppins_SemiBold,
                        position: 'relative',
                        top: -5,
                        paddingRight: 6,
                      },
                    ]}>
                    <Text style={{color: '#E73072'}}>-$59</Text>.08
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer?.loginData,
  userDetails: state.profileReducer?.userDetails,
  homeData: state.homeReducer?.homeData,
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(WalletRewards);

const styles = StyleSheet.create({
  radius: {
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    overflow: 'hidden',
    height: 350,
  },
  walletbg: {
    height: 350,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailbox: {
    position: 'relative',
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 15,
    marginTop: -50,
  },
  title: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 13,
  },
  startbtn: {
    backgroundColor: '#F6F0FD',
    padding: 7,
    width: 100,
    height: 33,
    borderRadius: 22,
  },
  btntext: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    color: '#3B2645',
  },
  btntext1: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
    color: '#3B2645',
  },
  flexcenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#B668E7',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  headflex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 16,
    color: '#1D1617',
    marginBottom: 8,
  },
  stitle: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#7B6F72',
    fontSize: 12,
  },
  btnn: {
    borderWidth: 1,
    borderColor: '#B668E7',
    padding: 11,
    borderRadius: 6,
  },
  boxbor: {
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 15,
    padding: 15,
  },
});
