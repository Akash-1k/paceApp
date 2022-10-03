import React, {useState} from 'react';
import Fonts from '../constants/Fonts';
import {Text, SafeAreaView, StyleSheet, View, Image, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-element-dropdown';

const ProgressThisMonth = () => {
    const navigation = useNavigation();
    const [isOpened, setIsOpened] = useState(false);
    function toggle() {
        setIsOpened(wasOpened => !wasOpened);
    }
    const data = [
        { label: 'Today', value: '1' },
        { label: 'This Week', value: '2' },
        { label: 'This Month', value: '3' },
    ];

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return(
        <SafeAreaView style={styles.relative}>
            <ScrollView style={styles.relative}>
                <View style={styles.container}>
                    <View style={styles.headerflex}>
                        <View style={[styles.flexdir, { alignItems:'center'}]}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Root', {screen : 'TabOne'})}
                                >
                                <Ionicons 
                                name='chevron-back' 
                                size={18} 
                                color="#3B2645"
                                style={{
                                    paddingRight:6,
                                    position:'relative',
                                    top:-1.5
                                }}  
                                />
                            </TouchableOpacity>
                            <Text style={styles.headertext}>Progress</Text>
                        </View>
                        {/* <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Today' : '...'}
                            searchPlaceholder="Today"

                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                            }}
                        /> */}
                        <TouchableOpacity 
                            style={styles.dropdown} 
                            onPress={toggle}>
                            <Text style={styles.dropmaintitle}>This Month</Text>
                            <MaterialIcons 
                                name='keyboard-arrow-down'
                                size={24}
                                color="#000"
                            />  
                        </TouchableOpacity>
                        {isOpened && (
                        <View
                            style={styles.showBox}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ProgressDaily')}
                                >
                                <Text style={styles.droptitle}>Today</Text>
                            </TouchableOpacity>   
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('ProgressThisWeek')}
                            style={{
                                paddingVertical:10
                            }}>
                                <Text style={styles.droptitle}>This Week</Text>
                            </TouchableOpacity>   
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('ProgressThisMonth')}
                                >
                                <Text style={styles.droptitle}>This Month</Text>
                            </TouchableOpacity> 
                        </View>
                        )}
                    </View>
                    <Image 
                        resizeMode="cover"
                        source={require('../../assets/images/cal.png')}
                        style={{
                            width:'100%',
                            height:350
                        }}
                    />

                    <View style={styles.box}>
                        <View style={styles.icondate}>
                            <TouchableOpacity>
                                <MaterialIcons 
                                    name='keyboard-arrow-left' 
                                    size={20} 
                                />
                            </TouchableOpacity>
                            <Text style={styles.date}>March 2022</Text>
                            <TouchableOpacity>
                            <MaterialIcons 
                                name='keyboard-arrow-right' 
                                size={20} 
                            />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.boxitem}>
                            <View style={styles.flexdir}>
                                <Image 
                                    resizeMode="contain"
                                    source={require('../../assets/images/run1.png')}
                                    style={{
                                        width:22,
                                        height:22
                                    }}
                                />
                                <Text style={[styles.title, {paddingLeft:8}]}>Running</Text>
                            </View>
                            <Image 
                                resizeMode="contain"
                                source={require('../../assets/images/pimg1.png')}
                                style={{
                                    width:240,
                                    height:25
                                }}
                            />
                        </View>

                        <View style={styles.boxitem}>
                            <View style={styles.flexdir}>
                                <Image 
                                    resizeMode="contain"
                                    source={require('../../assets/images/run1.png')}
                                    style={{
                                        width:22,
                                        height:22
                                    }}
                                />
                                <Text style={[styles.title, {paddingLeft:8}]}>Water</Text>
                            </View>
                            <Image 
                                resizeMode="contain"
                                source={require('../../assets/images/pimg2.png')}
                                style={{
                                    width:240,
                                    height:25
                                }}
                            />
                        </View>

                        <View style={styles.boxitem}>
                            <View style={styles.flexdir}>
                                <Image 
                                    resizeMode="contain"
                                    source={require('../../assets/images/walk.png')}
                                    style={{
                                        width:22,
                                        height:22
                                    }}
                                />
                                <Text style={[styles.title, {paddingLeft:8}]}>Steps</Text>
                            </View>
                            <Image 
                                resizeMode="contain"
                                source={require('../../assets/images/pimg3.png')}
                                style={{
                                    width:240,
                                    height:25
                                }}
                            />
                        </View>

                        <View style={styles.boxitem}>
                            <View style={styles.flexdir}>
                                <Image 
                                    resizeMode="contain"
                                    source={require('../../assets/images/dicon.png')}
                                    style={{
                                        width:22,
                                        height:22
                                    }}
                                />
                                <Text style={[styles.title, {paddingLeft:8}]}>Workouts</Text>
                            </View>
                            <Image 
                                resizeMode="contain"
                                source={require('../../assets/images/pimg4.png')}
                                style={{
                                    width:240,
                                    height:25
                                }}
                            />
                        </View>

                        <View style={styles.boxitem}>
                            <View style={styles.flexdir}>
                                <Image 
                                    resizeMode="contain"
                                    source={require('../../assets/images/iconw.png')}
                                    style={{
                                        width:22,
                                        height:22
                                    }}
                                />
                                <Text style={[styles.title, {paddingLeft:8}]}>Kcal</Text>
                            </View>
                            <Image 
                                resizeMode="contain"
                                source={require('../../assets/images/pimg5.png')}
                                style={{
                                    width:240,
                                    height:25
                                }}
                            />
                        </View>
                        
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProgressThisMonth;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    relative:{
        position:'relative',
        backgroundColor:"#fff",
        flex:1,
    },
    box:{
        marginTop:0,
        backgroundColor:"#fff",
        padding:15,
        
    },
    boxitem:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        shadowColor: "rgba(0,0,0,0.5)",
        borderRadius:15,
        marginBottom:15,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        backgroundColor:"#fff",
        padding:15,
        paddingVertical:22
    },
    title:{
        fontFamily: Fonts.Poppins_Medium,
        color:"#1D242A",
        fontSize:14
    },
    headertext:{
        fontFamily: Fonts.Poppins_Bold,
        color:"#3B2645",
        fontSize:16
    },
    flexdir:{
        display:'flex',
        flexDirection:'row',
    },
    headerflex:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:15,
        position:'absolute',
        zIndex:2,
        width:'100%',
        paddingTop:10
    },
    dropdown: {
        margin: 0,
        height: 40,
        borderRadius:14,
        backgroundColor:"transparent",
        paddingHorizontal:15,
        width:140,
        borderWidth:1,
        borderRadius:100,
        borderColor:"#BBB4C6",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    inputSearchStyle: {
        fontSize: 14,
        top:0,
        fontFamily:Fonts.Poppins_Regular,
        color:"#3B2645"
    },
    placeholderStyle: {
        fontSize: 14,
        textAlign:'left',
        fontFamily:Fonts.Poppins_Regular,
        color:"#3B2645"
    },
    selectedTextStyle: {
        fontSize: 14,
        fontFamily:Fonts.Poppins_Regular,
        color:"#3B2645"
    },
    date:{
        textAlign:'center',
        marginBottom:10,
        color:"#321C1C",
        fontFamily:Fonts.Poppins_Regular,
        paddingHorizontal:8 
    },
    icondate:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
    },
    showBox:{
        position:'absolute',
        top:52,
        right:20,
        backgroundColor:"#fff",
        padding:15,
        width:130,
        borderRadius:16,
        zIndex:2,
        textAlign:'left',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 20,
    },
    droptitle:{
        fontFamily:Fonts.Poppins_Regular,
        fontSize:12,
        color:"#000"
    },
    dropmaintitle:{
        fontFamily:Fonts.Poppins_SemiBold,
        fontSize:13,
        color:"#000",
        paddingRight:6
    }
})