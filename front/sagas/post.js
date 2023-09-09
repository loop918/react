import {all, takeLatest, fork} from 'redux-saga/effects';

// 게시글 추가
function addPostAPI() {
    return axios.post('/api/post');
}

function* addPost(action) {
    console.log("sagas/post.js -> function* addPost(action)");
    try {
        yield delay(1000);
        yield put({
            type : 'ADD_POST_SUCCESS',
            data : action.data
        })
    } catch (err) {
        yield put({
            type :  'ADD_POST_FAILURE',
            data : err.response.data
        })
    }
}

export default function* postSaga() {
    yield all([
        fork(addPost)
    ])
}
