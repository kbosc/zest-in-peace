import {describe, expect, it} from "vitest";
import {screen} from "@testing-library/react";
import TagsList from "./TagsList";
import {createTestStore} from "../../utils/tests/createTestWrapper";
import renderWithProvider from "../../utils/tests/renderWithProvider";
import {setFoilOnly, setNameFilter, setOnlineOnly} from "../../features/filters/filtersSlice";

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
            store.dispatch(setNameFilter("Franklin"));
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

        it("should display the name tag when name filter is set", () => {
            const store = createTestStore();
            store.dispatch(setNameFilter("Lorwyn"));
            renderWithProvider(<TagsList/>, store);
            expect(screen.getByText('Name contains "Lorwyn"')).toBeInTheDocument();
        });

        it("should not display the name tag when name filter is empty", () => {
            const store = createTestStore();
            renderWithProvider(<TagsList/>, store);
            expect(screen.queryByText("Name contains")).not.toBeInTheDocument();
            expect(screen.getAllByRole("listitem")).toHaveLength(1)
        });

        it("should display the foilOnly tag when foilOnly is active", () => {
            const store = createTestStore();
            store.dispatch(setFoilOnly(true));
            renderWithProvider(<TagsList/>, store);
            expect(screen.getByText("It shines")).toBeInTheDocument();
        });

        it("should display the onlineOnly tag when onlineOnly is active", () => {
            const store = createTestStore();
            store.dispatch(setOnlineOnly(true));
            renderWithProvider(<TagsList/>, store);
            expect(screen.getByText("Online only")).toBeInTheDocument();
        });

        it("should render one Tag per active filter", () => {
            const store = createTestStore();
            store.dispatch(setNameFilter("Scourge"));
            store.dispatch(setFoilOnly(true));
            renderWithProvider(<TagsList/>, store);
            expect(screen.getAllByRole("listitem")).toHaveLength(3);
        });
    });
});

