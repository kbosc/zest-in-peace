import type {ActiveFilters} from "../../types/Filters";

export interface FilterTag {
    key: string;
    label: string;
    removable: boolean;
    onRemove?: (filters: ActiveFilters) => Partial<ActiveFilters>;
}

/**
 * Converts active filters into a list of object.
 * Each element know if it's removable and how reset its filter on redux.
 * cardCountMax is cannot be removable and always shawn.
 */
export const filterTags = (filters: ActiveFilters): FilterTag[] => {
    const tags: FilterTag[] = [];

    if (filters.name.trim() !== "") {
        tags.push({
            key: "name",
            label: `Name contains "${filters.name}"`,
            removable: true,
            onRemove: () => ({name: ""}),
        });
    }
    if (filters.foilOnly) {
        tags.push({
            key: "foilOnly",
            label: "It shines",
            removable: true,
            onRemove: () => ({foilOnly: false}),
        });
    }
    if (filters.isNonFoilOnly) {
        tags.push({
            key: "isNonFoilOnly",
            label: "No shine",
            removable: true,
            onRemove: () => ({isNonFoilOnly: false}),
        });
    }
    if (filters.onlineOnly) {
        tags.push({
            key: "onlineOnly",
            label: "Online only",
            removable: true,
            onRemove: () => ({onlineOnly: false}),
        });
    }

    const cardLabel = filters.cardCountMax <= 1 ? "card" : "cards";
    tags.push({
        key: "cardCountMax",
        label: `Max ${filters.cardCountMax} ${cardLabel}`,
        removable: false,
    });

    return tags;
};
