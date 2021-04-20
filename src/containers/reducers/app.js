export const LOADING = '/app/loading';
export const LOGIN_SUCCESS = '/app/login/success';
export const LOGIN_FAILED = '/app/login/failed';
export const LOGOUT = '/app/logout';
const defaultState = {
  loading: false,
  authenticated: false,
  user: null
};
const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOADING:
      return Object.assign({}, state, {
        loading: action.payload.loading,
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        authenticated: true,
        user: action.payload.user,
        loading: false,
      });
    case LOGOUT:
      return Object.assign({}, state, {
        authenticated: false,
        user: {},
        cart: [],
        orders: [],
        loading: false,
      });
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        authenticated: false,
        errorMessage: action.payload.message,
        loading: false,
      });
    default:
      return state;
  }
};
export default appReducer;
