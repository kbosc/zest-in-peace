import {describe, expect, it} from "vitest";
import {filterSets} from "./filterSets";
import {mockSet} from "../mocks/mtgjson/setListMock";
import type {MtgSet} from "../types/Sets";
import {defaultActive} from "../features/filters/filtersSlice.constants.ts";

const foilSet: MtgSet = {
    ...mockSet,
    name: "Foil Set",
    isOnlineOnly: false,
    isNonFoilOnly: false,
    totalSetSize: 800,
    isFoilOnly: true
};
const onlineSet: MtgSet = {
    ...mockSet,
    name: "Online Set",
    isFoilOnly: false,
    isNonFoilOnly: false,
    totalSetSize: 800,
    isOnlineOnly: true
};
const nonFoilSet: MtgSet = {
    ...mockSet,
    name: "Non-Foil Set",
    isOnlineOnly: false,
    isFoilOnly: false,
    totalSetSize: 800,
    isNonFoilOnly: true
};
const largeSet: MtgSet = {
    ...mockSet,
    name: "Shine",
    isOnlineOnly: false,
    isFoilOnly: true,
    isNonFoilOnly: false,
    totalSetSize: 800
};

const allSets = [mockSet, foilSet, onlineSet, nonFoilSet, largeSet];

describe("filterSets", () => {
    describe("no filters active", () => {
        it("should return all sets when no filter is active", () => {
            expect(filterSets(allSets, defaultActive)).toHaveLength(allSets.length);
        });

        it("should return an empty array when sets list is empty", () => {
            expect(filterSets([], defaultActive)).toEqual([]);
        });
    });

    describe("name filter", () => {
        it("should filter sets by name (case insensitive)", () => {
            const result = filterSets(allSets, {...defaultActive, name: "theros"});
            expect(result).toHaveLength(1);
            expect(result[0].code).toBe("THB");
        });

        it("should return multiple results when name matches several sets", () => {
            const result = filterSets(allSets, {...defaultActive, name: "set"});
            expect(result.length).toBeGreaterThan(1);
        });

        it("should return empty when no set matches the name", () => {
            const result = filterSets(allSets, {...defaultActive, name: "zzznomatch"});
            expect(result).toHaveLength(0);
        });

        it("should return all sets when name filter is empty string", () => {
            const result = filterSets(allSets, {...defaultActive, name: ""});
            expect(result).toHaveLength(allSets.length);
        });
    });

    describe("foilOnly filter", () => {
        it("should return only foil sets when foilOnly is true", () => {
            const result = filterSets(allSets, {...defaultActive, foilOnly: true});
            expect(result.every((s) => s.isFoilOnly)).toBe(true);
        });

        it("should return all sets when foilOnly is false", () => {
            expect(filterSets(allSets, {...defaultActive, foilOnly: false})).toHaveLength(allSets.length);
        });
    });

    describe("isNonFoilOnly filter", () => {
        it("should return only non-foil sets when isNonFoilOnly is true", () => {
            const result = filterSets(allSets, {...defaultActive, isNonFoilOnly: true});
            expect(result.every((s) => s.isNonFoilOnly)).toBe(true);
        });

        it("should return all sets when isNonFoilOnly is false", () => {
            expect(filterSets(allSets, {...defaultActive, isNonFoilOnly: false})).toHaveLength(allSets.length);
        });
    });

    describe("onlineOnly filter", () => {
        it("should return only online sets when onlineOnly is true", () => {
            const result = filterSets(allSets, {...defaultActive, onlineOnly: true});
            expect(result.every((s) => s.isOnlineOnly)).toBe(true);
        });

        it("should return all sets when onlineOnly is false", () => {
            expect(filterSets(allSets, {...defaultActive, onlineOnly: false})).toHaveLength(allSets.length);
        });
    });

    describe("cardCountMax filter", () => {
        it("should exclude sets with totalSetSize above cardCountMax", () => {
            const result = filterSets(allSets, {...defaultActive, cardCountMax: 400});
            expect(result.find((s) => s.name === "Shine")).toBeUndefined();
        });

        it("should include sets with totalSetSize equal to cardCountMax", () => {
            const result = filterSets(allSets, {...defaultActive, cardCountMax: 358});
            expect(result.find((s) => s.code === "THB")).toBeDefined();
        });

        it("should return no sets when cardCountMax is 0", () => {
            const result = filterSets(allSets, {...defaultActive, cardCountMax: 0});
            expect(result).toHaveLength(0);
        });
    });

    describe("combined filters", () => {
        it("should apply multiple filters simultaneously", () => {
            const result = filterSets(allSets, {
                ...defaultActive,
                name: "Shine",
                foilOnly: true,
            });
            expect(result).toHaveLength(1);
            expect(result[0].name).toBe("Shine");
        });

        it("should return empty when filters are contradictory", () => {
            const result = filterSets(allSets, {
                ...defaultActive,
                foilOnly: true,
                onlineOnly: true,
            });
            expect(result).toHaveLength(0);
        });
    });
});

