import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import SearchBar from "./SearchBar";
import userEvent from "@testing-library/user-event";

describe("search bar component", () => {
  test("search icon present", () => {
    render(<SearchBar loading={false} onSearch={vi.fn()} />);
    const searchIcon = screen.getByTestId("search-icon");
    expect(searchIcon).toBeInTheDocument();
  });

  test("search input present", () => {
    render(<SearchBar loading={false} onSearch={vi.fn()} />);
    const searchInput = screen.getByRole("textbox", {
      name: /GitHub username/i,
    });
    expect(searchInput).toBeInTheDocument();
  });

  test("search button present", () => {
    render(<SearchBar loading={false} onSearch={vi.fn()} />);
    const searchButton = screen.getByRole("button", {
      name: /Search/i,
    });
    expect(searchButton).toBeInTheDocument();
  });

  test("username validation check", async () => {
    render(<SearchBar loading={false} onSearch={vi.fn()} />);
    const user = userEvent.setup();

    const Button = screen.getByRole("button", {
      name: /Search/i,
    });

    await user.click(Button);

    const ErrorMsg = screen.getByRole("alert");

    expect(ErrorMsg).toBeInTheDocument();
  });

  test("Update the input when the user types", async () => {
    render(<SearchBar loading={false} onSearch={vi.fn()} />);
    const user = userEvent.setup();

    const input = screen.getByRole("textbox", {
      name: /GitHub username/i,
    });

    await user.type(input, "subroto");

    expect(input).toHaveValue("subroto");
  });

  test("Update the input when the user types", async () => {
    render(<SearchBar loading={false} onSearch={vi.fn()} />);
    const user = userEvent.setup();

    const input = screen.getByRole("textbox", {
      name: /GitHub username/i,
    });

    await user.type(input, "subroto");

    expect(input).toHaveValue("subroto");
  });

  test("Calls onSearch with the typed username when form is submitted", async () => {
    const mockFunction = vi.fn();
    render(<SearchBar loading={false} onSearch={mockFunction} />);
    const user = userEvent.setup();

    const input = screen.getByRole("textbox", {
      name: /GitHub username/i,
    });

    const button = screen.getByRole("button", {
      name: /Search/i,
    });

    await user.type(input, "subroto");
    await user.click(button);

    expect(mockFunction).toHaveBeenCalledWith("subroto");
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  test("validation check if user type error alert should be removed", async () => {
    const mockFunction = vi.fn();
    render(<SearchBar loading={false} onSearch={mockFunction} />);

    const user = userEvent.setup();
    const input = screen.getByRole("textbox", {
      name: /GitHub username/i,
    });

    const button = screen.getByRole("button", {
      name: /Search/i,
    });

    await user.type(input, "subroto");
    await user.click(button);

    const ErrorMsg = screen.queryByRole("alert");

    expect(ErrorMsg).not.toBeInTheDocument();
  });

  test("when user start typing, cancel icon should be displayed", async () => {
    const mockFunction = vi.fn();
    render(<SearchBar loading={false} onSearch={mockFunction} />);

    const user = userEvent.setup();
    const input = screen.getByRole("textbox", {
      name: /GitHub username/i,
    });

    await user.type(input, "subroto");

    const button = screen.getByRole("button", {
      name: /Clear input/i,
    });

    expect(button).toBeInTheDocument();
  });

  test("when user click on cancel button, Input value should be removed", async () => {
    const mockFunction = vi.fn();
    render(<SearchBar loading={false} onSearch={mockFunction} />);

    const user = userEvent.setup();
    const input = screen.getByRole("textbox", {
      name: /GitHub username/i,
    });

    await user.type(input, "subroto");

    const button = screen.getByRole("button", {
      name: /Clear input/i,
    });

    await user.click(button);

    expect(input).toHaveValue("");
  });

  test("button is disabled when loading is true", () => {
    const mockFunction = vi.fn();
    render(<SearchBar loading={true} onSearch={mockFunction} />);

    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeInTheDocument();
  });
});
