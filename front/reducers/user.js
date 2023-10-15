import {produce} from 'immer';

export const initialState = {
  loadMyInfoLoading : false,
  loadMyInfoDone : false,
  loadMyInfoError : null,

  loadUserLoading: false, // 유저 정보 가져오기 시도중
  loadUserDone: false,
  loadUserError: null,

  followLoading : false, 
  followDone : false,
  followError : null,

  unfollowLoading : false, 
  unfollowDone : false,
  unfollowError : null,  

  loadFollowersLoading : false, 
  loadFollowersDone : false,
  loadFollowersError : null,

  loadFollowingsLoading : false, 
  loadFollowingsDone : false,
  loadFollowingsError : null,
  
  removeFollowerLoading : false, 
  removeFollowerDone : false,
  removeFollowerError : null,

  logInLoading : false,
  logInDone : false,
  loginError : null,

  logOutLoading : false, 
  logOutDone : false,
  logOutError : null,

  signUpLoading : false, 
  signUpDone : false,
  signUpFailure : null,

  changeNicknameLoading : false, // 닉네임 변경 시도중
  changeNicknameDone : false,
  changeNicknameError : null,  

  me : null,
  signUpData : {},
  loginData : {},
};

export const LOAD_MY_INFO_REQUEST  = 'LOAD_MY_INFO_REQUEST'; 
export const LOAD_MY_INFO_SUCCESS  = 'LOAD_MY_INFO_SUCCESS'; 
export const LOAD_MY_INFO_FAILURE  = 'LOAD_MY_INFO_FAILURE'; 

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOG_IN_REQUEST  = 'LOG_IN_REQUEST'; 
export const LOG_IN_SUCCESS  = 'LOG_IN_SUCCESS'; 
export const LOG_IN_FAILURE  = 'LOG_IN_FAILURE'; 

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'; 
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'; 
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const loadMyInfoAction = (data) => {
  return {
    type : LOAD_MY_INFO_REQUEST,
    data,
  }
}

export const signUpAction = (data) => {
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
};

export const changeNicknameAction = (data) => {
  return {
    type: CHANGE_NICKNAME_REQUEST,
    data,
  };
};

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  }
};

export const logoutRequestAction = {
  type: LOG_OUT_REQUEST,
};


// reducer : "이전 상태"를 액션을 통해 "다음 상태"를 만들어내는 함수, 단 불변성을 지키면서!
export default (state = initialState, action) => {
  // immer 적용.
  return produce(state, (draft) => {
    switch (action.type) {
      // 내정보 가져오기
      case LOAD_MY_INFO_REQUEST: 
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoError = null;
        draft.loadMyInfoDone = false;
        break;
      case LOAD_MY_INFO_SUCCESS: 
        draft.loadMyInfoLoading = false;
        draft.me = action.data;
        draft.loadMyInfoDone = true;
        break;
      case LOAD_MY_INFO_FAILURE: 
        draft.loadMyInfoLoading =  false;
        draft.loadMyInfoError = action.error;
        break;

      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserError = null;
        draft.loadUserDone = false;
        break;
      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false;
        draft.userInfo = action.data;
        draft.loadUserDone = true;
        break;
      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        break;

      //팔로우 요청
      case FOLLOW_REQUEST: 
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
        break;
      case FOLLOW_SUCCESS: 
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings.push({ id : action.data.UserId });
        break;
      case FOLLOW_FAILURE: 
        draft.followLoading =  false;
        draft.followError = action.error;
        break;

      // 언팔로우 요청
      case UNFOLLOW_REQUEST: 
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
        break;
      case UNFOLLOW_SUCCESS: 
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId);
        break;
      case UNFOLLOW_FAILURE : 
        draft.unfollowLoading =  false;
        draft.unfollowError = action.error;
        break;

      // 팔로우 목록 가져오기
      case LOAD_FOLLOWERS_REQUEST: 
        draft.loadFollowersLoading = true;
        draft.loadFollowersError = null;
        draft.loadFollowersDone = false;
        break;
      case LOAD_FOLLOWERS_SUCCESS: 
        draft.loadFollowersLoading = false;
        draft.loadFollowersDone = true;
        draft.me.Followers = action.data;
        break;
      case LOAD_FOLLOWERS_FAILURE : 
        draft.loadFollowersLoading =  false;
        draft.loadFollowersError = action.error;
        break;

      // 팔로잉 목록가져오기
      case LOAD_FOLLOWINGS_REQUEST: 
        draft.loadFollowingsLoading = true;
        draft.loadFollowingsError = null;
        draft.loadFollowingsDone = false;
        break;
      case LOAD_FOLLOWINGS_SUCCESS: 
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsDone = true;
        draft.me.Followings = action.data;
        break;
      case LOAD_FOLLOWINGS_FAILURE : 
        draft.loadFollowingsLoading =  false;
        draft.loadFollowingsError = action.error;
        break;

      // 팔로잉 목록가져오기
      case REMOVE_FOLLOWER_REQUEST: 
        draft.removeFollowerLoading = true;
        draft.removeFollowerError = null;
        draft.removeFollowerDone = false;
        break;
      case REMOVE_FOLLOWER_SUCCESS: 
        draft.removeFollowerLoading = false;
        draft.removeFollowerDone = true;
        draft.me.Followings = draft.me.Followers.filter((v) => v.id !== action.data.UserId);
        break;
      case REMOVE_FOLLOWER_FAILURE : 
        draft.removeFollowerLoading =  false;
        draft.removeFollowerError = action.error;
        break;

      // 로그인
      case LOG_IN_REQUEST: 
        draft.state = true;
        draft.loginError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS: 
        draft.logInLoading = false;
        draft.me = action.data;
        draft.logInDone = true;
        break;
      case LOG_IN_FAILURE: 
        draft.logInLoading =  false;
        draft.loginError = action.error;
        break;

      // 로그아웃
      case LOG_OUT_REQUEST :       
        draft.logOutLoading =  true;
        draft.logOutError =  null;
        break;
      case LOG_OUT_SUCCESS : 
        draft.logOutLoading = false;
        draft.logOutDone = false;
        draft.me =  null;
        break;
      case LOG_OUT_FAILURE : 
        draft.logOutLoading =   false;
        draft.logOutError = action.error;
        break; 

      // 회원가입
      case SIGN_UP_REQUEST : 
          draft.signUpLoading = true;
          draft.signUpDone = false;
          draft.signUpError = null;
          break;
      case SIGN_UP_SUCCESS : 
          draft.signUpLoading =  false;
          draft.signUpDone =  true;
          break;
      case SIGN_UP_FAILURE : 
          draft.signUpLoading = false;
          draft.signUpData = action.error;     
          break;         
        
      // 닉네임 변경
      case CHANGE_NICKNAME_REQUEST : 
          draft.changeNicknameLoading= true;
          draft.changeNicknameDone= false;
          draft.changeNicknameError= null;
          break;
      case CHANGE_NICKNAME_SUCCESS : 
          draft.me.nickname = action.data.nickname;
          draft.changeNicknameLoading = false;
          draft.changeNicknameDone =  true;
          break;
      case CHANGE_NICKNAME_FAILURE : 
          draft.changeNicknameLoading = false;
          draft.changeNicknameError=  action.error;
          break;
    
      // 게시글 등록시 사용자 dummy Data에 동기화
      case ADD_POST_TO_ME : 
        draft.me.Posts.unshift({ id : action.data})
        break;
        // return {
        //   ...state,
        //   me : {
        //     ...state.me
        //     Posts: [ { id.action.data}, ...state.me.Posts]
        //   }
        // }

      // 게시글 삭제
      case REMOVE_POST_OF_ME : 
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data)
        break;
        // return  {
        //     ...state, 
        //     me : {
        //       ...state.me,
        //       Posts : state.me.Posts.filter((v) => v.id !== action.data)
        //     }
        // }

      default:  
        break;
      }
  });
};
  