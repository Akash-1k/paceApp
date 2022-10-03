import {
  ACCOUNT_FAIL,
  ACCOUNT_REQUESTED,
  ACCOUNT_SUCCESS,
  GET_ADDRESS_LIST_FAIL,
  GET_ADDRESS_LIST_REQUESTED,
  GET_ADDRESS_LIST_SUCCESS,
  GET_CARD_LIST_FAIL,
  GET_CARD_LIST_REQUESTED,
  GET_CARD_LIST_SUCCESS,
  PERSONAL_DATA_FAIL,
  PERSONAL_DATA_REQUESTED,
  PERSONAL_DATA_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUESTED,
  USER_DETAILS_SUCCESS,
} from './types';

export const userDetailsRequest = data => ({
  type: USER_DETAILS_REQUESTED,
  data,
});

export const userDetailsSuccess = data => ({
  type: USER_DETAILS_SUCCESS,
  data,
});

export const userDetailsFail = () => ({
  type: USER_DETAILS_FAIL,
});

// ACCOUNT
export const accountRequest = data => ({
  type: ACCOUNT_REQUESTED,
  data,
});

export const accountSuccess = data => ({
  type: ACCOUNT_SUCCESS,
  data,
});

export const accountFail = () => ({
  type: ACCOUNT_FAIL,
});

// PERSONAL DATA
export const personalDataRequest = data => ({
  type: PERSONAL_DATA_REQUESTED,
  data,
});

export const personalDataSuccess = data => ({
  type: PERSONAL_DATA_SUCCESS,
  data,
});

export const personalDataFail = () => ({
  type: PERSONAL_DATA_FAIL,
});

// GET ADDRESS LIST
export const getAddressListRequest = data => ({
  type: GET_ADDRESS_LIST_REQUESTED,
  data,
});

export const getAddressListSuccess = data => ({
  type: GET_ADDRESS_LIST_SUCCESS,
  data,
});

export const getAddressListFail = () => ({
  type: GET_ADDRESS_LIST_FAIL,
});

// GET CARD LIST
export const getCardListRequest = data => ({
  type: GET_CARD_LIST_REQUESTED,
  data,
});

export const getCardListSuccess = data => ({
  type: GET_CARD_LIST_SUCCESS,
  data,
});

export const getCardListFail = () => ({
  type: GET_CARD_LIST_FAIL,
});
