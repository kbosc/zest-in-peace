import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import SetItem from "./SetItem";
import {mockSet} from "../../../mocks/mtgjson/setListMock";

describe("SetItem", () => {
    it("should display name of set", () => {
        render(<ul><SetItem set={mockSet}/></ul>);
        expect(screen.getByText("Theros Beyond Death")).toBeInTheDocument();
    });

    it("should display code of set", () => {
        render(<ul><SetItem set={mockSet}/></ul>);
        expect(screen.getByText("THB")).toBeInTheDocument();
    });

    it("should display the release date", () => {
        render(<ul><SetItem set={mockSet}/></ul>);
        expect(screen.getByText("2020-01-24")).toBeInTheDocument();
    });

    it("should display number of cards", () => {
        render(<ul><SetItem set={mockSet}/></ul>);
        expect(screen.getByText("358 cartes")).toBeInTheDocument();
    });

    it("should display type of set with space instead of underscore", () => {
        const mockSetWithUnderscore = {...mockSet, type: "draft_innovation"};
        render(<ul><SetItem set={mockSetWithUnderscore}/></ul>);
        expect(screen.getByText("draft innovation")).toBeInTheDocument();
    });
});
