import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pet } from "@/utils/types";

type FavListState = {
    data: Pet[]
}

const initialState: FavListState = {
    data: []
}

export const favSlice = createSlice({
    name: 'favSlice',
    initialState,
    reducers: {
        // addToFav: (state, action: PayloadAction<Pet>) => {
        //     state.data.push(action.payload);
        // },
        // deleteFromFav: (state, action: PayloadAction<Pet["id"]>) => {
        //     state.data = state.data.filter(item => item.id != action.payload);
        // },
        toggleFav(state, action: PayloadAction<Pet>) {
            let favToFind = state.data.find(item => item.id === action.payload.id);

            if (!favToFind) {
                state.data.push(action.payload);
            } else {
                state.data = state.data.filter(item => item.id != action.payload.id)
            }
        },
        cleanMyFav(state) {
            state.data = []
        },
    }
})
export const { toggleFav, cleanMyFav } = favSlice.actions