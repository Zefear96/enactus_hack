import { configureStore } from "@reduxjs/toolkit";
import { petsFiltersSlice } from "./slices/petsFilters.slice";

export const store = configureStore({
	reducer: {
		petsFilters: petsFiltersSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
