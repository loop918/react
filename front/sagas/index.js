import {all, fork} from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';

axios.defaults.withCredentials = true; // 쿠키 전달O 설정.
axios.defaults.baseURL = 'http://localhost:3065'; // 로컬 주소

export  default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(postSaga),
    ]);
}
