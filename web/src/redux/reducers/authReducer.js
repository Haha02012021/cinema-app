import {
  CHECK_LOGED_IN,
  LOG_IN,
  LOG_OUT,
  REGISTER,
  EDIT_PASSWORD,
} from "../actions/authActions";
const initialAuthState = {};

export default function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLogedIn: action.success,
      };
    case LOG_OUT:
      return {
        ...state,
        isLogedIn: false,
      };
    case CHECK_LOGED_IN:
      return {
        ...state,
        isLogedIn: Boolean(action.userInfo),
        user: action.userInfo,
      };
    case REGISTER:
      return {
        ...state,
      };
    case EDIT_PASSWORD:
      return {
        ...state,
        user: action.userInfo,
      };
    default:
      return state;
  }
}
