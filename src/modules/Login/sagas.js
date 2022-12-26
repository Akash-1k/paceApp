import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';
import Config, {SUCCESS} from '../../constants/Config';
import {BASE_URL} from '../../env';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk';
import {hideLoader, showLoader, showAlert} from '../../utils/CommonFunctions';
import {
  contactSupportFail,
  contactSupportSuccess,
  forgotPassFail,
  forgotPassSuccess,
  loginFail,
  loginSuccess,
  logoutFail,
  logoutSuccess,
  otpVerificationFail,
  otpVerificationSuccess,
  resetPasswordFail,
  resetPasswordSuccess,
} from './actions';
import {
  CONTACT_SUPPORT_REQUESTED,
  FORGOT_PASS_REQUESTED,
  LOGIN_REQUESTED,
  LOGOUT_REQUESTED,
  OTP_VERIFICATION_REQUESTED,
  RESET_PASSWORD_REQUESTED,
} from './types';

function* onLoginRequest({data, navigation}) {
  console.log('sags:::: \n', data, '\nsdasdsd\n', navigation);

  yield* showLoader(false);
  try {
    var myHeaders = new Headers();
    var requestOptions = {
      method: 'POST',
      body: data,
      headers: myHeaders,
      redirect: 'follow',
    };

    console.log(
      `${BASE_URL}${
        navigation.loginType == 'appLogin'
          ? Config.do_login
          : Config.social_login
      }`,
    );

    let res = yield fetch(
      `${BASE_URL}${
        navigation.loginType == 'appLogin'
          ? Config.do_login
          : Config.social_login
      }`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log('RESULT ::::::::::::::::', result);
        return result;
      })
      .catch(error => console.error('error', error));

    if (res.status == 0 || res.status == 2) {
      yield put(loginFail());
      yield* hideLoader(false, '');
      // console.log(res);
      showAlert(res.msg);
    }

    // console.log('resresresres', res);
    else if (res.success == true) {
      // console.log('login res:: ', res);
      yield put(loginSuccess(res));
      yield* hideLoader(false, '');
      navigation.navigation();
    } else {
      yield put(loginFail());
      yield* hideLoader(false, '');
      // console.log(res);
      showAlert(res.message);
      // setTimeout(() => {
      //   alert(res.message);
      // }, 400);
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    yield put(loginFail());
    yield* hideLoader(false, '');
  }
}

// MY CODE
function* onLogoutRequest({data, navigation}) {
  // console.log('Logout request ::::', data);
  yield* showLoader(false);
  try {
    var myHeaders = new Headers();
    var requestOptions = {
      method: 'POST',
      body: data,
      headers: myHeaders,
      redirect: 'follow',
    };
    // alert('hello');
    let res = yield fetch(BASE_URL + Config.logout, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log('logout:::::::', result);
        return result;
      })
      .catch(error => console.log('error', error));

    if (res.status == 1 || res.status == 400) {
      // console.log('logout res:: ', res);
      if (navigation.type == 'google') {
        signOut();
      }
      if (navigation.type == 'facebook') {
        console.log('FaceBook LOgout');
        LoginManager.logOut();
      }
      yield put(logoutSuccess(res));
      yield* hideLoader(false, '');
      navigation.navigation();
    } else {
      yield put(logoutFail());
      yield* hideLoader(false, '');
      // console.log(res);
      setTimeout(() => {
        alert(res.message);
      }, 400);
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    // yield put(forgotPassFail());
    yield* hideLoader(false, '');
  }
}
// MY CODE

function* onForgotPass({data, navigation}) {
  yield* showLoader(false);
  try {
    var requestOptions = {
      method: 'POST',
      body: data,
      redirect: 'follow',
    };

    let res = yield fetch(BASE_URL + Config.forget_password, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(error => console.log('error', error));

    if (res.status == 1) {
      console.log('login res:: ', res);
      yield put(forgotPassSuccess(res.data));
      yield* hideLoader(false, '');
      navigation.callback();
    } else {
      yield put(forgotPassFail());
      yield* hideLoader(false, '');
      // setTimeout(() => {
      //   alert(res.msg);
      // }, 400);
      showAlert(res.msg);
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    yield put(forgotPassFail());
    yield* hideLoader(false, '');
  }
}

function* onOtpVerification({data, navigation}) {
  yield* showLoader(false);
  try {
    var requestOptions = {
      method: 'POST',
      body: data,
      redirect: 'follow',
    };

    let res = yield fetch(BASE_URL + Config.verify_otp, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => console.error('error', error));

    if (res.status == 1) {
      // console.log('OTP res:: ', res);
      yield put(otpVerificationSuccess(res.data));
      yield* hideLoader(false, '');
      navigation.callback();
    } else {
      yield put(otpVerificationFail());
      yield* hideLoader(false, '');
      // setTimeout(() => {
      //   alert(res.msg);
      // }, 400);
      showAlert(res.msg);
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    yield put(otpVerificationFail());
    yield* hideLoader(false, '');
  }
}

function* onResetPassword({data, navigation}) {
  yield* showLoader(false);
  try {
    var requestOptions = {
      method: 'POST',
      body: data,
      redirect: 'follow',
    };

    let res = yield fetch(BASE_URL + Config.update_password, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => console.error('error', error));

    if (res.status == 1) {
      console.log('OTP res:: ', res);
      yield put(resetPasswordSuccess(res.data));
      yield* hideLoader(false, '');
      showAlert('Password Changed');
      navigation.callback();
    } else {
      yield put(resetPasswordFail());
      yield* hideLoader(false, '');
      setTimeout(() => {
        alert(res.msg);
      }, 400);
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    yield put(resetPasswordFail());
    yield* hideLoader(false, '');
  }
}

function* onContactSuport({data, navigation}) {
  yield* showLoader(false);
  try {
    var requestOptions = {
      method: 'POST',
      body: data,
      redirect: 'follow',
    };

    let res = yield fetch(BASE_URL + Config.contact_support, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => console.error('error', error));

    if (res.status == 1) {
      // console.log('contact_support res:: ', res);
      yield put(contactSupportSuccess(res));
      yield* hideLoader(false, '');
      navigation.navigation();
    } else {
      yield put(contactSupportFail());
      yield* hideLoader(false, '');
      setTimeout(() => {
        alert(res.msg);
      }, 400);
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    yield put(contactSupportFail());
    yield* hideLoader(false, '');
  }
}

const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    console.log('SIGN OUT WITH GOOGLE WORKING!!!!!!!!!!!!!');
    // this.setState({user: null}); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
};

function* sagaMobile() {
  yield takeLatest(LOGIN_REQUESTED, onLoginRequest);
  yield takeLatest(FORGOT_PASS_REQUESTED, onForgotPass);
  yield takeLatest(OTP_VERIFICATION_REQUESTED, onOtpVerification);
  yield takeLatest(RESET_PASSWORD_REQUESTED, onResetPassword);
  yield takeLatest(CONTACT_SUPPORT_REQUESTED, onContactSuport);
  yield takeLatest(LOGOUT_REQUESTED, onLogoutRequest);
}
export default sagaMobile;
