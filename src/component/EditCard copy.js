import React, { useEffect, useState } from 'react';
import Fonts from '../constants/Fonts';
import { Text, SafeAreaView, StyleSheet, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'react-native-gradients';
import { connect } from 'react-redux';
import Config from '../constants/Config';
import Loader from '../common/Loader';
import { useNavigation } from '@react-navigation/native';


const EditCard = (props) => {
    const navigation = useNavigation()

    const colorList1 = [
        { offset: '0%', color: '#C068E5', opacity: '1' },
        { offset: '100%', color: '#5D6AFC', opacity: '1' },
    ];

    const [cardname, setCardname] = useState('Stefani Wong');
    const [cnumber, setCnumber] = useState('12345678910098765');
    const [bname, setBname] = useState('Blah Blah Bank');
    const [expirydate, setExpirydate] = useState('05/26');
    const [cvv, setCvv] = useState('853');
    const [cardDetails, setCardDetails] = useState({})
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        let data = props.route.params.cardDetails
        console.log("kllklklkl", props.userDetails);
        setCnumber("**** ****  **** " + data.last4)
        setBname(data.brand)
        setCardname(data.type)
        setCardDetails(props.route.params.cardDetails)
    }, [])

    const onEditCard = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + props.loginData.token);

        var formdata = new FormData();
        formdata.append("customerid", cardDetails.customerid);
        formdata.append("type", cardname);
        formdata.append("brand", bname);
        formdata.append("token", "234");
        formdata.append("last4", cvv);
        formdata.append("card_id", cardDetails.id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        setIsLoading(true)
        fetch(Config.BASE_URL + Config.edit_payment_cards, requestOptions)
            .then(response => response.json())
            .then(result => {
                setIsLoading(false)
                console.log(result)
                navigation.navigate('PaymentCards')

            })
            .catch(error => console.log('error', error));
    }



    return (
        <SafeAreaView style={styles.relative}>
            <ScrollView style={styles.relative}>
                <View style={styles.container}>
                    <View
                        style={styles.inputconatiner}
                    >
                        <Text style={styles.labelname}>Card Holder Name</Text>
                        <TextInput
                            style={[styles.input, { paddingLeft: 130 }]}
                            underlineColor={'transparent'}
                            selectionColor="#3B2645"
                            value={cardname}
                            onChangeText={setCardname}
                            theme={{
                                colors: {
                                    primary: '#F7F8F8',
                                    text: '#3B2645'
                                },
                                fonts: {
                                    regular: {
                                        fontFamily: Fonts.Poppins_Regular
                                    }
                                }
                            }}
                        />
                    </View>

                    <View
                        style={styles.inputconatiner}
                    >
                        <Text style={styles.labelname}>Card Number</Text>
                        <TextInput
                            style={[styles.input, { paddingLeft: 100 }]}
                            underlineColor={'transparent'}
                            selectionColor="#3B2645"
                            value={cnumber}
                            onChangeText={setCnumber}
                            theme={{
                                colors: {
                                    primary: '#F7F8F8',
                                    text: '#3B2645'
                                },
                                fonts: {
                                    regular: {
                                        fontFamily: Fonts.Poppins_Regular
                                    }
                                }
                            }}
                        />
                    </View>

                    <View
                        style={styles.inputconatiner}
                    >
                        <Text style={styles.labelname}>Bank Name</Text>
                        <TextInput
                            style={[styles.input, { paddingLeft: 90 }]}
                            underlineColor={'transparent'}
                            selectionColor="#3B2645"
                            value={bname}
                            onChangeText={setBname}
                            theme={{
                                colors: {
                                    primary: '#F7F8F8',
                                    text: '#3B2645'
                                },
                                fonts: {
                                    regular: {
                                        fontFamily: Fonts.Poppins_Regular
                                    }
                                }
                            }}
                        />
                    </View>

                    <View
                        style={styles.inputconatiner}
                    >
                        <Text style={styles.labelname}>Expiry Date</Text>
                        <TextInput
                            style={[styles.input, { paddingLeft: 80 }]}
                            underlineColor={'transparent'}
                            selectionColor="#3B2645"
                            value={expirydate}
                            onChangeText={setExpirydate}
                            theme={{
                                colors: {
                                    primary: '#F7F8F8',
                                    text: '#3B2645'
                                },
                                fonts: {
                                    regular: {
                                        fontFamily: Fonts.Poppins_Regular
                                    }
                                }
                            }}
                        />
                    </View>

                    <View
                        style={styles.inputconatiner}
                    >
                        <Text style={styles.labelname}>Cvv</Text>
                        <TextInput
                            style={[styles.input, { paddingLeft: 80 }]}
                            underlineColor={'transparent'}
                            selectionColor="#3B2645"
                            value={cvv}
                            onChangeText={setCvv}
                            theme={{
                                colors: {
                                    primary: '#F7F8F8',
                                    text: '#3B2645'
                                },
                                fonts: {
                                    regular: {
                                        fontFamily: Fonts.Poppins_Regular
                                    }
                                }
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={() => onEditCard()}
                style={styles.button}>
                <LinearGradient style={styles.granew} colorList={colorList1} angle={200}>
                </LinearGradient>
                <Text style={styles.text}>Save</Text>
            </TouchableOpacity>

            <Loader loading={isLoading} />

        </SafeAreaView>
    )
}


const mapStateToProps = (state) => ({
    loginData: state.loginReducer.loginData,
    userDetails: state.profileReducer.userDetails,
});

const mapDispatchToProps = (dispatch) => ({
    getCardListRequest: (data) => dispatch(getCardListRequest(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(EditCard);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        paddingHorizontal: 18
    },
    relative: {
        position: 'relative',
        width: '100%',
        flex: 1,
        backgroundColor: "#fff"
    },
    labelname: {
        fontFamily: Fonts.Poppins_Regular,
        color: "#7B6F72",
        fontSize: 12,
        position: 'absolute',
        zIndex: 2,
        top: 17,
        left: 20
    },
    label: {
        fontFamily: Fonts.Poppins_SemiBold,
        color: "#1D1617",
        fontSize: 12,
        marginBottom: 10
    },
    inputconatiner: {
        position: 'relative',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 15,
        position: 'relative'
    },
    input: {
        height: 54,
        backgroundColor: "#F7F8F8",
        fontSize: 14,
        color: '#3B2645',
        textAlign: 'right'
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
        marginHorizontal: 15
    },
    text: {
        position: 'absolute',
        zIndex: 1,
        fontFamily: Fonts.Poppins_Bold,
        color: "#fff",
        fontSize: 16,
        zIndex: 3
    },
    granew: {
        flex: 1,
        flexGrow: 1
    }
})