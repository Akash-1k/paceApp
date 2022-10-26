import {put, takeLatest} from 'redux-saga/effects';
import Config from '../../constants/Config';
import {
  hideLoader,
  showLoader,
  showLogoutAlert,
  showAlert,
} from '../../utils/CommonFunctions';
import {
  accountFail,
  accountSuccess,
  getAddressListFail,
  getAddressListSuccess,
  getCardListFail,
  getCardListSuccess,
  personalDataFail,
  personalDataSuccess,
  userDetailsFail,
  userDetailsSuccess,
} from './actions';
import {
  ACCOUNT_REQUESTED,
  GET_ADDRESS_LIST_REQUESTED,
  GET_CARD_LIST_REQUESTED,
  PERSONAL_DATA_REQUESTED,
  USER_DETAILS_REQUESTED,
} from './types';

function* onUserDetails({data}) {
  // console.log('onUserDeatils::::::::::::::', data);
  yield* showLoader(false);

  try {
    let res = yield fetch(
      Config.BASE_URL + Config.user_details + '?token=' + data.token,
    )
      .then(response => response.json())
      .then(result => {
        console.log('onUserDetails SAGA PROFILE :::', result);
        return result;
      })
      .catch(error => console.log('error', error));

    if (res.status == 'Token is Expired') {
      yield showLogoutAlert(data.logout);

      yield* hideLoader(false, '');
      return;
    }
    if (res.user.status == 1) {
      console.log('userDetailsSuccess SAGA');
      yield put(userDetailsSuccess(res));
      yield* hideLoader(false, '');
      // navigation.navigation()
    } else {
      yield put(userDetailsFail());
      yield* hideLoader(false, '');
      // console.log(res);
      setTimeout(() => {
        alert('res.msg 1');
      }, 400);
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    yield put(userDetailsFail());
    yield* hideLoader(false, '');
  }
}

function* onAccount({data}) {
  yield* showLoader(false);
  console.log('onAccount');
  try {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + data.token);

    var formdata = new FormData();
    formdata.append('email', data.email);
    formdata.append('first_name', data.first_name);
    formdata.append('password', data.password);
    formdata.append('old_password', data.old_password);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    let res = yield fetch(Config.BASE_URL + Config.account, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('Profile Sagas onAccount :::::::::: ', result);
        return result;
      })
      .catch(error => console.log('error', error));

    if (res.status == 'Token is Expired') {
      yield showLogoutAlert(data.logout);
      yield* hideLoader(false, '');
      return;
    }
    if (res.status == 1) {
      showAlert(res.msg);
      yield put(accountSuccess(res));
      data.callback();
      // yield* hideLoader(false, '');
    } else {
      yield put(accountFail());
      yield* hideLoader(false, '');
      // yield put(accountSuccess(res));
      // data.callback();
      showAlert(res.msg);
      console.log(res);
      // setTimeout(() => { alert(res.msg) }, 400);
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    yield put(accountFail());
    yield* hideLoader(false, '');
  }
}

function* onPersonalData({data}) {
  // alert(data);
  yield* showLoader(false);
  try {
    let res = yield fetch(
      Config.BASE_URL + Config.user_details + '?token=' + data,
    )
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => console.log('error', error));

    if (res.status == 'Token is Expired') {
      yield showLogoutAlert(data.logout);

      yield* hideLoader(false, '');
      return;
    }

    if (res.user.status == 1) {
      console.log('user Data 1 :::::::::', res);
      yield put(userDetailsSuccess(res));
      yield* hideLoader(false, '');
      // navigation.navigation()
    } else {
      yield put(userDetailsFail());
      yield* hideLoader(false, '');
      // console.log(res);
      setTimeout(() => {
        alert('res.msg 1');
      }, 400);
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    yield put(userDetailsFail());
    yield* hideLoader(false, '');
  }
}

function* onAddressList({data}) {
  yield* showLoader(false);
  try {
    let res = yield fetch(
      Config.BASE_URL + Config.address_lists + '?token=' + data,
    )
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => console.log('error', error));

    if (res.status == 'Token is Expired') {
      yield showLogoutAlert(data.logout);
      yield* hideLoader(false, '');
      return;
    }

    if (res.status == 1) {
      yield put(getAddressListSuccess(res.data));
      yield* hideLoader(false, '');
      console.log('rrrr', res);
      // navigation.navigation()
    } else if (res.status == 0) {
      yield put(getAddressListFail());
      yield put(getAddressListSuccess([]));
      yield* hideLoader(false, '');
      console.log(res);
      // setTimeout(() => { alert(res.msg) }, 400);
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    yield put(getAddressListFail());
    yield* hideLoader(false, '');
  }
}

function* onGetCardList({data}) {
  yield* showLoader(false);
  try {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + data);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    let res = yield fetch(
      Config.BASE_URL + Config.all_payment_cards,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => console.log('error', error));

    if (res.status == 'Token is Expired') {
      yield showLogoutAlert(data.logout);
      yield* hideLoader(false, '');
      return;
    }

    if (res.status == 1) {
      yield put(getCardListSuccess(res.data));
      yield* hideLoader(false, '');
    } else {
      yield put(getCardListFail());
      yield* hideLoader(false, '');
      // console.log(res);
      setTimeout(() => {
        alert('res.msg 3');
      }, 400);
    }
  } catch (error) {
    yield put(getCardListFail());
    yield* hideLoader(false, '');
  }
}

function* sagaMobile() {
  yield takeLatest(USER_DETAILS_REQUESTED, onUserDetails);
  yield takeLatest(ACCOUNT_REQUESTED, onAccount);
  yield takeLatest(PERSONAL_DATA_REQUESTED, onPersonalData);
  yield takeLatest(GET_ADDRESS_LIST_REQUESTED, onAddressList);
  yield takeLatest(GET_CARD_LIST_REQUESTED, onGetCardList);
}
export default sagaMobile;
