export const initialState = {
  isLoggedIn: false,   // 로그인시도중
  isLoggingIn : false,
  isLoggingOut : false, // 로그아웃 시도중
  me: null,
  signUpData: {},
  loginData: {},
};

export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const LOG_IN = 'LOG_IN'; // 액션의 이름

export const LOG_IN_REQUEST  = 'LOG_IN_SUCCESS'; // 액션의 이름
export const LOG_IN_SUCCESS  = 'LOG_IN_SUCCESS'; 
export const LOG_IN_FAILURE  = 'LOG_IN_FAILURE'; 

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'; // 액션의 이름
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'; 
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const signUpAction = (data) => {
  return {
    type: SIGN_UP,
    data,
  };
};

export const signUpSuccess = {
  type: SIGN_UP_SUCCESS,
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


export const signUp = (data) => {
  return {
    type: SIGN_UP,
    data,
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    // 로그인
    case LOG_IN_REQUEST: 
      console.log("reducers/user -> LOG_IN_REQUEST");
      return {
        ...state,
        isLoggedIn : true,
      };
    case LOG_IN_SUCCESS: 
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn : true,
        me : { ...action.data, nickname : 'zerocho' },
      };
    case LOG_IN_FAILURE: 
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn : false,
      };
        
    // 로그아웃
    case LOG_OUT_REQUEST: 
      return {
        ...state,
        isLoggingOut: true,
        //me: null,
      };
    case LOG_OUT_SUCCESS: 
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn : false,
        me : null,
      };
    case LOG_OUT_FAILURE: 
      return {
        ...state,
        isLoggedOut:  false,
      };
            
    // 회원가입
    case SIGN_UP: 
      return {
        ...state,
        signUpData: action.data,
      };
    
    default: 
      return {
        ...state,
      }
  }

};
