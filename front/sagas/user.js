import {all, takeLatest, fork, put, delay, call} from 'redux-saga/effects';
import axios from 'axios';

import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, 
    CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE, 
    UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE, 
} from '../reducers/user';



// 팔로우
function followAPI(data) {
    return axios.post('/api/login', data);
}

function* follow(action) {
    try {
        console.log("sagas/user.js -> function* follow(action)");
        yield delay(1000);
        yield put({
            type : FOLLOW_SUCCESS,
            data : action.data,
        });
    } catch (err) {
        yield put({
            type :  FOLLOW_FAILURE,
            data : err.response.data,
        });
    }
}

//언 팔로우
function unfollowAPI(data) {
    return axios.post('/api/login', data);
}

function* unfollow(action) {
    try {
        console.log("sagas/user.js -> function* unfollow(action)");
        yield delay(1000);
        yield put({
            type : UNFOLLOW_SUCCESS,
            data : action.data,
        });
    } catch (err) {
        yield put({
            type :  UNFOLLOW_FAILURE,
            data : err.response.data,
        });
    }
}

//로그인 
function logInAPI(data) {
    return axios.post('/api/login', data);
}

function* logIn(action) {
    try {
        console.log("sagas/user.js -> function* login(action)");
        //const result = yield call(logInAPI, action.data);
        yield delay(1000);
        yield put({
            type : LOG_IN_SUCCESS,
            data : action.data,
        });
    } catch (err) {
        yield put({
            type :  LOG_IN_FAILURE,
            data : err.response.data,
        });
    }
}

// 로그아웃
function logOutAPI() {
    return axios.post('/api/logOut');
}

function* logOut() {
    try {
        console.log("sagas/user.js -> function* logOut()");
        yield delay(1000);
        yield put({
            type : LOG_OUT_SUCCESS,
        });
    } catch (err) {
        yield put({
            type :  LOG_OUT_FAILURE,
            data : err.response.data,
        });
    }
}

// 회원가입
function signUpAPI(data) {
    return axios.post('http://localhost:3065/user', data);
}

function* signUp(action) {
    try {
        const result =  yield call(signUpAPI, action.data);
        console.log(result);

        yield put({
            type : SIGN_UP_SUCCESS,
        });
    } catch (error) {
        yield put({
            type :  SIGN_UP_FAILURE,
            data : error.response.data,
        });
    }
}

// 이름변경
function changeNicknameAPI() {
    return axios.post('/api/signUp')
}

function* changeNickname() {
    try {
        console.log("sagas/user.js -> function* changeNickname()");
        yield delay(1000);
        yield put({
            type : CHANGE_NICKNAME_SUCCESS,
        });
    } catch (err) {
        yield put({
            type :  CHANGE_NICKNAME_FAILURE,
            data : err.response.data,
        });
    }
}

// Listener 
function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchChangeNickname),
        fork(watchFollow),
        fork(watchUnfollow),
    ])
}