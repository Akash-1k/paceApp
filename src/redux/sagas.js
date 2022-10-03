import { all } from 'redux-saga/effects';
import sagaSignup from './../modules/Signup/sagas';
import loginSaga from './../modules/Login/sagas';
import profileSaga from './../modules/Profile/sagas';
import sagaBlog from '../modules/Blog/sagas';
import sagaShop from '../modules/Shop/sagas';
import sagaWorkout from '../modules/Workout/sagas';
import sagaHome from '../modules/Home/sagas';






export default function* rootSaga() {
  yield all([
    loginSaga(),
    sagaSignup(),
    profileSaga(),
    sagaBlog(),
    sagaShop(),
    sagaWorkout(),
    sagaHome()
  ]);
}
