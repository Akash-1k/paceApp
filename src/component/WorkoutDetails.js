import React, {useEffect, useState, useCallback} from 'react';
import Fonts from '../constants/Fonts';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  BackHandler,
} from 'react-native';
import {LinearGradient} from 'react-native-gradients';
import {Row, Column as Col, Grid} from 'react-native-responsive-grid';
import EquipmentsSlider from './EquipmentsSlider';
import {List} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {
  setExerciseID,
  workoutDetailsRequest,
  startWorkoutRequest,
} from '../modules/Workout/actions';
import Config from '../constants/Config';
import {toUpperCaseFirst} from '../common/Functions/Func';
import {showAlert} from '../utils/CommonFunctions';

const WorkoutDetails = props => {
  const navigation = useNavigation();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, [navigation]);

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  const [workoutData, setData] = useState();
  const [workout_excersices, setWorkoutExcersices] = useState([]);

  // Read more & Read less... (START)
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 3 lines or not
    // console.log(e.nativeEvent);
  }, []);
  // Read more & Read less... (END)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setData();
      setWorkoutExcersices([]);
      hitWorkoutDetails();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setData(props.workoutDetails);
    setWorkoutExcersices(props.workoutDetails?.workout_excersices);
  }, [props.workoutDetails]);

  const hitWorkoutDetails = () => {
    let data = {
      id: props.listItem.id,
      token: props.loginData.token,
    };
    props.workoutDetailsRequest(data);
  };

  const renderItem = data => {
    return <EquipmentsSlider data={data.item} />;
  };

  const onStartWorkout = () => {
    console.log(props.workoutDetails?.workout_excersices);
    var currExersise = workout_excersices.find(ele => !ele.status);
    console.log('==============================', currExersise);
    if (!currExersise) {
      showAlert('You have completed this workout');
      return;
    }
    props.setExerciseID(currExersise.set_list[0]);

    const data = {
      token: props.loginData.token,
      exersiseId: currExersise.set_list[0].id,
      workout_id: currExersise.set_list[0].workout_id,
      loader: true,
    };
    props.startWorkoutRequest(data);
    navigation.navigate('StartWorkout');
  };

  const onPressExersise = item => {
    // console.log('item :::::', item);
    props.setExerciseID(item);
    // navigation.navigate('StartWorkout');
    const data = {
      token: props.loginData.token,
      exersiseId: item.id,
      workout_id: item.workout_id,
    };
    props.startWorkoutRequest(data);

    navigation.navigate('StartWorkout');
    // navigation.navigate('BeReadyCountDown', {nextScreen: 'StartWorkout'});
    // navigation.navigate('Rest', item);
  };

  const renderExcersices = data => {
    return (
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          {!(data.index == 0) && (
            <View style={{width: '100%', height: 1}}>
              <LinearGradient colorList={colorList1} angle={200} />
            </View>
          )}
        </View>

        <FlatList
          data={data.item.set_list}
          renderItem={renderExcersicesSubList}
        />
      </View>
    );
  };

  const renderExcersicesSubList = data => {
    return (
      <List.Item
        disabled
        onPress={() => {
          onPressExersise(data.item);
        }}
        style={{
          padding: 0,
        }}
        title={toUpperCaseFirst(data.item.title)}
        description={() => {
          const a = [1, 2, 3];
          return (
            <FlatList
              data={a}
              renderItem={({item, index}) => (
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text style={{fontSize: 13}}>{'10 reps  '}</Text>
                  {!(index == a.length - 1) && (
                    <View
                      style={{
                        top: 5,
                        marginHorizontal: 8,
                        height: 5,
                        width: 5,
                        backgroundColor: '#000',
                        borderRadius: 100,
                      }}
                    />
                  )}
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => 'key' + index}
            />
          );
        }}
        titleStyle={{
          fontFamily: Fonts.Poppins_Medium,
          color: '#1D1617',
          fontSize: 14,
        }}
        left={props => (
          <Image
            {...props}
            source={
              data?.item?.thumb_image
                ? {
                    uri: `${Config.IMAGE_BASE_URL}workouts/${data.item.thumb_image}`,
                  }
                : require('../../assets/images/LogoBlack.png')
            }
            resizeMode="cover"
            style={{
              width: 55,
              height: 55,
              borderRadius: 10,
              marginBottom: 12,
            }}
          />
        )}
        right={props => (
          <Text
            style={{
              fontFamily: Fonts.Poppins_Medium,
              color: '#7B6F72',
              opacity: 0.5,
              marginTop: 15,
            }}>
            {data.item.duration}
          </Text>
        )}
      />
    );
  };

  return (
    <SafeAreaView style={styles.relative}>
      {Boolean(workoutData) && (
        <>
          <ScrollView style={styles.relative}>
            <View style={styles.container}>
              <ImageBackground
                resizeMode="cover"
                source={require('../../assets/images/fullbody1.png')}
                // source={{
                //   uri: `https://dev.indiit.solutions/pace/public/assets/images/workouts/${props.workoutDetails.data[0].main_image}`,
                // }}
                style={{
                  width: '100%',
                  height: 300,
                }}>
                <Row
                  style={{
                    paddingTop: '20%',
                    paddingHorizontal: 15,
                  }}>
                  <Col size={49}>
                    <Text
                      style={{
                        fontFamily: Fonts.Poppins_Bold,
                        fontSize: 34,
                        color: '#C068E5',
                        marginBottom: -10,
                      }}>
                      <Text>
                        {' '}
                        {toUpperCaseFirst(
                          workoutData?.data[0]?.title?.split(' ')[0],
                        )}
                      </Text>
                    </Text>
                    <Text
                      style={[
                        styles.title,
                        {
                          fontSize: 24,
                        },
                      ]}>
                      {toUpperCaseFirst(
                        workoutData?.data[0]?.title?.slice(
                          workoutData?.data[0]?.title?.indexOf(' '),
                        ),
                      )}
                    </Text>
                  </Col>
                  <Col size={49}>
                    <Image
                      resizeMode="cover"
                      source={require('../../assets/images/workmain.png')}
                      // source={{
                      //   uri: `https://dev.indiit.solutions/pace/public/assets/images/workouts/${props.workoutDetails.data[0].main_image}`,
                      // }}
                      style={{
                        width: 158,
                        height: 225,
                      }}
                    />
                  </Col>
                </Row>
              </ImageBackground>

              <View style={styles.box}>
                <Text style={[styles.title, {marginBottom: 8}]}>
                  {'Descriptions'}
                </Text>
                <View>
                  <Text
                    onTextLayout={onTextLayout}
                    numberOfLines={textShown ? undefined : 3}
                    style={styles.subtitle}>
                    {props.workoutDetails?.data[0]?.description}
                  </Text>
                  {lengthMore ? (
                    <Text
                      onPress={toggleNumberOfLines}
                      style={{color: '#C068E5'}}>
                      {textShown ? 'Read less...' : 'Read more...'}
                    </Text>
                  ) : null}
                  <View style={styles.desclisbox}>
                    <View style={styles.desclist}>
                      <Text style={styles.desclisttitle}>{'Duration'}</Text>

                      <Text style={styles.desclistsubtitle}>
                        {workoutData?.data[0]?.time_duration == ''
                          ? '-NA-'
                          : `${workoutData?.data[0]?.time_duration} Minutes`}
                      </Text>
                    </View>
                    <View style={styles.desclist}>
                      <Text style={styles.desclisttitle}>{'Calorie Burn'}</Text>
                      <Text style={styles.desclistsubtitle}>
                        {workoutData?.data[0]?.calories_burn == ''
                          ? '-NA-'
                          : `${workoutData?.data[0]?.calories_burn} Calories Burn`}
                      </Text>
                    </View>
                    <View style={styles.desclist}>
                      <Text style={styles.desclisttitle}>{'Difficulty'}</Text>
                      <Text style={styles.desclistsubtitle}>
                        {workoutData?.data[0]?.difficulty_type == ''
                          ? '-NA-'
                          : `${workoutData?.data[0]?.difficulty_type}`}
                      </Text>
                    </View>
                    <View style={styles.desclist}>
                      <Text style={styles.desclisttitle}>
                        {'Training Type'}
                      </Text>
                      <Text style={styles.desclistsubtitle}>
                        {toUpperCaseFirst(workoutData?.data[0]?.training_type)}
                      </Text>
                    </View>
                  </View>

                  {workoutData?.excersice_need.length > 0 && (
                    <>
                      <View style={[styles.flexdir, {marginBottom: 5}]}>
                        <Text style={[styles.sText, {fontSize: 16}]}>
                          Equipments
                        </Text>
                        <TouchableOpacity>
                          <Text
                            style={[
                              styles.sGoal,
                              {fontSize: 12, color: '#B4B4B4'},
                            ]}>
                            {workoutData?.excersice_need != undefined
                              ? workoutData?.excersice_need?.length
                              : '0'}{' '}
                            Items
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <FlatList
                        data={workoutData?.excersice_need}
                        renderItem={renderItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => 'key' + index}
                      />
                    </>
                  )}

                  {workout_excersices && (
                    <>
                      <View style={[styles.flexdir]}>
                        <Text style={[styles.sText, {fontSize: 16}]}>
                          Exercises
                        </Text>
                      </View>

                      <FlatList
                        data={workout_excersices}
                        renderItem={renderExcersices}
                        keyExtractor={(item, index) => 'key1' + index}
                        showsVerticalScrollIndicator={false}
                      />
                    </>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              onStartWorkout();
            }}
            style={styles.button}>
            <Text style={styles.text}>Start Workout</Text>
            <LinearGradient colorList={colorList1} angle={200} />
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
  workoutDetails: state.workoutReducer.workoutDetails,
  listItem: state.workoutReducer.listItem,
});

const mapDispatchToProps = dispatch => ({
  workoutDetailsRequest: data => dispatch(workoutDetailsRequest(data)),
  setExerciseID: data => dispatch(setExerciseID(data)),
  startWorkoutRequest: data => dispatch(startWorkoutRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutDetails);

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
  box: {
    backgroundColor: '#fff',
    marginTop: -90,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    padding: 25,
  },
  startimg: {
    position: 'relative',
  },
  title: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 18,
    lineHeight: 32,
  },
  subtitle: {
    color: '#7B6F72',
    fontSize: 12,
    fontFamily: Fonts.Poppins_Regular,
  },
  desclisbox: {
    marginTop: 15,
    marginBottom: 18,
  },
  desclist: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 8,
  },
  desclisttitle: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 12,
    width: 100,
    color: '#3B2645',
  },
  desclistsubtitle: {
    fontFamily: Fonts.Poppins_Medium,
    fontSize: 12,
    color: '#3B2645',
    width: 180,
  },
  flexdir: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sText: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 10,
    color: '#3B2645',
  },
  sGoal: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 7,
    color: '#737A7B',
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
});
