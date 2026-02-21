import {beforeEach, describe, expect, it, vi} from "vitest";
import {renderHook, waitFor} from "@testing-library/react";
import useSetList from "./useSetList.ts";
import * as setService from "../../api/setService.ts";
import type {MtgSet} from "../../types/Card.ts";
import {mockSet} from "../../mocks/mtgjson/setListMock.ts";

vi.mock("../api/setService");

const mockSets: MtgSet[] = [
    mockSet
];

describe("useSetList", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should return isLoading true then the set list when loaded", async () => {
        vi.mocked(setService.fetchSetList).mockResolvedValueOnce(mockSets);

        const {result} = renderHook(() => useSetList());

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.sets).toEqual(mockSets);
        expect(result.current.error).toBeNull();
    });

    it("should return error when rejected", async () => {
        vi.mocked(setService.fetchSetList).mockRejectedValueOnce(new Error("Wizzard abuse detected"));

        const {result} = renderHook(() => useSetList());

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.error).toBe("Error when sets fetched");
        expect(result.current.sets).toEqual([]);
    });
});

