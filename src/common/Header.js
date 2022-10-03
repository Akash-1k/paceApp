import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fonts from '../constants/Fonts';

export const Header = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 15,
      }}>
      {/* <LinearGradient
        colors={['red', 'green']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}> */}
      <TouchableOpacity
        style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
        onPress={props.onBackPress}>
        <Ionicons
          name="chevron-back"
          size={18}
          color="#3B2645"
          style={{
            paddingRight: 6,
            position: 'relative',
            top: -1.5,
          }}
        />

        <Text
          style={{
            fontFamily: Fonts.Poppins_Bold,
            color: '#3B2645',
          }}>
          {props.title}
        </Text>
      </TouchableOpacity>
      {/* </LinearGradient> */}

      {props.isAdd ? (
        <TouchableOpacity
          style={{
            paddingRight: 5,
            alignItems: 'center',
          }}
          onPress={props.onAddPress}>
          <Text
            style={{
              fontFamily: Fonts.Poppins_Medium,
              fontSize: 14,
              color: '#C068E5',
            }}>
            +Add
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
