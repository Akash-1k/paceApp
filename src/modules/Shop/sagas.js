import {put, takeLatest} from 'redux-saga/effects';
import Config from '../../constants/Config';
import {
  hideLoader,
  showLoader,
  showLogoutAlert,
} from '../../utils/CommonFunctions';
import {
  addToCartFail,
  addToCartSuccess,
  getCartFail,
  getCartSuccess,
  shopCategoryListFail,
  shopCategoryListSuccess,
} from './actions';
import {
  ADD_TO_CART_REQUESTED,
  GET_CART_REQUESTED,
  SHOP_CATEGORIES_LIST_REQUESTED,
} from './types';

function* onShopCategoryList({data}) {
  // yield* showLoader(false);
  try {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + data.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    let res = yield fetch(
      Config.BASE_URL + Config.shop_category,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        return result;
      })
      .catch(error => console.log('error', error));

    if (res.status == 'Token is Expired') {
      yield showLogoutAlert(data.logout);
      yield* hideLoader(false, '');
      return;
    }

    if (res.status == 1) {
      yield put(shopCategoryListSuccess(res.data));
      yield* hideLoader(false, '');
    } else {
      yield put(shopCategoryListFail());
      yield* hideLoader(false, '');
      // console.log(res);
      setTimeout(() => {
        alert(res.msg);
      }, 400);
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    yield put(shopCategoryListFail());
    yield* hideLoader(false, '');
  }
}

function* onAddToCart({data}) {
  yield* showLoader(false);
  // console.log('dataaa :::::::::::', data);
  try {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + data.token);
    // console.log('SHOP SAGA ADD TO CART ::::::::::::', data);
    var formdata = new FormData();
    formdata.append('product_id', data.product_id);
    formdata.append('size_variation_id', data.size_variation_id);
    formdata.append('color_variation_id', data.color_variation_id);
    formdata.append('quantity', data.quantity);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    let res = yield fetch(Config.BASE_URL + Config.insert_cart, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(error => console.log('error', error));

    // console.log('resresresLL:::', res);
    if (res.status == 'Token is Expired') {
      yield showLogoutAlert(data.logout);
      yield* hideLoader(false, '');
      return;
    }

    if (res.status == 1) {
      console.log('res.status', res);
      yield put(addToCartSuccess(res.data));
      onCart(data.token);
      yield* hideLoader(false, '');
      // data.callBack();
    } else {
      yield put(addToCartFail());
      alert('Add to cart Fail');
      yield* hideLoader(false, '');
      // console.log(res);
      setTimeout(() => {
        alert(res.msg);
      }, 400);
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    yield put(addToCartFail());
    alert('Add to cart Fail');
    yield* hideLoader(false, '');
  }
}

function* onCart(data) {
  yield* showLoader(false);
  console.log('dataaa :::::::::::', data.data);
  try {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + data.data);
    // console.log('SHOP SAGA ADD TO CART ::::::::::::', data);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    let res = yield fetch(Config.BASE_URL + Config.cart, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('From Config.cart', result);
        return result;
      })
      .catch(error => console.log('error', error));

    // console.log('on cart get saga Shop:::', res);
    if (res.status == 'Token is Expired') {
      yield showLogoutAlert(data.logout);
      yield* hideLoader(false, '');
      return;
    }

    if (res.status == 1) {
      yield put(getCartSuccess(res.data));
      yield* hideLoader(false, '');
      // data.callBack();
    }
    if (res.status == 0) {
      yield put(getCartFail());
      // alert('Fail to get Cart');
      yield* hideLoader(false, '');
      // console.log(res);
      // setTimeout(() => {
      //   alert(res.msg);
      // }, 400);
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    yield put(getCartFail());
    alert('Fail to get Cart  ------Catch');
    yield* hideLoader(false, '');
  }
}

function* sagaCategory() {
  yield takeLatest(SHOP_CATEGORIES_LIST_REQUESTED, onShopCategoryList);
  yield takeLatest(ADD_TO_CART_REQUESTED, onAddToCart);
  yield takeLatest(GET_CART_REQUESTED, onCart);
}
export default sagaCategory;
