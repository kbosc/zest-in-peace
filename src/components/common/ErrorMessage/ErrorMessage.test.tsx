import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("Error", () => {
    it("should display the error message", () => {
        render(<ErrorMessage message="KawaBunga"/>);
        expect(screen.getByText("KawaBunga")).toBeInTheDocument();
    });

    it("should have role alert for accessibility", () => {
        render(<ErrorMessage message="Banana"/>);
        expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("should apply the className prop", () => {
        render(<ErrorMessage message="Pizza" className="laClass"/>);
        expect(screen.getByRole("alert")).toHaveClass("laClass");
    });
});

