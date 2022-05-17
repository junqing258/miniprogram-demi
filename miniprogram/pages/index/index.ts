// index.ts
// 获取应用实例
import { connect } from "../../redux/connect";
import { ActionType, getUserProfile } from "../../redux/modules/common";
import { isEmpty } from "../../utils/util";

// 定义页面上的data，这个是自动注入到page data上的，需要什么就用什么，据说小程序有page data的性能瓶颈，按需注入吧
const mapStateToData = (state: any) => ({
  ...state.common,
  hasUserInfo: !isEmpty(state.common.userInfo),
});

const mapDispatchToMethod = (dispatch: any, getState: any) => ({
  login: () => dispatch({ type: ActionType.LOGIN, payload: true }),
  getUserProfile: () => getUserProfile(dispatch, getState),
});

const pageConfig: WechatMiniprogram.Page.DataOption = {
  data: {
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    canIUseGetUserProfile: false,
    canIUseOpenData:
      wx.canIUse("open-data.type.userAvatarUrl") &&
      wx.canIUse("open-data.type.userNickName"), // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "/pages/home/home",
    });
  },
  onLoad() {
    this.setData({
      canIUseGetUserProfile: Boolean(wx.getUserProfile),
    });
  },
};

const nextConfig = connect(mapStateToData, mapDispatchToMethod)(pageConfig);

Page(nextConfig);
