import { redirectLogin } from "./utils";
import axios from "axios";
import { Message } from 'antd';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  if (response.status === 401) {
    redirectLogin();
    throw Error("未登录");
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function responseInterceptor({ data, success, message }) {
  if (success) {
    Message.success(message);
    return data;
  }
  if (message === "token过期") {
    redirectLogin();
  }
  Message.error(message);
  throw new Error(message);
  // return Promise.reject(new Error(message));
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  /**
   * Do something before send.
   */

  options = Object.assign(
    {
      method: "GET",
      validateStatus: status => {
        return (status >= 200 && status < 300) || status === 401;
      }
    },
    options
  );
  if (options.body) {
    if (typeof options.body === "string") {
      try {
        options.data = JSON.parse(options.body);
      } catch (e) {
        options.data = options.body;
      }
    } else {
      options.data = options.body;
    }
    delete options.body;
  }

  return axios({
    ...options,
    url: url
  })
    .then(checkStatus)
    .then(response => response.data)
    .then(responseInterceptor);
}
