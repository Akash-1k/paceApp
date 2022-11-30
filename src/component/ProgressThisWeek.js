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
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {data1} from './ProgressDaily';
import LineProgressBar from './LineProgressBar';
import {BarChart} from 'react-native-gifted-charts';
import {connect} from 'react-redux';
import {myProgressRequest} from '../modules/Progress/actions';
import {monthNames} from '../common/StaticData';

const stackData = [
  {
    stacks: [
      {
        value: 10,
        color: '#C068E5',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
      {
        value: 20,
        color: '#5D6AFC',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
    ],
    label: 'S',
  },
  {
    stacks: [
      {
        value: 11,
        color: '#C068E5',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
      {value: 10, color: '#5D6AFC'},
      {
        value: 10,
        color: '#F7B857',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
    ],
    label: 'M',
  },
  {
    stacks: [
      {
        value: 14,
        color: '#C068E5',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
      {
        value: 18,
        color: '#F7B857',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
    ],
    label: 'T',
  },
  {
    stacks: [
      {
        value: 11,
        color: '#C068E5',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
      {value: 7, color: '#F7B857'},
      {
        value: 10,
        color: '#CFCFE3',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
    ],
    label: 'W',
  },
  {
    stacks: [
      {
        value: 11,
        color: '#C068E5',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
      {value: 7, color: '#F7B857'},
      {
        value: 10,
        color: '#CFCFE3',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
    ],
    label: 'T',
  },
  {
    stacks: [
      {
        value: 11,
        color: '#C068E5',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
      {value: 7, color: '#5D6AFC'},
      {
        value: 15,
        color: '#CFCFE3',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
    ],
    label: 'F',
  },
  {
    stacks: [
      {
        value: 21,
        color: '#C068E5',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      },
      {value: 17, color: '#5D6AFC'},
      {
        value: 10,
        color: '#CFCFE3',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
    ],
    label: 'S',
  },
];
const ProgressThisWeek = props => {
  const navigation = useNavigation();
  const [isOpened, setIsOpened] = useState(false);
  const [item, setItem] = useState(2);
  const [itemData, setItemData] = useState();

  const [currMonth, setCurrMonth] = useState(new Date());
  const [sunday, setSunday] = useState(new Date());
  const [saturday, setSaturday] = useState(new Date());
  const [reload, setReload] = useState(0);
  const [stackDataState, setStackDataState] = useState(stackData);

  function toggle() {
    setIsOpened(wasOpened => !wasOpened);
  }

  // var curr = new Date(); // get current date
  // var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  // var last = first + 6; // last day is the first day + 6

  // var firstday = new Date(curr.setDate(first)).toDateString();
  // var lastday = new Date(curr.setDate(last)).toDateString();
  // console.log(firstday, lastday);

  const onAdd = () => {
    var sat = new Date(
      currMonth.getFullYear(),
      currMonth.getMonth(),
      6 - currMonth.getDay() + currMonth.getDate(),
    );
    var sun = new Date(
      currMonth.getFullYear(),
      currMonth.getMonth(),
      currMonth.getDate() - currMonth.getDay(),
    );
    console.log(sun.toDateString(), '\n     ', sat.toDateString());
    var nextWeekDay = new Date(sat);
    nextWeekDay.setDate(nextWeekDay.getDate() + 1);
    console.log('nextWeekDay', nextWeekDay.toDateString());
    setCurrMonth(new Date(nextWeekDay));
    setSaturday(new Date(sat));
    setSunday(new Date(sun));
    setReload(reload + 1);
  };

  const onSub = () => {
    var sat = new Date(
      currMonth.getFullYear(),
      currMonth.getMonth(),
      6 - currMonth.getDay() + currMonth.getDate(),
    );
    var sun = new Date(
      currMonth.getFullYear(),
      currMonth.getMonth(),
      currMonth.getDate() - currMonth.getDay(),
    );
    console.log(sun.toDateString(), '\n     ', sat.toDateString());
    var nextWeekDay = new Date(sun);
    nextWeekDay.setDate(nextWeekDay.getDate() - 1);
    console.log('nextWeekDay', nextWeekDay.toDateString());
    setCurrMonth(new Date(nextWeekDay));
    setSaturday(new Date(sat));
    setSunday(new Date(sun));
    setReload(reload + 1);
  };

  useEffect(() => {
    var firstFormattedDate = `${sunday.getFullYear()}-${
      sunday.getMonth() + 1
    }-${sunday.getDate()}`;

    var lastFormattedDate = `${saturday.getFullYear()}-${
      saturday.getMonth() + 1
    }-${saturday.getDate()}`;

    console.log(
      'firstFormattedDate, lastFormattedDate',
      firstFormattedDate,
      lastFormattedDate,
    );
    if (firstFormattedDate == lastFormattedDate) {
      setReload(reload + 1);
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    var data = {
      requestOptions,
      params: `?start_date=${firstFormattedDate}&end_date=${lastFormattedDate}`,
    };
    // ?start_date=2022-11-26&end_date=2022-11-26

    props.myProgressRequest(data);
  }, [reload]);

  useEffect(() => {
    setSaturday(
      new Date(
        currMonth.getFullYear(),
        currMonth.getMonth(),
        6 - currMonth.getDay() + currMonth.getDate(),
      ),
    );
    setSunday(
      new Date(
        currMonth.getFullYear(),
        currMonth.getMonth(),
        currMonth.getDate() - currMonth.getDay(),
      ),
    );
  }, []);

  useEffect(() => {
    data1.forEach(ele => {
      if (ele.id == item) {
        // console.log(ele);
        setItemData(ele);
      }
    });
  }, []);

  useEffect(() => {
    data1.forEach(ele => {
      if (ele.id == item) {
        // console.log(ele);
        setItemData(ele);
      }
    });
  }, [item]);

  console.log('sadadsk', props.weekProgressData);
  return (
    <SafeAreaView style={styles.relative}>
      <ScrollView style={styles.relative}>
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
              <Text style={styles.dropmaintitle}>This Week</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="#000"
              />
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
          {/* <Image
            resizeMode="cover"
            source={require('../../assets/images/chartbg.png')}
            style={{
              width: '100%',
              height: 350,
            }}
          /> */}
          <View
            style={{
              backgroundColor: '#F2F2FE',
              height: 320,
              justifyContent: 'flex-end',
            }}>
            {/* {props.weekProgressData != null && ( */}
            <BarChart
              hideAxesAndRules={true}
              hideYAxisText={true}
              // xAxisThickness={0}
              // yAxisThickness={0}
              // hideRules={true}
              width={350}
              height={250}
              barWidth={15}
              spacing={30}
              backgroundColor={'#A00'}
              stackData={stackDataState}
              // stackData={props.weekProgressData}
            />
            {/* )} */}
          </View>
          <Button
            title="AVD"
            onPress={() => {
              setStackDataState([
                {
                  stacks: [
                    {color: '#F00', key: 'running', value: 5},
                    {color: '#F00', key: 'water', value: 10},
                    {color: '#F00', key: 'steps', value: 20},
                    {color: '#F00', key: 'workout', value: 30},
                    {color: '#F00', key: 'calories', value: 37},
                  ],
                  label: 'T',
                },
              ]);
            }}
          />
          <View style={styles.box}>
            <View style={styles.icondate}>
              <TouchableOpacity
                onPress={() => {
                  onSub();
                  setItem(item - 1);
                }}>
                <MaterialIcons name="keyboard-arrow-left" size={20} />
              </TouchableOpacity>
              <Text style={styles.date}>
                {`${sunday.getDate()} ${
                  monthNames[sunday.getMonth()]
                } - ${saturday.getDate()} ${
                  monthNames[saturday.getMonth()]
                } ${saturday.getFullYear()}`}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  onAdd();
                  setItem(item + 1);
                }}>
                <MaterialIcons name="keyboard-arrow-right" size={20} />
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  myProgressData: state.progressReducer.myProgressData,
  myPercentageData: state.progressReducer.myPercentageData,
  weekProgressData: state.progressReducer.weekProgressData,
});

const mapDispatchToProps = dispatch => ({
  myProgressRequest: data => dispatch(myProgressRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgressThisWeek);

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
    marginTop: 0,
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

//  Sun Nov 20 2022 Sat Nov 26 2022
