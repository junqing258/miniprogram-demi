// pages/home/home.ts
import { isEmpty } from "../../utils/util";
import { connect } from "../../redux/connect";
import { ActionType, getUserLocation } from "../../redux/modules/common";

const mapStateToProps = (state: any, options: any) => ({
  ...state.common,
  hasUserInfo: !isEmpty(state.common.userInfo),
});

const mapDispatchToProps = (dispatch: any, getState: any) => ({
  login: () => dispatch({ type: ActionType.LOGIN, payload: true }),
  getUserLocation: () => getUserLocation(dispatch, getState),
});

const pageConfig: WechatMiniprogram.Page.DataOption = {
  /**
   * 页面的初始数据
   */
  data: {
    mapScale: 17,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getUserLocation();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
};

const nextConfig = connect(mapStateToProps, mapDispatchToProps)(pageConfig);

Page(nextConfig);
