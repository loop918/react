import {all, takeLatest, fork, put, delay} from 'redux-saga/effects';
import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, 
    CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
} from '../reducers/user';

//로그인 
function logInAPI(data) {
    return axios.post('/api/login', data);
}

function* logIn(action) {
    try {
        console.log("sagas/user.js -> function* login(action)");
        console.log("tttttttttttttttt");

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

function signUpAPI() {
    return axios.post('/api/signUp')
}

function* signUp() {
    try {
        console.log("sagas/user.js -> function* signUp()");
        yield delay(1000);
        yield put({
            type : SIGN_UP_SUCCESS,
        });
    } catch (err) {
        yield put({
            type :  SIGN_UP_FAILURE,
            data : err.response.data,
        });
    }
}

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
    ])
}