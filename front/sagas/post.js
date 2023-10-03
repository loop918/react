import axios from 'axios';

import {all, takeLatest, fork, put, delay, throttle, call} from 'redux-saga/effects';
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    REMOVE_POST_SUCCESS, REMOVE_POST_REQUEST, REMOVE_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
    LOAD_POSTS_REQUEST,LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, 
} from '../reducers/post';

import {
    ADD_POST_TO_ME,
    REMOVE_POST_OF_ME,
} from '../reducers/user';

// 게시글 불러오기
function loadPostsAPI(data) {
    return axios.get('/posts', data);
}

function* loadPosts(action){
    console.log("sagas/post.js -> function* roadPosts(action)");
    try {
        const result = yield call(loadPostsAPI, action.data)
        yield put({
            type : LOAD_POSTS_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        yield put({
            type : LOAD_POSTS_FAILURE,
            data : err.response.data,
        })
    }    
}

// 게시글 추가
function addPostAPI(data) {
    return axios.post('/post', { content : data });
}

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data );
        console.log(result.data);
        yield put({
            type : ADD_POST_SUCCESS,
            data : result.data,
        })
        yield put({
            type : ADD_POST_TO_ME,
            data : result.data.id,
        })

    } catch (err) {
        console.error(err);
        yield put({
            type :  ADD_POST_FAILURE,
            data : err.response.data
        })
    }
}

// 게시글 삭제
function removePostAPI(data) {
    return axios.post('/post/delete', data);
}

function* removePost(action) {
    console.log("sagas/post.js -> function* removePost(action)");
    try {
        yield delay(1000);
        yield put({
            type : REMOVE_POST_SUCCESS,
            data : action.data,
        })
        yield put({
            type : REMOVE_POST_OF_ME,
            data : action.data,
        })
    } catch (err) {
        yield put({
            type : REMOVE_POST_FAILURE,
            data : err.response.data
        })
    }
}

// 댓글 추가
function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data); // POST  /post/1/comment
}

function* addComment(action) {
    try {
        const result = yield call(addCommentAPI, action.data);
        yield put({
            type : ADD_COMMENT_SUCCESS,
            data : result.data,
        })
    } catch (err) {
        console.error(err);
        yield put({
            type :  ADD_COMMENT_FAILURE,
            data : err.response.data
        })
    }
}

function* watchLoadPosts() {
    yield throttle(2000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
// PostSaga EventListener.
export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchRemovePost),
        fork(watchLoadPosts),
    ])
}
