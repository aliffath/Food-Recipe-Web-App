import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import myProductReducer from "./myProductReducer";

const rootReducers = combineReducers({
  authReducer,
  productReducer,
  myProductReducer,
});

export default rootReducers;
