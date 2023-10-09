import axios from 'axios';

import {all, takeLatest, fork, put, delay, throttle, call} from 'redux-saga/effects';
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    REMOVE_POST_SUCCESS, REMOVE_POST_REQUEST, REMOVE_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
    LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, 
    LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE, 
    UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE,
    RETWEET_REQUEST, RETWEET_SUCCESS, RETWEET_FAILURE
} from '../reducers/post';

import {
    ADD_POST_TO_ME,
    REMOVE_POST_OF_ME,
} from '../reducers/user';

// 게시글 불러오기
// GET 방식은 queryString으로 Data를 전달 해야함.
function loadPostsAPI(lastId) {
    return axios.get(`/posts?lastId=${lastId || 0}`); // lastId 가 undefined 일 경우 0 으로 처리.
}

function* loadPosts(action){
    console.log("sagas/post.js -> function* roadPosts(action)");
    try {
        const result = yield call(loadPostsAPI, action.lastId)
        yield put({
            type : LOAD_POSTS_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        yield put({
            type : LOAD_POSTS_FAILURE,
            error : err.response.data,
        })
    }    
}

// 게시글 추가
// formData를 받을시 {content : data} X →   data로 명시!
function addPostAPI(data) {
    return axios.post('/post', data);
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
            error : err.response.data
        })
    }
}

// 게시글 삭제
function removePostAPI(data) {
    return axios.delete(`/post/${data}`);
}

function* removePost(action) {
    try {
        const result = yield call(removePostAPI, action.data);
        yield put({
            type : REMOVE_POST_SUCCESS,
            data : result.data,
        })
        yield put({
            type : REMOVE_POST_OF_ME,
            data : action.data,
        })
    } catch (err) {
        yield put({
            type : REMOVE_POST_FAILURE,
            error : err.response.data
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
            error : err.response.data
        })
    }
}

// 좋아요
function likePostAPI(data) {
    return axios.patch(`/post/${data}/like`)
}

function* likePost(action) {
    try {
        const result = yield call(likePostAPI, action.data);
        yield put({
            type : LIKE_POST_SUCCESS,
            data : result.data,
        })
    } catch (err) {
        console.error(err);
        yield put({
            type :  LIKE_POST_FAILURE,
            error : err.response.data
        })
    }
}

// 싫어요
function unlikePostAPI(data) {
    return axios.delete(`/post/${data}/unlike`)
}

function* unlikePost(action) {
    try {
        const result = yield call(unlikePostAPI, action.data);
        yield put({
            type : UNLIKE_POST_SUCCESS,
            data : result.data,
        })
    } catch (err) {
        console.error(err);
        yield put({
            type :  UNLIKE_POST_FAILURE,
            error : err.response.data
        })
    }
}

// 이미지 업로드
function uploadImagesAPI(data) {
    return axios.post(`/post/images`, data);  // formData는 반드시 그대로 data 로 기재한다. {image : data} 이런식으로 전달시, json 형식으로 변환됨!!!!
}

function* uploadImages(action) {
    try {
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
            type : UPLOAD_IMAGES_SUCCESS,
            data : result.data,
        })
    } catch (err) {
        console.error(err);
        yield put({
            type :  UPLOAD_IMAGES_FAILURE,
            error : err.response.data
        })
    }
}

function retweetAPI(data) {
    return axios.post(`/post/${data}/retweet`); 
}

function* retweet(action) {
    try {
        const result = yield call(retweetAPI, action.data);
        yield put({
            type : RETWEET_SUCCESS,
            data : result.data,
        })
    } catch (err) {
        console.error(err);
        yield put({
            type :  RETWEET_FAILURE,
            error : err.response.data
        })
    }
}

function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
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

function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchRetweet() {
    yield takeLatest(RETWEET_REQUEST, retweet);
}

// PostSaga EventListener.
export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchRemovePost),
        fork(watchLoadPosts),
        fork(watchLikePost),
        fork(watchUnlikePost),
        fork(watchUploadImages),
        fork(watchRetweet),
    ])
}
