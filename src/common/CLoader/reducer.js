import {
  SHOW_LOADING_VIEW,
  HIDE_LOADING_VIEW,
  HIDE_ERROR_MODAL,
  SHOW_TRANSPARENT_LOADING_VIEW,
  HIDE_TRANSPARENT_LOADING_VIEW,
} from './type';

const INITIAL_STATE = {
  loading: false,
  isError: false,
  errorMessage: '',
  transparent: true,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_LOADING_VIEW:
      return {
        ...state,
        loading: true,
        isError: action.isError,
        errorMessage: action.errorMessage,
        transparent: true,
      };
    case HIDE_LOADING_VIEW:
      return {
        ...state,
        loading: false,
        errorMessage: action.errorMessage,
        isError: action.isError,
        transparent: true,
      };
    case SHOW_TRANSPARENT_LOADING_VIEW:
      return {
        ...state,
        loading: true,
        isError: action.isError,
        errorMessage: action.errorMessage,
        transparent: false,
      };
    case HIDE_TRANSPARENT_LOADING_VIEW:
      return {
        ...state,
        loading: false,
        errorMessage: action.errorMessage,
        isError: action.isError,
        transparent: false,
      };

    case HIDE_ERROR_MODAL:
      return {
        ...state,
        isError: false,
        errorMessage: '',
      };
    default:
      return state;
  }
};
