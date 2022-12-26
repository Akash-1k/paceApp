import React, {useState, useEffect} from 'react';
import Fonts from '../constants/Fonts';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {data1} from './ProgressDaily';
import LineProgressBar from './LineProgressBar';
import {monthNames} from '../common/StaticData';
import CalendarPicker from 'react-native-calendar-picker';
import {useRef} from 'react';
import {connect} from 'react-redux';
import {myProgressRequest} from '../modules/Progress/actions';

const customDayHeaderStylesCallback = ({dayOfWeek}) => {
  var dayInNum = new Date().getDay();

  if ((dayInNum == 0 ? 7 : dayInNum) == dayOfWeek) {
    return {
      textStyle: {
        color: '#5D6FFF',
        fontSize: 12,
        fontWeight: 'bold',
      },
    };
  }
};

const ProgressThisMonth = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isOpened, setIsOpened] = useState(false);
  const [item, setItem] = useState(2);
  const [itemData, setItemData] = useState();

  const [currMonth, setCurrMonth] = useState(new Date());
  const [reload, setReload] = useState(0);

  function toggle() {
    setIsOpened(wasOpened => !wasOpened);
  }

  const onAdd = () => {
    currMonth.setMonth(currMonth.getMonth() + 1);
    var d = currMonth;
    setCurrMonth(d);
    setReload(reload + 1);
  };

  const onSub = () => {
    currMonth.setMonth(currMonth.getMonth() - 1);
    var d = currMonth;
    setCurrMonth(d);
    setReload(reload - 1);
  };

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

  useEffect(() => {
    if (isFocused) {
      var y = currMonth.getFullYear(),
        m = currMonth.getMonth();
      var firstDay = new Date(y, m, 1);
      var lastDay = new Date(y, m + 1, 0);

      var firstFormattedDate = `${firstDay.getFullYear()}-${
        firstDay.getMonth() + 1
      }-${firstDay.getDate()}`;

      var lastFormattedDate = `${lastDay.getFullYear()}-${
        lastDay.getMonth() + 1
      }-${lastDay.getDate()}`;

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
    }
  }, [reload, isFocused]);

  const data = [
    {label: 'Today', value: '1'},
    {label: 'This Week', value: '2'},
    {label: 'This Month', value: '3'},
  ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const calendar = useRef(null);

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
              <Text style={styles.dropmaintitle}>This Month</Text>
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
            source={require('../../assets/images/cal.png')}
            style={{
              width: '100%',
              height: 350,
            }}
          /> */}
          <View style={{marginTop: 60, height: 280}}>
            <CalendarPicker
              width={370}
              customDayHeaderStyles={customDayHeaderStylesCallback}
              // enableDateChange={false}
              headerWrapperStyle={{backgroundColor: 'red', display: 'none'}}
              monthYearHeaderWrapperStyle={{display: 'none'}}
              weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
              ref={ref => (calendar.current = ref)}
              disabledDates={date => {
                if (
                  new Date() < date ||
                  new Date(props.userDetails.user.registered_date) > date
                ) {
                  return true;
                } else {
                  return false;
                }
              }}
              showDayStragglers
              selectedDayColor="#F2F2FE"
              // selectedDayTextColor="#FFF"
              todayBackgroundColor="#FFF"
              todayTextStyle={{
                color: '#3B2645',
                fontWeight: '900',
                fontSize: 15,
              }}
              dayLabelsWrapper={{
                borderTopWidth: 0,
                borderBottomWidth: 0,
              }}
              onDateChange={selectedDate => {
                navigation.navigate('ProgressDaily', {selectedDate});
              }}
            />
          </View>

          {console.log(
            calendar.current && calendar.current.state.currentMonth,
            new Date(props.userDetails.user.registered_date).toDateString(),
            calendar.current && calendar.current.state.currentYear,
          )}
          <View style={styles.box}>
            <View style={styles.icondate}>
              <TouchableOpacity
                disabled={
                  calendar.current &&
                  calendar.current.state.currentMonth ==
                    new Date(
                      props.userDetails.user.registered_date,
                    ).getMonth() &&
                  calendar.current.state.currentYear ==
                    new Date(
                      props.userDetails.user.registered_date,
                    ).getFullYear()
                }
                onPress={() => {
                  setItem(item - 1);
                  calendar.current.handleOnPressPrevious();
                  onSub();
                }}>
                <MaterialIcons name="keyboard-arrow-left" size={20} />
              </TouchableOpacity>
              <Text style={styles.date}>
                {monthNames[currMonth.getMonth()]} {currMonth.getFullYear()}
              </Text>
              <TouchableOpacity
                disabled={
                  currMonth.toDateString() === new Date().toDateString()
                }
                onPress={() => {
                  setItem(item + 1);
                  calendar.current.handleOnPressNext();
                  onAdd();
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
  userDetails: state.profileReducer?.userDetails,
});

const mapDispatchToProps = dispatch => ({
  myProgressRequest: data => dispatch(myProgressRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgressThisMonth);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2FE',
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
