import axios from 'axios';

export const api = {
  BASE_URL: 'https://zealvend.com/api',
  // DEV_UL: "http://127.0.0.1:3000",
};

export const fetcher = axios.create({
  baseURL: api.BASE_URL,
  timeout: 5000,
  transformResponse: axios.defaults.transformResponse.concat((data) => {
    localStorage.removeItem('token');
    localStorage.token = JSON.stringify({
      token: data.token,
    });

    return data;
  }),
  validateStatus: function (status) {
    return status >= 200 && status < 400;
  },
});

fetcher.interceptors.request.use(
  function (config) {
    let localToken = JSON.parse(localStorage.token);

    config.headers = {
      ...config.headers,
    };
    config.headers.Accept = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    config.headers.Authorization = `${localToken.token}`;
    // you can also do other modification in config

    if (config.headers.Authorization === 'null') {
      localStorage.removeItem('token');
      window.location = '/';
      return false;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

fetcher.interceptors.response.use(
  function (response) {
    if (response.status === 400) {
      console.log('wahala dey');
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
