import { GET_WORKOUT_LIST_FAIL, GET_WORKOUT_LIST_REQUESTED, GET_WORKOUT_LIST_SUCCESS, IS_STATUS_BAR, SET_EXERSISE_ID, SET_EXERSISE_PLAY_VIDEO, SET_WORKOUT_LIST_ITEM, SHOP_CATEGORIES_LIST_FAIL, SHOP_CATEGORIES_LIST_REQUESTED, SHOP_CATEGORIES_LIST_SUCCESS, WORKOUT_DETAILS_FAIL, WORKOUT_DETAILS_REQUESTED, WORKOUT_DETAILS_SUCCESS } from './types';

const INITIAL_STATE = {

  workoutList: [],
  workoutDetails: null,
  listItem: null,
  exersiseId: null,
  playVideoDetails: {},
  isStatusBar: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case GET_WORKOUT_LIST_REQUESTED:
      return {
        ...state,
      };

    case GET_WORKOUT_LIST_SUCCESS:
      return {
        ...state,
        workoutList: action.data,
      };

    case GET_WORKOUT_LIST_FAIL:
      return {
        ...state,
      };

    // set list item
    case SET_WORKOUT_LIST_ITEM:
      return {
        ...state,
        listItem: action.data,
      };

    case SET_EXERSISE_ID:
      return {
        ...state,
        exersiseId: action.data,
      };


    case WORKOUT_DETAILS_REQUESTED:
      return {
        ...state,
      };

    case WORKOUT_DETAILS_SUCCESS:
      return {
        ...state,
        workoutDetails: action.data,
      };

    case WORKOUT_DETAILS_FAIL:
      return {
        ...state,
      };

    case SET_EXERSISE_PLAY_VIDEO:
      return {
        ...state,
        playVideoDetails: action.data,
      };


    case IS_STATUS_BAR:
      return {
        ...state,
        isStatusBar: action.data,
      };


    default:
      return state;
  }
};
