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

/**
 * Add a new entry here when adding a new filter
 */
const FILTER_STORAGE_MAP: Partial<Record<keyof ActiveFilters, string>> = {
    name: STORAGE_KEYS.FILTER_NAME,
    foilOnly: STORAGE_KEYS.FILTER_FOIL_ONLY,
    isNonFoilOnly: STORAGE_KEYS.FILTER_IS_NON_FOIL_ONLY,
    onlineOnly: STORAGE_KEYS.FILTER_ONLINE_ONLY,
    cardCountMax: STORAGE_KEYS.FILTER_CARD_COUNT_MAX,
};

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
        setActiveFilter(state, action: PayloadAction<{id: keyof ActiveFilters; value: ActiveFilters[keyof ActiveFilters]}>) {
            const {id, value} = action.payload;
            (state.active[id] as typeof value) = value;
            const storageKey = FILTER_STORAGE_MAP[id];
            if (storageKey) saveToStorage(storageKey, value);
        },
        resetFilters(state) {
            state.active = defaultActive;
            Object.values(STORAGE_KEYS).forEach(removeFromStorage);
        },
        clearFilter(state, action: PayloadAction<Partial<ActiveFilters>>) {
            state.active = {...state.active, ...action.payload};
            Object.keys(action.payload).forEach((id) => {
                const storageKey = FILTER_STORAGE_MAP[id as keyof ActiveFilters];
                if (storageKey) removeFromStorage(storageKey);
            });
        },
        setPanel(state, action: PayloadAction<boolean>) {
            state.isPanelOpen = action.payload;
        },
    },
});

export const {
    setAvailableFilters,
    setActiveFilter,
    resetFilters,
    clearFilter,
    setPanel,
} = filtersSlice.actions;

export default filtersSlice.reducer;
