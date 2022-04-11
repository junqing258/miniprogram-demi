import { combineReducers } from "./lib/redux";
import { reducer as common } from "./modules/common";

export default combineReducers({
  common,
});
