// pages/home/components/InfoPanel.ts

import { connect } from "../../../../redux/connect";
import { ActionType, getUserLocation } from "../../../../redux/modules/common";
import { isEmpty } from "../../../../utils/util";

const mapStateToData = (state: any) => ({
  ...state.common,
  hasUserInfo: !isEmpty(state.common.userInfo),
});

const mapDispatchToMethod = (dispatch: any) => ({
  login: () => dispatch({ type: ActionType.LOGIN, payload: true }),
  getUserLocation: () => getUserLocation(dispatch),
});

const config = {
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {},
};

const nextConfig = connect(mapStateToData, mapDispatchToMethod, {
  component: true,
})(config);

Component(nextConfig);
