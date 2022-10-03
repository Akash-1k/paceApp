import React from 'react';
import { View, Modal, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'react-native-gradients';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

const OkAlert = (props) => {
    const colorList1 = [
        { offset: '0%', color: '#C068E5', opacity: '1' },
        { offset: '100%', color: '#5D6AFC', opacity: '1' },
    ];

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => {
                setIsCountryPopup(!isCountryPopup);
            }}
        >
            <View style={[styles.centeredView,]}>
                <View style={[styles.modalView, { height: 200 }]}>
                <Text style={[styles.text,{color:Colors.fontColor}]}>{props.title}</Text>
                <Text style={[styles.text,{color:Colors.fontColor}]}>{props.msg}</Text>
                   
                <TouchableOpacity
                    onPress={props.onOk}
                    style={styles.button}>
                    <LinearGradient  colorList={colorList1} angle={150}>
                    </LinearGradient>
                    <Text style={styles.text}>OK</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    text: {
        position: 'absolute',
        zIndex: 1,
        fontFamily: Fonts.Poppins_Bold,
        color: "#fff",
        fontSize: 16,
        zIndex: 3
    },
    button: {
        position: 'absolute',
        bottom:5,
        right:5,
        height: 40,
        width:60,
        borderRadius: 100,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
  
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})

export default OkAlert