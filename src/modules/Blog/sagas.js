import { put, takeLatest } from 'redux-saga/effects';
import Config from '../../constants/Config';
import { BASE_URL } from '../../env';
import { hideLoader, showLoader, showLogoutAlert } from '../../utils/CommonFunctions';
import { signupFail, signupSuccess, viewAllBlogFail, viewAllBlogSuccess } from './actions';
import { SIGNUP_REQUESTED, VIEW_ALL_BLOG_REQUESTED } from './types';


function* onBlogList({ data }) {
  yield* showLoader(false);
  try {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + data.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let res = yield fetch(Config.BASE_URL + Config.blog_details, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result
      })
      .catch(error => console.log('error', error));

    if (res.status == 'Token is Expired') {
      yield showLogoutAlert(data.logout)
      yield* hideLoader(false, '');
      return
    }

    if (res.status == 1) {
    console.log('res225', res);

      yield put(viewAllBlogSuccess(res))
      yield* hideLoader(false, '');
    } else {
      yield put(viewAllBlogFail());
      yield* hideLoader(false, '');
      // console.log(res);
      setTimeout(() => { alert(res.msg) }, 400);
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    yield put(viewAllBlogFail());
    yield* hideLoader(false, '');
  }
}


function* sagaBlog() {
  yield takeLatest(VIEW_ALL_BLOG_REQUESTED, onBlogList);
}
export default sagaBlog;
