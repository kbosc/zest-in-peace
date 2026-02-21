import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {ActiveFilters, AvailableFilter} from "../../types/Filters.ts";

interface FiltersState {
  available: AvailableFilter[];
  active: ActiveFilters;
}

const initialState: FiltersState = {
  available: [],
  active: {
    name: "",
    foilOnly: false,
    isNonFoilOnly: false,
    onlineOnly: false,
    cardCount: {
      min: 0,
      max: 1000,
    },
  },
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
    },
    setFoilOnly(state, action: PayloadAction<boolean>) {
      state.active.foilOnly = action.payload;
    },
    setOnlineOnly(state, action: PayloadAction<boolean>) {
      state.active.onlineOnly = action.payload;
    },
    setCardCountRange(state, action: PayloadAction<{ min: number; max: number }>) {
      state.active.cardCount = action.payload;
    },
    resetFilters(state) {
      state.active = initialState.active;
    },
  },
});

export const {
  setAvailableFilters,
  setNameFilter,
  setFoilOnly,
  setOnlineOnly,
  setCardCountRange,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;


