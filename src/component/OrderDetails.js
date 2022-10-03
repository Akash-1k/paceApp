import React from 'react';
import Fonts from '../constants/Fonts';
import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {LinearGradient} from 'react-native-gradients';


const OrderDetails = () => {
    const colorList1 = [
        {offset: '0%', color: '#C068E5', opacity: '1'},
        {offset: '100%', color: '#5D6AFC', opacity: '1'},
    ];
    return(
        <SafeAreaView style={styles.relative}>
            <ScrollView style={styles.relative}>
                <View style={styles.container}>
                    <View style={styles.blogitem1}>
                        <View style={[styles.blogitem,{marginBottom:10}]}>
                            <Image 
                                resizeMode="cover"
                                source={require('../../assets/images/shop3.png')}
                                style={{
                                    width:106,
                                    height:126
                                }}
                            />
                            <View style={styles.blogbody}>
                                <View style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between'
                                    }}>
                                    <Text numberOfLines={1} style={styles.title}>
                                        Bershka Mom Jeans 
                                    </Text>
                                   
                                </View>
                                <View>
                                    <Text 
                                        style={[
                                            styles.subtitle, 
                                            {
                                                fontSize:12
                                            }]} 
                                            numberOfLines={1}>
                                        <Text style={[styles.subtitle, 
                                        {
                                            fontWeight:'300',
                                            fontFamily:Fonts.Poppins_Regular,
                                            color:"#3B2645",
                                            fontSize:12
                                        }]}>Quantity : </Text> x1
                                    </Text>

                                    <Text 
                                        style={[
                                            styles.subtitle, 
                                            {
                                                fontSize:12
                                            }]} 
                                            numberOfLines={1}>
                                        <Text style={[styles.subtitle, 
                                        {
                                            fontWeight:'300',
                                            fontFamily:Fonts.Poppins_Regular,
                                            color:"#3B2645",
                                            fontSize:12
                                        }]}>Color : </Text> Blue
                                    </Text>

                                    <Text 
                                        style={[
                                            styles.subtitle, 
                                            {
                                                fontSize:12
                                            }]} 
                                            numberOfLines={1}>
                                        <Text style={[styles.subtitle, 
                                        {
                                            fontWeight:'300',
                                            fontFamily:Fonts.Poppins_Regular,
                                            color:"#3B2645",
                                            fontSize:12
                                        }]}>Size : </Text> S - 26
                                    </Text>

                                    <Text 
                                        style={[
                                            styles.subtitle, 
                                            {
                                                fontSize:12
                                            }]} 
                                            numberOfLines={1}>
                                        <Text style={[styles.subtitle, 
                                        {
                                            fontWeight:'300',
                                            fontFamily:Fonts.Poppins_Regular,
                                            color:"#3B2645",
                                            fontSize:12
                                        }]}>Order ID : </Text> 0706502
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.deladdress}>
                        <View style={styles.delbody}>
                            <Text style={styles.title1}>Order info</Text>
                            <Text style={styles.textgray}>Order Address</Text>
                            <Text style={[styles.subtitle1, {fontFamily:Fonts.Poppins_Medium}]}>3910 Crim Lane, Greendale County, Colorado. Zip Code 410348</Text>
                            <Text style={[styles.textgray, {marginTop:6}]}>Receiver's Name</Text>
                            <Text style={[styles.subtitle1, 
                                {fontFamily:Fonts.Poppins_Medium, marginBottom:6}]}>Alex Johnson</Text>
                            <Text style={styles.textgray}>Payment Method</Text>
                            <Text style={[styles.subtitle1, {fontFamily:Fonts.Poppins_Medium}]}>Visacard ending in 1690</Text>
                        </View>
                    </View>

                    <Text style={[styles.sText, {marginBottom:5}]}>Order Info</Text>

                    <View style={styles.flexdir}>
                        <Text style={styles.sText1}>Bershka Mom Jeans</Text>
                        <Text style={styles.sPrice1}>$18.00</Text>
                    </View>

                    <View style={styles.flexdir}>
                        <Text style={styles.sText1}>Taxes</Text>
                        <Text style={styles.sPrice1}>$8.00</Text>
                    </View>

                    <View style={styles.flexdir}>
                        <Text style={styles.sText1}>Shipping</Text>
                        <Text style={styles.sPrice1}>$2.00</Text>
                    </View>

                    <View style={[styles.flexdir, {marginBottom:10}]}>
                        <Text style={styles.sGoal2}>Total (1 items)</Text>
                        <Text style={styles.sText2}>
                            <Text style={{fontSize:12}}>$</Text>28.
                            <Text style={{fontSize:12}}>00</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity 
                style={styles.button}>
                <LinearGradient style={styles.granew} colorList={colorList1} angle={200}>
                </LinearGradient>
                <Text style={styles.text}>Buy Again</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default OrderDetails;

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative',
        paddingHorizontal:18
    },
    relative:{
        position:'relative',
        width:'100%',
        flex:1,
        backgroundColor:"#fff"
    },
    blogitem1:{
        overflow: "hidden",
        marginBottom:10,
        position:'relative',
        padding:0
    },
    blogitem:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        
    },
    blogbody:{
        position:'relative',
        flex:1,
        paddingLeft:15
    },
    title:{
        color: "#3B2645",
        fontFamily:Fonts.Poppins_Bold,
        fontSize: 16
    },
    subtitle:{
       color: '#3B2645',
       fontSize: 14,
       opacity: 0.7,
       fontFamily: Fonts.Poppins_Bold
    },
    deladdress:{
        borderWidth:1,
        borderColor:"#E9E9E9",
        borderRadius:15,
        overflow: "hidden",
        marginBottom:10,
        position:'relative',
        padding:20
    },
    delbody:{
        position:'relative'
    },
    title1:{
        color: "#3B2645",
        fontFamily:Fonts.Poppins_Bold,
        fontSize: 16
    },
    subtitle1:{
       color: '#7B6F72',
       fontSize: 12,
       fontFamily: Fonts.Poppins_Regular,
       paddingRight:30
    },
    subtitle1:{
        color: '#7B6F72',
        fontSize: 12,
        fontFamily: Fonts.Poppins_Regular,
        paddingRight:30
    },
    textgray:{
         color: "#7B6F72",
         fontFamily:Fonts.Poppins_Regular,
         fontSize: 12,
         opacity: 0.6
    },
    sText:{
         fontFamily: Fonts.Poppins_SemiBold,
         fontSize:16,
         color:"#3B2645"
    },
    flexdir:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:8
    },
    sText1:{
        fontFamily: Fonts.Poppins_Regular,
        fontSize:14,
        color:"#3B2645",
        opacity: 0.4
    },
    sPrice1:{
        fontFamily: Fonts.Poppins_Medium,
        fontSize:14,
        color:"#3B2645"
    },
    sGoal2:{
        fontFamily: Fonts.Poppins_Regular,
        fontSize:12,
        color:"#3B2645"
    },
    sText2:{
        fontFamily: Fonts.Poppins_Bold,
        fontSize:20,
        color:"#3B2645",
    },
    button:{
        position:'relative',
        height:60,
        borderRadius: 1000,
        overflow: 'hidden',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:5,
        marginHorizontal:15
    },
    text:{
        position:'absolute',
        zIndex:1,
        fontFamily: Fonts.Poppins_Bold,
        color:"#fff",
        fontSize: 16,
        zIndex:3
    },
    granew:{
        flex:1,
        flexGrow:1
    }
})