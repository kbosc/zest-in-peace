import {describe, expect, it} from "vitest";
import setsReducer, {fetchSetsFailure, fetchSetsStart, fetchSetsSuccess, initialState,} from "./setsSlice";
import {mockSet} from "../../mocks/mtgjson/setListMock";

const getInitialState = () => initialState;

describe("setsSlice", () => {
    describe("initial state", () => {
        it("should have an empty sets list", () => {
            expect(getInitialState().allSets).toEqual([]);
        });

        it("should not be loading", () => {
            expect(getInitialState().isLoading).toBe(false);
        });

        it("should have no error", () => {
            expect(getInitialState().error).toBeNull();
        });
    });

    describe("fetchSetsStart", () => {
        it("should set isLoading to true", () => {
            const state = setsReducer(initialState, fetchSetsStart());
            expect(state.isLoading).toBe(true);
        });

        it("should clear any existing error", () => {
            const stateWithError = {...initialState, error: "Misere de misere"};
            const state = setsReducer(stateWithError, fetchSetsStart());
            expect(state.error).toBeNull();
        });

        it("should not clear existing sets while loading", () => {
            const stateWithSets = {...initialState, allSets: [mockSet]};
            const state = setsReducer(stateWithSets, fetchSetsStart());
            expect(state.allSets).toEqual([mockSet]);
        });
    });

    describe("fetchSetsSuccess", () => {
        it("should store the fetched sets", () => {
            const state = setsReducer(initialState, fetchSetsSuccess([mockSet]));
            expect(state.allSets).toEqual([mockSet]);
        });

        it("should set isLoading to false", () => {
            const loadingState = {...initialState, isLoading: true};
            const state = setsReducer(loadingState, fetchSetsSuccess([mockSet]));
            expect(state.isLoading).toBe(false);
        });

        it("should clear any existing error", () => {
            const stateWithError = {...initialState, error: "Encore du travail..."};
            const state = setsReducer(stateWithError, fetchSetsSuccess([mockSet]));
            expect(state.error).toBeNull();
        });
    });

    describe("fetchSetsFailure", () => {
        it("should store the error message", () => {
            const state = setsReducer(initialState, fetchSetsFailure("JEANNE !!!"));
            expect(state.error).toBe("JEANNE !!!");
        });

        it("should set isLoading to false", () => {
            const loadingState = {...initialState, isLoading: true};
            const state = setsReducer(loadingState, fetchSetsFailure("Error"));
            expect(state.isLoading).toBe(false);
        });
    });

    describe("full fetch cycle", () => {
        it("should start until success correctly", () => {
            let state = setsReducer(initialState, fetchSetsStart());
            expect(state.isLoading).toBe(true);
            expect(state.error).toBeNull();

            state = setsReducer(state, fetchSetsSuccess([mockSet]));
            expect(state.isLoading).toBe(false);
            expect(state.allSets).toEqual([mockSet]);
            expect(state.error).toBeNull();
        });

        it("should start until failure correctly", () => {
            let state = setsReducer(initialState, fetchSetsStart());
            expect(state.isLoading).toBe(true);

            state = setsReducer(state, fetchSetsFailure("Oh mince..."));
            expect(state.isLoading).toBe(false);
            expect(state.error).toBe("Oh mince...");
            expect(state.allSets).toEqual([]);
        });
    });
});

