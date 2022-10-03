import { put, takeLatest } from 'redux-saga/effects';
import Config from '../../constants/Config';
import { hideLoader, showLoader, showLogoutAlert } from '../../utils/CommonFunctions';
import { workoutDetailsFail, workoutDetailsSuccess, workoutListFail, workoutListSuccess } from './actions';
import { GET_WORKOUT_LIST_REQUESTED, WORKOUT_DETAILS_REQUESTED } from './types';


function* onGetWorkout({ data }) {
  yield* showLoader(false);
  try {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + data.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let res = yield fetch(Config.BASE_URL + Config.workouts, requestOptions)
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
      yield put(workoutListSuccess(res.data))
      yield* hideLoader(false, '');
    } else {
      yield put(workoutListFail());
      yield* hideLoader(false, '');
      // console.log(res);
      setTimeout(() => { alert(res.msg) }, 400);
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    yield put(workoutListFail());
    yield* hideLoader(false, '');
  }
}



function* onWorkoutDetails({ data }) {
  yield* showLoader(false);
  try {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + data.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let res = yield fetch(Config.BASE_URL + Config.single_workout_detail + '?id=' + data.id, requestOptions)
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
      yield put(workoutDetailsSuccess(res))
      yield* hideLoader(false, '');

    } else {
      yield put(workoutDetailsFail());
      yield* hideLoader(false, '');
      // console.log(res);
      setTimeout(() => { alert(res.msg) }, 400);
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    yield put(workoutDetailsFail());
    yield* hideLoader(false, '');
  }
}



function* sagaWorkout() {
  yield takeLatest(GET_WORKOUT_LIST_REQUESTED, onGetWorkout);
  yield takeLatest(WORKOUT_DETAILS_REQUESTED, onWorkoutDetails);

}
export default sagaWorkout;
