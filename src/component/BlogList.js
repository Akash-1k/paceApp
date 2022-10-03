import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import Fonts from '../constants/Fonts';
import { setBlogId, viewAllBlogRequest } from '../modules/Blog/actions';


const BlogList = (props) => {
    const navigation = useNavigation();
    const [blogList, setBlogList] = useState([])

    useEffect(() => {
        props.viewAllBlogRequest(props.loginData)
    }, [])

    useEffect(() => {
        setBlogList(props.viewAllBlogList.blogs)
    }, [props.viewAllBlogList])

    const onBlogDetails = (id) => {
        props.setBlogId(id)
        navigation.navigate('BlogDetails')
    }

    const renderItem = (data) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    console.log(data.item);
                    onBlogDetails(data.item.id)
                }}
                style={styles.blogitem}>
                <View
                    style={{ height: RFPercentage(25) }}
                >
                    <Image
                        source={
                            data.item.image != undefined ?
                                { uri: 'https://dev.indiit.solutions/pace/public/assets/images/blogs/' + data.item.image } :
                                require('../../assets/images/place.png')
                        }
                        style={{
                            width: 111,
                            height: RFPercentage(25),
                            resizeMode: 'cover',
                        }}
                    />

                </View>

                <View style={styles.blogbody}>
                    <Text style={styles.title}>{data.item.name}  </Text>
                    <Text numberOfLines={6} style={[styles.subtitle, { marginBottom: 9 }]}>
                        {data.item.description}
                    </Text>
                    <Text style={styles.hours}>
                        <MaterialCommunityIcons
                            name='clock-time-five-outline'
                            size={14}
                            color="#5D6AFC"
                        />
                        {data.item.created_at}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.mainbg}>
            <View style={styles.conatiner}>

                <FlatList
                    data={blogList}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => 'key' + index}
                    showsVerticalScrollIndicator={false}
                />


            </View>
        </SafeAreaView>
    )
}



const mapStateToProps = (state) => ({
    loginData: state.loginReducer.loginData,
    userDetails: state.profileReducer.userDetails,
    viewAllBlogList: state.blogReducer.viewAllBlogList,
    blogId: state.blogReducer.blogId,
});

const mapDispatchToProps = (dispatch) => ({
    // userDetailsRequest: (data) => dispatch(userDetailsRequest(data)),
    viewAllBlogRequest: (data) => dispatch(viewAllBlogRequest(data)),
    setBlogId: (data) => dispatch(setBlogId(data)),


});

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);



const styles = StyleSheet.create({
    mainbg: {
        backgroundColor: "#fff",
        flex: 1
    },
    conatiner: {
        position: 'relative',
        flex: 1,
        padding: 15
    },
    blogitem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#E9E9E9",
        borderRadius: 15,
        overflow: "hidden",
        marginBottom: 10
    },
    blogbody: {
        position: 'relative',
        paddingHorizontal: 20,
        height: RFPercentage(25)
    },
    title: {
        color: "#846AF3",
        fontFamily: Fonts.Poppins_Bold,
        fontSize: 16
    },
    subtitle: {
        color: '#7B6F72',
        fontSize: 10,
        fontFamily: Fonts.Poppins_Regular
    },
    hours: {
        color: "#3B2645",
        fontSize: 12,
        fontFamily: Fonts.Poppins_Regular
    }
})