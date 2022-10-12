import {put} from 'redux-saga/effects';
import {Alert, ToastAndroid} from 'react-native';
import Config from '../constants/Config';

import {getConfiguration, setConfiguration} from '../utils/configuration';
import {hideLoading, showLoading} from '../common/CLoader/action';

export function* hideLoader(isError, errorMessage) {
  yield put(hideLoading(isError, errorMessage));
}
export function* showLoader(silentFetch) {
  if (!silentFetch) {
    yield put(showLoading());
  }
}
export const calcDistance = (x1, y1, x2, y2) => {
  const dx = Math.abs(x1 - x2);
  const dy = Math.abs(y1 - y2);
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};
export const calcCenter = (x1, y1, x2, y2) => {
  const middle = (p1, p2) => {
    return p1 > p2 ? p1 - (p1 - p2) / 2 : p2 - (p2 - p1) / 2;
  };
  return {
    x: middle(x1, x2),
    y: middle(y1, y2),
  };
};
export const maxOffset = (offset, windowDimension, imageDimension) => {
  const max = windowDimension - imageDimension;
  if (max >= 0) {
    return 0;
  }
  return offset < max ? max : offset;
};
export const calcOffsetByZoom = (
  viewWidth,
  viewHeight,
  imageWidth,
  imageHeight,
  zoom,
) => {
  const xDiff = imageWidth * zoom - viewWidth;
  const yDiff = imageHeight * zoom - viewHeight;
  return {
    left: -xDiff / 2,
    top: -yDiff / 2,
  };
};
// Added method to show an alert with message passed as argument
export function* showAlertWithDelay(msg) {
  setTimeout(() => {
    alert(msg);
  }, 600);
}
export const showAlert = msg => {
  setTimeout(() => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }, 100);
};
export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export const resetTo = (route, navigation) => {
  navigation.reset({
    routes: [{name: route}],
  });
  // const actionToDispatch = StackActions.reset({
  //   index: 0,
  //   actions: [NavigationActions.navigate({ routeName: route })],
  // });
  // navigation.dispatch(actionToDispatch);
};

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export function* SessionExpired() {
  let respons = yield new Promise(resolve => {
    setTimeout(() => {
      Alert.alert(
        'Alert',
        Config.authErrorMessage,
        [
          {
            text: 'Ok',
            onPress: () => {
              resolve();
            },
          },
        ],
        {cancelable: false},
      );
    }, 400);
  });

  setConfiguration('token', '');
  setConfiguration('user_id', '');
  setConfiguration('defaultPayment', '');
  // yield put(profileSuccess(null, false));
  console.log('Pressed');
}

export const showLogoutAlert = screen =>
  Alert.alert(
    'PaceApp',
    'Login session expired please logout and login again!',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Logout', onPress: () => screen()},
    ],
  );
