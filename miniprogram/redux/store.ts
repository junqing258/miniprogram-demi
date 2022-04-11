import { applyMiddleware, compose, createStore } from "./lib/redux";
// import createSagaMiddleware from 'redux-saga';
import rootReducer from "./reducers";
// import rootSaga from '../saga';
// import { PreloadedStateType } from './type';

export default (preloadedState: any) => {
  // 创建saga中间件
  // const sagaMiddleware = createSagaMiddleware();
  const middleWares: any[] = [];
  const middlewareEnhancer = applyMiddleware(...middleWares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers: any = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  // sagaMiddleware.run(rootSaga);

  return store;
};
