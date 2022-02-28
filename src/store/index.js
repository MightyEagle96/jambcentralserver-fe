import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../redux/reducers";

const middleware = [thunk];
const persistConfig = {
  key: "persist-config",
  storage,
};
const initialState = {};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store =
  createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  ) || "";

export const persistor = persistStore(store) || "";
