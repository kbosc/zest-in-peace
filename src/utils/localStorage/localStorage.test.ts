import {afterEach, describe, expect, it} from "vitest";
import {loadFromStorage, removeFromStorage, saveToStorage} from "./localStorage.ts";

describe("localStorage utils", () => {
    afterEach(() => {
        localStorage.clear();
    });

    describe("saveToStorage", () => {
        it("should save string value", () => {
            saveToStorage("key", "Blitz");
            expect(localStorage.getItem("key")).toBe('"Blitz"');
        });

        it("should save boolean value", () => {
            saveToStorage("key", true);
            expect(localStorage.getItem("key")).toBe("true");
        });

        it("should save object value", () => {
            saveToStorage("key", {min: 0, max: 100});
            expect(localStorage.getItem("key")).toBe('{"min":0,"max":100}');
        });
    });

    describe("loadFromStorage", () => {
        it("should return null if key not exist", () => {
            expect(loadFromStorage("unknown")).toBeNull();
        });

        it("should load a saved string value", () => {
            saveToStorage("key", "Ball");
            expect(loadFromStorage<string>("key")).toBe("Ball");
        });

        it("should load a saved boolean value", () => {
            saveToStorage("key", true);
            expect(loadFromStorage<boolean>("key")).toBe(true);
        });

        it("should load a saved object value", () => {
            saveToStorage("key", {min: 0, max: 100});
            expect(loadFromStorage<{ min: number; max: number }>("key")).toEqual({min: 0, max: 100});
        });
    });

    describe("removeFromStorage", () => {
        it("should remove an existing key", () => {
            saveToStorage("key", "Crank");
            removeFromStorage("key");
            expect(localStorage.getItem("key")).toBeNull();
        });
    });
});

