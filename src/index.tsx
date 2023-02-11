import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import cardReducer from './pages/cards/cardReducer';
import boxReducer from './pages/boxes/boxReducer';
import userReducer from './pages/user/userReducer';

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  boxReducer: boxReducer,
  cardReducer: cardReducer,
  userReducer: userReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunkMiddleware],
})

export type RootState = {
  boxReducer: ReturnType<typeof boxReducer>;
  cardReducer: ReturnType<typeof cardReducer>;
  userReducer: ReturnType<typeof userReducer>;
};

export const persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
