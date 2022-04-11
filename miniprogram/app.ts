// app.ts
import createStore from "./redux/store";

type AppOption = TIAppOption & {
  store: any;
};

App<AppOption>({
  globalData: {},
  onLaunch() {
    this.store = createStore({});
    // 登录
    wx.login({
      success: (res) => {
        console.log(res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
  },
});
