import {
  LOGIN_REQUEST_SUCCESS,
  SIGNUP_REQUEST_SUCCESS,
  MB_USER_REQUEST_SUCCESS,
  MB_USER_CLEAR_REQUEST_SUCCESS
} from './actions';
import { initialState } from '../initialState';

export default function auth(state = initialState.auth, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST_SUCCESS: {
      return {
        ...state,
        user: payload.user
      }
      break;
    }
    case SIGNUP_REQUEST_SUCCESS: {
      return {
        ...state,
        user: payload.user
      }
      break;
    }
    case MB_USER_REQUEST_SUCCESS: {
      return {
        ...state,
        userId: payload.userId,
        email: payload.email
      }
      break;
    }
    case MB_USER_CLEAR_REQUEST_SUCCESS: {
      return {
        ...state,
        userId: '',
        email: ''
      }
      break;
    }
    default: {
      return state;
    }
  }
}
