/**
 * Filter booléen — ex: "foil only", "online only", "isNonFoilOnly"
 */
export interface BooleanFilter {
    id: string;
    type: "boolean";
    label: string;
}

/**
 * Filter text — ex: search by name set
 */
export interface TextFilter {
    id: string;
    type: "text";
    label: string;
    placeholder?: string;
}

/**
 * Filter range — ex: nb cards min/max by set
 */
export interface RangeFilter {
    id: string;
    type: "range";
    label: string;
    min: number;
    max: number;
}

export type AvailableFilter = BooleanFilter | TextFilter | RangeFilter;

/**
 * Active filters for the current search, with values
 */
export interface ActiveFilters {
    name: string;
    foilOnly: boolean;
    isNonFoilOnly: boolean;
    onlineOnly: boolean;
    cardCountMax: number;
}

