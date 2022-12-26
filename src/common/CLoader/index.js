import React from 'react';
import {Modal, View} from 'react-native';
import {BarIndicator} from 'react-native-indicators';
import {connect} from 'react-redux';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import {hideErrorModal} from './action';
import styles from './style';

class LoadingView extends React.PureComponent {
  hideErrorModal = () => {
    const {hideErrorModalView} = this.props;
    hideErrorModalView();
  };

  render() {
    const {loading, transparent, isError, errorMessage} = this.props;

    return (
      <Modal visible={loading} transparent={transparent}>
        <View style={styles.parentContainer}>
          <View style={styles.container}>
            <View style={{borderRadius: 10, padding: 5}}>
              <BarIndicator count={4} color={'#5D6AFC'} size={30} />

              {/* <ImageBackground
                borderRadius={10}
                source={require('../../assets/load.gif')}
                style={{height: 90, width: 120, borderRadius: 10}}
              /> */}
            </View>
            {/* <View style={{ width: 210, paddingLeft: 20 }}>
              <Text style={{ color: Colors.fontColor, fontSize: wp('5%'), fontFamily: Fonts.Poppins_Medium }}>
                {strings.pleaseWait}
              </Text>
            </View> */}
          </View>
          <View
            style={{
              ...styles.parentContainer,
              backgroundColor: 'black',
              opacity: 0.4,
            }}
          />
        </View>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.loadingReducer.loading,
  isError: state.loadingReducer.isError,
  errorMessage: state.loadingReducer.errorMessage,
  transparent: state.loadingReducer.transparent,
});
const mapDispatchToProps = dispatch => ({
  hideErrorModalView: () => dispatch(hideErrorModal()),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoadingView);
