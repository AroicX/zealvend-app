import {api, fetcher} from './index';
import {log} from 'react-native-reanimated';

const {BASE_URL} = api;

// export async function LOG_USER_IN(email, password, callback, onError) {
//   try {
//     fetch("https://api-prod.mecuryapp.com/api/auth/sign_in", {
//       method: "POST",
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     })
//       .then((response) => response.json())
//       .then((json) => callback && callback(json));
//   } catch (err) {
//     onError && onError(err);
//     return false;
//   }
// }

export async function REGISTER(data, callback, onError) {
  try {
    let user = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    user = await user.json();

    callback && callback(user);

    return user;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function LOG_USER_IN(email, password, callback, onError) {
  try {
    let user = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    user = await user.json();
    callback && callback(user);

    return user;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function VEND(network, bundle, number, token, callback, onError) {
  // return false;
  try {
    let data = await fetch(`${BASE_URL}/data/vend`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        network,
        bundle,
        number,
      }),
    });

    data = await data.json();
    callback && callback(data);

    return data;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function FUND(network, bundle, number, token, callback, onError) {
  // https://zealvend.com/api/data/vend/online
  try {
    let data = await fetch(`${BASE_URL}/data/vend/online`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        network,
        bundle,
        number,
      }),
    });

    data = await data.json();
    callback && callback(data);

    return data;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function GET_DASHBOARD(today, token, callback, onError) {
  try {
    let dashboard = await fetch(
      `${BASE_URL}/data/analysis?from=${today}&to=${today}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    dashboard = await dashboard.json();
    callback && callback(dashboard);

    return dashboard;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
export async function GET_PROFILE(token, callback, onError) {
  try {
    let profile = await fetch(`${BASE_URL}/user/profile`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    profile = await profile.json();
    callback && callback(profile);

    return profile;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
export async function GET_BUNDLE(token, network, callback, onError) {
  try {
    let bundle = await fetch(`${BASE_URL}/data/bundles?network=${network}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    bundle = await bundle.json();
    callback && callback(bundle);

    return bundle;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
export async function GET_WALLET(token, callback, onError) {
  try {
    let wallet = await fetch(`${BASE_URL}/wallet/transactions`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    wallet = await wallet.json();
    callback && callback(wallet);

    return wallet;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
export async function GET_TRANSACTIONS(token, callback, onError) {
  try {
    let transactions = await fetch(`${BASE_URL}/data/transactions`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    transactions = await transactions.json();
    callback && callback(transactions);

    return transactions;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function GET_TRANSACTIONS_BY_PAGE(page, token, callback, onError) {
  try {
    let transactions = await fetch(
      `${BASE_URL}/data/transactions?page=${page}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    transactions = await transactions.json();
    callback && callback(transactions);

    return transactions;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
export async function GET_TRANSACTIONS_BY_SEARCH(
  query,
  token,
  callback,
  onError,
) {
  // https://zealvend.com/api/data/transactions/search/{needle}
  try {
    let transactions = await fetch(
      `${BASE_URL}/data/transactions/search/${query}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    transactions = await transactions.json();
    callback && callback(transactions);

    return transactions;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function GET_WALLET_PAGE(page, token, callback, onError) {
  try {
    let wallet = await fetch(`${BASE_URL}/wallet/transactions?page=${page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    wallet = await wallet.json();
    callback && callback(wallet);

    return wallet;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
export async function GET_WALLET_BY_SEARCH(query, token, callback, onError) {
  try {
    let wallet = await fetch(
      `${BASE_URL}/wallet/transactions/search/${query}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    wallet = await wallet.json();
    callback && callback(wallet);

    return wallet;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}
