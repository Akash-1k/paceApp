import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUESTED,
  ADD_TO_CART_SUCCESS,
  SET_PRODUCT_DETAILS_TO_ADD_IN_CART,
  SHOP_CATEGORIES_LIST_FAIL,
  SHOP_CATEGORIES_LIST_REQUESTED,
  SHOP_CATEGORIES_LIST_SUCCESS,
  GET_CART_REQUESTED,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
} from './types';

export const shopCategoryListRequest = data => ({
  type: SHOP_CATEGORIES_LIST_REQUESTED,
  data,
});

export const shopCategoryListSuccess = data => ({
  type: SHOP_CATEGORIES_LIST_SUCCESS,
  data,
});

export const shopCategoryListFail = () => ({
  type: SHOP_CATEGORIES_LIST_FAIL,
});

// ADD TO CART
export const addToCartRequest = data => ({
  type: ADD_TO_CART_REQUESTED,
  data,
});

export const addToCartSuccess = data => ({
  type: ADD_TO_CART_SUCCESS,
  data,
});

export const addToCartFail = () => ({
  type: ADD_TO_CART_FAIL,
});

// GET CART
export const getCartRequest = data => ({
  type: GET_CART_REQUESTED,
  data,
});

export const getCartSuccess = data => ({
  type: GET_CART_SUCCESS,
  data,
});

export const getCartFail = () => ({
  type: GET_CART_FAIL,
});

// PRODUCT DETAILS TO ADD IN CART

export const setProductDetailsToAddInCart = data => ({
  type: SET_PRODUCT_DETAILS_TO_ADD_IN_CART,
  data,
});
