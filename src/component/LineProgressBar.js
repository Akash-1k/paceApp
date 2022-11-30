import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Fonts from '../constants/Fonts';

// ProgressColor -->
// BackgroundColor -->
// type -->
// value -->
// total -->
// percent -->
// viewStyle -->

const LineProgressBar = ({config, title}) => {
  let pColor;
  let url;
  if (title == 'Running') {
    pColor = '#C068E5';
    url = require('../../assets/images/run1.png');
  } else if (title == 'Water') {
    pColor = '#5D6AFC';
    url = require('../../assets/images/Water1.png');
  } else if (title == 'Steps') {
    pColor = '#F7B857';
    url = require('../../assets/images/walk.png');
  } else if (title == 'Workout') {
    pColor = '#CFCFE3';
    url = require('../../assets/images/dicon.png');
  } else if (title == 'Kcal') {
    pColor = '#CFCFE3';
    url = require('../../assets/images/iconw.png');
  } else {
    pColor = '#CFCFE3';
    url = require('../../assets/images/LogoBlack.png');
  }

  return (
    <>
      <View style={styles.boxitem}>
        <View style={styles.flexdir}>
          <Image
            resizeMode="contain"
            source={url}
            style={{
              width: 22,
              height: 22,
            }}
          />
          <Text style={[styles.title, {paddingLeft: 8, width: 100}]}>
            {title}
          </Text>
        </View>
        <View
          style={[
            styles.line,
            {
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
            },
          ]}>
          <View
            style={[
              styles.line,
              {
                width: `${config.percent >= 100 ? 100 : config.percent}%`,
                backgroundColor: pColor,
                justifyContent: 'center',
              },
            ]}>
            <Text style={styles.text}>
              {config.percent >= 20 && config.value}
              {config.percent >= 25 && config.type}
            </Text>
          </View>
          {Boolean(config.total) && (
            <Text style={styles.text1}>
              {config.total}
              {/* {config.type} */}
            </Text>
          )}
        </View>
      </View>
    </>
  );
};

export default LineProgressBar;

const styles = StyleSheet.create({
  line: {
    height: 23,
    borderRadius: 50,
    backgroundColor: '#F7F8F8',
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 15,
    top: 1,
    fontSize: 12,
    color: '#fff',
    fontFamily: Fonts.Poppins_SemiBold,
  },
  text1: {
    position: 'absolute',
    color: 'rgba(0,0,0,.3)',
    fontSize: 11,
    right: 15,
    fontFamily: Fonts.Poppins_SemiBold,
  },
  boxitem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    backgroundColor: '#fff',
    padding: 15,
    paddingVertical: 22,
  },
  flexdir: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: Fonts.Poppins_Medium,
    color: '#1D242A',
    fontSize: 14,
  },
});
