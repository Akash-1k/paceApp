import {
  HIT_STEPS,
  HIT_STEPS_FAILEED,
  HIT_STEPS_SUCCESS,
  SET_STEPS,
  GET_WATER_GLASS_FAIL,
  GET_WATER_GLASS_REQUESTED,
  GET_WATER_GLASS_SUCCESS,
  GET_HOME_REQUESTED,
  GET_HOME_SUCCESS,
  GET_HOME_FAIL,
} from './types';

export const stepsRequest = data => ({
  type: HIT_STEPS,
  data,
});

export const stepsSuccess = data => ({
  type: HIT_STEPS_SUCCESS,
  data,
});

export const stepsFailed = () => ({
  type: HIT_STEPS_FAILEED,
});

export const setSteps = data => ({
  type: SET_STEPS,
  data,
});

export const getWaterGlassRequested = data => ({
  type: GET_WATER_GLASS_REQUESTED,
  data,
});

export const getWaterGlassSuccess = (data, saveGlass) => ({
  type: GET_WATER_GLASS_SUCCESS,
  data,
  saveGlass,
});
export const getWaterGlassFail = () => ({
  type: GET_WATER_GLASS_FAIL,
});

export const getHomeRequested = data => ({
  type: GET_HOME_REQUESTED,
  data,
});

export const getHomeSuccess = data => ({
  type: GET_HOME_SUCCESS,
  data,
});
export const getHomeFail = () => ({
  type: GET_HOME_FAIL,
});
