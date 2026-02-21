import {filtersMock} from "../mocks/filters/filtersMock";
import type {AvailableFilter} from "../types/Filters";

/**
 * Simulate fetching filters API
 */
export const fetchAvailableFilters = (): Promise<AvailableFilter[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(filtersMock), 300);
    });
};