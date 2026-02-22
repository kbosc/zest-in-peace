import {beforeEach, describe, expect, it, vi} from "vitest";
import {fireEvent, screen} from "@testing-library/react";
import FilterPanel from "./FilterPanel";
import {filtersMock} from "../../mocks/filters/filtersMock";
import {createTestStore} from "../../utils/tests/createTestWrapper";
import renderWithProvider from "../../utils/tests/renderWithProvider";
import {setAvailableFilters} from "../../features/filters/filtersSlice";

const createStoreWithFilters = () => {
    const store = createTestStore();
    store.dispatch(setAvailableFilters(filtersMock));
    return store;
};

describe("FilterPanel", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render the filters title", () => {
        renderWithProvider(<FilterPanel/>, createStoreWithFilters());
        expect(screen.getByText("Filters")).toBeInTheDocument();
    });

    it("should render all filters from the mock", () => {
        renderWithProvider(<FilterPanel/>, createStoreWithFilters());
        expect(screen.getByLabelText("Search by name")).toBeInTheDocument();
        expect(screen.getByLabelText("Foil only")).toBeInTheDocument();
        expect(screen.getByLabelText("Online only")).toBeInTheDocument();
        expect(screen.getByText("Number of cards")).toBeInTheDocument();
    });

    it("should render the reset button", () => {
        renderWithProvider(<FilterPanel/>, createStoreWithFilters());
        expect(screen.getByRole("button", {name: "Reset filters"})).toBeInTheDocument();
    });

    it("should render the close button", () => {
        renderWithProvider(<FilterPanel/>, createStoreWithFilters());
        expect(screen.getByRole("button", {name: "Close filters panel"})).toBeInTheDocument();
    });

    it("should render a text input for name filter", () => {
        renderWithProvider(<FilterPanel/>, createStoreWithFilters());
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render checkboxes for boolean filters", () => {
        renderWithProvider(<FilterPanel/>, createStoreWithFilters());
        const checkboxes = screen.getAllByRole("checkbox");

        expect(checkboxes.length).toBe(3);
        expect(screen.getByLabelText("Foil only")).toBeInTheDocument();
        expect(screen.getByLabelText("Online only")).toBeInTheDocument();
        expect(screen.getByLabelText("Non-foil only")).toBeInTheDocument();
    });

    it("should render a range input for cardCountMax filter", () => {
        renderWithProvider(<FilterPanel/>, createStoreWithFilters());
        expect(screen.getByRole("slider")).toBeInTheDocument();
        expect(screen.getByText("Number of cards")).toBeInTheDocument();
    });

    it("should update the text input when typing", () => {
        renderWithProvider(<FilterPanel/>, createStoreWithFilters());
        const input = screen.getByRole("textbox");
        fireEvent.change(input, {target: {value: "Theros"}});

        expect(input).toHaveValue("Theros");
    });

    it("should toggle the foilOnly checkbox", () => {
        renderWithProvider(<FilterPanel/>, createStoreWithFilters());
        const checkboxes = screen.getAllByRole("checkbox");
        fireEvent.click(checkboxes[0]);

        expect(checkboxes[0]).toBeChecked();

        fireEvent.click(checkboxes[0]);

        expect(checkboxes[0]).not.toBeChecked();
    });
});
