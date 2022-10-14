import React, {useEffect, useState} from 'react';
import Fonts from '../constants/Fonts';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import Config from '../constants/Config';
import Loader from '../common/Loader';
import {showAlert} from '../utils/CommonFunctions';

import {
  getWaterGlassRequested,
  getHomeRequested,
} from '../modules/Home/actions';

const WaterGlass = props => {
  const [getAllData, setAllData] = useState();
  const [default_glass, setDefaultGlass] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    props.getWaterGlassRequested(props.loginData.token);
  }, []);
  // console.log('Water Glass Props', props.state.homeReducer);

  const getGlassData = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    setIsLoading(true);
    fetch(Config.BASE_URL + Config.water_glass, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('res::::', result);
        // alert(result.glass.default_glass);
        saveGlass(result.glass[0].default_glass, result.glass[0].fill_glass);
        console.log('res11 ::::', result);
        setAllData(result);
        setIsLoading(false);
      })
      .catch(error => console.log('get error', error));
  };

  const saveGlass = (glass, fill_glass) => {
    console.log(glass, fill_glass);
    let newData = [];
    for (let index = 1; index <= glass; index++) {
      if (fill_glass >= index) {
        newData.push({
          glass: index,
          isFilled: true,
        });
      } else {
        newData.push({
          glass: index,
          isFilled: false,
        });
      }
    }
    setDefaultGlass(newData);
  };

  const addGlass = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };
    // setIsLoading(true);

    fetch(Config.BASE_URL + Config.add_water_glass, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        props.getWaterGlassRequested(props.loginData.token);
        props.getHomeRequested(props.loginData.token);
        // setIsLoading(false);
      })
      .catch(error => console.log('error add glass', error));
  };

  const removeGlass = () => {
    if (props.glassInfo.default_glass == 7) {
      showAlert("Glass can't be removed");
      return;
    }
    if (props.glassInfo.default_glass <= props.glassInfo.fill_glass) {
      showAlert("Filled Glass can't be removed");
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };
    // setIsLoading(true);

    fetch(Config.BASE_URL + Config.remove_water_glass, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('remove_api_response', result);
        props.getWaterGlassRequested(props.loginData.token);
        props.getHomeRequested(props.loginData.token);
        // setIsLoading(false);
      })
      .catch(error => console.log('error', error));
  };

  const fillWaterGlass = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);
    var formdata = new FormData();

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };
    setIsLoading(true);

    fetch(Config.BASE_URL + Config.fill_water_glass, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('fill water glass', result);
        props.getWaterGlassRequested(props.loginData.token);
        props.getHomeRequested(props.loginData.token);
        setIsLoading(false);
      })
      .catch(error => console.log('error tyu', error));
  };

  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          fillWaterGlass();
        }}
        disabled={!(item.item.glass == props.glassInfo.fill_glass + 1)}
        style={styles.gbox}>
        <Image
          resizeMode="contain"
          source={
            item.item.isFilled
              ? require('../../assets/images/fillglass.png')
              : require('../../assets/images/unfillglass.png')
          }
          style={{
            width: 29,
            height: 39,
          }}
        />
        <Text style={styles.numtext}>{item.item.glass}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.flexfull}>
      <View style={styles.container}>
        <View style={styles.glassheader}>
          <Image
            resizeMode="contain"
            source={require('../../assets/images/glasscolor.png')}
            style={{
              width: 75,
              height: 90,
            }}
          />
          <View style={styles.glassbody}>
            <Text numberOfLines={1} style={styles.title}>
              Drink More Water
            </Text>
            <Text style={styles.subtitle}>{'Goal & Glasses'}</Text>
            <View style={styles.btnflex}>
              <TouchableOpacity style={styles.btn} onPress={() => addGlass()}>
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Medium,
                    fontSize: 11,
                    color: '#C068E5',
                  }}>
                  <Text>Add Glass</Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => removeGlass()}>
                <Text
                  style={{
                    fontFamily: Fonts.Poppins_Medium,
                    fontSize: 11,
                    color: '#C068E5',
                  }}>
                  <Text>Remove Glass</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            borderRadius: 15,
            overflow: 'hidden',
          }}>
          <ImageBackground
            source={require('../../assets/images/glassbg.png')}
            style={styles.walletbg}>
            <Text style={styles.glasstext}>
              {/* 1000ml {} / {''} */}
              {props.glassInfo ? props.glassInfo.fill_glass * 250 : 0}
              {'ml'}/
              <Text
                style={{
                  color: '#C8C3FF',
                  fontFamily: Fonts.Poppins_Regular,
                }}>
                {props.glassInfo
                  ? props.glassInfo.default_glass * 250
                  : 7 * 250}
                ml of water per day
              </Text>
            </Text>

            <View style={styles.itemflex}>
              <FlatList
                data={props.saveGlass}
                renderItem={renderItem}
                numColumns={4}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
      <Loader loading={isLoading} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
  glassInfo: state.homeReducer?.waterGlassInfo?.glass[0],
  saveGlass: state.homeReducer?.saveGlass,
});

const mapDispatchToProps = dispatch => ({
  // shopCategoryListRequest: (data) => dispatch(shopCategoryListRequest(data)),
  getWaterGlassRequested: data => dispatch(getWaterGlassRequested(data)),
  getHomeRequested: data => dispatch(getHomeRequested(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WaterGlass);

const styles = StyleSheet.create({
  flexfull: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 20,
  },
  glassheader: {
    backgroundColor: '#F5F0FD',
    padding: 18,
    paddingVertical: 40,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  glassbody: {
    position: 'relative',
    paddingLeft: 8,
  },
  title: {
    color: '#3B2645',
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 21,
    lineHeight: 25,
    display: 'flex',
    width: 210,
  },
  subtitle: {
    color: '#3B2645',
    fontSize: 13,
    fontFamily: Fonts.Poppins_Regular,
  },
  btnflex: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  btn: {
    borderWidth: 1,
    borderColor: '#C068E5',
    padding: 8,
    paddingHorizontal: 14,
    borderRadius: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  walletbg: {
    padding: 15,
    borderRadius: 15,
    paddingHorizontal: 20,
  },
  glasstext: {
    fontFamily: Fonts.Poppins_Medium,
    color: '#fff',
    fontSize: 13,
    marginBottom: 8,
  },
  numtext: {
    fontFamily: Fonts.Poppins_Bold,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
  },
  itemflex: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gbox: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingVertical: 18,
    borderRadius: 10,
    marginRight: 5,
    width: '23%',
    marginBottom: 7,
  },
});
