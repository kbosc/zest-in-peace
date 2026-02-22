import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import type {ActiveFilters, AvailableFilter} from "../../types/Filters.ts";
import {loadFromStorage, removeFromStorage, saveToStorage} from "../../utils/localStorage/localStorage.ts";
import {STORAGE_KEYS} from "../../utils/localStorage/storageKeys.ts";
import {defaultActive} from "./filtersSlice.constants.ts";

interface FiltersState {
    available: AvailableFilter[];
    active: ActiveFilters;
    isPanelOpen: boolean;
}

export const initialState: FiltersState = {
    available: [],
    active: {
        name: loadFromStorage<string>(STORAGE_KEYS.FILTER_NAME) ?? defaultActive.name,
        foilOnly: loadFromStorage<boolean>(STORAGE_KEYS.FILTER_FOIL_ONLY) ?? defaultActive.foilOnly,
        isNonFoilOnly: loadFromStorage<boolean>(STORAGE_KEYS.FILTER_IS_NON_FOIL_ONLY) ?? defaultActive.isNonFoilOnly,
        onlineOnly: loadFromStorage<boolean>(STORAGE_KEYS.FILTER_ONLINE_ONLY) ?? defaultActive.onlineOnly,
        cardCountMax: loadFromStorage<number>(STORAGE_KEYS.FILTER_CARD_COUNT_MAX) ?? defaultActive.cardCountMax,
    },
    isPanelOpen: false,
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setAvailableFilters(state, action: PayloadAction<AvailableFilter[]>) {
            state.available = action.payload;
        },
        setNameFilter(state, action: PayloadAction<string>) {
            state.active.name = action.payload;
            saveToStorage(STORAGE_KEYS.FILTER_NAME, action.payload);
        },
        setFoilOnly(state, action: PayloadAction<boolean>) {
            state.active.foilOnly = action.payload;
            saveToStorage(STORAGE_KEYS.FILTER_FOIL_ONLY, action.payload);
        },
        setIsNonFoilOnly(state, action: PayloadAction<boolean>) {
            state.active.isNonFoilOnly = action.payload;
            saveToStorage(STORAGE_KEYS.FILTER_IS_NON_FOIL_ONLY, action.payload);
        },
        setOnlineOnly(state, action: PayloadAction<boolean>) {
            state.active.onlineOnly = action.payload;
            saveToStorage(STORAGE_KEYS.FILTER_ONLINE_ONLY, action.payload);
        },
        setCardCountMax(state, action: PayloadAction<number>) {
            state.active.cardCountMax = action.payload;
            saveToStorage(STORAGE_KEYS.FILTER_CARD_COUNT_MAX, action.payload);
        },
        resetFilters(state) {
            state.active = defaultActive;
            Object.values(STORAGE_KEYS).forEach(removeFromStorage);
        },
        setPanel(state, action: PayloadAction<boolean>) {
            state.isPanelOpen = action.payload;
        },
    },
});

export const {
    setAvailableFilters,
    setNameFilter,
    setFoilOnly,
    setIsNonFoilOnly,
    setOnlineOnly,
    setCardCountMax,
    resetFilters,
    setPanel,
} = filtersSlice.actions;

export default filtersSlice.reducer;
