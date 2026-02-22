import {describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import FilterInputRange from "./FilterInputRange";

describe("FilterInputRange", () => {
    it("should render the label and slider", () => {
        render(<FilterInputRange id="cardCount" label="Number of cards" value={500} min={0} max={1000}
                                 onChange={vi.fn()}/>);
        expect(screen.getByText("Number of cards")).toBeInTheDocument();
        expect(screen.getByRole("slider")).toBeInTheDocument();
    });

    it("should call onChange with the numeric value", () => {
        const onChange = vi.fn();
        render(<FilterInputRange id="cardCount" label="Number of cards" value={500} min={0} max={1000}
                                 onChange={onChange}/>);
        fireEvent.change(screen.getByRole("slider"), {target: {value: "300"}});
        expect(onChange).toHaveBeenCalledWith(300);
    });
});