import {
  MY_PROGRESS_FAIL,
  MY_PROGRESS_SUCCESS,
  MY_PROGRESS_REQUESTED,
} from './types';

export const myProgressRequest = (data, navigation) => ({
  type: MY_PROGRESS_REQUESTED,
  data,
  navigation,
});

export const myProgressSuccess = data => ({
  type: MY_PROGRESS_SUCCESS,
  data,
});

export const myProgressFail = () => ({
  type: MY_PROGRESS_FAIL,
});
