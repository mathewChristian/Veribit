import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const LOGIN_REQUEST = 'login/LOGIN_REQUEST';
export const LOGIN_REQUEST_SUCCESS = 'login/LOGIN_REQUEST_SUCCESS';
export const SIGNUP_REQUEST = 'signup/SIGNUP_REQUEST';
export const SIGNUP_REQUEST_SUCCESS = 'signup/SIGNUP_REQUEST_SUCCESS';
export const MB_USER_REQUEST = 'moneybutton/MB_USER_REQUEST';
export const MB_USER_REQUEST_SUCCESS = 'moneybutton/MB_USER_REQUEST_SUCCESS';
export const MB_USER_CLEAR_REQUEST = 'moneybutton/MB_USER_CLEAR_REQUEST';
export const MB_USER_CLEAR_REQUEST_SUCCESS = 'moneybutton/MB_USER_CLEAR_REQUEST_SUCCESS';
/**
 * Action Creators
 */
export const authActionCreators = {
  login: createPromiseAction(LOGIN_REQUEST),
  loginSuccess: createAction(LOGIN_REQUEST_SUCCESS),
  signUp: createPromiseAction(SIGNUP_REQUEST),
  signUpSuccess: createAction(SIGNUP_REQUEST_SUCCESS),
  getMbUser: createPromiseAction(MB_USER_REQUEST),
  getMbUserSuccess: createAction(MB_USER_REQUEST_SUCCESS),
  clearMbUser: createPromiseAction(MB_USER_CLEAR_REQUEST),
  clearMbUserSuccess: createAction(MB_USER_CLEAR_REQUEST_SUCCESS),
};
