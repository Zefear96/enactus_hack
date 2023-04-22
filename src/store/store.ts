import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { authSlice } from "./slices/auth.slice";
import { petsFiltersSlice } from "./slices/petsFilters.slice";
import { favSlice } from "./slices/fav.slice";

export const store = configureStore({
	reducer: {
		petsFilters: petsFiltersSlice.reducer,
		auth: authSlice.reducer,
		fav: persistReducer(
			{ key: 'favorites', storage },
			favSlice.reducer
		),
	},
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
