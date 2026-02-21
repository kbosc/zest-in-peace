import {beforeEach, describe, expect, it, vi} from "vitest";
import {renderHook, waitFor} from "@testing-library/react";
import useSetList from "./useSetList";
import * as setService from "../../api/sets/setService";
import {mockSet} from "../../mocks/mtgjson/setListMock";
import {createTestStore, createTestWrapper} from "../../utils/tests/createTestWrapper";
import type {MtgSet} from "../../types/Sets";

vi.mock("../../api/sets/setService");

const mockSets: MtgSet[] = [mockSet];

describe("useSetList", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should return isLoading true then the set list when loaded", async () => {
        vi.mocked(setService.fetchSetList).mockResolvedValueOnce(mockSets);
        const store = createTestStore();

        const {result} = renderHook(() => useSetList(), {
            wrapper: createTestWrapper(store),
        });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.sets).toEqual([]);
        expect(result.current.error).toBeNull();

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.sets).toEqual(mockSets);
        expect(result.current.error).toBeNull();
    });

    it("should return error when fetch is rejected", async () => {
        vi.mocked(setService.fetchSetList).mockRejectedValueOnce(new Error("Error"));
        const store = createTestStore();

        const {result} = renderHook(() => useSetList(), {
            wrapper: createTestWrapper(store),
        });

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.error).toBe("Error when sets fetched");
        expect(result.current.sets).toEqual([]);
    });

    it("should not re-fetch if sets are already in the store", async () => {
        vi.mocked(setService.fetchSetList).mockResolvedValueOnce(mockSets);
        const store = createTestStore();

        const {rerender} = renderHook(() => useSetList(), {
            wrapper: createTestWrapper(store),
        });
        await waitFor(() => expect(store.getState().sets.allSets.length).toBeGreaterThan(0));

        rerender();

        expect(setService.fetchSetList).toHaveBeenCalledTimes(1);
    });
});
