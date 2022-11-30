/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  ImageBackground,
  LogBox,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
// MY CODE
import CustomDrawer from './CustomDrawer';
import {connect} from 'react-redux';
import Rest from './component/Rest';
// MY CODE
import Ionicons from 'react-native-vector-icons/Ionicons';
import AboutMission from './component/AboutMission';
import Account from './component/Account';
import AddAddress from './component/AddAddress';
import AddCard from './component/AddCard';
import BeReadyCountDown from './component/BeReadyCountDown';
import BeReadyCountDownWalking from './component/BeReadyCountDownWalking';
import Blog from './component/Blog';
import BlogDetails from './component/BlogDetails';
import BlogList from './component/BlogList';
import Checkout from './component/Checkout';
import Congratulations from './component/Congratulations';
import CongratulationsWorkout from './component/CongratulationsWorkout';
import ContactSupport from './component/ContactSupport';
import ContactSupportForm from './component/ContactSupportForm';
import DoubleYourCoins from './component/DoubleYourCoins';
import DoubleYourCoinsCompleted from './component/DoubleYourCoinsCompleted';
import EditAddress from './component/EditAddress';
import EditProductDetails from './component/EditProductDetails';
import EquipmentsSlider from './component/EquipmentsSlider';
import Faqs from './component/Faqs';
import ForgotPassword from './component/ForgotPassword';
import HowToUse from './component/HowToUse';
import Login from './component/Login';
import ManageAddress from './component/ManageAddress';
import MyGovtId from './component/MyGovtId';
import Notification from './component/Notification';
import OrderDetails from './component/OrderDetails';
import OrderHistory from './component/OrderHistory';
import OrderSuccess from './component/OrderSuccess';
import Otp from './component/Otp';
import PaymentCards from './component/PaymentCards';
import PaymentMethod from './component/PaymentMethod';
import Pending from './component/Pending';
import PersonalData from './component/PersonalData';
import PrivacyPolicy from './component/PrivacyPolicy';
import ProductDetails from './component/ProductDetails';
import ProgressDaily from './component/ProgressDaily';
import ProgressThisMonth from './component/ProgressThisMonth';
import ProgressThisWeek from './component/ProgressThisWeek';
import ResetPassword from './component/ResetPassword';
import RunningTimer from './component/RunningTimer';
import RunningTimerWalking from './component/RunningTimerWalking';
import Shop from './component/Shop';
import ShopSlider from './component/ShopSlider';
import SignUp from './component/SignUp';
import SimilarProduct from './component/SimilarProduct';
import Splash from './component/Splash';
import StartRunning from './component/StartRunning';
import StartWalking from './component/StartWalking';
import StartWorkout from './component/StartWorkout';
import TermsOfService from './component/TermsOfService';
import VideoPlayer from './component/VideoPlayer';
import WalkingTimer from './component/WalkingTimer';
import WalkingTimer1 from './component/WalkingTimer1';
import WalkingTimerMilestone from './component/WalkingTimerMilestone';
import WalletRewards from './component/WalletRewards';
import WaterGlass from './component/WaterGlass';
import WorkoutDetails from './component/WorkoutDetails';
import Fonts from './constants/Fonts';
import TabFourScreen from './screens/TabFourScreen';
import TabOneScreen from './screens/TabOneScreen';
import TabThreeScreen from './screens/TabThreeScreen';
import TabTwoScreen from './screens/TabTwoScreen';
import OrderFail from './component/OrderFail';

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

function MainDrawerNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerMode: 'screen',
      }}>
      <Stack.Screen
        name="Root"
        component={MyTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Otp" component={Otp} options={{headerShown: false}} />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ContactSupport"
        component={ContactSupport}
        options={({navigation}) => ({
          title: 'Contact Support',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Ionicons
                name="chevron-back"
                size={24}
                color="#3B2645"
                style={{
                  paddingRight: 12,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="Pending"
        component={Pending}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShopSlider"
        component={ShopSlider}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Blog"
        component={Blog}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StartRunning"
        component={StartRunning}
        options={({navigation}) => ({
          title: 'Start Running',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#fff',
            fontSize: 16,
          },
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Root', {screen: 'TabOne'})}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#fff"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="StartWalking"
        component={StartWalking}
        options={({navigation}) => ({
          title: 'Start Walking',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#fff',
            fontSize: 16,
          },
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Root', {screen: 'TabOne'})}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#fff"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="BeReadyCountDown"
        component={BeReadyCountDown}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Rest"
        component={Rest}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BeReadyCountDownWalking"
        component={BeReadyCountDownWalking}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WalkingTimer"
        component={WalkingTimer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WalkingTimer1"
        component={WalkingTimer1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WalkingTimerMilestone"
        component={WalkingTimerMilestone}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RunningTimer"
        component={RunningTimer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RunningTimerWalking"
        component={RunningTimerWalking}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WalletRewards"
        component={WalletRewards}
        options={({navigation}) => ({
          title: 'Wallet & Rewards',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#fff',
            fontSize: 16,
          },
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Root', {screen: 'TabOne'})}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#fff"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="WaterGlasses"
        component={WaterGlass}
        options={({navigation}) => ({
          title: 'Water Glasses',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Root', {screen: 'TabOne'})}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="DoubleYourCoins"
        component={DoubleYourCoins}
        options={({navigation}) => ({
          title: 'Double Your Coins',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#fff',
            fontSize: 16,
          },
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Root', {screen: 'TabOne'})}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#fff"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="DoubleYourCoinsCompleted"
        component={DoubleYourCoinsCompleted}
        options={({navigation}) => ({
          title: 'Double Your Coins',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#fff',
            fontSize: 16,
          },
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Root', {screen: 'TabOne'})}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#fff"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="Congratulations"
        component={Congratulations}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Shop"
        component={Shop}
        options={({navigation}) => ({
          title: 'Shop',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Root', {screen: 'TabOne'})}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={({navigation}) => ({
          title: 'White Sandles for women',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#fff',
            fontSize: 16,
          },
          headerShown: false,
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#fff"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="EditProductDetails"
        component={EditProductDetails}
        options={({navigation}) => ({
          title: 'White Sandles for women',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#fff',
            fontSize: 16,
          },
          headerTransparent: true,
          headerShown: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#fff"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="SimilarProduct"
        component={SimilarProduct}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BlogList"
        component={BlogList}
        options={({navigation}) => ({
          title: 'Blog List',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Root', {screen: 'TabOne'})}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="BlogDetails"
        component={BlogDetails}
        options={({navigation}) => ({
          title: 'Blog Details',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#fff',
            fontSize: 16,
          },
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#fff"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="WorkoutDetails"
        component={WorkoutDetails}
        options={({navigation}) => ({
          title: '',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#fff',
            fontSize: 16,
          },
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="EquipmentsSlider"
        component={EquipmentsSlider}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StartWorkout"
        component={StartWorkout}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CongratulationsWorkout"
        component={CongratulationsWorkout}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={({navigation}) => ({
          title: 'Payment Method',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={({navigation}) => ({
          title: 'Checkout',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccess}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderFail"
        component={OrderFail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={({navigation}) => ({
          title: 'Account',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Root', {screen: 'TabFour'})}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PersonalData"
        component={PersonalData}
        options={({navigation}) => ({
          title: 'Personal Data',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Root', {screen: 'TabFour'})}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="MyGovtId"
        component={MyGovtId}
        options={({navigation}) => ({
          title: 'My Govt. Id',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Root', {screen: 'TabFour'})}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PaymentCards"
        component={PaymentCards}
        options={({navigation}) => ({
          title: 'Payment Cards',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Root', {screen: 'TabFour'})}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onStartShouldSetResponder={() => navigation.navigate('AddCard')}>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Medium,
                  fontSize: 14,
                  color: '#C068E5',
                }}>
                <Text> +Add </Text>
              </Text>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCard}
        options={({navigation}) => ({
          title: 'Add Card',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ManageAddress"
        component={ManageAddress}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AddAddress"
        component={AddAddress}
        options={({navigation}) => ({
          title: 'Add Address',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="EditAddress"
        component={EditAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HowToUse"
        component={HowToUse}
        options={({navigation}) => ({
          title: 'How To Use',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="TermsOfService"
        component={TermsOfService}
        options={({navigation}) => ({
          title: 'Terms Of Service',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Root', {screen: 'TabFour'})}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={({navigation}) => ({
          title: 'Privacy Policy',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Root', {screen: 'TabFour'})}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Faqs"
        component={Faqs}
        options={({navigation}) => ({
          title: 'FAQs',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Root', {screen: 'TabFour'})}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="AboutMission"
        component={AboutMission}
        options={({navigation}) => ({
          title: 'About & Mission',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#fff',
            fontSize: 16,
          },
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Root', {screen: 'TabFour'})}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#fff"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={({navigation}) => ({
          title: 'Order History',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={({navigation}) => ({
          title: 'Order Details',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => {
            return (
              <View style={styles.delivered}>
                <Text style={styles.title1}>Deliverd</Text>
              </View>
            );
          },
        })}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={({navigation}) => ({
          title: 'Notification',
          headerTitleStyle: {
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#3B2645"
                style={{
                  paddingRight: 6,
                  position: 'relative',
                  top: -1.5,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayer}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ContactSupportForm"
        component={ContactSupportForm}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ProgressDaily"
        component={ProgressDaily}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProgressThisWeek"
        component={ProgressThisWeek}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProgressThisMonth"
        component={ProgressThisMonth}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

// const CustomDrawer = ({navigation}) => {
//   // console.warn('CustomDrawer ::::::', navigation);
//   const drawerNavigation = navigation.getParent('leftdrawer');
//   return (
//     <ImageBackground
//       source={require('./../assets/images/drawer.png')}
//       style={styles.walletbg}>
//       <View
//         style={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//         }}>
//         <TouchableOpacity
//           onPress={() => {
//             console.log(drawerNavigation?.getState());
//             drawerNavigation?.closeDrawer();
//           }}>
//           <Image
//             resizeMode="contain"
//             source={require('./../assets/images/whitemenu.png')}
//             style={{
//               width: 21,
//               height: 15,
//             }}
//           />
//         </TouchableOpacity>
//         <Image
//           resizeMode="contain"
//           source={require('./../assets/images/logo.png')}
//           style={{
//             width: 128,
//             height: 37,
//             marginLeft: 25,
//           }}
//         />
//       </View>

//       <View
//         style={{
//           marginTop: 'auto',
//           paddingHorizontal: 0,
//         }}>
//         <TouchableOpacity
//           style={styles.inbtn}
//           onPress={() => navigation.navigate('ProgressDaily')}>
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               alignItems: 'center',
//             }}>
//             <Image
//               resizeMode="contain"
//               source={require('./../assets/images/myprogress.png')}
//               style={{
//                 width: 22,
//                 height: 22,
//               }}
//             />
//             <Text style={styles.titledrawer}>My Progress</Text>
//           </View>
//           <Image
//             resizeMode="contain"
//             source={require('./../assets/images/whitenav.png')}
//             style={{
//               width: 12,
//               height: 12,
//             }}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.inbtn}
//           onPress={() => navigation.navigate('OrderHistory')}>
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               alignItems: 'center',
//             }}>
//             <Image
//               resizeMode="contain"
//               source={require('./../assets/images/orderhistory.png')}
//               style={{
//                 width: 22,
//                 height: 22,
//               }}
//             />
//             <Text style={styles.titledrawer}>Order History</Text>
//           </View>
//           <Image
//             resizeMode="contain"
//             source={require('./../assets/images/whitenav.png')}
//             style={{
//               width: 12,
//               height: 12,
//             }}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.inbtn, styles.activebtn]}
//           onPress={() => navigation.navigate('Notification')}>
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               alignItems: 'center',
//             }}>
//             <Image
//               resizeMode="contain"
//               source={require('./../assets/images/notification.png')}
//               style={{
//                 width: 22,
//                 height: 22,
//               }}
//             />
//             <Text style={[styles.titledrawer, styles.activetext]}>
//               Notifications
//             </Text>
//           </View>
//           <Image
//             resizeMode="contain"
//             source={require('./../assets/images/back-navs.png')}
//             style={{
//               width: 12,
//               height: 12,
//             }}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.inbtn}
//           onPress={() => navigation.navigate('ContactSupportForm')}>
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               alignItems: 'center',
//             }}>
//             <Image
//               resizeMode="contain"
//               source={require('./../assets/images/contactsupport1.png')}
//               style={{
//                 width: 22,
//                 height: 22,
//               }}
//             />
//             <Text style={styles.titledrawer}>Contact Support</Text>
//           </View>
//           <Image
//             resizeMode="contain"
//             source={require('./../assets/images/whitenav.png')}
//             style={{
//               width: 12,
//               height: 12,
//             }}
//           />
//         </TouchableOpacity>
//       </View>

//       <View
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           marginTop: 'auto',
//         }}>
//         <TouchableOpacity
//           style={styles.dbtn}
//           onPress={() => {
//             navigation.navigate('Login');
//           }}>
//           <Image
//             resizeMode="contain"
//             source={require('./../assets/images/logout.png')}
//             style={{
//               width: 22,
//               height: 22,
//             }}
//           />
//           <Text style={styles.titledrawer}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// };

const Drawer = createDrawerNavigator();

function Navigation(props) {
  return (
    <NavigationContainer independent="true">
      <Drawer.Navigator
        id="leftdrawer"
        initialRouteName="Login"
        drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen
          name="MainDrawerNavigation"
          component={MainDrawerNavigation}
          options={{
            headerShown: false,
            drawerItemStyle: {
              display: 'none',
            },
          }}
        />
        <Drawer.Screen
          name="ProgressDaily"
          component={ProgressDaily}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="ProgressThisMonth"
          component={ProgressThisMonth}
          options={{
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = state => ({
  userDetails: state.profileReducer?.userDetails?.user,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

const Tab = createBottomTabNavigator();

function MyTabs() {
  const navigation = useNavigation();
  const drawerNavigation = navigation.getParent('leftdrawer');
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70,
          paddingTop: 12,
          position: 'relative',
          overflow: 'hidden',
        },
        headerLeftContainerStyle: {
          paddingLeft: 15,
        },
        headerRightContainerStyle: {
          paddingRight: 15,
        },
      }}>
      <Tab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={props => {
          return {
            title: '',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  const state = drawerNavigation?.getState();
                  if (state.default == 'closed') {
                    drawerNavigation?.openDrawer();
                  } else {
                  }
                }}>
                <Image
                  resizeMode="contain"
                  source={require('./../assets/images/menu.png')}
                  style={{
                    width: 21,
                    height: 15,
                  }}
                />
              </TouchableOpacity>
            ),

            tabBarIcon: ({focused}) => (
              <>
                <Image
                  source={
                    focused
                      ? require('./../assets/images/home.png')
                      : require('./../assets/images/home1.png')
                  }
                  style={{width: 20, marginBottom: 10, height: 20}}
                  resizeMode="contain"
                />
                <Image
                  source={
                    focused
                      ? require('./../assets/images/dot.png')
                      : require('./../assets/images/dotwhite.png')
                  }
                  style={{width: 4, height: 4}}
                  resizeMode="contain"
                />
                <Image
                  source={
                    focused
                      ? require('./../assets/images/line.png')
                      : require('./../assets/images/line1.png')
                  }
                  style={{
                    width: 64,
                    height: 4,
                    position: 'absolute',
                    top: -12,
                  }}
                  resizeMode="contain"
                />
              </>
            ),
          };
        }}
      />
      <Tab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: '',
          headerShown: false,
          // headerLeft: () => (
          //   <Text
          //     style={{
          //       fontFamily: Fonts.Poppins_Bold,
          //       fontSize: 16,
          //       color: '#3B2645',
          //     }}>
          //     Workouts
          //   </Text>
          // ),
          // headerRight: () => {
          //   return (
          //     <View>
          //       <TouchableOpacity>
          //         <Image
          //           resizeMode="contain"
          //           source={require('./../assets/images/search.png')}
          //           style={{
          //             width: 17,
          //             height: 17,
          //           }}
          //         />
          //       </TouchableOpacity>
          //       {/* <View style={styles.inputconatiner}>
          //         <TextInput
          //           placeholder="Search Workout..."
          //           style={styles.input}
          //           underlineColor={'transparent'}
          //           selectionColor="#3B2645"
          //           onChangeText={e => {
          //             console.log(e);
          //           }}
          //           theme={{
          //             colors: {
          //               primary: '#F7F8F8',
          //               text: '#3B2645',
          //             },
          //             fonts: {
          //               regular: {
          //                 fontFamily: Fonts.Poppins_Regular,
          //               },
          //             },
          //           }}
          //         />
          //         <Image
          //           resizeMode="contain"
          //           source={require('./../assets/images/back-navs.png')}
          //           style={styles.icon}
          //         />
          //       </View> */}
          //     </View>
          //   );
          // },
          tabBarIcon: ({focused}) => (
            <>
              <Image
                source={
                  focused
                    ? require('./../assets/images/workouts.png')
                    : require('./../assets/images/workouts1.png')
                }
                style={{width: 35, marginBottom: 10, height: 20}}
                resizeMode="contain"
              />
              <Image
                source={
                  focused
                    ? require('./../assets/images/dot.png')
                    : require('./../assets/images/dotwhite.png')
                }
                style={{width: 4, height: 4}}
                resizeMode="contain"
              />
              <Image
                source={
                  focused
                    ? require('./../assets/images/line.png')
                    : require('./../assets/images/line1.png')
                }
                style={{
                  width: 64,
                  height: 4,
                  position: 'absolute',
                  top: -12,
                }}
                resizeMode="contain"
              />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="TabThree"
        component={TabThreeScreen}
        options={{
          title: '',
          headerLeft: () => (
            <Text
              style={{
                fontFamily: Fonts.Poppins_Bold,
                fontSize: 16,
                color: '#3B2645',
              }}>
              Cart
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <>
              <Image
                source={
                  focused
                    ? require('./../assets/images/cart1.png')
                    : require('./../assets/images/cart.png')
                }
                style={{width: 35, marginBottom: 10, height: 20}}
                resizeMode="contain"
              />
              <Image
                source={
                  focused
                    ? require('./../assets/images/dot.png')
                    : require('./../assets/images/dotwhite.png')
                }
                style={{width: 4, height: 4}}
                resizeMode="contain"
              />
              <Image
                source={
                  focused
                    ? require('./../assets/images/line.png')
                    : require('./../assets/images/line1.png')
                }
                style={{
                  width: 64,
                  height: 4,
                  position: 'absolute',
                  top: -12,
                }}
                resizeMode="contain"
              />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="TabFour"
        component={TabFourScreen}
        options={{
          title: '',
          headerLeft: () => (
            <Text
              style={{
                fontFamily: Fonts.Poppins_Bold,
                fontSize: 16,
                color: '#fff',
              }}>
              Profile
            </Text>
          ),
          headerTransparent: true,
          tabBarIcon: ({focused}) => (
            <>
              <Image
                source={
                  focused
                    ? require('./../assets/images/user.png')
                    : require('./../assets/images/user1.png')
                }
                style={{width: 35, marginBottom: 10, height: 20}}
                resizeMode="contain"
              />
              <Image
                source={
                  focused
                    ? require('./../assets/images/dot.png')
                    : require('./../assets/images/dotwhite.png')
                }
                style={{width: 4, height: 4}}
                resizeMode="contain"
              />
              <Image
                source={
                  focused
                    ? require('./../assets/images/line.png')
                    : require('./../assets/images/line1.png')
                }
                style={{
                  width: 64,
                  height: 4,
                  position: 'absolute',
                  top: -12,
                }}
                resizeMode="contain"
              />
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.Poppins_Bold,
    color: '#3B2645',
    fontSize: 17,
  },
  titledrawer: {
    fontFamily: Fonts.Poppins_Medium,
    color: '#fff',
    fontSize: 14,
    paddingLeft: 12,
    paddingTop: 5,
  },
  title11: {
    fontFamily: Fonts.Poppins_SemiBold,
    color: '#63C501',
    fontSize: 10,
  },
  innertitle: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#3B2645',
    fontSize: 17,
  },
  delivered: {
    backgroundColor: '#EFF9E6',
    padding: 10,
    paddingHorizontal: 13,
    borderBottomStartRadius: 14,
    borderTopStartRadius: 14,
    right: -10,
  },
  walletbg: {
    flex: 1,
    padding: 25,
    paddingVertical: 60,
  },
  dbtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9389FE',
    padding: 15,
    borderRadius: 25,
    justifyContent: 'center',
    width: '60%',
    marginTop: 'auto',
  },
  inbtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: 15,
  },
  activebtn: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
  },
  activetext: {
    color: '#000',
  },
});
