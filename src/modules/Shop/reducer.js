import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUESTED,
  ADD_TO_CART_SUCCESS,
  GET_CART_FAIL,
  GET_CART_REQUESTED,
  GET_CART_SUCCESS,
  SET_PRODUCT_DETAILS_TO_ADD_IN_CART,
  SHOP_CATEGORIES_LIST_FAIL,
  SHOP_CATEGORIES_LIST_REQUESTED,
  SHOP_CATEGORIES_LIST_SUCCESS,
} from './types';

const INITIAL_STATE = {
  shopCategoryList: [],
  addToCartData: null,
  cartItemData: [],
  selectedProduct: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOP_CATEGORIES_LIST_REQUESTED:
      return {
        ...state,
      };

    case SHOP_CATEGORIES_LIST_SUCCESS:
      return {
        ...state,
        shopCategoryList: action.data,
      };

    case SHOP_CATEGORIES_LIST_FAIL:
      return {
        ...state,
      };

    // ADD TO CART

    case ADD_TO_CART_REQUESTED:
      return {
        ...state,
      };

    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        addToCartData: action.data,
      };

    case ADD_TO_CART_FAIL:
      return {
        ...state,
      };

    // GET CART
    case GET_CART_REQUESTED:
      return {
        ...state,
      };

    case GET_CART_SUCCESS:
      return {
        ...state,
        cartItemData: action.data,
      };

    case GET_CART_FAIL:
      return {
        ...state,
        cartItemData: [],
      };

    case SET_PRODUCT_DETAILS_TO_ADD_IN_CART:
      return {
        ...state,
        selectedProduct: action.data,
      };

    default:
      return state;
  }
};
