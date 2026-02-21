import {configureStore} from "@reduxjs/toolkit";
import filtersReducer from "../features/filters/filtersSlice";
import setsReducer from "../features/sets/setsSlice";

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        sets: setsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;