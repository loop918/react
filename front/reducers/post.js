import {produce} from 'immer';

export const initialState = {
  mainPosts: [],
  singlePost : [],
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

  loadPostLoading : false,
  loadPostDone : false,
  loadPostError : null,

  addPostLoading : false,
  addPostDone : false,
  addPostError : null,

  removePostLoading : false,
  removePostDone : false,
  removePostError : null,

  addCommentLoading : false,
  addCommentDone : false,
  addCommentError : null,

  uploadImagesLoading : false,
  uploadImagesDone : false,
  uploadImagesError : null,  

  retweetLoading : false,
  retweetDone : false,
  retweetError : null,    
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

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

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

      // 전체글 불러오기 (전체글 , 특정 사용자, 해쉬태그)
      case LOAD_POSTS_REQUEST : 
      case LOAD_USER_POSTS_REQUEST :
      case LOAD_HASHTAG_POSTS_REQUEST :
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS : 
      case LOAD_USER_POSTS_SUCCESS :
      case LOAD_HASHTAG_POSTS_SUCCESS :  
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data); // 기존 게시글에 추가.
        draft.hasMorePost = action.data.length === 10;
        break;  
      case LOAD_POSTS_FAILURE :
      case LOAD_USER_POSTS_FAILURE :
      case LOAD_HASHTAG_POSTS_FAILURE : 
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;        
        break;

      // 특정글 불러오기.
      case LOAD_POST_REQUEST : 
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS : 
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.data // 특정 게시글.
        break;
      case LOAD_POST_FAILURE : 
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;        
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
        draft.imagePaths = []; // 이미지 업로드 후 , imagePath 배열 초기화.
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
        draft.mainPosts =  state.mainPosts.filter((v) => v.id !== action.data.PostId);
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

          
      // 이미지 업로드
      case UPLOAD_IMAGES_REQUEST : 
          draft.uploadImagesLoading = true;
          draft.uploadImagesError = null;
          break;
      case UPLOAD_IMAGES_SUCCESS :  
          draft.imagePaths = action.data;
          draft.uploadImagesLoading = false;
          draft.uploadImagesDone = true;
          break;
      case UPLOAD_IMAGES_FAILURE : 
          draft.uploadImagesLoading = false;
          draft.uploadImagesError = action.error;
          break;          

      // 이미지 제거
      case REMOVE_IMAGE : 
        draft.imagePaths = draft.imagePaths.filter((v,i) => i.id !== action.index );
        break;

      // 리트윗
      case RETWEET_REQUEST : 
          draft.retweetLoading = true;
          draft.retweetError = null;
          break;
      case RETWEET_SUCCESS :  
          draft.retweetLoading = false;
          draft.mainPosts.unshift(action.data);
          draft.retweetDone = true;
          break;
      case RETWEET_FAILURE : 
          draft.retweetLoading = false;
          draft.retweetError = action.error;
          break;     

      default: 
          //return state;
        break;
      
    }
  });
};
