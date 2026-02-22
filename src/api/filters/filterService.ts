import type {AvailableFilter} from "../../types/Filters";

/**
 * Fetches available filters from the mock JSON.
 */
export const fetchAvailableFilters = (): Promise<AvailableFilter[]> =>
    fetch(`${import.meta.env.BASE_URL}mocks/filters.json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch filters: ${response.status}`);
            }
            return response.json() as Promise<AvailableFilter[]>;
        });
