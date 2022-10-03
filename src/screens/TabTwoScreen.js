import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import {LinearGradient} from 'react-native-gradients';
import Fonts from '../constants/Fonts';
import {connect} from 'react-redux';
import {
  setWorkoutListItem,
  workoutListRequest,
} from '../modules/Workout/actions';

const TabTwoScreen = props => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const colorList2 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  useEffect(() => {
    props.workoutListRequest(props.loginData);
  }, []);

  const renderItem = data => {
    return (
      <Pressable
        onPress={() => {
          props.setWorkoutListItem(data.item);
          if (data.item.premium_feature == 1) {
            toggleModal();
          } else {
            navigation.navigate('WorkoutDetails');
          }
        }}
        style={styles.blogitem}>
        <Image
          resizeMode="cover"
          source={
            data.item.main_image.includes('http')
              ? {uri: data.item.main_image}
              : require('../../assets/images/work1.png')
          }
          style={{
            width: 92,
            height: 130,
          }}
        />

        <View style={styles.blogbody}>
          <Text style={styles.title}>{data.item.title}</Text>
          <Text style={styles.subtitle}>
            {data.item.exercise} {'Exercise'} {'| '} {data.item.time_duration}{' '}
            {'mins'}
          </Text>
        </View>
        {data.item.premium_feature == 1 && (
          <View
            style={{
              position: 'absolute',
              right: -1,
              backgroundColor: '#fff',
              opacity: 0.6,
              padding: 5,
              bottom: 103,
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
        )}
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.mainbg}>
      <View style={styles.mainbg}>
        <View style={styles.container}>
          <FlatList data={props.workoutList} renderItem={renderItem} />
        </View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => {
            setModalVisible(false);
          }}
          animationIn="pulse"
          animationInTiming={700}>
          <View style={styles.modalview}>
            {/* Cross Btn */}
            <TouchableOpacity style={styles.crossbtn} onPress={toggleModal}>
              <Image
                resizeMode="contain"
                source={require('../../assets/images/mcross.png')}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>

            <Image
              resizeMode="contain"
              source={require('../../assets/images/premium.png')}
              style={{
                width: '100%',
                height: 242,
              }}
            />
            <Text
              style={{
                fontFamily: Fonts.Poppins_Bold,
                fontSize: 30,
                lineHeight: 35,
              }}>
              Subscribe
            </Text>

            <Text
              style={{
                fontFamily: Fonts.Poppins_Bold,
                fontSize: 30,
                lineHeight: 35,
              }}>
              To
            </Text>

            <Text
              style={{
                fontFamily: Fonts.Poppins_Bold,
                fontSize: 30,
                lineHeight: 35,
                opacity: 0.3,
              }}>
              Premium
            </Text>

            <Text
              style={[
                styles.subtitle,
                {
                  textAlign: 'center',
                  color: '#321C1C',
                  fontSize: 12,
                  paddingTop: 12,
                },
              ]}>
              Enjoy unlimited access to our premium workouts every month.
            </Text>

            <TouchableOpacity
              onPress={() => console.log('Test')}
              style={[styles.button, {width: '100%', marginBottom: 0}]}>
              <LinearGradient colorList={colorList2} angle={180} />
              <Text style={styles.text}>Buy Premium for $9.90</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
  workoutList: state.workoutReducer.workoutList,
  listItem: state.workoutReducer.listItem,
});

const mapDispatchToProps = dispatch => ({
  workoutListRequest: data => dispatch(workoutListRequest(data)),
  setWorkoutListItem: data => dispatch(setWorkoutListItem(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabTwoScreen);

const styles = StyleSheet.create({
  mainbg: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 0,
  },
  blogitem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
    position: 'relative',
  },
  blogbody: {
    position: 'relative',
    paddingHorizontal: 20,
    flex: 1,
    overflow: 'hidden',
  },
  title: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 16,
  },
  subtitle: {
    color: '#3B2645',
    fontSize: 12,
    opacity: 0.7,
    fontFamily: Fonts.Poppins_Regular,
  },
  modalview: {
    backgroundColor: '#fff',
    borderRadius: 26,
    padding: 26,
    paddingHorizontal: 35,
    paddingTop: 50,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossbtn: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
  button: {
    position: 'relative',
    height: 60,
    borderRadius: 1000,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },
  text: {
    position: 'absolute',
    zIndex: 1,
    fontFamily: Fonts.Poppins_Bold,
    color: '#fff',
    fontSize: 16,
  },
});
