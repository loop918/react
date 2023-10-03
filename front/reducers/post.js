import {produce} from 'immer';

export const initialState = {
  mainPosts: [],
  imagePaths: [],

  hasMorePost : true, // 인피니티 스크롤

  likePostLoading : false,
  likePostDone : false,
  likePostError : null,

  unlikePostLoading : false,
  unlikePostDone : false,
  unlikePostError : null,  

  loadPostsLoading : false,
  loadPostsDone : false,
  loadPostsError : null,

  addPostLoading : false,
  addPostDone : false,
  addPostError : null,

  removePostLoading : false,
  removePostDone : false,
  removePostError : null,

  addCommentLoading : false,
  addCommentDone : false,
  addCommentError : null,
};

// ACTION 
export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const likePost = (data) => {
  return {
    type: LIKE_POST_REQUEST,
    data    
  }
};

export const unlikePost = (data) => {
  return {
    type: UNLIKE_POST_REQUEST,
    data    
  }
};

export const addPost = (data) => {
  return {
    type: ADD_POST_REQUEST,
    data    
  }
};

export const addComment = (data) => {
  return {
    type: ADD_COMMENT_REQUEST,
    data
  }
};

// reducer : "이전 상태"를 액션을 통해 "다음 상태"를 만들어내는 함수, 단 불변성을 지키면서!
export default (state = initialState, action) => {
  // immer 적용.
  return produce(state, (draft) => {
    // ACTION

    
    switch (action.type) {
      // LIKE (좋아요).
      case LIKE_POST_REQUEST : 
        draft.likePostLoading = true;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS : {
          const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
          post.Likers.push({ id: action.data.UserId }); // 좋아요 누른 사람 추가.
          draft.likePostLoading = false;
          draft.likePostDone = true;
          break;
        }
      case LIKE_POST_FAILURE : 
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;

      // UNLIKE (좋아요 해제).
      case UNLIKE_POST_REQUEST : 
        draft.unlikePostLoading = true;
        draft.unlikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS : {
          const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
          post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId); // 싫어요 누른 사람 삭제.
          draft.unlikePostLoading = false;
          draft.unlikePostDone = true;
          break;
        }
      case UNLIKE_POST_FAILURE : 
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;

      // 글 추가
      case LOAD_POSTS_REQUEST : 
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS : 
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts); // 기존 게시글에 추가.
        draft.hasMorePost = draft.mainPosts.length < 50;
        break;
      case LOAD_POSTS_FAILURE : 
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;        
        break;

      // 글 추가
      case ADD_POST_REQUEST : 
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS : 
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.data);
        break;
      case ADD_POST_FAILURE : 
        draft.addPostLoading = false;
        draft.addPostError = action.error;        
        break;

      // 글 삭제
      case REMOVE_POST_REQUEST : 
        draft.removePostLoading = true;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS : 
        draft.mainPosts =  state.mainPosts.filter((v) => v.id !== action.data);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE : 
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;

      // 댓글 추가
      case ADD_COMMENT_REQUEST : 
          draft.addPostLoading = true;
          draft.addPostError = null;
          break;
      case ADD_COMMENT_SUCCESS :  
          const post = draft.mainPosts.find((v) => v.id === action.data.PostId); //  해당 게시글 찾기 (댓글 달릴..)
          post.Comments.unshift(action.data);  // 해당 게시글에 입력한 댓글 넣어주기
          draft.addPostLoading = false;
          draft.addPostDone = true;
          break;
      case ADD_COMMENT_FAILURE : 
          draft.addPostLoading = false;
          draft.addPostError = action.error;
          break;


      default: 
          //return state;
        break;
      
    }
  });
};
