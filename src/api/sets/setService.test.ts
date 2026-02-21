import {beforeEach, describe, expect, it, vi} from "vitest";
import {fetchSetList} from "./setService";
import {getMtgjsonClient} from "../mtgjsonClient";
import type {MtgjsonListResponse, MtgSet} from "../../types/Card";
import {mockSet} from "../../mocks/mtgjson/setListMock";

vi.mock("../mtgjsonClient");

const mockResponse: MtgjsonListResponse<MtgSet> = {
    data: [mockSet],
    meta: {date: "2024-01-01", version: "5.0.0"},
};

describe("setService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should return result list card when fetch is success", async () => {
        vi.mocked(getMtgjsonClient.get).mockResolvedValueOnce({data: mockResponse});

        const result = await fetchSetList();

        expect(result).toEqual([mockSet]);
        expect(getMtgjsonClient.get).toHaveBeenCalledWith("/SetList.json");
        expect(getMtgjsonClient.get).toHaveBeenCalledTimes(1);
    });

    it("should return error when is rejected", async () => {
        const networkError = new Error("Wizzard abuse detected");
        vi.mocked(getMtgjsonClient.get).mockRejectedValueOnce(networkError);

        await expect(fetchSetList()).rejects.toThrow("Wizzard abuse detected");
    });
});

