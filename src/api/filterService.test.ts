import {describe, expect, it} from "vitest";
import {fetchAvailableFilters} from "./filterService";
import {filtersMock} from "../mocks/filters/filtersMock";

describe("filterService", () => {
    it("should return the list of available filters", async () => {
        const result = await fetchAvailableFilters();
        expect(result).toEqual(filtersMock);
    });
});