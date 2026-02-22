import {describe, expect, it} from "vitest";
import {fireEvent, screen} from "@testing-library/react";
import TagsList from "./TagsList";
import {createTestStore} from "../../utils/tests/createTestWrapper";
import renderWithProvider from "../../utils/tests/renderWithProvider";
import {setActiveFilter} from "../../features/filters/filtersSlice";

describe("TagsList", () => {
    describe("accessibility", () => {
        it("should have a visually hidden title readable by screen readers", () => {
            const store = createTestStore();
            renderWithProvider(<TagsList/>, store);
            const heading = screen.getByRole("heading", {name: "Active filters"});
            expect(heading).toHaveClass("visuallyHidden");
        });

        it("should render a list", () => {
            const store = createTestStore();
            renderWithProvider(<TagsList/>, store);
            expect(screen.getByRole("list")).toBeInTheDocument();
        });

        it("should label the list with the number of active filters", () => {
            const store = createTestStore();
            renderWithProvider(<TagsList/>, store);
            expect(screen.getByRole("list", {name: "1 active filter"})).toBeInTheDocument();
        });

        it("should use plural when there are multiple active filters", () => {
            const store = createTestStore();
            store.dispatch(setActiveFilter({id: "name", value: "Franklin"}));
            renderWithProvider(<TagsList/>, store);
            expect(screen.getByRole("list", {name: "2 active filters"})).toBeInTheDocument();
        });
    });

    describe("tags rendering", () => {
        it("should always display the cardCountMax tag", () => {
            const store = createTestStore();
            renderWithProvider(<TagsList/>, store);
            expect(screen.getByText("Max 1000 cards")).toBeInTheDocument();
        });

        it("should not show a remove button on the cardCountMax tag", () => {
            const store = createTestStore();
            renderWithProvider(<TagsList/>, store);
            expect(screen.queryByRole("button", {name: "remove filter: max"})).not.toBeInTheDocument();
        });

        it("should display the name tag when name filter is set", () => {
            const store = createTestStore();
            store.dispatch(setActiveFilter({id: "name", value: "Lorwyn"}));
            renderWithProvider(<TagsList/>, store);
            expect(screen.getByText('Name contains "Lorwyn"')).toBeInTheDocument();
        });

        it("should display a remove button on the name tag", () => {
            const store = createTestStore();
            store.dispatch(setActiveFilter({id: "name", value: "Theros"}));
            renderWithProvider(<TagsList/>, store);
            expect(screen.getByRole("button", {name: "Remove filter: Name contains \"Theros\""})).toBeInTheDocument();
        });

        it("should render one Tag per active filter", () => {
            const store = createTestStore();
            store.dispatch(setActiveFilter({id: "name", value: "Theros"}));
            store.dispatch(setActiveFilter({id: "foilOnly", value: true}));
            renderWithProvider(<TagsList/>, store);

            expect(screen.getAllByRole("listitem")).toHaveLength(3);
        });
    });

    describe("filter removal", () => {
        it("should remove the name filter from the store when its tag is removed", () => {
            const store = createTestStore();
            store.dispatch(setActiveFilter({id: "name", value: "Tarkir"}));
            renderWithProvider(<TagsList/>, store);

            fireEvent.click(screen.getByRole("button", {name: "Remove filter: Name contains \"Tarkir\""}));

            expect(store.getState().filters.active.name).toBe("");
        });

        it("should remove the foilOnly filter from the store when its tag is removed", () => {
            const store = createTestStore();
            store.dispatch(setActiveFilter({id: "foilOnly", value: true}));
            renderWithProvider(<TagsList/>, store);

            fireEvent.click(screen.getByRole("button", {name: "Remove filter: It shines"}));

            expect(store.getState().filters.active.foilOnly).toBe(false);
        });

        it("should remove the onlineOnly filter from the store when its tag is removed", () => {
            const store = createTestStore();
            store.dispatch(setActiveFilter({id: "onlineOnly", value: true}));
            renderWithProvider(<TagsList/>, store);

            fireEvent.click(screen.getByRole("button", {name: "Remove filter: Online only"}));

            expect(store.getState().filters.active.onlineOnly).toBe(false);
        });

        it("should not affect other active filters when removing one", () => {
            const store = createTestStore();
            store.dispatch(setActiveFilter({id: "name", value: "Scourge"}));
            store.dispatch(setActiveFilter({id: "foilOnly", value: true}));
            renderWithProvider(<TagsList/>, store);

            fireEvent.click(screen.getByRole("button", {name: "Remove filter: Name contains \"Scourge\""}));

            expect(store.getState().filters.active.foilOnly).toBe(true);
            expect(store.getState().filters.active.name).toBe("");
        });
    });
});
