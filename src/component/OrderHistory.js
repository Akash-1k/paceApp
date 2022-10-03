import React from 'react';
import Fonts from '../constants/Fonts';
import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const OrderHistory = () => {
    const navigation = useNavigation();
    return(
        <SafeAreaView style={styles.relative}>
            <ScrollView style={styles.relative}>
                <View style={styles.container}>
                    <View style={styles.blogitem1}>
                        <View style={[styles.blogitem,{marginBottom:10}]}>
                            <TouchableOpacity
                            onPress={() => navigation.navigate('OrderDetails')}    
                            >    
                                <TouchableOpacity
                                onPress={() => navigation.navigate('OrderDetails')}    
                                >
                                <Image 
                                    resizeMode="cover"
                                    source={require('../../assets/images/shop3.png')}
                                    style={{
                                        width:79,
                                        height:79,
                                        borderRadius:3
                                    }}
                                />
                                </TouchableOpacity>
                            </TouchableOpacity>
                            <View style={styles.blogbody}>
                                <View style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between'
                                    }}>
                                    <Text numberOfLines={1} style={styles.title}
                                        onPress={() => navigation.navigate('OrderDetails')}
                                        >Bershka Mom...</Text>
                                   
                                </View>
                                <Text style={styles.subtitle}>S - 26  |  Blue  |  x1  </Text>
                                <View
                                    style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between'
                                    }}
                                    >
                                    <Text style={[styles.subtitle, 
                                        {
                                            width:140,
                                            fontSize:10
                                        }]} numberOfLines={1}>
                                        <Text style={[styles.subtitle, 
                                        {
                                            fontWeight:'300',
                                            fontFamily:Fonts.Poppins_Regular,
                                            color:"#3B2645",
                                            fontSize:10,
                                            opacity: 0.7
                                        }]}>Order ID : </Text> 
                                        0706502
                                    </Text>
                                    <Text
                                        style={{ 
                                            fontFamily: Fonts.Poppins_Bold, 
                                            fontSize: 18,
                                            color:"#C068E5",
                                            marginLeft:5,
                                            marginTop:-8
                                        }}
                                        >
                                        <Text><Text style={{fontSize:13}}>$</Text>
                                            18
                                        <Text style={{fontSize:13,fontWeight:'200', fontFamily:Fonts.Poppins_Regular}}>.00</Text></Text>
                                    </Text>
                                </View>

                                <TouchableOpacity 
                                    style={{
                                        position:'absolute',
                                        right:-15,
                                        top:-15,
                                        backgroundColor:"#EFF9E6",
                                        padding:5,
                                        paddingHorizontal:10,
                                        borderBottomLeftRadius:16
                                    }}>
                                    <Text style={[styles.title1,{
                                            fontSize:10,
                                            color:"#63C501"
                                        }]}>
                                        Deliverd
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.blogitem1}>
                        <View style={[styles.blogitem,{marginBottom:10}]}>
                            <TouchableOpacity
                            onPress={() => navigation.navigate('OrderDetails')}    
                            >
                            <Image 
                                resizeMode="cover"
                                source={require('../../assets/images/product1.png')}
                                style={{
                                    width:79,
                                    height:79,
                                    borderRadius:3
                                }}
                            />
                            </TouchableOpacity>
                            <View style={styles.blogbody}>
                                <View style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between'
                                    }}>
                                    <Text numberOfLines={1} style={styles.title}
                                        onPress={() => navigation.navigate('OrderDetails')}
                                        >Pea Protein Isol...</Text>
                                   
                                </View>
                                <Text style={styles.subtitle}>2kg  |  x1</Text>
                                <View
                                    style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between'
                                    }}
                                    >
                                    <Text style={[styles.subtitle, 
                                        {
                                            width:140,
                                            fontSize:10
                                        }]} numberOfLines={1}>
                                        <Text style={[styles.subtitle, 
                                        {
                                            fontWeight:'300',
                                            fontFamily:Fonts.Poppins_Regular,
                                            color:"#3B2645",
                                            fontSize:10,
                                            opacity: 0.7
                                        }]}>Order ID : </Text> 
                                        0706502
                                    </Text>
                                    <Text
                                        style={{ 
                                            fontFamily: Fonts.Poppins_Bold, 
                                            fontSize: 18,
                                            color:"#C068E5",
                                            marginLeft:5,
                                            marginTop:-8
                                        }}
                                        >
                                        <Text><Text style={{fontSize:13}}>$</Text>
                                        46
                                        <Text style={{fontSize:13,fontWeight:'200', fontFamily:Fonts.Poppins_Regular}}>.00</Text></Text>
                                    </Text>
                                </View>

                                <TouchableOpacity 
                                    style={{
                                        position:'absolute',
                                        right:-15,
                                        top:-15,
                                        backgroundColor:"#FEF7EC",
                                        padding:5,
                                        paddingHorizontal:10,
                                        borderBottomLeftRadius:16
                                    }}>
                                    <Text style={[styles.title1,{
                                            fontSize:10,
                                            color:"#F7B551"
                                        }]}>
                                        Deliverd
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.blogitem1}>
                        <View style={[styles.blogitem,{marginBottom:10}]}>
                            <TouchableOpacity
                            onPress={() => navigation.navigate('OrderDetails')}    
                            >
                            <Image 
                                resizeMode="cover"
                                source={require('../../assets/images/product3.png')}
                                style={{
                                    width:79,
                                    height:79,
                                    borderRadius:3
                                }}
                            />
                            </TouchableOpacity>
                            <View style={styles.blogbody}>
                                <View style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between'
                                    }}>
                                    <Text numberOfLines={1} style={styles.title}
                                        onPress={() => navigation.navigate('OrderDetails')}
                                        >T900C Treadmill</Text>
                                   
                                </View>
                                <Text style={styles.subtitle}>Black  |  x1</Text>
                                <View
                                    style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between'
                                    }}
                                    >
                                    <Text style={[styles.subtitle, 
                                        {
                                            width:140,
                                            fontSize:10
                                        }]} numberOfLines={1}>
                                        <Text style={[styles.subtitle, 
                                        {
                                            fontWeight:'300',
                                            fontFamily:Fonts.Poppins_Regular,
                                            color:"#3B2645",
                                            fontSize:10,
                                            opacity: 0.7
                                        }]}>Order ID : </Text> 
                                        0706502
                                    </Text>
                                    <Text
                                        style={{ 
                                            fontFamily: Fonts.Poppins_Bold, 
                                            fontSize: 18,
                                            color:"#C068E5",
                                            marginLeft:5,
                                            marginTop:-8
                                        }}
                                        >
                                        <Text><Text style={{fontSize:13}}>$</Text>
                                        46
                                        <Text style={{fontSize:13,fontWeight:'200', fontFamily:Fonts.Poppins_Regular}}>.00</Text></Text>
                                    </Text>
                                </View>

                                <TouchableOpacity 
                                    style={{
                                        position:'absolute',
                                        right:-15,
                                        top:-15,
                                        backgroundColor:"#FFE8EE",
                                        padding:5,
                                        paddingHorizontal:10,
                                        borderBottomLeftRadius:16
                                    }}>
                                    <Text style={[styles.title1,{
                                            fontSize:10,
                                            color:"#FF0145"
                                        }]}>
                                        Canceled
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.blogitem1}>
                        <View style={[styles.blogitem,{marginBottom:10}]}>
                            <TouchableOpacity
                            onPress={() => navigation.navigate('OrderDetails')}    
                            >
                            <Image 
                                resizeMode="cover"
                                source={require('../../assets/images/shop3.png')}
                                style={{
                                    width:79,
                                    height:79,
                                    borderRadius:3
                                }}
                            />
                            </TouchableOpacity>
                            <View style={styles.blogbody}>
                                <View style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between'
                                    }}>
                                    <Text numberOfLines={1} style={styles.title}
                                        onPress={() => navigation.navigate('OrderDetails')}
                                        >Bershka Mom...</Text>
                                   
                                </View>
                                <Text style={styles.subtitle}>S - 26  |  Blue  |  x1  </Text>
                                <View
                                    style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between'
                                    }}
                                    >
                                    <Text style={[styles.subtitle, 
                                        {
                                            width:140,
                                            fontSize:10
                                        }]} numberOfLines={1}>
                                        <Text style={[styles.subtitle, 
                                        {
                                            fontWeight:'300',
                                            fontFamily:Fonts.Poppins_Regular,
                                            color:"#3B2645",
                                            fontSize:10,
                                            opacity: 0.7
                                        }]}>Order ID : </Text> 
                                        0706502
                                    </Text>
                                    <Text
                                        style={{ 
                                            fontFamily: Fonts.Poppins_Bold, 
                                            fontSize: 18,
                                            color:"#C068E5",
                                            marginLeft:5,
                                            marginTop:-8
                                        }}
                                        >
                                        <Text><Text style={{fontSize:13}}>$</Text>
                                            18
                                        <Text style={{fontSize:13,fontWeight:'200', fontFamily:Fonts.Poppins_Regular}}>.00</Text></Text>
                                    </Text>
                                </View>

                                <TouchableOpacity 
                                    style={{
                                        position:'absolute',
                                        right:-15,
                                        top:-15,
                                        backgroundColor:"#EFF9E6",
                                        padding:5,
                                        paddingHorizontal:10,
                                        borderBottomLeftRadius:16
                                    }}>
                                    <Text style={[styles.title1,{
                                            fontSize:10,
                                            color:"#63C501"
                                        }]}>
                                        Deliverd
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.blogitem1}>
                        <View style={[styles.blogitem,{marginBottom:10}]}>
                            <TouchableOpacity
                            onPress={() => navigation.navigate('OrderDetails')}    
                            >
                            <Image 
                                resizeMode="cover"
                                source={require('../../assets/images/product1.png')}
                                style={{
                                    width:79,
                                    height:79,
                                    borderRadius:3
                                }}
                            />
                            </TouchableOpacity>
                            <View style={styles.blogbody}>
                                <View style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between'
                                    }}>
                                    <Text numberOfLines={1} style={styles.title}
                                        onPress={() => navigation.navigate('OrderDetails')}
                                        >Pea Protein Isol...</Text>
                                   
                                </View>
                                <Text style={styles.subtitle}>2kg  |  x1</Text>
                                <View
                                    style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between'
                                    }}
                                    >
                                    <Text style={[styles.subtitle, 
                                        {
                                            width:140,
                                            fontSize:10
                                        }]} numberOfLines={1}>
                                        <Text style={[styles.subtitle, 
                                        {
                                            fontWeight:'300',
                                            fontFamily:Fonts.Poppins_Regular,
                                            color:"#3B2645",
                                            fontSize:10,
                                            opacity: 0.7
                                        }]}>Order ID : </Text> 
                                        0706502
                                    </Text>
                                    <Text
                                        style={{ 
                                            fontFamily: Fonts.Poppins_Bold, 
                                            fontSize: 18,
                                            color:"#C068E5",
                                            marginLeft:5,
                                            marginTop:-8
                                        }}
                                        >
                                        <Text><Text style={{fontSize:13}}>$</Text>
                                        46
                                        <Text style={{fontSize:13,fontWeight:'200', fontFamily:Fonts.Poppins_Regular}}>.00</Text></Text>
                                    </Text>
                                </View>

                                <TouchableOpacity 
                                    style={{
                                        position:'absolute',
                                        right:-15,
                                        top:-15,
                                        backgroundColor:"#FEF7EC",
                                        padding:5,
                                        paddingHorizontal:10,
                                        borderBottomLeftRadius:16
                                    }}>
                                    <Text style={[styles.title1,{
                                            fontSize:10,
                                            color:"#F7B551"
                                        }]}>
                                        Deliverd
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.blogitem1}>
                        <View style={[styles.blogitem,{marginBottom:10}]}>
                            <TouchableOpacity
                            onPress={() => navigation.navigate('OrderDetails')}    
                            >
                            <Image 
                                resizeMode="cover"
                                source={require('../../assets/images/product3.png')}
                                style={{
                                    width:79,
                                    height:79,
                                    borderRadius:3
                                }}
                            />
                            </TouchableOpacity>
                            <View style={styles.blogbody}>
                                <View style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between'
                                    }}>
                                    <Text numberOfLines={1} style={styles.title}
                                        onPress={() => navigation.navigate('OrderDetails')}
                                        >T900C Treadmill</Text>
                                   
                                </View>
                                <Text style={styles.subtitle}>Black  |  x1</Text>
                                <View
                                    style={{
                                        display:'flex',
                                        flexDirection:'row',
                                        justifyContent:'space-between'
                                    }}
                                    >
                                    <Text style={[styles.subtitle, 
                                        {
                                            width:140,
                                            fontSize:10
                                        }]} numberOfLines={1}>
                                        <Text style={[styles.subtitle, 
                                        {
                                            fontWeight:'300',
                                            fontFamily:Fonts.Poppins_Regular,
                                            color:"#3B2645",
                                            fontSize:10,
                                            opacity: 0.7
                                        }]}>Order ID : </Text> 
                                        0706502
                                    </Text>
                                    <Text
                                        style={{ 
                                            fontFamily: Fonts.Poppins_Bold, 
                                            fontSize: 18,
                                            color:"#C068E5",
                                            marginLeft:5,
                                            marginTop:-8
                                        }}
                                        >
                                        <Text><Text style={{fontSize:13}}>$</Text>
                                        46
                                        <Text style={{fontSize:13,fontWeight:'200', fontFamily:Fonts.Poppins_Regular}}>.00</Text></Text>
                                    </Text>
                                </View>

                                <TouchableOpacity 
                                    style={{
                                        position:'absolute',
                                        right:-15,
                                        top:-15,
                                        backgroundColor:"#FFE8EE",
                                        padding:5,
                                        paddingHorizontal:10,
                                        borderBottomLeftRadius:16
                                    }}>
                                    <Text style={[styles.title1,{
                                            fontSize:10,
                                            color:"#FF0145"
                                        }]}>
                                        Canceled
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default OrderHistory;

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
        borderWidth:1,
        borderColor:"#E9E9E9",
        borderRadius:15,
        overflow: "hidden",
        marginBottom:10,
        position:'relative',
        padding:15,
        paddingBottom:5
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
        fontSize: 16,
        width:140,
        marginBottom:16
    },
    subtitle:{
       color: '#3B2645',
       fontSize: 14,
       opacity: 0.7,
       fontFamily: Fonts.Poppins_Bold
    },
    title1:{
        fontFamily:Fonts.Poppins_SemiBold,
        color:"#686AFA",
        fontSize:12
    },
})