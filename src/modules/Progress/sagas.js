import {put, takeLatest} from 'redux-saga/effects';
import Config from '../../constants/Config';
import {BASE_URL} from '../../env';
import {hideLoader, showLoader} from '../../utils/CommonFunctions';
import {myProgressFail, myProgressSuccess} from './actions';
import {MY_PROGRESS_REQUESTED} from './types';

function* onMyProgress({data}) {
  yield* showLoader(false);
  console.log(data.params);
  try {
    let res = yield fetch(
      BASE_URL + Config.progress + data.params,
      data.requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log('Progress saga onMyProgress', result);
        return result;
      })
      .catch(error => {
        console.log('error myProgress SAGAS onMyProgress', error);
      });

    if (res.status) {
      var save = null;
      var data1 = {};
      if (res.week) {
        save = saveWeekProgress(res.week);
      }
      data1 = {res: res, save: save};
      yield put(myProgressSuccess(data1));

      yield* hideLoader(false, '');
      //   navigation.navigation(); // from back
    } else {
      yield put(myProgressFail());
      yield* hideLoader(false, '');
      // console.log(res);
      setTimeout(() => {
        alert(res.msg);
      }, 400);
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    yield put(myProgressFail());
    yield* hideLoader(false, '');
  }
}

const saveWeekProgress = week => {
  let outArr = [];
  var weekArr = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  for (let [key, value] of Object.entries(week)) {
    let inArr = [];
    let outObj = {};
    for (let [keyIn, valueIn] of Object.entries(value)) {
      let inObj = {};
      // inObj['value'] = 10;
      inObj['value'] = valueIn;
      inObj['color'] = '#F00';
      inObj['key'] = keyIn;
      inArr.push(inObj);
    }
    outObj['stacks'] = inArr;
    outObj['label'] = weekArr[new Date(key).getDay()];
    outArr.push(outObj);
  }
  return outArr;
};

function* sagaMobile() {
  yield takeLatest(MY_PROGRESS_REQUESTED, onMyProgress);
}
export default sagaMobile;
