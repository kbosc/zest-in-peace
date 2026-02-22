import {afterEach, describe, expect, it} from "vitest";
import filtersReducer, {
    clearFilter,
    initialState,
    resetFilters,
    setActiveFilter,
    setAvailableFilters,
    setPanel,
} from "./filtersSlice";
import {STORAGE_KEYS} from "../../utils/localStorage/storageKeys.ts";

const getInitialState = () => initialState;

describe("filtersSlice", () => {
    afterEach(() => {
        localStorage.clear();
    });

    describe("initial state", () => {
        it("should have empty active filters by default", () => {
            const state = getInitialState();
            expect(state.active.name).toBe("");
            expect(state.active.foilOnly).toBe(false);
            expect(state.active.isNonFoilOnly).toBe(false);
            expect(state.active.onlineOnly).toBe(false);
            expect(state.active.cardCountMax).toBe(1000);
        });

        it("should hydrate name from localStorage", () => {
            filtersReducer(getInitialState(), setActiveFilter({id: "name", value: "Lord of the rings"}));
            expect(localStorage.getItem(STORAGE_KEYS.FILTER_NAME)).toBe('"Lord of the rings"');
        });

        it("should hydrate foilOnly from localStorage", () => {
            filtersReducer(getInitialState(), setActiveFilter({id: "foilOnly", value: true}));
            expect(localStorage.getItem(STORAGE_KEYS.FILTER_FOIL_ONLY)).toBe("true");
        });

        it("should hydrate cardCountMax to localStorage", () => {
            filtersReducer(getInitialState(), setActiveFilter({id: "cardCountMax", value: 200}));
            expect(localStorage.getItem(STORAGE_KEYS.FILTER_CARD_COUNT_MAX)).toBe("200");
        });

        it("should have panel closed by default", () => {
            expect(getInitialState().isPanelOpen).toBe(false);
        });
    });

    describe("setActiveFilter", () => {
        it("should update active.name", () => {
            const state = filtersReducer(getInitialState(), setActiveFilter({id: "name", value: "Theros"}));
            expect(state.active.name).toBe("Theros");
        });

        it("should update active.foilOnly", () => {
            const state = filtersReducer(getInitialState(), setActiveFilter({id: "foilOnly", value: true}));
            expect(state.active.foilOnly).toBe(true);
        });

        it("should update active.cardCountMax", () => {
            const state = filtersReducer(getInitialState(), setActiveFilter({id: "cardCountMax", value: 200}));
            expect(state.active.cardCountMax).toBe(200);
        });

        it("should not affect other filters when updating one", () => {
            let state = filtersReducer(getInitialState(), setActiveFilter({id: "foilOnly", value: true}));
            state = filtersReducer(state, setActiveFilter({id: "name", value: "Theros"}));
            expect(state.active.foilOnly).toBe(true);
            expect(state.active.name).toBe("Theros");
            expect(state.active.onlineOnly).toBe(false);
        });
    });

    describe("setAvailableFilters", () => {
        it("should update available filters", () => {
            const mockFilter = [{id: "name", type: "text" as const, label: "Name"}];
            const state = filtersReducer(getInitialState(), setAvailableFilters(mockFilter));
            expect(state.available).toEqual(mockFilter);
        });
    });

    describe("setPanel", () => {
        it("should open the panel", () => {
            const state = filtersReducer(getInitialState(), setPanel(true));
            expect(state.isPanelOpen).toBe(true);
        });

        it("should close the panel", () => {
            const stateOpened = filtersReducer(getInitialState(), setPanel(true));
            const state = filtersReducer(stateOpened, setPanel(false));
            expect(state.isPanelOpen).toBe(false);
        });
    });

    describe("resetFilters", () => {
        it("should reset all active filters to default values", () => {
            let state = filtersReducer(getInitialState(), setActiveFilter({id: "name", value: "Theros Beyond Death"}));
            state = filtersReducer(state, setActiveFilter({id: "foilOnly", value: true}));
            state = filtersReducer(state, setActiveFilter({id: "cardCountMax", value: 200}));

            state = filtersReducer(state, resetFilters());

            expect(state.active.name).toBe("");
            expect(state.active.foilOnly).toBe(false);
            expect(state.active.cardCountMax).toBe(1000);
        });

        it("should clear all filter keys from localStorage on reset", () => {
            filtersReducer(getInitialState(), setActiveFilter({id: "name", value: "Spidey"}));
            filtersReducer(getInitialState(), setActiveFilter({id: "foilOnly", value: true}));
            filtersReducer(getInitialState(), resetFilters());

            Object.values(STORAGE_KEYS).forEach((key) => {
                expect(localStorage.getItem(key)).toBeNull();
            });
        });

        it("should not reset isPanelOpen", () => {
            let state = filtersReducer(getInitialState(), setPanel(true));
            state = filtersReducer(state, resetFilters());
            expect(state.isPanelOpen).toBe(true);
        });
    });

    describe("clearFilter", () => {
        it("should reset only the name filter", () => {
            let state = filtersReducer(getInitialState(), setActiveFilter({id: "name", value: "Conspiracy"}));
            state = filtersReducer(state, setActiveFilter({id: "foilOnly", value: true}));
            state = filtersReducer(state, clearFilter({name: ""}));

            expect(state.active.name).toBe("");
            expect(state.active.foilOnly).toBe(true);
        });

        it("should reset only the foilOnly filter", () => {
            let state = filtersReducer(getInitialState(), setActiveFilter({id: "foilOnly", value: true}));
            state = filtersReducer(state, setActiveFilter({id: "onlineOnly", value: true}));
            state = filtersReducer(state, clearFilter({foilOnly: false}));

            expect(state.active.foilOnly).toBe(false);
            expect(state.active.onlineOnly).toBe(true);
        });

        it("should remove only the name key from localStorage", () => {
            filtersReducer(getInitialState(), setActiveFilter({id: "name", value: "New Capenna"}));
            filtersReducer(getInitialState(), setActiveFilter({id: "foilOnly", value: true}));

            filtersReducer(getInitialState(), clearFilter({name: ""}));

            expect(localStorage.getItem(STORAGE_KEYS.FILTER_NAME)).toBeNull();
            expect(localStorage.getItem(STORAGE_KEYS.FILTER_FOIL_ONLY)).toBe("true");
        });

        it("should remove only the foilOnly key from localStorage", () => {
            filtersReducer(getInitialState(), setActiveFilter({id: "name", value: "Theros"}));
            filtersReducer(getInitialState(), setActiveFilter({id: "foilOnly", value: true}));

            filtersReducer(getInitialState(), clearFilter({foilOnly: false}));

            expect(localStorage.getItem(STORAGE_KEYS.FILTER_FOIL_ONLY)).toBeNull();
            expect(localStorage.getItem(STORAGE_KEYS.FILTER_NAME)).toBe('"Theros"');
        });

        it("should not affect isPanelOpen", () => {
            let state = filtersReducer(getInitialState(), setPanel(true));
            state = filtersReducer(state, clearFilter({name: ""}));
            expect(state.isPanelOpen).toBe(true);
        });
    });
});

