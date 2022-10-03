import { put, takeLatest } from 'redux-saga/effects';
import Config from '../../constants/Config';
import { BASE_URL } from '../../env';
import { hideLoader, showLoader } from '../../utils/CommonFunctions';
import { signupFail, signupSuccess } from './actions';
import { SIGNUP_REQUESTED } from './types';


function* onSignUp({ data, navigation }) {
  yield* showLoader(false);
  try {

    let res = yield fetch(BASE_URL + Config.do_signup, data)
      .then(response => response.text())
      .then(result => {
        console.log('result do_signup', result);
        return result
      })
      .catch(error => console.log('error', error));

    console.log('signup res:: ', res);

    if (res.status == 1) {
      console.log('signup res:: ', res.data);
      yield put(signupSuccess(res.data))
      yield* hideLoader(false, '');
      navigation.navigation()
    } else {
      yield put(signupFail());
      yield* hideLoader(false, '');
      console.log(res);
      setTimeout(() => { alert(res.msg) }, 400);
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    yield put(signupFail());
    yield* hideLoader(false, '');
  }
}


function* sagaMobile() {
  yield takeLatest(SIGNUP_REQUESTED, onSignUp);
}
export default sagaMobile;
