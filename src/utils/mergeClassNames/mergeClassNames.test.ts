import {describe, expect, it} from "vitest";
import {mergeClassNames} from "./mergeClassNames";

describe("mergeClassNames", () => {
    it("should join multiple class names with a space", () => {
        expect(mergeClassNames("foo", "bar")).toBe("foo bar");
    });

    it("should ignore undefined values", () => {
        expect(mergeClassNames("foo", undefined)).toBe("foo");
    });

    it("should ignore null values", () => {
        expect(mergeClassNames("foo", null)).toBe("foo");
    });

    it("should ignore false values", () => {
        expect(mergeClassNames("foo", false)).toBe("foo");
    });

    it("should ignore empty strings", () => {
        expect(mergeClassNames("foo", "")).toBe("foo");
    });

    it("should return a single class when only one is provided", () => {
        expect(mergeClassNames("foo")).toBe("foo");
    });

    it("should return an empty string when all values are falsy", () => {
        expect(mergeClassNames(undefined, null, false, "")).toBe("");
    });

    it("should handle a mix of valid and falsy values", () => {
        expect(mergeClassNames("foo", undefined, "bar", false, "baz")).toBe("foo bar baz");
    });
});
