import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import type {MtgSet} from "../../types/Sets";

interface SetsState {
    allSets: MtgSet[];
    isLoading: boolean;
    error: string | null;
}

export const initialState: SetsState = {
    allSets: [],
    isLoading: false,
    error: null,
};

const setsSlice = createSlice({
    name: "sets",
    initialState,
    reducers: {
        fetchSetsStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchSetsSuccess(state, action: PayloadAction<MtgSet[]>) {
            state.allSets = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        fetchSetsFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {fetchSetsStart, fetchSetsSuccess, fetchSetsFailure} = setsSlice.actions;

export default setsSlice.reducer;