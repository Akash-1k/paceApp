import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';
import Config, {SUCCESS} from '../../constants/Config';
import {BASE_URL} from '../../env';
import {hideLoader, showLoader} from '../../utils/CommonFunctions';
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
  // console.log('sags:::: ', navigation);
  yield* showLoader(false);
  try {
    var requestOptions = {
      method: 'POST',
      body: data,
      redirect: 'follow',
    };

    let res = yield fetch(BASE_URL + Config.do_login, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => console.error('error', error));

    // console.log('resresresres', res);
    if (res.success == true) {
      // console.log('login res:: ', res);
      yield put(loginSuccess(res));
      yield* hideLoader(false, '');
      navigation.navigation();
    } else {
      yield put(loginFail());
      yield* hideLoader(false, '');
      // console.log(res);
      setTimeout(() => {
        alert(res.message);
      }, 400);
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    yield put(loginFail());
    yield* hideLoader(false, '');
  }
}

// MY CODE
function* onLogoutRequest({data, navigation}) {
  console.log('Logout request ::::', navigation);
  yield* showLoader(false);
  try {
    var requestOptions = {
      method: 'POST',
      body: data,
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
      setTimeout(() => {
        alert(res.msg);
      }, 400);
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
      setTimeout(() => {
        alert(res.msg);
      }, 400);
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
      // console.log('OTP res:: ', res);
      yield put(resetPasswordSuccess(res.data));
      yield* hideLoader(false, '');
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

function* sagaMobile() {
  yield takeLatest(LOGIN_REQUESTED, onLoginRequest);
  yield takeLatest(FORGOT_PASS_REQUESTED, onForgotPass);
  yield takeLatest(OTP_VERIFICATION_REQUESTED, onOtpVerification);
  yield takeLatest(RESET_PASSWORD_REQUESTED, onResetPassword);
  yield takeLatest(CONTACT_SUPPORT_REQUESTED, onContactSuport);
  yield takeLatest(LOGOUT_REQUESTED, onLogoutRequest);
}
export default sagaMobile;