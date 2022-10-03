import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { TabBar, TabView } from 'react-native-tab-view';
import { connect } from 'react-redux';
import Fonts from '../constants/Fonts';
import { setBlogId } from '../modules/Blog/actions';


const Blog = (props) => {
    const navigation = useNavigation();
    const [index, setIndex] = React.useState(0);
    const [blogList, setBlogList] = React.useState([]);
    const [routes, setRoutes] = React.useState([
        { key: 'first', title: 'Lifestyle' },
        { key: 'second', title: 'Beauty' },
        { key: 'third', title: 'Decor' },
    ]);



    useEffect(() => {
        if (props.data != undefined) {
            setBlogList(props.data[index].blog_list)
        }
    }, [props.data])


    const onBlogDetails = (id) => {
        props.setBlogId(id)
        navigation.navigate('BlogDetails')
    }


    const renderItemBlogs = (item) => {
        return (
            <View style={styles.items}>
                <TouchableOpacity
                    onPress={() => {
                        console.log(item.item);
                        onBlogDetails(item.item.id)
                    }}
                >
                    <Image
                        resizeMode="cover"
                        source={{ uri: 'https://dev.indiit.solutions/pace/public/assets/images/blogs/' + item.item.image }}
                        style={{
                            width: 176,
                            height: 260,
                            borderRadius: 16
                        }}
                    />
                    <Text style={styles.title} numberOfLines={1}>{item.item.name} </Text>
                </TouchableOpacity>
            </View>
        )
    }

    const FirstRoute = () => {
        return (
            <SafeAreaView style={{ paddingTop: 15 }}>
                <FlatList
                    initialNumToRender={0}
                    renderItem={renderItemBlogs}
                    data={blogList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </SafeAreaView>

        )
    }

    const layout = useWindowDimensions();

    const onChangeIndex = (index) => {
        setIndex(index)
        setBlogList(props.data[index].blog_list)
    }

    return (
        <TabView
            swipeEnabled={false}
            navigationState={{ index, routes }}
            renderScene={FirstRoute}
            onIndexChange={onChangeIndex}
            style={{
                height: 350,
            }}
            initialLayout={{ width: layout.width }}
            renderTabBar={props =>
                <TabBar
                    {...props}
                    style={{
                        backgroundColor: '#fff',
                        elevation: 0,
                        shadowOpacity: 0
                    }}
                    indicatorStyle={{
                        backgroundColor: '#C068E5',
                        height: 3
                    }}
                    activeColor="#C068E5"
                    labelStyle={{
                        fontFamily: Fonts.Poppins_SemiBold,
                        fontSize: 12,
                        color: "#3B2645",
                        textTransform: 'capitalize'
                    }}
                />}
        />
    );
};


const mapStateToProps = (state) => ({
    loginData: state.loginReducer.loginData,
    userDetails: state.profileReducer.userDetails,
    blogId: state.blogReducer.blogId,
});

const mapDispatchToProps = (dispatch) => ({
    setBlogId: (data) => dispatch(setBlogId(data)),


});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);


const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.Poppins_Regular,
        color: "#3B2645",
        fontSize: 12,
        paddingTop: 4,
        paddingLeft: 6
    },
    items: {
        marginRight: 10,
        width: 176
    }
})
