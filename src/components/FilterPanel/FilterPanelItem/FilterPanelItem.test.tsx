import {describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import FilterPanelItem from "./FilterPanelItem";
import {defaultActive} from "../../../features/filters/filtersSlice.constants";
import type {AvailableFilter} from "../../../types/Filters";

describe("FilterPanelItem", () => {
    it("should render a text input for a text filter", () => {
        const filter: AvailableFilter = {id: "name", type: "text", label: "Search by name"};
        render(<FilterPanelItem filter={filter} active={defaultActive} onChange={vi.fn()}/>);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render a checkbox for a boolean filter", () => {
        const filter: AvailableFilter = {id: "foilOnly", type: "boolean", label: "Foil only"};
        render(<FilterPanelItem filter={filter} active={defaultActive} onChange={vi.fn()}/>);
        expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("should render a slider for a range filter", () => {
        const filter: AvailableFilter = {id: "cardCount", type: "range", label: "Number of cards", min: 0, max: 5000};
        render(<FilterPanelItem filter={filter} active={defaultActive} onChange={vi.fn()}/>);
        expect(screen.getByRole("slider")).toBeInTheDocument();
    });
});