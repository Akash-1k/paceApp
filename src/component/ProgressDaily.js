import React, {useState, useEffect} from 'react';
import Fonts from '../constants/Fonts';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LineProgressBar from './LineProgressBar';
import {monthNames} from '../common/StaticData';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';
import {connect} from 'react-redux';
import {myProgressRequest} from '../modules/Progress/actions';

export const data1 = [
  {
    id: 1,
    date: '25 May 2021',
    progressList: [
      {
        title: 'Running',
        traget: 5,
        current: 52.4,
        type: 'km',
      },
      {
        title: 'Water',
        traget: 2500,
        current: 46,
        type: 'ml',
      },
      {
        title: 'Steps',
        traget: 8200,
        current: 20,
        type: '',
      },
      {
        title: 'Workout',
        traget: 343,
        current: 82,
        type: '',
      },
      {
        title: 'Kcal',
        traget: 200,
        current: 60,
        type: 'kcal',
      },
    ],
  },
  {
    id: 2,
    date: '26 May 2021',
    progressList: [
      {
        title: 'Running',
        traget: 5,
        current: 25,
        type: 'km',
      },
      {
        title: 'Water',
        traget: 2500,
        current: 60,
        type: 'ml',
      },
      {
        title: 'Steps',
        traget: 8200,
        current: 50,
        type: '',
      },
      {
        title: 'Workout',
        traget: 343,
        current: 28,
        type: '',
      },
      {
        title: 'Kcal',
        traget: 200,
        current: 60,
        type: 'kcal',
      },
    ],
  },
  {
    id: 3,
    date: '28 May 2021',
    progressList: [
      {
        title: 'Running',
        traget: 5,
        current: 100,
        type: 'km',
      },
      {
        title: 'Water',
        traget: 2500,
        current: 100,
        type: 'ml',
      },
      {
        title: 'Steps',
        traget: 8200,
        current: 100,
        type: '',
      },
      {
        title: 'Workout',
        traget: 343,
        current: 100,
        type: '',
      },
      {
        title: 'Kcal',
        traget: 200,
        current: 100,
        type: 'kcal',
      },
    ],
  },
];

const progressProps = {
  radius: 105,
  activeStrokeWidth: 40,
  inActiveStrokeWidth: 40,
  inActiveStrokeOpacity: 0,
  strokeLinecap: 'square',
};

const ProgressDaily = props => {
  const navigation = useNavigation();
  const route = useRoute();

  const [isOpened, setIsOpened] = useState(false);
  const [item, setItem] = useState(3);
  const [itemData, setItemData] = useState();

  const [currDate, setCurrDate] = useState(new Date());
  const [reload, setReload] = useState(0);

  function toggle() {
    setIsOpened(wasOpened => !wasOpened);
  }

  useEffect(() => {
    var formattedDate = `${currDate.getFullYear()}-${
      currDate.getMonth() + 1
    }-${currDate.getDate()}`;

    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    var data = {
      requestOptions,
      params: `?date=${formattedDate}`,
    };
    props.myProgressRequest(data);
  }, [reload]);

  useEffect(() => {
    if (route.params) {
      setCurrDate(new Date(route.params.selectedDate));
    }
  }, [route.params]);

  const onAdd = () => {
    currDate.setDate(currDate.getDate() + 1);
    var d = currDate;
    setCurrDate(d);
    setReload(reload + 1);
  };

  const onSub = () => {
    currDate.setDate(currDate.getDate() - 1);
    var d = currDate;
    setCurrDate(d);
    setReload(reload - 1);
  };

  // console.log('AAAAAAAAA', currDate);
  // useEffect(() => {
  //   data1.forEach(ele => {
  //     if (ele.id == item) {
  //       // console.log(ele);
  //       setItemData(ele);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   data1.forEach(ele => {
  //     if (ele.id == item) {
  //       // console.log(ele);
  //       setItemData(ele);
  //     }
  //   });
  // }, [item]);

  const data = [
    {label: 'Today', value: '1'},
    {label: 'This Week', value: '2'},
    {label: 'This Month', value: '3'},
  ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <SafeAreaView style={styles.relative}>
      {/* <ScrollView style={styles.relative}> */}
      <View style={styles.container}>
        <View style={styles.headerflex}>
          <View style={[styles.flexdir, {alignItems: 'center'}]}>
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
            <Text style={styles.headertext}>Progress</Text>
          </View>

          <TouchableOpacity style={styles.dropdown} onPress={toggle}>
            <Text style={styles.dropmaintitle}>Today</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#000" />
          </TouchableOpacity>
          {isOpened && (
            <View style={styles.showBox}>
              <TouchableOpacity
                onPress={() => {
                  toggle();
                  navigation.navigate('ProgressDaily');
                }}>
                <Text style={styles.droptitle}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toggle();
                  navigation.navigate('ProgressThisWeek');
                }}
                style={{
                  paddingVertical: 10,
                }}>
                <Text style={styles.droptitle}>This Week</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toggle();
                  navigation.navigate('ProgressThisMonth');
                }}>
                <Text style={styles.droptitle}>This Month</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View
          style={{
            height: 380,
            backgroundColor: '#F2F2FE',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {props.myPercentageData != null && (
            <View
              style={{
                width: 370,
                height: 370,
                borderRadius: 370 / 2,
                backgroundColor: '#5D6AFC22',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 285,
                  height: 285,
                  borderRadius: 285 / 2,
                  backgroundColor: '#5D6AFC11',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 155,
                    height: 155,
                    borderRadius: 155 / 2,
                    backgroundColor: '#FFFFFF',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: 'rgba(0,0,0,1)',
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 20,
                    shadowRadius: 20,
                    elevation: 7,
                  }}>
                  <CircularProgressBase
                    {...progressProps}
                    value={
                      props.myPercentageData
                        ? (parseFloat(props.myPercentageData.running) +
                            parseFloat(props.myPercentageData.water) +
                            parseFloat(props.myPercentageData.steps) +
                            parseFloat(props.myPercentageData.workouts) +
                            parseFloat(props.myPercentageData.calories)) /
                          5
                        : 0
                    }
                    activeStrokeColor={'#CFCFE3'}>
                    <CircularProgressBase
                      {...progressProps}
                      value={
                        props.myPercentageData
                          ? (parseFloat(props.myPercentageData.running) +
                              parseFloat(props.myPercentageData.water) +
                              parseFloat(props.myPercentageData.steps) +
                              parseFloat(props.myPercentageData.workouts)) /
                            5
                          : 0
                      }
                      activeStrokeColor={'#CFCFE3'}>
                      <CircularProgressBase
                        {...progressProps}
                        value={
                          props.myPercentageData
                            ? (parseFloat(props.myPercentageData.running) +
                                parseFloat(props.myPercentageData.water) +
                                parseFloat(props.myPercentageData.steps)) /
                              5
                            : 0
                        }
                        activeStrokeColor={'#F7B857'}>
                        <CircularProgressBase
                          {...progressProps}
                          value={
                            props.myPercentageData
                              ? (parseFloat(props.myPercentageData.running) +
                                  parseFloat(props.myPercentageData.water)) /
                                5
                              : 0
                          }
                          activeStrokeColor={'#5D6AFC'}>
                          <CircularProgressBase
                            {...progressProps}
                            value={
                              props.myPercentageData
                                ? parseFloat(props.myPercentageData.running) / 5
                                : 0
                            }
                            activeStrokeColor={'#C068E5'}
                            inActiveStrokeOpacity={0}>
                            <Image
                              resizeMode="cover"
                              source={require('../../assets/images/walk.png')}
                              style={{width: 28, height: 46}}
                            />
                          </CircularProgressBase>
                        </CircularProgressBase>
                      </CircularProgressBase>
                    </CircularProgressBase>
                  </CircularProgressBase>
                </View>
              </View>
            </View>
          )}
        </View>

        {props.myProgressData != null && (
          <View style={styles.box}>
            <View style={styles.icondate}>
              <TouchableOpacity
                disabled={
                  currDate.toDateString() ===
                  new Date(
                    props.userDetails.user.registered_date,
                  ).toDateString()
                }
                onPress={() => {
                  setItem(item - 1);
                  onSub();
                }}>
                <MaterialIcons name="keyboard-arrow-left" size={22} />
              </TouchableOpacity>
              <Text style={styles.date}>
                {currDate.getDate()} {monthNames[currDate.getMonth()]}{' '}
                {currDate.getFullYear()}
              </Text>

              <TouchableOpacity
                disabled={currDate.toDateString() === new Date().toDateString()}
                onPress={() => {
                  setItem(item + 1);
                  onAdd();
                }}>
                <MaterialIcons name="keyboard-arrow-right" size={22} />
              </TouchableOpacity>
            </View>
            <LineProgressBar
              title={'Running'}
              config={{
                percent: props.myPercentageData
                  ? props.myPercentageData.running
                  : 0,
                value: props.myProgressData ? props.myProgressData.running : 0,
                type: 'km',
                total: props.myProgressData
                  ? props.myProgressData.total_running
                  : 0,
              }}
            />
            <LineProgressBar
              title={'Water'}
              config={{
                percent: props.myPercentageData
                  ? props.myPercentageData.water
                  : 0,
                value: props.myProgressData
                  ? props.myProgressData.fill_water_glass * 250
                  : 0,
                type: 'ml',
                total: props.myProgressData
                  ? props.myProgressData.total_water_glass * 250
                  : 0,
              }}
            />
            <LineProgressBar
              title={'Steps'}
              config={{
                percent: props.myPercentageData
                  ? props.myPercentageData.steps
                  : 0,

                value: props.myProgressData ? props.myProgressData.steps : 0,
                type: '',
                total: props.myProgressData
                  ? props.myProgressData.total_steps
                  : 0,
              }}
            />
            <LineProgressBar
              title={'Workout'}
              config={{
                percent: props.myPercentageData
                  ? props.myPercentageData.workouts
                  : 0,

                value: props.myProgressData ? props.myProgressData.workouts : 0,
                type: '',
                total: props.myProgressData
                  ? props.myProgressData.total_workouts
                  : 0,
              }}
            />

            <LineProgressBar
              title={'Kcal'}
              config={{
                percent: props.myPercentageData
                  ? props.myPercentageData.calories
                  : 0,

                value: props.myProgressData ? props.myProgressData.calories : 0,
                type: 'Kcal',
                total: props.myProgressData ? props.myProgressData.calories : 0, // may be change
              }}
            />
          </View>
        )}
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  myProgressData: state.progressReducer.myProgressData,
  myPercentageData: state.progressReducer.myPercentageData,
  userDetails: state.profileReducer?.userDetails,
  weekProgressData: state.progressReducer.weekProgressData,
});

const mapDispatchToProps = dispatch => ({
  myProgressRequest: data => dispatch(myProgressRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgressDaily);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  relative: {
    position: 'relative',
    backgroundColor: '#fff',
    flex: 1,
  },
  box: {
    marginTop: -65,
    backgroundColor: '#fff',
    padding: 15,
  },
  boxitem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    backgroundColor: '#fff',
    padding: 15,
    paddingVertical: 22,
  },
  title: {
    fontFamily: Fonts.Poppins_Medium,
    color: '#1D242A',
    fontSize: 14,
  },
  headertext: {
    fontFamily: Fonts.Poppins_Bold,
    color: '#3B2645',
    fontSize: 16,
  },
  flexdir: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  headerflex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    paddingTop: 10,
  },
  dropdown: {
    margin: 0,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    width: 140,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#BBB4C6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputSearchStyle: {
    fontSize: 14,
    top: 0,
    fontFamily: Fonts.Poppins_Regular,
    color: '#3B2645',
  },
  placeholderStyle: {
    fontSize: 14,
    textAlign: 'left',
    fontFamily: Fonts.Poppins_Regular,
    color: '#3B2645',
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: Fonts.Poppins_Regular,
    color: '#3B2645',
  },
  date: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#321C1C',
    fontFamily: Fonts.Poppins_Regular,
    paddingHorizontal: 8,
  },
  icondate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  showBox: {
    position: 'absolute',
    top: 52,
    right: 20,
    backgroundColor: '#fff',
    padding: 15,
    width: 130,
    borderRadius: 16,
    zIndex: 2,
    textAlign: 'left',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
  },
  droptitle: {
    fontFamily: Fonts.Poppins_Regular,
    fontSize: 12,
    color: '#000',
  },
  dropmaintitle: {
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 13,
    color: '#000',
    paddingRight: 6,
  },
});
