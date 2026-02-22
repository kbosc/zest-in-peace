import {describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import FilterInputBoolean from "./FilterInputBoolean";

describe("FilterInputBoolean", () => {
    it("should render the label and checkbox", () => {
        render(<FilterInputBoolean id="foilOnly" label="Foil only" checked={false} onChange={vi.fn()}/>);
        expect(screen.getByLabelText("Foil only")).toBeInTheDocument();
        expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("should call onChange with the checked value", () => {
        const onChange = vi.fn();
        render(<FilterInputBoolean id="foilOnly" label="Foil only" checked={false} onChange={onChange}/>);
        fireEvent.click(screen.getByRole("checkbox"));
        expect(onChange).toHaveBeenCalledWith(true);
    });
});