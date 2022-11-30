import React from 'react';
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
import {List, Button, Divider} from 'react-native-paper';
import {notificationData} from '../staticData/NotificationStaticData';

const SingleNotification = ({item}) => {
  console.log('item :::::', item);
  return (
    <>
      <View style={styles.boxitem}>
        <List.Item
          title={() => (
            <View style={{position: 'relative', top: -8}}>
              <Text style={styles.title}>{item.title}</Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <Text numberOfLines={1} style={styles.subtitle}>
                  {item.subtitle}
                </Text>
                {item.orderId && (
                  <Text
                    style={[
                      styles.subtitle,
                      {
                        fontSize: 10,
                        paddingLeft: 10,
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
                        },
                      ]}>
                      Order ID :{' '}
                    </Text>{' '}
                    {item.orderId}
                  </Text>
                )}
              </View>
            </View>
          )}
          left={() => (
            <View style={styles.userimg}>
              <Image
                resizeMode="cover"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 1000,
                }}
                source={item.url}
              />
            </View>
          )}
          right={() => <Text style={styles.justnow}>{item.time}</Text>}
          style={{paddingVertical: 0, paddingHorizontal: 0}}
        />
      </View>
      <Divider
        style={{
          backgroundColor: '#DDDADA',
          height: 1.1,
          margin: 0,
        }}
      />
    </>
  );
};

const Notification = () => {
  return (
    <SafeAreaView style={styles.relative}>
      <ScrollView style={styles.relative}>
        <View style={styles.container}>
          <FlatList
            data={notificationData}
            renderItem={({item}) => <SingleNotification item={item} />}
            keyExtractor={item => item.id}
          />
          {/* <View style={styles.boxitem}>
            <List.Item
              title={() => (
                <View style={{position: 'relative', top: -8}}>
                  <Text style={styles.title}>Your order arriving soon</Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.subtitle}>Bershka Mom Jeans</Text>
                    <Text
                      style={[
                        styles.subtitle,
                        {
                          fontSize: 10,
                          paddingLeft: 10,
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
                          },
                        ]}>
                        Order ID :{' '}
                      </Text>{' '}
                      0706502
                    </Text>
                  </View>
                </View>
              )}
              left={() => (
                <View style={styles.userimg}>
                  <Image
                    resizeMode="cover"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 1000,
                    }}
                    source={require('../../assets/images/shop3.png')}
                  />
                </View>
              )}
              right={() => <Text style={styles.justnow}>Just Now</Text>}
              style={{paddingVertical: 0, paddingHorizontal: 0}}
            />
          </View>
          <Divider
            style={{
              backgroundColor: '#DDDADA',
              height: 1.1,
              margin: 0,
            }}
          />

          <View style={styles.boxitem}>
            <List.Item
              title={() => (
                <View style={{position: 'relative', top: -8}}>
                  <Text style={styles.title}>Alert New Update is here</Text>
                </View>
              )}
              left={() => (
                <View style={styles.userimg}>
                  <Image
                    resizeMode="cover"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 1000,
                    }}
                    source={require('../../assets/images/paceapp.png')}
                  />
                </View>
              )}
              right={() => <Text style={styles.justnow}>2 mins ago</Text>}
              style={{paddingVertical: 0, paddingHorizontal: 0}}
            />
          </View>
          <Divider
            style={{
              backgroundColor: '#DDDADA',
              height: 1.1,
            }}
          />

          <View style={styles.boxitem}>
            <List.Item
              title={() => (
                <View style={{position: 'relative', top: -8}}>
                  <Text style={styles.title}>Your order arriving soon</Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.subtitle}>Bershka Mom Jeans</Text>
                    <Text
                      style={[
                        styles.subtitle,
                        {
                          fontSize: 10,
                          paddingLeft: 10,
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
                          },
                        ]}>
                        Order ID :{' '}
                      </Text>{' '}
                      0706502
                    </Text>
                  </View>
                </View>
              )}
              left={() => (
                <View style={styles.userimg}>
                  <Image
                    resizeMode="cover"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 1000,
                    }}
                    source={require('../../assets/images/shop3.png')}
                  />
                </View>
              )}
              right={() => <Text style={styles.justnow}>Just Now</Text>}
              style={{paddingVertical: 0, paddingHorizontal: 0}}
            />
          </View>
          <Divider
            style={{
              backgroundColor: '#DDDADA',
              height: 1.1,
              margin: 0,
            }}
          />

          <View style={styles.boxitem}>
            <List.Item
              title={() => (
                <View style={{position: 'relative', top: -8}}>
                  <Text style={styles.title}>Alert New Update is here</Text>
                </View>
              )}
              left={() => (
                <View style={styles.userimg}>
                  <Image
                    resizeMode="cover"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 1000,
                    }}
                    source={require('../../assets/images/paceapp.png')}
                  />
                </View>
              )}
              right={() => <Text style={styles.justnow}>2 mins ago</Text>}
              style={{paddingVertical: 0, paddingHorizontal: 0}}
            />
          </View>
          <Divider
            style={{
              backgroundColor: '#DDDADA',
              height: 1.1,
            }}
          />

          <View style={styles.boxitem}>
            <List.Item
              title={() => (
                <View style={{position: 'relative', top: -8}}>
                  <Text style={styles.title}>Your order arriving soon</Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    <Text style={styles.subtitle}>Bershka Mom Jeans</Text>
                    <Text
                      style={[
                        styles.subtitle,
                        {
                          fontSize: 10,
                          paddingLeft: 10,
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
                          },
                        ]}>
                        Order ID :{' '}
                      </Text>{' '}
                      0706502
                    </Text>
                  </View>
                </View>
              )}
              left={() => (
                <View style={styles.userimg}>
                  <Image
                    resizeMode="cover"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 1000,
                    }}
                    source={require('../../assets/images/shop3.png')}
                  />
                </View>
              )}
              right={() => <Text style={styles.justnow}>Just Now</Text>}
              style={{paddingVertical: 0, paddingHorizontal: 0}}
            />
          </View>
          <Divider
            style={{
              backgroundColor: '#DDDADA',
              height: 1.1,
              margin: 0,
            }}
          />

          <View style={styles.boxitem}>
            <List.Item
              title={() => (
                <View style={{position: 'relative', top: -8}}>
                  <Text style={styles.title}>Alert New Update is here</Text>
                </View>
              )}
              left={() => (
                <View style={styles.userimg}>
                  <Image
                    resizeMode="cover"
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 1000,
                    }}
                    source={require('../../assets/images/paceapp.png')}
                  />
                </View>
              )}
              right={() => <Text style={styles.justnow}>2 mins ago</Text>}
              style={{paddingVertical: 0, paddingHorizontal: 0}}
            />
          </View>
          <Divider
            style={{
              backgroundColor: '#DDDADA',
              height: 1.1,
            }}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;

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
  userimg: {
    borderRadius: 1000,
    width: 63,
    height: 63,
    position: 'relative',
  },
  title: {
    color: '#1D1617',
    marginBottom: 0,
    fontFamily: Fonts.Poppins_Medium,
    fontSize: 12,
  },
  subtitle: {
    color: '#76677D',
    marginBottom: 0,
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 10,
  },
  justnow: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 10,
    position: 'relative',
    top: 6,
  },
  boxitem: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingTop: 12,
  },
});
