/**
 * axios with a custom config.
 */

import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.STRAPI_ADMIN_BACKEND_URL,
});

instance.interceptors.request.use(
  async config => {
    config.headers = {
      Authorization: `Bearer ${sessionStorage.getItem('jwtToken').replace(/['"]+/g, '')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    console.log(config.headers, "config.headers")
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => response,
  error => {
    // whatever you want to do with the error
    if (error.response?.status === 401) {
      // window.location.reload();
    }

    throw error;
  }
);

export default instance;
