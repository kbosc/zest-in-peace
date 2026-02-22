import type {ActiveFilters} from "../../types/Filters.ts";
import type {MtgSet} from "../../types/Sets.ts";

/**
 * Filters setsList based on active filters.
 */
export const filterSets = (sets: MtgSet[], filters: ActiveFilters): MtgSet[] =>
    sets.filter((set) => {
        if (filters.name && !set.name.toLowerCase().includes(filters.name.toLowerCase())) {
            return false;
        }
        if (filters.foilOnly && !set.isFoilOnly) {
            return false;
        }
        if (filters.isNonFoilOnly && !set.isNonFoilOnly) {
            return false;
        }
        if (filters.onlineOnly && !set.isOnlineOnly) {
            return false;
        }
        if (set.totalSetSize > filters.cardCountMax) {
            return false;
        }
        return true;
    });
