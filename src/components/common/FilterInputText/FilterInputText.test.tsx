import {describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import FilterInputText from "./FilterInputText";

describe("FilterInputText", () => {
    it("should render the label", () => {
        render(<FilterInputText id="name" label="Search by name" value="" onChange={vi.fn()}/>);
        expect(screen.getByLabelText("Search by name")).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should call onChange with the input value", () => {
        const onChange = vi.fn();
        render(<FilterInputText id="name" label="Search" value="" onChange={onChange}/>);
        fireEvent.change(screen.getByRole("textbox"), {target: {value: "Theros"}});
        expect(onChange).toHaveBeenCalledWith("Theros");
    });
});