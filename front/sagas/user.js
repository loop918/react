import {all, takeLatest, fork} from 'redux-saga/effects';


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
            type : 'LOG_IN_SUCCESS',
            data : action.data,
        });
    } catch (err) {
        yield put({
            type :  'LOG_IN_FAILURE',
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

        yield put({
            type : 'LOG_OUT_SUCCESS',
        });
    } catch (err) {
        yield put({
            type :  'LOG_OUT_FAILURE',
            data : err.response.data,
        });
    }
}

function* watchLogIn() {
    yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST', logOut);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
    ])
}