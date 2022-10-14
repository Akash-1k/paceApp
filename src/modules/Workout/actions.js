import {
  GET_WORKOUT_LIST_FAIL,
  GET_WORKOUT_LIST_REQUESTED,
  GET_WORKOUT_LIST_SUCCESS,
  IS_STATUS_BAR,
  SET_EXERSISE_ID,
  SET_EXERSISE_PLAY_VIDEO,
  SET_WORKOUT_LIST_ITEM,
  SET_NEXT_WORKOUT_DETAILS,
  WORKOUT_DETAILS_FAIL,
  WORKOUT_DETAILS_REQUESTED,
  WORKOUT_DETAILS_SUCCESS,
  START_WORKOUT_REQUESTED,
  START_WORKOUT_SUCCESS,
  START_WORKOUT_FAIL,
} from './types';

export const workoutListRequest = data => ({
  type: GET_WORKOUT_LIST_REQUESTED,
  data,
});

export const workoutListSuccess = data => ({
  type: GET_WORKOUT_LIST_SUCCESS,
  data,
});

export const workoutListFail = () => ({
  type: GET_WORKOUT_LIST_FAIL,
});

// WORKOUT DETAILS
export const workoutDetailsRequest = data => ({
  type: WORKOUT_DETAILS_REQUESTED,
  data,
});

export const workoutDetailsSuccess = data => ({
  type: WORKOUT_DETAILS_SUCCESS,
  data,
});

export const workoutDetailsFail = () => ({
  type: WORKOUT_DETAILS_FAIL,
});

// START WORKOUT DETAILS
export const startWorkoutRequest = data => ({
  type: START_WORKOUT_REQUESTED,
  data,
});

export const startWorkoutSuccess = data => ({
  type: START_WORKOUT_SUCCESS,
  data,
});

export const startWorkoutFail = () => ({
  type: START_WORKOUT_FAIL,
});

// SET VALUES
export const setWorkoutListItem = data => ({
  type: SET_WORKOUT_LIST_ITEM,
  data,
});

export const setExerciseID = data => ({
  type: SET_EXERSISE_ID,
  data,
});

export const setPlayVideoDetails = data => ({
  type: SET_EXERSISE_PLAY_VIDEO,
  data,
});

export const setIsStatusBar = data => ({
  type: IS_STATUS_BAR,
  data,
});

export const setNextWorkoutDetails = data => ({
  type: SET_NEXT_WORKOUT_DETAILS,
  data,
});
