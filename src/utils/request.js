//import lStorage from 'localforage';
import axios from 'axios';
//import Global from '../common/Global';

var get = async function(url) {
  // url = Global.server + url;
  return await axios
    .get(url)
    .then(
      await function(response) {
        return response.data;
      },
    )
    .catch(
      await function(er) {
        console.log(er);
        return [er];
      },
    );
};

var post = async function(url, data) {
  //url = Global.server + url;
  return await axios
    .post(url, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(
      await function(response) {
        return response.data;
      },
    )
    .catch(
      await function(er) {
        console.log(er);
        return [er];
      },
    );
};

var authorizedPost = async function(url, data) {
  //url = Global.server + url;
  // var token = await new Promise(function(resolve, reject) {
  //   lStorage.getItem('data', function(err, value) {
  //     if (value) resolve(value.resData);
  //     else resolve('');
  //   });
  // });
  var token = '';
  return await axios
    .post(url, data, {
      headers: {
        token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(
      await function(response) {
        return response.data;
      },
    )
    .catch(
      await function(er) {
        console.log(er);
        return {statusCode: 100, er};
      },
    );
};

export default {
  get,
  authorizedPost,
  post,
};
