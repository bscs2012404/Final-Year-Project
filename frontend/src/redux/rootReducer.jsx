import { combineReducers } from "redux";

import customiseReducer from "./customise/customiseReducer";
import authReducer from "./auth/authReducer";
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';
// import localStorage from "redux-persist/es/storage";



const rootReducer = combineReducers({
  auth: authReducer,
  customise: customiseReducer,
});

// export default rootReducer;
export default rootReducer;
