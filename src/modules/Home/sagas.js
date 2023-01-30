import {put, takeLatest} from 'redux-saga/effects';
import Config from '../../constants/Config';
import {
  hideLoader,
  showAlert,
  showLoader,
  showLogoutAlert,
} from '../../utils/CommonFunctions';
import {
  stepsFailed,
  stepsSuccess,
  getWaterGlassFail,
  getWaterGlassSuccess,
  getHomeSuccess,
  getHomeFail,
} from './actions';
import {
  GET_HOME_REQUESTED,
  GET_WATER_GLASS_REQUESTED,
  HIT_STEPS,
} from './types';

function* onSendSteps({data}) {
  // yield* showLoader(false);
  try {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + data.token);
    var formdata = new FormData();
    formdata.append('completed_steps', data.steps);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    // console.log("datadata:::",data);
    let res = yield fetch(
      Config.BASE_URL + Config.completed_steps,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => console.log('error Home SAGAS onSendSteps ', error));

    if (res.status == 'Token is Expired') {
      yield showLogoutAlert(data.logout);
      // yield* hideLoader(false, '');
      return;
    }

    if (res.status == 1) {
      yield put(stepsSuccess(res));
      // yield* hideLoader(false, '');
    } else {
      yield put(stepsFailed());
      // yield* hideLoader(false, '');
      // console.log('asaas', res);
      setTimeout(() => {
        // console.log('Home Saga onSendSteps :::::::::::', res.msg);
      }, 400);
    }
  } catch (error) {
    yield put(stepsFailed());
  }
}

function* onWaterGlass(action) {
  yield* showLoader(false);
  try {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + action.data);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    // console.log("datadata:::",data);
    let res = yield fetch(Config.BASE_URL + Config.water_glass, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => console.log('error', error));

    // if (res.status == 'Token is Expired') {
    //   yield showLogoutAlert(data.logout);
    //   // yield* hideLoader(false, '');
    //   return;
    // }

    if (res.status == 1) {
      let save = saveGlass(res.glass[0].default_glass, res.glass[0].fill_glass);
      // console.log(save);
      var data = {res, save};
      yield put(getWaterGlassSuccess(data));
      yield* hideLoader(false, '');
    } else {
      yield put(getWaterGlassFail());
      yield* hideLoader(false, '');
      console.log(res);
      setTimeout(() => {
        alert(res.msg);
      }, 400);
    }
  } catch (error) {
    yield put(getWaterGlassFail());
    yield* hideLoader(false, '');
  }
}

const saveGlass = (glass, fill_glass) => {
  let newData = [];
  for (let index = 1; index <= glass; index++) {
    if (fill_glass >= index) {
      newData.push({
        glass: index,
        isFilled: true,
      });
    } else {
      newData.push({
        glass: index,
        isFilled: false,
      });
    }
  }
  return newData;
};

function* onHome({data}) {
  yield* showLoader(false);
  try {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + data);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    let res = yield fetch(Config.BASE_URL + Config.home, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => console.log('error', error));

    // if (res.status == 'Token is Expired') {
    //   yield showLogoutAlert(data.logout);
    //   // yield* hideLoader(false, '');
    //   return;
    // }
    if (res.status == 0) {
      console.log('Token SAGA2 Home onHome', data);
      yield put(getHomeFail());
      yield* hideLoader(false, '');
      console.log(res);
      setTimeout(() => {
        // alert(res.msg);
      }, 400);
    } else {
      yield put(getHomeSuccess(res));
      yield* hideLoader(false, '');
    }
  } catch (error) {
    yield put(getHomeFail());
    yield* hideLoader(false, '');
  }
}

function* sagaHome() {
  yield takeLatest(HIT_STEPS, onSendSteps);
  yield takeLatest(GET_WATER_GLASS_REQUESTED, onWaterGlass);
  yield takeLatest(GET_HOME_REQUESTED, onHome);
}
export default sagaHome;
