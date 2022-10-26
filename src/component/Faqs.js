import React, {useEffect, useState} from 'react';
import Fonts from '../constants/Fonts';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {List, TextInput} from 'react-native-paper';
import {LinearGradient} from 'react-native-gradients';
import Modal from 'react-native-modal';
import Loader from '../common/Loader';
import {connect} from 'react-redux';
import Config from '../constants/Config';
import {showAlert} from '../utils/CommonFunctions';

const Faqs = props => {
  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [data, setData] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getHowToUse();
  }, []);

  const getHowToUse = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    setLoader(true);
    fetch(Config.BASE_URL + Config.faqs, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == 'Token is Expired') {
          showLogoutAlert();
        } else {
          // let res
          console.log(result.data);
          setData(result.data);
        }
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        console.log('error', error);
      });
  };

  const showLogoutAlert = () =>
    Alert.alert(
      'PaceApp',
      'Login session expired please logout and login again!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Logout', onPress: () => props.navigation.navigate('Login')},
      ],
    );

  const onSubmitQuiz = () => {
    if (message == '') {
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + props.loginData.token);
    var formdata = new FormData();
    formdata.append('question', message);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    setLoader(true);
    setModalVisible(false);
    fetch(Config.BASE_URL + Config.faqs_questions, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        // showAlert(result.data);
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        setModalVisible(false);
        console.log('error', error);
      });
  };

  return (
    <SafeAreaView style={styles.relative}>
      <ScrollView style={styles.relative}>
        <View style={styles.container}>
          <List.Section>
            {data.length > 0
              ? data.map((item, index) => {
                  return (
                    <View style={styles.accbody} key={index}>
                      <List.Accordion
                        title={item.question}
                        titleStyle={{
                          fontFamily: Fonts.Poppins_SemiBold,
                          color: '#1D1617',
                          fontSize: 14,
                        }}
                        style={styles.accheader}
                        onPress={handlePress}>
                        <View style={styles.innerbody}>
                          <Text style={styles.title}>{item.answer}</Text>
                          {/* <Text style={styles.subtitle}>{item.para}</Text> */}
                        </View>
                      </List.Accordion>
                    </View>
                  );
                })
              : null}
          </List.Section>
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

            <Text style={styles.title1}>Your Question</Text>

            <View style={styles.inputconatiner}>
              <TextInput
                onChangeText={txt => {
                  setMessage(txt);
                }}
                style={styles.input}
                secureTextEntry={true}
                underlineColor={'transparent'}
                selectionColor="#3B2645"
                placeholder="Write your question here..."
                multiline
                numberOfLines={8}
                theme={{
                  colors: {
                    primary: '#F7F8F8',
                    text: '#3B2645',
                  },
                  fonts: {
                    regular: {
                      fontFamily: Fonts.Poppins_Regular,
                    },
                  },
                }}
              />
            </View>

            <TouchableOpacity
              onPress={() => onSubmitQuiz()}
              style={[
                styles.button,
                {
                  width: '100%',
                  marginBottom: 0,
                },
              ]}>
              <LinearGradient colorList={colorList1} angle={200} />
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <LinearGradient
          style={styles.granew}
          colorList={colorList1}
          angle={200}></LinearGradient>
        <Text style={styles.text}>Submit Your Question</Text>
      </TouchableOpacity>

      <Loader loading={isLoading} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  loginData: state.loginReducer.loginData,
  userDetails: state.profileReducer.userDetails,
  shopCategoryList: state.shopReducer.shopCategoryList,
});

const mapDispatchToProps = dispatch => ({
  // userDetailsRequest: (data) => dispatch(userDetailsRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Faqs);

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
  title: {
    fontFamily: Fonts.Poppins_Medium,
    color: '#1D1617',
    fontSize: 13,
  },
  title1: {
    fontFamily: Fonts.Poppins_Bold,
    color: '#3B2645',
    fontSize: 16,
  },
  subtitle: {
    color: '#7B6F72',
    fontSize: 12,
    fontFamily: Fonts.Poppins_Regular,
    marginTop: 4,
  },
  innerbody: {
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    marginVertical: 4,
    padding: 15,
  },
  accbody: {
    marginBottom: 10,
    overflow: 'hidden',
    borderRadius: 14,
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
  modalview: {
    backgroundColor: '#fff',
    borderRadius: 26,
    padding: 26,
    paddingHorizontal: 20,
    paddingTop: 25,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossbtn: {
    position: 'absolute',
    top: 25,
    left: 25,
  },
  inputconatiner: {
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 20,
    width: '100%',
  },
  input: {
    backgroundColor: '#F7F8F8',
    padding: 12,
    fontSize: 14,
    color: '#3B2645',
  },
});
