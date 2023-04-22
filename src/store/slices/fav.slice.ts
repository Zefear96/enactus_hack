import { storageGetItem, storageSetItem } from "@/utils/storage";
import { createAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pet } from "@/utils/types";

export const loadFromLocalStorage = createAsyncThunk("favSlice/loadFromLocalStorage", async () => {
    let favList = await storageGetItem("favList");

    // if (!favList) {
    //     await storageSetItem("favList", []);

    // };

    return favList
});

type FavListState = {
    data: Pet[] | null
}

const initialState: FavListState = {
    data: null
}

export const favSlice = createSlice({
    name: 'favSlice',
    initialState,
    reducers: {
        addToFav: (state, action) => {
            state.data = action.payload.data
        },
        deleteFromFav: (state, action) => {
            state.data = action.payload.data
        },
        cleanMyFav: (state, action) => {
            state.data = null
        }
    },
    extraReducers: builder => {
        builder.addCase(loadFromLocalStorage.fulfilled, (state, action) => {
            state.data = action.payload.data ?? null
        })
    }
})

export const { addToFav, deleteFromFav, cleanMyFav } = favSlice.actions