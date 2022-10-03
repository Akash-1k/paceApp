import { SHOW_LOADING_VIEW, HIDE_LOADING_VIEW, HIDE_ERROR_MODAL } from './type';

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
export const hideErrorModal = () => ({
  type: HIDE_ERROR_MODAL,
});
