import {all, takeLatest, fork, put, delay, call} from 'redux-saga/effects';
import axios from 'axios';

import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, 
    CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE, 
    UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
    LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE, 
    LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE,
    REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS, REMOVE_FOLLOWER_FAILURE,
} from '../reducers/user';

// 내 정보 가져오기 (쿠키 값으로 조회)
function loadMyInfoAPI() {
    return axios.get('/user');
}

function* loadMyInfo(action) {
    try {
        const result = yield call(loadMyInfoAPI, action.data);
        yield push({
            type : LOAD_MY_INFO_SUCCESS,
            data : result.data,
        })
    } catch (error) {
        yield put({
            type : LOAD_MY_INFO_FAILURE,
            error : error.response.data,
        })
    }
}


// 팔로우
function followAPI(data) {
    return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
    try {
        const result = yield call(followAPI, action.data);
        yield put({
            type : FOLLOW_SUCCESS,
            data : result.data,
        });
    } catch (err) {
        yield put({
            type :  FOLLOW_FAILURE,
            error : err.response.data,
        });
    }
}

//언 팔로우
function unfollowAPI(data) {
    return axios.delete(`/user/${data}/unfollow`);
}

function* unfollow(action) {
    try {

        const result = yield call(unfollowAPI, action.data);
        yield put({
            type : UNFOLLOW_SUCCESS,
            data : result.data,
        });
    } catch (err) {
        yield put({
            type :  UNFOLLOW_FAILURE,
            error : err.response.data,
        });
    }
}

// 팔로잉 목록 불러오기.
function loadFollowersAPI(data) {
    return axios.get(`/user/followers`);
}

function* loadFollowers(action) {
    try {
        const result = yield call(loadFollowersAPI, action.data);
        yield put({
            type : LOAD_FOLLOWERS_SUCCESS,
            data : result.data,
        });
    } catch (err) {
        yield put({
            type :  LOAD_FOLLOWERS_FAILURE,
            error : err.response.data,
        });
    }
}

// 팔로워 목록 불러오기.
function loadFollowingsAPI(data) {
    return axios.get(`/user/followings`);
}


function* loadFollowings(action) {
    try {
        const result = yield call(loadFollowingsAPI, action.data);
        yield put({
            type : LOAD_FOLLOWINGS_SUCCESS,
            data : result.data,
        });
    } catch (err) {
        yield put({
            type :  LOAD_FOLLOWINGS_FAILURE,
            error : err.response.data,
        });
    }
}

// 팔로워 목록 제거
function removeFollowerAPI(data) {
    return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action) {
    try {
        const result = yield call(removeFollowerAPI, action.data);
        yield put({
            type : REMOVE_FOLLOWER_SUCCESS,
            data : result.data,
        });
    } catch (err) {
        yield put({
            type :  REMOVE_FOLLOWER_FAILURE,
            error : err.response.data,
        });
    }
}


//로그인 
function logInAPI(data) {
    return axios.post('/user/login', data);
}

function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);
        yield put({
            type : LOG_IN_SUCCESS,
            data : result.data,
        });
    } catch (err) {
        yield put({
            type :  LOG_IN_FAILURE,
            error : err.response.data,
        });
    }
}

// 로그아웃
function logoutAPI() {
    return axios.post('/user/logout');
}

function* logOut() {
    try {
        yield call(logoutAPI);
        yield put({
            type : LOG_OUT_SUCCESS,
        });
    } catch (err) {
        yield put({
            type :  LOG_OUT_FAILURE,
            error : err.response.data,
        });
    }
}

// 회원가입
function signUpAPI(data) {
    return axios.post('/user', data);
}

function* signUp(action) {
    try {
        const result =  yield call(signUpAPI, action.data);
        yield put({
            type : SIGN_UP_SUCCESS,
            data : result.data,
        });
    } catch (error) {
        yield put({
            type :  SIGN_UP_FAILURE,
            error : error.response.data,
        });
    }
}

// 이름변경
function changeNicknameAPI(data) {
    return axios.patch('/user/nickname', {nickname : data});
}

function* changeNickname(action) {
    try {
        const result = yield call(changeNicknameAPI, action.data)
        yield put({
            type : CHANGE_NICKNAME_SUCCESS,
            data : result.data,
        });
    } catch (err) {
        yield put({
            type :  CHANGE_NICKNAME_FAILURE,
            error : err.response.data,
        });
    }
}

// Listener 
function* watchloadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

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

function* watchloadFollowers() {
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchloadFollowings() {
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* watchRemoveFollower() {
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

export default function* userSaga() {
    yield all([
        fork(watchloadMyInfo),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchChangeNickname),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchloadFollowers),
        fork(watchloadFollowings),
        fork(watchRemoveFollower),
    ])
}