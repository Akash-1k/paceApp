import React, {useState, useCallback, useRef} from 'react';
import {Text, SafeAreaView, StyleSheet, View, ImageBackground, Image, Button, TouchableOpacity, ScrollView} from 'react-native';
import Carousel from "react-native-snap-carousel";
import Entypo from 'react-native-vector-icons/Entypo';
import Zocial from 'react-native-vector-icons/Zocial';
import { TextInput } from 'react-native-paper';
import {LinearGradient} from 'react-native-gradients';
import { useNavigation } from '@react-navigation/native';
import Fonts from '../constants/Fonts';

const exampleItems = [
    {
      title: 'Item 1',
      text: 'Text 1',
    },
    {
      title: 'Item 2',
      text: 'Text 2',
    },
    {
      title: 'Item 3',
      text: 'Text 3',
    },
    {
      title: 'Item 4',
      text: 'Text 4',
    },
    {
      title: 'Item 5',
      text: 'Text 5',
    },
];

const PaymentMethod = () => {
    const navigation = useNavigation();
    const [activeIndex, setActiveIndex] = useState(0);
    const [carouselItems, setCarouselItems] = useState(exampleItems);
    const ref = useRef(null);

    const [name, setName] = useState('899');
    
    const renderItem = useCallback(({ item, index }) => (
      <View
        style={{
            width:270,
            overflow:'hidden',
            borderRadius:25,
            margin:5
        }}
        >
        <ImageBackground 
            resizeMode="cover"
            source={require('../../assets/images/card.png')}
            style={{
                width:270,
                height:199,
                padding:15,
                paddingHorizontal:18,
                paddingVertical:25,
                display:'flex',
                flexDirection:'column'
            }}
            >
            <View
                style={{
                    display:'flex',
                    alignItems:'center',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    marginBottom:30
                }}
                >
                <Image 
                    resizeMode="contain"
                    source={require('../../assets/images/clogo.png')}    
                    style={{
                        width:140,
                        height:30,
                        position:'relative',
                        top:5
                    }}
                />
                <TouchableOpacity>
                    <Entypo name='dots-three-horizontal' color={"#fff"} size={20} />
                </TouchableOpacity>
            </View>
            <Text style={styles.cardtext}>**** ****  **** 1690</Text>
            <View style={{
                display:'flex',
                alignItems:'center',
                flexDirection:'row',
                justifyContent:'space-between'
            }}>
                <Text style={styles.cardtext1}>Platinum Plus</Text>
                <Text style={styles.cardtextsub}>Exp 01/22</Text>
            </View>


            <View style={{
                display:'flex',
                alignItems:'center',
                flexDirection:'row',
                justifyContent:'space-between',
                marginTop:'auto'
                }}>
                <Text style={styles.username}>Alex Johnson</Text>
                <Image 
                    resizeMode="contain"
                    source={require('../../assets/images/cardr.png')}    
                    style={{
                        width:37,
                        height:22,
                    }}
                />
            </View>

            
        </ImageBackground>
      </View>
    ), []);

    const colorList1 = [
        {offset: '0%', color: '#C068E5', opacity: '1'},
        {offset: '100%', color: '#5D6AFC', opacity: '1'},
    ];
                
    return(
        <SafeAreaView style={styles.relative}>
            <ScrollView style={styles.relative}>
                <View style={styles.container}>
                    <Carousel
                        layout="default"
                        ref={ref}
                        data={carouselItems}
                        sliderWidth={330}
                        activeSlideAlignment="center"
                        itemWidth={275}
                        renderItem={renderItem}
                        onSnapToItem={(index) => setActiveIndex(index)}
                    />

                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddCard')}
                        style={styles.addcard}
                        >
                        <Text style={styles.addtitle}>Add Card</Text>
                    </TouchableOpacity>

                    <View style={styles.card}>
                        <View style={styles.cardheader}>
                            <View style={styles.flex1}>
                                <Image 
                                    resizeMode='contain'
                                    source={require('../../assets/images/coins1.png')}
                                    style={{
                                        width:14,
                                        height:14,
                                        marginRight:4,
                                        position:'relative',
                                        top:-1
                                    }}
                                />
                                <Text style={styles.title}>Reward Coins: {''}
                                <Text style={{color:"#3B2645"}}>938 Coins</Text></Text>
                            </View>
                            <TouchableOpacity
                                style={styles.checkbtn}
                                >
                                    <Text
                                        style={{
                                            fontFamily: Fonts.Poppins_Medium,
                                            fontSize:10,
                                            color:"#876BF3"
                                        }}>
                                        Redeem 
                                    </Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.cardtitle}>How many coins your want to use?</Text>
                        <View
                            style={styles.inputconatiner}
                            >
                            <TextInput
                                style={styles.input}
                                underlineColor={'transparent'}
                                selectionColor="#3B2645"
                                value={name}
                                keyboardType="numeric"
                                onChangeText={setName}
                                theme={{
                                colors:{
                                    primary: '#F7F8F8',
                                    text: '#3B2645'
                                },
                                    fonts:{
                                        regular:{
                                        fontFamily:Fonts.Poppins_Regular
                                        }
                                    }
                                }}
                            />
                        </View>
                    </View>

                    <View style={[styles.flexdir, {marginBottom:7}]}>
                        <Text style={[styles.sText, {fontSize:16}]}>Select Address</Text>
                        <TouchableOpacity>
                            <Text style={[styles.sGoal, {fontSize:12, color:"#B4B4B4"}]}>Choose Another {'>'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.blogitem}>
                        <View style={styles.blogbody}>
                            <Text style={styles.title1}>Alex Johnson - Work</Text>
                            <Text style={styles.subtitle1}>3910 Crim Lane, Greendale County, Colorado. Zip Code 410348</Text>
                        </View>

                        <TouchableOpacity 
                            style={{
                                position:'absolute',
                                right:0,
                                top:0,
                                backgroundColor:"#FEF7EC",
                                opacity:0.6,
                                padding:5,
                                paddingHorizontal:10,
                                borderBottomLeftRadius:16
                            }}>
                            <Text style={[styles.title,{
                                    fontSize:10,
                                    color:"#F4AC3E"
                                }]}>
                                Default
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.flexdir, {marginTop:13, marginBottom:7}]}>
                        <Text style={[styles.sText, {fontSize:16}]}>Payment Method</Text>
                    </View>

                    <View style={styles.blogitem}>
                        <View style={styles.blogbody}>
                            <Text style={styles.title1}>
                                <Zocial 
                                    name="stripe"
                                    size={14}
                                    color="#3E3E40"
                                />
                                {''} Stripe</Text>
                        </View>
                    </View>

                    <View style={[styles.flexdir, {marginTop:5, marginBottom:7}]}>
                        <Text style={[styles.sText, {fontSize:12}]}>
                            <Text style={{color:"#B1A8B5"}}>Discounted with reward coins ........ </Text>
                        899coins=$45.00</Text>
                    </View>

                    <View style={[styles.flexdir, {marginBottom:10}]}>
                        <Text style={styles.sGoal1}>Total (3 items)</Text>
                        <View style={styles.flexdir}>
                            <Text style={styles.redtext}>$508.00 {''} </Text>    
                            <Text style={styles.sText1}>
                                <Text style={{fontSize:12}}>$</Text>450.
                                <Text style={{fontSize:12}}>00</Text>
                            </Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Checkout')}
                style={styles.button}>
                <LinearGradient colorList={colorList1} angle={200} />
                <Text style={styles.text}>Proceed</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default PaymentMethod;

const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative',
        padding:18,
        paddingTop:0
    },
    relative:{
        position:'relative',
        flex:1,
        backgroundColor:"#fff"
    },
    cardtext:{
        fontFamily:Fonts.Poppins_Regular,
        fontSize:14,
        color:"#fff"
    },
    cardtext1:{
        fontFamily:Fonts.Poppins_Bold,
        fontSize:12,
        color:"#fff"
    },
    cardtextsub:{
        fontFamily:Fonts.Poppins_Regular,
        fontSize:12,
        color:"#fff"
    },
    username:{
        fontFamily:Fonts.Poppins_Bold,
        fontSize:14,
        color:"#fff"
    },
    checkbtn:{
        borderWidth:2,
        borderColor:"#B668E7",
        padding:8,
        paddingHorizontal:13,
        borderRadius:1000,
        paddingLeft:16,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:"#F6F6FF"
    },
    cardheader:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:"#F2EDFF",
        borderWidth:1,
        borderColor:"#B668E7",
        borderRadius:20,
        padding:8,
        paddingHorizontal:14
    },  
    flex1:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    card:{
        borderWidth:1,
        borderColor:'#E9E9E9',
        borderRadius:20,
        marginVertical:15
    },
    title:{
        fontFamily:Fonts.Poppins_SemiBold,
        color:"#686AFA",
        fontSize:12
    },
    cardtitle:{
        fontFamily:Fonts.Poppins_SemiBold,
        color:"#3B2645",
        fontSize:11,
        textAlign:'center',
        paddingTop:8,
        paddingBottom:5
    },
    inputconatiner:{
        position: 'relative',
        borderRadius: 15,
        overflow:'hidden',
        marginBottom:15
    },
    input:{
        height: 45,
        backgroundColor:"#fff",
        fontSize: 14,
        borderWidth:1,
        marginHorizontal:15,
        borderColor:"#DDDFDF",
        color: '#3B2645',
        textAlign:'center',
    }, 
    flexdir:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    sText:{
        fontFamily: Fonts.Poppins_SemiBold,
        fontSize:10,
        color:"#3B2645"
    },
    sGoal:{
        fontFamily: Fonts.Poppins_Regular,
        fontSize:7,
        color:"#737A7B"
    },
    blogitem:{
        borderWidth:1,
        borderColor:"#E9E9E9",
        borderRadius:15,
        overflow: "hidden",
        marginBottom:10,
        position:'relative',
        padding:15
    },
    blogbody:{
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
    sText1:{
        fontFamily: Fonts.Poppins_SemiBold,
        fontSize:20,
        color:"#3B2645"
    },
    sGoal1:{
        fontFamily: Fonts.Poppins_Regular,
        fontSize:12,
        color:"#737A7B"
    },
    redtext:{
        fontFamily: Fonts.Poppins_SemiBold,
        fontSize:12,
        color:"#EF206A"
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
        fontSize: 16
    },
    addtitle:{
        fontFamily: Fonts.Poppins_Medium,
        color:"#000",
        textAlign:'center',
        fontSize: 13
    },
    addcard:{
        borderWidth:1,
        borderColor:"#C068E5",
        padding:15,
        borderRadius:6
    }
})