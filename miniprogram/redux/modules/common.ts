/**
 * common 数据
 */
//////////////////////////
// ActionType
//////////////////////////

export const ActionType = {
  LOGIN: "LOGIN",
  USER_INFO: "USER_INFO",
  USER_LOCATION: "USER_LOCATION",
};

//////////////////////////
// actions
//////////////////////////

/**
 * 登录
 */
export const login = async (dispatch: any) => {
  dispatch({
    type: ActionType.LOGIN,
    payload: { login: true },
  });
};

/**
 * 获取用户信息
 */
export const getUserProfile = async (dispatch: any, getState: any) => {
  wx.getUserProfile({
    desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      dispatch({
        type: ActionType.USER_INFO,
        payload: res.userInfo,
      });
    },
  });
}; 

/**
 * 获取定位信息
 */
export const getUserLocation = async (dispatch: any, getState?: any) => {
  wx.getLocation({
    type: "gcj02",
    success: (res) => {
      const location = {
        ...res,
        timestamp: Date.now(),
      };
      dispatch({
        type: ActionType.USER_LOCATION,
        payload: location,
      });
    },
    fail: (err) => {},
  });
};

//////////////////////////
// reducer
//////////////////////////

const initState = {
  motto: "打车",
  userInfo: {},
  userLocation: {
    latitude: 31.34127,
    longitude: 102.93984,
    timestamp: null,
  },
};

export const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case ActionType.LOGIN:
      return { ...state, login: action.payload };
    case ActionType.USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case ActionType.USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload,
      };
    default:
      return state;
  }
};
