import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import Loader from "./Loader.tsx";

describe("Loader", () => {
    it("should render loading state", () => {
        render(<Loader/>);
        expect(screen.getByRole("status")).toBeInTheDocument();
        expect(screen.getByText("Chargement...")).toBeInTheDocument();
        expect(screen.getByText("Chargement...")).toHaveClass("visuallyHidden");
    });
});