import {all, takeLatest, fork} from 'redux-saga/effects';
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,

} from '../reducers/post';

// 게시글 추가
function addPostAPI(data) {
    return axios.post('/api/post', data);
}

function* addPost(action) {
    console.log("sagas/post.js -> function* addPost(action)");
    try {
        yield delay(1000);
        yield put({
            type : ADD_POST_SUCCESS,
            data : action.data
        })
    } catch (err) {
        yield put({
            type :  ADD_POST_FAILURE,
            data : err.response.data
        })
    }
}

// 댓글 추가
function addCommentAPI(data) {
    return axios.post(`/api/pody/${data.postId}/comment`, data);
}

function* addComment(action) {
    console.log("sagas/post.js -> function* addComment(action)");
    try {
        yield delay(1000);
        yield put({
            type : ADD_COMMENT_SUCCESS,
            data : action.data
        })
    } catch (err) {
        yield put({
            type :  ADD_COMMENT_FAILURE,
            data : err.response.data
        })
    }
}


function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
// PostSaga EventListener.
export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment)
    ])
}
