import shallowEqual from "./shallowEqual.js";
import wrapActionCreators from "./wrapActionCreators.js";
const assign = Object.assign;

const defaultMapStateToProps = (state) => ({}); // eslint-disable-line no-unused-vars
const defaultMapDispatchToProps = (dispatch) => ({ dispatch });

function connect(mapStateToProps, mapDispatchToProps, opt = {}) {
  const shouldSubscribe = Boolean(mapStateToProps);
  const mapState = mapStateToProps || defaultMapStateToProps;
  const app = getApp();

  const isPage = !opt.component;

  let mapDispatch;
  if (typeof mapDispatchToProps === "function") {
    mapDispatch = mapDispatchToProps;
  } else if (!mapDispatchToProps) {
    mapDispatch = defaultMapDispatchToProps;
  } else {
    mapDispatch = wrapActionCreators(mapDispatchToProps);
  }

  return function wrapWithConnect(pageConfig) {
    function handleChange(options) {
      if (!this.unsubscribe) {
        return;
      }

      const state = this.store.getState();
      const mappedState = mapState(state, options);
      if (!this.data || shallowEqual(this.data, mappedState)) {
        return;
      }
      this.setData(mappedState);
    }

    const _onLoad = isPage ? pageConfig.onLoad : pageConfig.attached;
    const _onUnload = isPage ? pageConfig.onUnload : pageConfig.detached;

    function onLoad(options) {
      this.store = app.store;
      if (!this.store) {
        console.error("Store对象不存在!");
      }
      if (shouldSubscribe) {
        this.unsubscribe = this.store.subscribe(
          handleChange.bind(this, options)
        );
        handleChange.call(this, options);
      }
      if (typeof _onLoad === "function") {
        _onLoad.call(this, options);
      }
    }

    function onUnload() {
      if (typeof _onUnload === "function") {
        _onUnload.call(this);
      }
      typeof this.unsubscribe === "function" && this.unsubscribe();
    }

    const mixin = isPage
      ? {
          onLoad,
          onUnload,
        }
      : {
          attached: onLoad,
          detached: onUnload,
        };

    return assign(
      {},
      pageConfig,
      mapDispatch(app.store.dispatch, app.store.getState),
      { dispatch: app.store.dispatch },
      mixin
    );
  };
}

export default connect;
