import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth.slice";
import { petsFiltersSlice } from "./slices/petsFilters.slice";

export const store = configureStore({
	reducer: {
		petsFilters: petsFiltersSlice.reducer,
		auth: authSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
