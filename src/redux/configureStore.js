import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'remote-redux-devtools';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers';
import rootSaga from './sagas';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loadingReducer',],
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
export default () => ({store, persistor});
