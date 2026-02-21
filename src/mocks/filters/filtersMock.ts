import type {AvailableFilter} from "../../types/Filters";

/**
 * Mock des filtres disponibles.
 * En production, ces données viendraient d"un endpoint API dédié.
 * Le min/max du range est calculé dynamiquement depuis les sets dans filterService.
 */
export const filtersMock: AvailableFilter[] = [
    {
        id: "name",
        type: "text",
        label: "Search by name",
        placeholder: "ex: Marvel's Spider-Man...",
    },
    {
        id: "foilOnly",
        type: "boolean",
        label: "Foil only",
    },
    {
        id: "isNonFoilOnly",
        type: "boolean",
        label: "Non-foil only",
    },
    {
        id: "onlineOnly",
        type: "boolean",
        label: "Online only",
    },
    {
        id: "cardCount",
        type: "range",
        label: "Number of cards",
        min: 0,
        max: 1000,
    },
];