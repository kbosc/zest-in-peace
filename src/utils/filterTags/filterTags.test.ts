import {describe, expect, it} from "vitest";
import {filterTags} from "./filterTags";
import {defaultActive} from "../../features/filters/filtersSlice.constants";

describe("filterTags", () => {
    describe("cardCountMax tag", () => {
        it("should always include a cardCountMax tag", () => {
            const tags = filterTags(defaultActive);
            expect(tags.some((tag) => tag.key === "cardCountMax")).toBe(true);
        });

        it("should use 'cards' when cardCountMax is greater than 1", () => {
            const tags = filterTags({...defaultActive, cardCountMax: 500});
            expect(tags.find((tag) => tag.key === "cardCountMax")?.label).toBe("Max 500 cards");
        });

        it("should use 'card' when cardCountMax is 1", () => {
            const tags = filterTags({...defaultActive, cardCountMax: 1});
            expect(tags.find((tag) => tag.key === "cardCountMax")?.label).toBe("Max 1 card");
        });

        it("should use 'card' when cardCountMax is 0", () => {
            const tags = filterTags({...defaultActive, cardCountMax: 0});
            expect(tags.find((tag) => tag.key === "cardCountMax")?.label).toBe("Max 0 card");
        });

        it("should not be removable", () => {
            const tags = filterTags(defaultActive);
            expect(tags.find((tag) => tag.key === "cardCountMax")?.removable).toBe(false);
        });

        it("should not have an onRemove handler", () => {
            const tags = filterTags(defaultActive);
            expect(tags.find((tag) => tag.key === "cardCountMax")?.onRemove).toBeUndefined();
        });
    });

    describe("name tag", () => {
        it("should include a name tag when name is not empty", () => {
            const tags = filterTags({...defaultActive, name: "Lorwyn"});
            expect(tags.find((tag) => tag.key === "name")?.label).toBe('Name contains "Lorwyn"');
        });

        it("should not include a name tag when name is empty", () => {
            const tags = filterTags({...defaultActive, name: ""});
            expect(tags.find((tag) => tag.key === "name")).toBeUndefined();
        });

        it("should not include a name tag when name is only spaces", () => {
            const tags = filterTags({...defaultActive, name: "   "});
            expect(tags.find((tag) => tag.key === "name")).toBeUndefined();
        });

        it("should be removable and reset name to empty string", () => {
            const tags = filterTags({...defaultActive, name: "Theros"});
            const tag = tags.find((tag) => tag.key === "name")!;
            expect(tag.removable).toBe(true);
            expect(tag.onRemove?.({...defaultActive, name: "Theros"})).toEqual({name: ""});
        });
    });

    describe("foilOnly tag", () => {
        it("should include a foil tag when foilOnly is true", () => {
            const tags = filterTags({...defaultActive, foilOnly: true});
            expect(tags.find((tag) => tag.key === "foilOnly")?.label).toBe("It shines");
        });

        it("should not include a foil tag when foilOnly is false", () => {
            expect(filterTags({
                ...defaultActive,
                foilOnly: false
            }).find((tag) => tag.key === "foilOnly")).toBeUndefined();
        });

        it("should be removable and reset foilOnly to false", () => {
            const tag = filterTags({...defaultActive, foilOnly: true}).find((tag) => tag.key === "foilOnly")!;
            expect(tag.removable).toBe(true);
            expect(tag.onRemove?.({...defaultActive, foilOnly: true})).toEqual({foilOnly: false});
        });
    });

    describe("isNonFoilOnly tag", () => {
        it("should include a non-foil tag when isNonFoilOnly is true", () => {
            const tags = filterTags({...defaultActive, isNonFoilOnly: true});
            expect(tags.find((tag) => tag.key === "isNonFoilOnly")?.label).toBe("No shine");
        });

        it("should not include a non-foil tag when isNonFoilOnly is false", () => {
            expect(filterTags(defaultActive).find((tag) => tag.key === "isNonFoilOnly")).toBeUndefined();
        });

        it("should be removable and reset isNonFoilOnly to false", () => {
            const tag = filterTags({...defaultActive, isNonFoilOnly: true}).find((tag) => tag.key === "isNonFoilOnly")!;
            expect(tag.onRemove?.({...defaultActive, isNonFoilOnly: true})).toEqual({isNonFoilOnly: false});
        });
    });

    describe("onlineOnly tag", () => {
        it("should include an online tag when onlineOnly is true", () => {
            expect(filterTags({
                ...defaultActive,
                onlineOnly: true
            }).find((tag) => tag.key === "onlineOnly")?.label).toBe("Online only");
        });

        it("should not include an online tag when onlineOnly is false", () => {
            expect(filterTags(defaultActive).find((tag) => tag.key === "onlineOnly")).toBeUndefined();
        });

        it("should be removable and reset onlineOnly to false", () => {
            const tag = filterTags({...defaultActive, onlineOnly: true}).find((tag) => tag.key === "onlineOnly")!;
            expect(tag.onRemove?.({...defaultActive, onlineOnly: true})).toEqual({onlineOnly: false});
        });
    });

    describe("combined filters", () => {
        it("should return only the cardCountMax tag when no filter is active", () => {
            const tags = filterTags(defaultActive);
            expect(tags).toHaveLength(1);
            expect(tags[0].key).toBe("cardCountMax");
        });

        it("should return all tags when all filters are active", () => {
            const tags = filterTags({
                name: "Theros",
                foilOnly: true,
                isNonFoilOnly: true,
                onlineOnly: true,
                cardCountMax: 200
            });
            expect(tags).toHaveLength(5);
        });
    });
});

