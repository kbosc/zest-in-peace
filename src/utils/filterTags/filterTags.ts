import type {ActiveFilters} from "../../types/Filters";

/**
 * Filters tagsList based on active filters.
 */

export const filterTags = (filters: ActiveFilters): string[] => {
    const tags: string[] = [];

    if (filters.name.trim() !== "") {
        tags.push(`Name contains "${filters.name}"`);
    }
    if (filters.foilOnly) {
        tags.push("It shines");
    }
    if (filters.isNonFoilOnly) {
        tags.push("No shine");
    }
    if (filters.onlineOnly) {
        tags.push("Online only");
    }

    const cardLabel = filters.cardCountMax <= 1 ? "card" : "cards";
    tags.push(`Max ${filters.cardCountMax} ${cardLabel}`);

    return tags;
};
