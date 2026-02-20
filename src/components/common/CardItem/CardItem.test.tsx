import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import CardItem from "./CardItem";
import {mockSet} from "../../../mocks/mtgjson/setListMock.ts";

describe("CardItem", () => {
    it("should display name of set", () => {
        render(<ul><CardItem set={mockSet}/></ul>);
        expect(screen.getByText("Theros Beyond Death")).toBeInTheDocument();
    });

    it("should display code of set", () => {
        render(<ul><CardItem set={mockSet}/></ul>);
        expect(screen.getByText("THB")).toBeInTheDocument();
    });

    it("should displays the release date", () => {
        render(<ul><CardItem set={mockSet}/></ul>);
        expect(screen.getByText("2020-01-24")).toBeInTheDocument();
    });

    it("should display number of cards", () => {
        render(<ul><CardItem set={mockSet}/></ul>);
        expect(screen.getByText("358 cartes")).toBeInTheDocument();
    });

    it("should display type of set with space instead of underscore", () => {
        const mockSetWithUnderscore = {
            ...mockSet,
            type: "draft_innovation",
        };
        render(<ul><CardItem set={mockSetWithUnderscore}/></ul>);
        expect(screen.getByText("draft innovation")).toBeInTheDocument();
    });
});

