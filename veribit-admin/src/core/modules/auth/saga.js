import { put, call, fork, all, take } from "redux-saga/effects";

import {
  authActionCreators,
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  MB_USER_REQUEST,
  MB_USER_CLEAR_REQUEST
} from "./actions";

import { KycService } from "../../../services";

export function* asyncLoginRequest({ payload, resolve, reject }) {
  const { userId, email, password } = payload;
  try {
    const response = yield call(KycService, {
      api: `/admin/signin`,
      method: "POST",
      params: {
        userId: userId,
        email: email,
        password: password
      }
    });
    // @TODO: Open next lines after login api is completed
    if (response.status === 200) {
      yield put(authActionCreators.loginSuccess({ user: response.data }));
      resolve(response);
    } else {
      reject(response.msg);
    }
  } catch (e) {
    reject(e);
  }
}

export function* asyncSignupRequest({ payload, resolve, reject }) {
  const { userId, email, provider } = payload;
  try {
    const response = yield call(KycService, {
      api: `/admin/signup`,
      method: "POST",
      params: {
        userId: userId,
        email: email,
        provider: provider
      }
    });
    resolve(response);
  } catch (e) {
    reject(e);
  }
}

export function* asyncMbUserRequest({ payload, resolve, reject }) {
  const userId = payload.userId;
  const email = payload.email;
  try {
    if (email) {
      yield put(authActionCreators.getMbUserSuccess({ userId: userId, email: email }));
      resolve({ userId: userId, email: email });
    } else {
      reject("Money Button User could not me retrieved");
    }
  } catch (e) {
    reject(e);
  }
}

export function* asyncMbUserClearRequest({ payload, resolve, reject }) {
  const userId = payload.userId;
  const email = payload.email;
  try {
    if (email) {
      yield put(authActionCreators.clearMbUserSuccess({ userId: userId, email: email }));
      resolve({ userId: userId, email: email });
    } else {
      reject("Money Button User could not me cleared");
    }
  } catch (e) {
    reject(e);
  }
}

export function* watchLoginRequest() {
  while (true) {
    const action = yield take(LOGIN_REQUEST);
    yield* asyncLoginRequest(action);
  }
}

export function* watchSignupRequest() {
  while (true) {
    const action = yield take(SIGNUP_REQUEST);
    yield* asyncSignupRequest(action);
  }
}

export function* watchMbUserRequest() {
  while (true) {
    const action = yield take(MB_USER_REQUEST);
    yield* asyncMbUserRequest(action);
  }
}

export function* watchMbUserClearRequest() {
  while (true) {
    const action = yield take(MB_USER_CLEAR_REQUEST);
    yield* asyncMbUserClearRequest(action);
  }
}

export default function* () {
  yield all([
    fork(watchLoginRequest),
    fork(watchSignupRequest),
    fork(watchMbUserRequest),
    fork(watchMbUserClearRequest),
  ]);
}
