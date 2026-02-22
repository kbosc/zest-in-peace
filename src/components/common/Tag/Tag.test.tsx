import {describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import Tag from "./Tag";

const renderTag = (label: string, removable?: boolean, onRemove?: () => void, className?: string) =>
    render(<ul><Tag label={label} removable={removable} onRemove={onRemove} className={className}/></ul>);

describe("Tag", () => {
    describe("rendering", () => {
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
            renderTag("Theros", false, undefined, "myClass");
            expect(screen.getByRole("listitem")).toHaveClass("myClass");
        });
    });

    describe("remove button", () => {
        it("should not render the remove button when removable is false", () => {
            renderTag("Max 5000 cards", false);
            expect(screen.queryByRole("button")).not.toBeInTheDocument();
        });

        it("should not render the remove button when removable is true but onRemove is missing", () => {
            renderTag("It shines", true, undefined);
            expect(screen.queryByRole("button")).not.toBeInTheDocument();
        });

        it("should render the remove button when removable and onRemove are provided", () => {
            renderTag("It shines", true, vi.fn());
            expect(screen.getByRole("button", {name: "Remove filter: It shines"})).toBeInTheDocument();
        });

        it("should call onRemove when the button is clicked", () => {
            const onRemove = vi.fn();
            renderTag("Online only", true, onRemove);
            fireEvent.click(screen.getByRole("button", {name: "Remove filter: Online only"}));
            expect(onRemove).toHaveBeenCalledTimes(1);
        });

        it("should hide the ✕ character from screen readers", () => {
            renderTag("It shines", true, vi.fn());
            const icon = screen.getByText("✕");
            expect(icon).toHaveAttribute("aria-hidden", "true");
        });
    });
});