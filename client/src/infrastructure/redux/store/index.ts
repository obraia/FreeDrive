import { combineReducers } from 'redux';
import { useDispatch } from 'react-redux';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import themeReducer from '../reducers/theme';
import contextMenuReducer from '../reducers/context_menu';
import homeReducer from '../../../app/modules/home/reducers/home.reducer';

const reducers = combineReducers({
  theme: themeReducer,
  contextMenu: contextMenuReducer,
  home: homeReducer,
});

const persistConfig = {
  key: 'freedrive',
  storage: storage,
  blacklist: ['contextMenu', 'home'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export { store, persistor };
