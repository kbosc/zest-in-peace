/**
 * Generic utilities for interacting with localStorage
 */

export const loadFromStorage = <T>(key: string): T | null => {
    try {
        const serialized = localStorage.getItem(key);
        if (serialized === null) return null;
        return JSON.parse(serialized) as T;
    } catch {
        console.warn(`localStorage Failed to load key: "${key}"`);
        return null;
    }
};

export const saveToStorage = <T>(key: string, value: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        console.warn(`localStorage Failed to save key: "${key}"`);
    }
};

export const removeFromStorage = (key: string): void => {
    localStorage.removeItem(key);
};

