import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import Tag from "./Tag";

const renderTag = (label: string, className?: string) =>
    render(<ul><Tag label={label} className={className}/></ul>);

describe("Tag", () => {
    it("should display the label", () => {
        renderTag("Shiny");
        expect(screen.getByText("Shiny")).toBeInTheDocument();
    });

    it("should render as a list item", () => {
        renderTag("Online only");

        expect(screen.getByRole("listitem")).toBeInTheDocument();
        expect(screen.getByRole("listitem")).toHaveTextContent("Online only");
        expect(screen.getAllByRole("listitem")).toHaveLength(1);
    });

    it("should apply a custom className when provided", () => {
        renderTag("Selection du set Carnage", "laClassaDalas");
        expect(screen.getByRole("listitem")).toHaveClass("laClassaDalas");
    });
});