import {all, fork} from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';
import { backURL } from '../config/config';


axios.defaults.baseURL =  backURL; // 백엔드 IP
axios.defaults.withCredentials = true; // 쿠키 전달O 설정.


export  default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(postSaga),
    ]);
}
