import {
  SHOW_LOADING_VIEW,
  HIDE_LOADING_VIEW,
  HIDE_ERROR_MODAL,
  SHOW_TRANSPARENT_LOADING_VIEW,
  HIDE_TRANSPARENT_LOADING_VIEW,
} from './type';

export const showLoading = (isError, errorMessage) => ({
  type: SHOW_LOADING_VIEW,
  isError,
  errorMessage,
});
export const hideLoading = (isError, errorMessage) => ({
  type: HIDE_LOADING_VIEW,
  isError,
  errorMessage,
});
export const showTransparentLoading = (isError, errorMessage) => ({
  type: SHOW_TRANSPARENT_LOADING_VIEW,
  isError,
  errorMessage,
});
export const hideTransparentLoading = (isError, errorMessage) => ({
  type: HIDE_TRANSPARENT_LOADING_VIEW,
  isError,
  errorMessage,
});
export const hideErrorModal = () => ({
  type: HIDE_ERROR_MODAL,
});
