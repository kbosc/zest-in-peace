import {beforeEach, describe, expect, it, vi} from "vitest";
import {fireEvent, screen} from "@testing-library/react";
import FilterPanel from "./FilterPanel";
import * as useFilterListModule from "../../hooks/useFilterList/useFilterList";
import {filtersMock} from "../../mocks/filters/filtersMock";
import renderWithProvider from "../../utils/tests/renderWithProvider.tsx";

vi.mock("../../hooks/useFilterList/useFilterList");

describe("FilterPanel", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(useFilterListModule, "default").mockReturnValue({
            filters: filtersMock,
            isLoading: false,
        });
    });

    it("should render the filters title", () => {
        renderWithProvider(<FilterPanel/>);
        expect(screen.getByText("Filters")).toBeInTheDocument();
    });

    it("should render all filters from the mock", () => {
        renderWithProvider(<FilterPanel/>);
        expect(screen.getByLabelText("Search by name")).toBeInTheDocument();
        expect(screen.getByLabelText("Foil only")).toBeInTheDocument();
        expect(screen.getByLabelText("Non-foil only")).toBeInTheDocument();
        expect(screen.getByLabelText("Online only")).toBeInTheDocument();
        expect(screen.getByText("Reset filters")).toBeInTheDocument();
    });

    it("should render the reset button", () => {
        renderWithProvider(<FilterPanel/>);
        expect(screen.getByRole("button", {name: "Reset filters"})).toBeInTheDocument();
    });

    it("should render the close button", () => {
        renderWithProvider(<FilterPanel/>);
        expect(screen.getByRole("button", {name: "Close filters panel"})).toBeInTheDocument();
    });

    it("should render a text input for name filter", () => {
        renderWithProvider(<FilterPanel/>);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
    });

    it("should render multiples checkbox for boolean filters", () => {
        renderWithProvider(<FilterPanel/>);
        const checkboxes = screen.getAllByRole("checkbox");
        expect(checkboxes).toHaveLength(3);
    });

    it("should render a range input for cardCountMax filter", () => {
        renderWithProvider(<FilterPanel/>);
        const range = screen.getByRole("slider");
        expect(range).toBeInTheDocument();
    });

    it("should update the text input when typing", () => {
        renderWithProvider(<FilterPanel/>);
        const input = screen.getByRole("textbox");
        fireEvent.change(input, {target: {value: "Theros"}});
        expect(input).toHaveValue("Theros");
    });

    it("should toggle the foilOnly checkbox", () => {
        renderWithProvider(<FilterPanel/>);
        const checkboxes = screen.getAllByRole("checkbox");
        const foilCheckbox = checkboxes[0];
        fireEvent.click(foilCheckbox);
        expect(foilCheckbox).toBeChecked();
    });

    it("should close the panel when close button is clicked", () => {
        renderWithProvider(<FilterPanel/>);
        const closeBtn = screen.getByRole("button", {name: "Close filters panel"});
        fireEvent.click(closeBtn);
        const panel = screen.getByRole("complementary");
        expect(panel.className).not.toContain("open");
    });
});

