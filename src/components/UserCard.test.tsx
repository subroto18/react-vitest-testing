import { render, screen } from "@testing-library/react";

import { describe, test, expect } from "vitest";
import UserCard from "./UserCard";
import { mockUser, mockUserMinimal } from "../test/mocks";
import { formatNumber } from "../utils/formatNumber";

describe("User card", () => {
  test("renders name , login, bio and location", () => {
    render(<UserCard user={mockUser} />);
    const userName = screen.getByText(mockUser.name);
    const login = screen.getByText(`@${mockUser.login}`);
    const bio = screen.getByText(mockUser.bio);
    const location = screen.getByText(mockUser.location);
    expect(userName).toBeInTheDocument();
    expect(login).toBeInTheDocument();
    expect(bio).toBeInTheDocument();
    expect(location).toBeInTheDocument();
  });

  test("renders repo , followers and following counts", () => {
    render(<UserCard user={mockUser} />);
    const repo = screen.getByText(formatNumber(mockUser.public_repos));
    const followers = screen.getByText(formatNumber(mockUser.followers));
    const followings = screen.getByText(formatNumber(mockUser.following));

    expect(repo).toBeInTheDocument();
    expect(followers).toBeInTheDocument();
    expect(followings).toBeInTheDocument();
  });

  test("check bio, location and name null or not", () => {
    render(<UserCard user={mockUserMinimal} />);
    const name = screen.queryByText(/full stack/i);
    const location = screen.queryByText("India");

    expect(name).not.toBeInTheDocument();
    expect(location).not.toBeInTheDocument();
  });
});
