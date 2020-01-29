import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

let middleware = [thunk];

let store;

if (process.env.NODE_ENV === "production") {
  store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
} else {
  middleware = [thunk];
  store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}

export default store;
