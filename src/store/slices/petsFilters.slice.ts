import { FetchPetsArg } from "@/services/pets/fetchPets";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: FetchPetsArg = {
	// _sort: "created_at",
	ordering: "title",
	search: "",
	page: 1,
	_limit: 6,
};

export const petsFiltersSlice = createSlice({
	name: "petsFiltersSlice",
	initialState: initialState,
	reducers: {
		setOrdering(state, action: PayloadAction<FetchPetsArg["ordering"]>) {
			state.ordering = action.payload;
		},
		setSearchText(state, action: PayloadAction<string>) {
			state.search = action.payload;
		},
		setPage(state, action: PayloadAction<number>) {
			state.page = action.payload;
		},
	},
});

export const {
	actions: { setSearchText, setPage, setOrdering },
} = petsFiltersSlice;
