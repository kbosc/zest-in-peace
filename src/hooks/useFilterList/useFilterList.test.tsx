import {beforeEach, describe, expect, it, vi} from "vitest";
import {renderHook, waitFor} from "@testing-library/react";
import useFilterList from "./useFilterList";
import * as filterService from "../../api/filters/filterService";
import {filtersMock} from "../../mocks/filters/filtersMock";
import {createTestStore, createTestWrapper} from "../../utils/tests/createTestWrapper";

vi.mock("../../api/filters/filterService");

describe("useFilterList", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should return isLoading true then filters when loaded", async () => {
        vi.mocked(filterService.fetchAvailableFilters).mockResolvedValueOnce(filtersMock);
        const store = createTestStore();

        const {result} = renderHook(() => useFilterList(), {
            wrapper: createTestWrapper(store),
        });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.filters).toEqual([]);

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.filters).toEqual(filtersMock);
    });

    it("should dispatch filters into the Redux store", async () => {
        vi.mocked(filterService.fetchAvailableFilters).mockResolvedValueOnce(filtersMock);
        const store = createTestStore();

        renderHook(() => useFilterList(), {wrapper: createTestWrapper(store)});

        await waitFor(() =>
            expect(store.getState().filters.available.length).toBeGreaterThan(0)
        );

        expect(store.getState().filters.available).toEqual(filtersMock);
    });

    it("should not re-fetch if filters are already in the store", async () => {
        vi.mocked(filterService.fetchAvailableFilters).mockResolvedValueOnce(filtersMock);
        const store = createTestStore();

        const {rerender} = renderHook(() => useFilterList(), {
            wrapper: createTestWrapper(store),
        });
        await waitFor(() =>
            expect(store.getState().filters.available.length).toBeGreaterThan(0)
        );

        rerender();

        expect(filterService.fetchAvailableFilters).toHaveBeenCalledTimes(1);
    });
});
