import {
  GET_HOME_FAIL,
  GET_HOME_REQUESTED,
  GET_HOME_SUCCESS,
  GET_WATER_GLASS_FAIL,
  GET_WATER_GLASS_REQUESTED,
  GET_WATER_GLASS_SUCCESS,
  HIT_STEPS,
  HIT_STEPS_FAILEED,
  HIT_STEPS_SUCCESS,
  SET_STEPS,
} from './types';

const INITIAL_STATE = {
  sendStepsSuccess: {},
  steps: 0,
  waterGlassInfo: {},
  saveGlass: [],
  homeData: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HIT_STEPS:
      return {
        ...state,
      };

    case HIT_STEPS_SUCCESS:
      return {
        ...state,
        sendStepsSuccess: action.data,
      };

    case HIT_STEPS_FAILEED:
      return {
        ...state,
      };

    // STEPS
    case SET_STEPS:
      return {
        ...state,
        steps: state.steps + 1,
      };

    // WATER GLASS
    case GET_WATER_GLASS_REQUESTED:
      return {
        ...state,
      };
    case GET_WATER_GLASS_SUCCESS:
      return {
        ...state,
        waterGlassInfo: action.data,
        saveGlass: action.saveGlass,
      };

    case GET_WATER_GLASS_FAIL:
      return {
        ...state,
      };

    case GET_HOME_REQUESTED:
      return {
        ...state,
      };
    case GET_HOME_SUCCESS:
      return {
        ...state,
        homeData: action.data,
      };

    case GET_HOME_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};
