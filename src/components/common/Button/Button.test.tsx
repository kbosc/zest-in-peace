import Button from "./Button.tsx";
import {describe, expect, it, vi} from "vitest";

import {render} from "@testing-library/react";

describe("Button", () => {
    it("should render children", () => {
        const {getByText} = render(<Button>Im button, Im Happy</Button>);

        expect(getByText("Im button, Im Happy")).toBeInTheDocument();
    });

    it("should call onClick when clicked", async () => {
        const onClick = vi.fn();
        const {getByRole} = render(<Button onClick={onClick}>Click me</Button>);

        const button = getByRole("button", {name: "Click me"});
        button.click();

        expect(onClick).toHaveBeenCalled();
    });

    it("should apply custom className", () => {
        const {getByRole} = render(<Button className="custom-class">Styled Button</Button>);

        const button = getByRole("button", {name: "Styled Button"});
        expect(button).toHaveClass("custom-class");
    });
});