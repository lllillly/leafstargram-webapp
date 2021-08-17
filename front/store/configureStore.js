import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducers";
import rootSaga from "../sagas";
import createSagaMiddleware from "redux-saga";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "product"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(reducer, enhancer);

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const reduxWrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default reduxWrapper;
