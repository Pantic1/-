import {LOADING, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT,} from '../reducers/app';

export const app = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING,
      payload: {loading: true},
    });

    const params = {
      username: email,
      password: password,
    };
    const response = await fetch(`https://dev.auth.skeduler.com.au/api/access/tech-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const responseJson = await response.json();
    if (responseJson.access_token) {
      dispatch({
        type: 'LOGIN',
        payload: {
          loading: false,
          auth: responseJson,
          loginSuccess: true,
        },
      });
      return Promise.resolve(responseJson);
    }
    dispatch({
      type: LOADING,
      payload: {loading: false},
    });
    return Promise.reject(responseJson.message);
  };
};
export const userLogin = (user) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {user},
    });
  };
};
export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: LOADING,
      payload: {loading: true},
    });
    try {
      await firebase.auth().signOut();
      dispatch({
        type: LOGOUT,
        payload: {loading: false},
      });
    } catch (e) {
      dispatch({
        type: LOADING,
        payload: {loading: false},
      });
      return Promise.reject(e)
    }
  };
};


