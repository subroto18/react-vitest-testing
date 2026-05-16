import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import RepoList from "./RepoList";
import { mockRepos } from "../test/mocks";

describe("Repolist render", () => {
  test("render the corrent number of repos", () => {
    render(<RepoList repos={mockRepos} />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(mockRepos.length);
  });

  test("render the empty repo", () => {
    render(<RepoList repos={[]} />);

    const links = screen.getByText("No public repositories found.");
    expect(links).toBeInTheDocument();
  });
});
