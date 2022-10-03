import React, { useEffect, useState } from 'react';
import Fonts from '../constants/Fonts';
import { Text, SafeAreaView, StyleSheet, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import Config from '../constants/Config';
import Loader from '../common/Loader';


const BlogDetails = (props) => {
    const [blogDetails, setBlogDetails] = useState([])
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        getBlogdetails()
    }, [])

    const getBlogdetails = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + props.loginData.token);
        var formdata = new FormData();
        formdata.append("id", props.blogId);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        setIsLoading(true)
        fetch(Config.BASE_URL + Config.single_blog, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setBlogDetails(result)
                setIsLoading(false)
            })
            .catch(error => console.log('error', error));
    }

    return (
        <SafeAreaView style={styles.relative}>
            <ScrollView style={styles.relative}>
                <View style={styles.container}>
                    <View style={styles.startimg}>
                        <Image
                            resizeMode='cover'
                            source={
                                blogDetails?.blogs === undefined ?
                                    require('../../assets/images/place.png') :
                                    { uri: 'https://dev.indiit.solutions/pace/public/assets/images/blogs/' + blogDetails?.blogs[0].image }
                            }
                            style={{
                                width: '100%',
                                height: 360,
                            }}
                        />
                        {/* Shadow */}
                        {/* <Image 
                            resizeMode='cover'
                            source={require('../../assets/images/topshadow.png')}
                            style={{
                                width: '100%',
                                height: 355,
                                position:'absolute',
                                top:0
                            }}
                        /> */}
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.title}>
                            {blogDetails.blogs != undefined ?
                                blogDetails.blogs[0].name : ''
                            }
                        </Text>
                        <Paragraph style={[styles.subtitle, { marginBottom: 10 }]}>
                            {blogDetails.blogs != undefined ?
                                blogDetails.blogs[0].description : ''
                            }
                        </Paragraph>
                    </View>
                </View>
            </ScrollView>
            <Loader loading={isLoading} />

        </SafeAreaView>
    )
}


const mapStateToProps = (state) => ({
    loginData: state.loginReducer.loginData,
    userDetails: state.profileReducer.userDetails,
    blogId: state.blogReducer.blogId,

});

const mapDispatchToProps = (dispatch) => ({
    // userDetailsRequest: (data) => dispatch(userDetailsRequest(data)),
    // getAddressListRequest: (data) => dispatch(getAddressListRequest(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetails);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        zIndex: 1
    },
    relative: {
        position: 'relative',
        width: '100%',
        flex: 1,
        backgroundColor: "#fff"
    },
    box: {
        backgroundColor: "#fff",
        marginTop: -120,
        borderTopStartRadius: 32,
        borderTopEndRadius: 32,
        padding: 25
    },
    startimg: {},
    title: {
        color: "#3B2645",
        fontFamily: Fonts.Poppins_Bold,
        fontSize: 18,
        lineHeight: 32
    },
    subtitle: {
        color: '#3B2645',
        fontSize: 14,
        fontFamily: Fonts.Poppins_Regular
    },
})