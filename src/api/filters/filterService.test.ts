import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {fetchAvailableFilters} from "./filterService";
import {filtersMock} from "../../mocks/filters/filtersMock";

const mockFetchSuccess = (data: unknown) =>
    vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(data),
    } as Response);

const mockFetchError = (status: number) =>
    vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status,
    } as Response);

describe("filterService", () => {
    beforeEach(() => {
        vi.stubGlobal("fetch", vi.fn());
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("should return the list of available filters", async () => {
        mockFetchSuccess(filtersMock);

        expect(await fetchAvailableFilters()).toEqual(filtersMock);
    });

    it("should call the correct mock JSON endpoint", async () => {
        mockFetchSuccess(filtersMock);
        await fetchAvailableFilters();

        expect(fetch).toHaveBeenCalledWith("/mocks/filters.json");
    });

    it("should return a text filter for name search", async () => {
        mockFetchSuccess(filtersMock);
        const result = await fetchAvailableFilters();
        const nameFilter = result.find((f) => f.id === "name");

        expect(nameFilter?.type).toBe("text");
    });

    it("should return boolean filters for foilOnly, isNonFoilOnly and onlineOnly", async () => {
        mockFetchSuccess(filtersMock);
        const result = await fetchAvailableFilters();

        expect(result.find((f) => f.id === "foilOnly")?.type).toBe("boolean");
        expect(result.find((f) => f.id === "isNonFoilOnly")?.type).toBe("boolean");
        expect(result.find((f) => f.id === "onlineOnly")?.type).toBe("boolean");
    });

    it("should return a range filter for cardCount", async () => {
        mockFetchSuccess(filtersMock);
        const result = await fetchAvailableFilters();

        expect(result.find((f) => f.id === "cardCount")?.type).toBe("range");
    });

    it("should throw when the response is not ok", async () => {
        mockFetchError(404);

        await expect(fetchAvailableFilters()).rejects.toThrow("Failed to fetch filters: 404");
    });
});