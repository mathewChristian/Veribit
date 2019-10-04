// @flow

import { set, isEmpty} from 'lodash';
import { apiEndpoint } from './constants';

export async function KycService({ api, third_party, method, params }) {
  const headers = {};

  let path = `${apiEndpoint}${api}`;

  if (third_party) {
    path = api;
  }

  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'application/json');
  //set(headers, 'Access-Control-Expose-Headers', 'authorization');

  const reqBody = {
    method,
    headers,
  };

  if (!isEmpty(params)) {
    reqBody.body = JSON.stringify(params);
  }

  return fetch(path, reqBody)
    .then(response => {

      return response.json();
    })
    .then((data) => {
      if (third_party) {
        return {
          result: 'ok',
          data
        };
      }
      return data;
    })
    .catch((error) => {
      return {
        result: 'error',
        message: 'Please check your internet connection!'
      };
    });
}

export async function ChainMediaFundWallet({ api, third_party, method, params }) {
  const headers = {};

  let path = `${api}`;

  if (third_party) {
    path = api;
  }

  set(headers, 'api_key', '5eTuVfKYpWiaRWaEBN5NF1VPKf9Tvm2HBXh9mmigjNG2iC94ZCnut1SMb3sNV4hwV4');
  set(headers, 'Content-Type', 'application/json');
  //set(headers, 'Access-Control-Expose-Headers', 'authorization');

  const reqBody = {
    method,
    headers,
  };

  if (!isEmpty(params)) {
    reqBody.body = JSON.stringify(params);
  }

  return fetch(path, reqBody)
  .then(response => {
    return response.json();
  })
  .then((data) => {
    if (third_party) {
      return {
        result: 'ok',
        data
      };
    }
    return data;
  })
  .catch((error) => {
    return {
      result: 'error',
      message: 'Please check your internet connection!'
    };
  });
}

export async function PrepareUTXOs({ api, third_party, method, params }) {
  const headers = {};

  let path = `${api}`;

  if (third_party) {
    path = api;
  }

  set(headers, 'api_key', '22qtEpsphEv2ZtP8JkBiKD65bLQ26PxyJ66obK42uCGeb3b8MetH1bK5n4xEF3yxQ4');
  set(headers, 'Content-Type', 'application/json');
  //set(headers, 'Access-Control-Expose-Headers', 'authorization');

  const reqBody = {
    method,
    headers,
  };

  if (!isEmpty(params)) {
    reqBody.body = JSON.stringify(params);
  }

  return fetch(path, reqBody)
  .then(response => {
    return response.json();
  })
  .then((data) => {
    if (third_party) {
      return {
        result: 'ok',
        data
      };
    }
    return data;
  })
  .catch((error) => {
    return {
      result: 'error',
      message: 'Please check your internet connection!'
    };
  });
}

export async function BroadCastTXN({ api, third_party, method, params }) {
  const headers = {};

  let path = `${api}`;

  if (third_party) {
    path = api;
  }

  set(headers, 'api_key', '22qtEpsphEv2ZtP8JkBiKD65bLQ26PxyJ66obK42uCGeb3b8MetH1bK5n4xEF3yxQ4');
  set(headers, 'Content-Type', 'application/json');
  //set(headers, 'Access-Control-Expose-Headers', 'authorization');

  const reqBody = {
    method,
    headers,
  };

  if (!isEmpty(params)) {
    reqBody.body = JSON.stringify(params);
  }

  return fetch(path, reqBody)
  .then(response => {
    return response.json();
  })
  .then((data) => {
    if (third_party) {
      return {
        result: 'ok',
        data
      };
    }
    return data;
  })
  .catch((error) => {
    return {
      result: 'error',
      message: 'Please check your internet connection!'
    };
  });
}
