import {
  MY_PROGRESS_FAIL,
  MY_PROGRESS_REQUESTED,
  MY_PROGRESS_SUCCESS,
} from './types';

const INITIAL_STATE = {
  myProgressData: null,
  myPercentageData: null,
  weekProgressData: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MY_PROGRESS_REQUESTED:
      return {
        ...state,
      };

    case MY_PROGRESS_SUCCESS:
      return {
        ...state,
        myProgressData: action.data.res.progress,
        myPercentageData: action.data.res.percentage,
        weekProgressData: action.data.save ? action.data.save : null,
      };

    case MY_PROGRESS_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};
