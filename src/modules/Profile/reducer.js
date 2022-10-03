import { ACCOUNT_FAIL, ACCOUNT_REQUESTED, ACCOUNT_SUCCESS, GET_ADDRESS_LIST_FAIL, GET_ADDRESS_LIST_REQUESTED, GET_ADDRESS_LIST_SUCCESS, GET_CARD_LIST_FAIL, GET_CARD_LIST_REQUESTED, GET_CARD_LIST_SUCCESS, PERSONAL_DATA_FAIL, PERSONAL_DATA_REQUESTED, PERSONAL_DATA_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUESTED, USER_DETAILS_SUCCESS } from './types';

const INITIAL_STATE = {

  userDetails: [],
  accountDeta: [],
  personalData: null,
  addressList: [],
  cardList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case USER_DETAILS_REQUESTED:
      return {
        ...state,
      };

    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.data,
      };

    case USER_DETAILS_FAIL:
      return {
        ...state,
      };

    // ACCOUNT
    case ACCOUNT_REQUESTED:
      return {
        ...state,
      };

    case ACCOUNT_SUCCESS:
      return {
        ...state,
        accountDeta: action.data,
      };

    case ACCOUNT_FAIL:
      return {
        ...state,
      };



    // ACCOUNT
    case PERSONAL_DATA_REQUESTED:
      return {
        ...state,
      };

    case PERSONAL_DATA_SUCCESS:
      return {
        ...state,
        personalData: action.data,
      };

    case PERSONAL_DATA_FAIL:
      return {
        ...state,
      };

    // GET ADDRESS LIST
    case GET_ADDRESS_LIST_REQUESTED:
      return {
        ...state,
      };

    case GET_ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        addressList: action.data,
      };

    case GET_ADDRESS_LIST_FAIL:
      return {
        ...state,
      };

    // GET CARD LIST
    case GET_CARD_LIST_REQUESTED:
      return {
        ...state,
      };

    case GET_CARD_LIST_SUCCESS:
      return {
        ...state,
        cardList: action.data,
      };

    case GET_CARD_LIST_FAIL:
      return {
        ...state,
      };



    default:
      return state;
  }
};
