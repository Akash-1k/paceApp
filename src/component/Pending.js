import React, {useState} from 'react';
import Fonts from '../constants/Fonts';
import {View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'react-native-gradients';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Pending = () => {

  const navigation = useNavigation();
  
  const colorList = [
    {offset: '0%', color: '#C068E5', opacity: '0.9'},
    {offset: '100%', color: '#5D6AFC', opacity: '0.9'},
  ];

  const colorList1 = [
    {offset: '0%', color: '#C068E5', opacity: '1'},
    {offset: '100%', color: '#5D6AFC', opacity: '1'},
  ];

  return (
    <SafeAreaView style={styles.mainbg}>
      <View style={styles.conatiner}>
        <View style={styles.lgcontainer}>
            <Image 
                resizeMode="contain"
                source={require('../../assets/images/pending.png')}
                style={{
                    width:186,
                    height:104
                }}
            />
            <Text style={styles.title}>Pending</Text>
            <Text style={styles.subtitle}>Your details are pending to be approved by admin, you will be notified when admin approves it.</Text>
        </View>
      </View>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Login')}
        style={styles.button}>
        <LinearGradient colorList={colorList1} angle={200} />
        <Text style={styles.text}>Okay</Text>
      </TouchableOpacity>   
    </SafeAreaView>
  );
};

export default Pending;

const styles = StyleSheet.create({
  mainbg:{
    backgroundColor:"#fff",
    flex:1
  },  
  conatiner: {
    position: 'relative',
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  lgcontainer:{
    width:'78%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  title:{
    color: "#3B2645",
    fontFamily:Fonts.Poppins_Bold,
    fontSize: 26,
    marginTop:30
  },
  subtitle:{
    color: '#321C1C',
    fontSize: 14,
    fontFamily: Fonts.Poppins_Regular,
    textAlign:'center'
  },
  button:{
    position:'relative',
    height:60,
    borderRadius: 1000,
    overflow: 'hidden',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:25,
    marginHorizontal:15
  },
  text:{
    position:'absolute',
    zIndex:1,
    fontFamily: Fonts.Poppins_Bold,
    color:"#fff",
    fontSize: 16
  },
});
