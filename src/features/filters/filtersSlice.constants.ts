import type {ActiveFilters} from "../../types/Filters.ts";

export const defaultActive: ActiveFilters = {
    name: "",
    foilOnly: false,
    isNonFoilOnly: false,
    onlineOnly: false,
    cardCountMax: 1000,
};