import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Homepage from "../../../pages/Homepage";

describe("Homepage", () => {
  it("renders all components with expected text", async () => {
    render(<Homepage />);

    // Headers
    expect(screen.getByText("WELCOME TO GAME ARRAY")).toBeInTheDocument();
    expect(screen.getByText("TO ACCESS YOUR")).toBeInTheDocument();

    // InfoContainer components
    expect(screen.getByText("LIBRARY")).toBeInTheDocument();
    expect(screen.getByText("DASHBOARD")).toBeInTheDocument();

    // AuthButton
    expect(screen.getByText("LOGIN WITH STEAM")).toBeInTheDocument();
  });
});
