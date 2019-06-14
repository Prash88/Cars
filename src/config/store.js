import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import combinedReducers from '../reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, combinedReducers)
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware, logger))
export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)