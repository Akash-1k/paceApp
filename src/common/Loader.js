import React from 'react';
import {Modal, View, Text} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import Colors from '../constants/Colors';
import styles from './CLoader/style';

class Loader extends React.PureComponent {
  render() {
    const {loading, transparent} = this.props;

    return (
      <Modal
        visible={loading}
        transparent={transparent == undefined ? true : false}>
        <View style={[styles.parentContainer, {backgroundColor: '#0006'}]}>
          <View style={styles.container}>
            <View style={{borderRadius: 10, padding: 5}}>
              <BarIndicator count={4} color={'#5D6AFC'} size={30} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default Loader;
