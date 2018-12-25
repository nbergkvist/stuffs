import { Iterable } from "immutable";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const loggerMiddleware = createLogger({
  stateTransformer: state => {
    let newState = {};

    for (var i of Object.keys(state)) {
      if (Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    }
    return newState;
  }
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(
    process.env.NODE_ENV === "development"
      ? applyMiddleware(loggerMiddleware, sagaMiddleware)
      : applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);
