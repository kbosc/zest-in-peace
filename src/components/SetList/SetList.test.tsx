import {beforeEach, describe, expect, it, vi} from "vitest";
import {screen} from "@testing-library/react";
import SetList from "./SetList";
import * as useSetListModule from "../../hooks/useSetList/useSetList";
import {mockSet} from "../../mocks/mtgjson/setListMock";
import renderWithProvider from "../../utils/tests/renderWithProvider.tsx";

vi.mock("../../hooks/useSetList/useSetList");

describe("SetList", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should display a loader when data is loading", () => {
        vi.spyOn(useSetListModule, "default").mockReturnValue({sets: [], isLoading: true, error: null});
        renderWithProvider(<SetList/>);
        expect(screen.getByText("Chargement...")).toBeInTheDocument();
    });

    it("should display an error message when fetch fails", () => {
        vi.spyOn(useSetListModule, "default").mockReturnValue({sets: [], isLoading: false, error: "Error"});
        renderWithProvider(<SetList/>);
        expect(screen.getByText("Oh mince... Il y a eu une erreur lors du chargement des sets. Veuillez réessayer plus tard.")).toBeInTheDocument();
    });

    it("should display the number of available sets", () => {
        vi.spyOn(useSetListModule, "default").mockReturnValue({sets: [mockSet], isLoading: false, error: null});
        renderWithProvider(<SetList/>);
        expect(screen.getByText("1 sets available, what... WHAT ?!")).toBeInTheDocument();
    });

    it("should display a set item for each set", () => {
        vi.spyOn(useSetListModule, "default").mockReturnValue({sets: [mockSet], isLoading: false, error: null});
        renderWithProvider(<SetList/>);
        expect(screen.getByText("Theros Beyond Death")).toBeInTheDocument();
    });

    it("should display 0 sets when list is empty", () => {
        vi.spyOn(useSetListModule, "default").mockReturnValue({sets: [], isLoading: false, error: null});
        renderWithProvider(<SetList/>);
        expect(screen.getByText("0 sets available, what... WHAT ?!")).toBeInTheDocument();
    });

    it("should display the filter toggle button", () => {
        vi.spyOn(useSetListModule, "default").mockReturnValue({sets: [], isLoading: false, error: null});
        renderWithProvider(<SetList/>);
        expect(screen.getByRole("button", {name: "Filtres"})).toBeInTheDocument();
    });
});