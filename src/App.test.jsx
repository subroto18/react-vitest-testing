import { describe, test, expect } from "vitest";
import { logRoles, render, screen } from "@testing-library/react";
import App from "./App";

describe("header section", () => {
  test("heading render properly", () => {
    render(<App />);
    const output = screen.getByRole("heading", {
      name: /GitHub User Finder/i,
    });

    expect(output).toBeInTheDocument();
  });
});
