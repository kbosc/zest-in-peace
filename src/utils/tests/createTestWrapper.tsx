import {type ReactNode} from "react";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import filtersReducer from "../../features/filters/filtersSlice";
import setsReducer from "../../features/sets/setsSlice";

/**
 * Create fresh Redux store for each test.
 */
export const createTestStore = () =>
    configureStore({
        reducer: {
            filters: filtersReducer,
            sets: setsReducer,
        },
    });

export type TestStore = ReturnType<typeof createTestStore>;

/**
 * Creates a renderHook wrapper with a fresh Redux Provider.
 * Use this with renderHook({ wrapper: createTestWrapper() }).
 *
 * @example
 * const store = createTestStore();
 * const { result } = renderHook(() => useMyHook(), {
 *   wrapper: createTestWrapper(store),
 * });
 */
export const createTestWrapper = (store: TestStore) =>
    ({children}: { children: ReactNode }) => (
        <Provider store={store}>{children}</Provider>
    );

