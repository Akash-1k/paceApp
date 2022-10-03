import { getConfiguration } from '../utils/configuration';
import { getAuthenticationToken } from '../utils/authentication';
import Config from '../constants/Config';
import Axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';
import strings from '../constants/languagesString';

export function get(path) {
  return sendRequestAPI(Config.apiTypeGet, path, null);
}

export function postAPI(path, body) {
  return sendRequestAPI(Config.apiTypePost, path, body);
}

async function sendRequestAPI(method, path, body) {
  try {
    const endpoint = url(path);
    // const token = await getAuthenticationToken();
    const headers = getRequestHeaders(body);

    const options = {
      url: endpoint,
      method,
      headers,
      responseType: Config.responseType,
      data: body,
      timeout: 60000,
    };

 
    const isNetConnected = await NetInfo.fetch().then((state) => {
      if (state.isConnected == false) {
        return false;
      } else {
        return true;
      }
    });
    if (isNetConnected) {
      const response = await Axios(options);
      // console.log('response', response);
      return response;
    } else {
      Alert.alert(strings.noInternet);
    }
  } catch (e) {
    console.log('ddddd', e);
    throw new Error(e);
  }
}

export function url(path) {
  const apiRoot = getConfiguration('API_ROOT');
  return apiRoot + path;
  //return path.indexOf('/') === 0 ? apiRoot + path : apiRoot + '/' + path;
}

function getRequestHeaders(body) {
  const headers = body
    ? { 'Content-Type': 'application/json', Accept: 'application/json' }
    : { 'Content-Type': 'application/json', Accept: 'application/json' };

  const acces_token = getConfiguration('token');
  const customerid = getConfiguration('user_id');

  if (acces_token.length > 0) {
    return { ...headers, token: acces_token, customerid: customerid };
  }

  return headers;
}
