import {describe, expect, it} from "vitest";
import {filterTags} from "./filterTags";
import {defaultActive} from "../../features/filters/filtersSlice.constants.ts";

describe("filterTags", () => {
    describe("cardCountMax tag", () => {
        it("should always include a cardCountMax tag", () => {
            const tags = filterTags(defaultActive);
            expect(tags.some((tag) => tag.includes("Max 1000 cards"))).toBe(true);
        });

        it("should use 'cards' when cardCountMax is greater than 1", () => {
            const tags = filterTags({...defaultActive, cardCountMax: 500});
            expect(tags).toContain("Max 500 cards");
        });

        it("should use 'card' when cardCountMax is 1", () => {
            const tags = filterTags({...defaultActive, cardCountMax: 1});
            expect(tags).toContain("Max 1 card");
        });

        it("should use 'card' when cardCountMax is 0", () => {
            const tags = filterTags({...defaultActive, cardCountMax: 0});
            expect(tags).toContain("Max 0 card");
        });
    });

    describe("name tag", () => {
        it("should include a name tag when name is not empty", () => {
            const tags = filterTags({...defaultActive, name: "Lorwyn"});
            expect(tags).toContain('Name contains "Lorwyn"');
        });

        it("should not include a name tag when name is empty", () => {
            const tags = filterTags({...defaultActive, name: ""});
            expect(tags.some((t) => t.includes("Name contains"))).toBe(false);
        });

        it("should not include a name tag when name is only spaces", () => {
            const tags = filterTags({...defaultActive, name: "   "});
            expect(tags.some((t) => t.includes("Name contains"))).toBe(false);
            expect(tags).toHaveLength(1);
            expect(tags[0]).toBe("Max 1000 cards");
        });
    });

    describe("foilOnly tag", () => {
        it("should include a foil tag when foilOnly is true", () => {
            const tags = filterTags({...defaultActive, foilOnly: true});
            expect(tags).toContain("It shines");
        });

        it("should not include a foil tag when foilOnly is false", () => {
            const tags = filterTags({...defaultActive, foilOnly: false});
            expect(tags).not.toContain("It shines");
        });
    });

    describe("isNonFoilOnly tag", () => {
        it("should include a non-foil tag when isNonFoilOnly is true", () => {
            const tags = filterTags({...defaultActive, isNonFoilOnly: true});
            expect(tags).toContain("No shine");
        });

        it("should not include a non-foil tag when isNonFoilOnly is false", () => {
            const tags = filterTags({...defaultActive, isNonFoilOnly: false});
            expect(tags).not.toContain("No shine");
        });
    });

    describe("onlineOnly tag", () => {
        it("should include an online tag when onlineOnly is true", () => {
            const tags = filterTags({...defaultActive, onlineOnly: true});
            expect(tags).toContain("Online only");
        });

        it("should not include an online tag when onlineOnly is false", () => {
            const tags = filterTags({...defaultActive, onlineOnly: false});
            expect(tags).not.toContain("Online only");
        });
    });

    describe("combined filters", () => {
        it("should return only the cardCountMax tag when no filter is active", () => {
            const tags = filterTags(defaultActive);
            expect(tags).toHaveLength(1);
            expect(tags[0]).toBe("Max 1000 cards");
        });

        it("should return all tags when all filters are active", () => {
            const tags = filterTags({
                name: "Theros",
                foilOnly: true,
                isNonFoilOnly: true,
                onlineOnly: true,
                cardCountMax: 200,
            });
            expect(tags).toHaveLength(5);
        });
    });
});

