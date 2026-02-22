import {describe, expect, it} from "vitest";
import {screen} from "@testing-library/react";
import SetList from "./SetList";
import {mockSet} from "../../mocks/mtgjson/setListMock";
import {createTestStore} from "../../utils/tests/createTestWrapper";
import renderWithProvider from "../../utils/tests/renderWithProvider";
import {fetchSetsFailure, fetchSetsStart, fetchSetsSuccess} from "../../features/sets/setsSlice";

describe("SetList", () => {
    it("should display a loader when data is loading", () => {
        const store = createTestStore();
        store.dispatch(fetchSetsStart());

        renderWithProvider(<SetList/>, store);

        expect(screen.getByText("Chargement...")).toBeInTheDocument();
    });

    it("should display an error message when fetch fails", () => {
        const store = createTestStore();
        store.dispatch(fetchSetsFailure("error"));

        renderWithProvider(<SetList/>, store);

        expect(screen.getByRole("alert")).toBeInTheDocument();
        expect(screen.getByText("Oh mince... Il y a eu une erreur lors du chargement des sets. Veuillez réessayer plus tard.")).toBeInTheDocument();
    });

    it("should display the filtered / total count", () => {
        const store = createTestStore();
        store.dispatch(fetchSetsSuccess([mockSet]));

        renderWithProvider(<SetList/>, store);

        expect(screen.getByText("1 / 1 sets available")).toBeInTheDocument();
    });

    it("should display a set item for each set", () => {
        const store = createTestStore();
        store.dispatch(fetchSetsSuccess([mockSet]));

        renderWithProvider(<SetList/>, store);

        expect(screen.getByText("Theros Beyond Death")).toBeInTheDocument();
    });

    it("should display 0 / 0 sets when list is empty", () => {
        const store = createTestStore();
        store.dispatch(fetchSetsSuccess([]));

        renderWithProvider(<SetList/>, store);

        expect(screen.getByText("0 / 0 sets available")).toBeInTheDocument();
    });

    it("should display the filter toggle button", () => {
        const store = createTestStore();
        store.dispatch(fetchSetsSuccess([]));

        renderWithProvider(<SetList/>, store);

        expect(screen.getByRole("button", {name: "Filters"})).toBeInTheDocument();
    });
});