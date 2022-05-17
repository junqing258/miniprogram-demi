import createStore from "./redux/store";
import { provider } from "./redux/connect";

App({
  globalData: {},
  onLaunch() {
    provider.store = createStore({});
    // 登录
    wx.login({
      success: (res) => {
        console.log(res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
  },
});
