// import store from '../store';
// import { storage } from '../../utils';
import platform from '../platform';
import qs from 'qs';

class Reporter {
  constructor() {
    // 需要发送的追踪信息的队列
    this.queue = [];
    this.timerId;
  }
  /**
   * 追踪埋点数据
   * @param {*} data 需要上报的数据
   */
  track(type, data = {}) {
    // 添加一些公共信息字段
    data.t = type;

    this.queue.push(qs.stringify(data));

    if (!this.timerId) {
      // 为了不影响正常的业务请求，这里延时发出我们的埋点信息
      this.timerId = setTimeout(() => {
        this._flush();
      }, store.get('config').delay);
    }
  }
  /**
   * 执行队列中的任务(向后台发送追踪信息)
   */
  _flush() {
    const config = store.get('config');

    // 队列中有数据时进行请求
    if (this.queue.length > 0) {
      const data = this.queue.shift();
      platform.request({
        // 请求地址
        url: config.url,
        // 超时时间
        timeout: config.request_timeout,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          ak: config.ak,
          cid: storage.get('cid'),
          ns: store.get('networkType'),
          uid: storage.get('uid') || 0,
          data: Date.now(),
          data,
        },
        // TODO 发送失败的时候将该次信息保存的storage中
        success: () => {},
        fail: ({ errMsg }) => {
          console.error(errMsg);
        },
        complete: () => {
          // 执行完成后发送下一个信息
          this._flush();
        },
      });
    } else {
      this.timerId = null;
    }
  }
}

export default new Reporter();
