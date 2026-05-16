import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { useGithubUser } from "./useGithubUser";
import { mockUser } from "../test/mocks";

describe("github user api", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("check empty state", () => {
    const { result } = renderHook(() => useGithubUser());
    expect(result.current.user).toBeNull();
    expect(result.current.repos).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test("check api success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser),
    } as never);

    const { result } = renderHook(() => useGithubUser());

    await act(async () => {
      await result.current.searchUser("piyush-eon");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user?.login).toBe(mockUser.login);
    expect(result.current.error).toBeNull();
  });

  test("show error when user not found", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response);

    const { result } = renderHook(() => useGithubUser());

    await act(async () => {
      await result.current.searchUser("subroto18");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(`User "subroto18" not found on GitHub.`);
  });

  test("show generic error for server issue", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as Response);

    const { result } = renderHook(() => useGithubUser());

    await act(async () => {
      await result.current.searchUser("subroto18");
    });

    await waitFor(async () => {
      await expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(
      "Network error. Please check your connection.",
    );
  });

  test("show network error when fetch fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new Error("something went wrong"),
    );

    const { result } = renderHook(() => useGithubUser());

    await act(async () => {
      await result.current.searchUser("subroto18");
    });

    expect(result.current.error).toBe(
      "Network error. Please check your connection.",
    );

    expect(result.current.loading).toBe(false);
  });

  test("reset state ", async () => {
    const { result } = renderHook(() => useGithubUser());

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser),
    } as never);

    await act(async () => {
      await result.current.searchUser("piyush-eon");
    });

    await act(async () => {
      await result.current.reset();
    });

    expect(result.current.user).toBeNull();
  });
});
