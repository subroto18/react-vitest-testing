import { describe, test, vi, expect } from "vitest";
import { response, fetchUser } from "./test/api";

describe("fetch api", () => {
  test("success test", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(response),
    } as never);

    const data = await fetchUser("subroto18");

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://api.github.com/users/subroto18",
    );

    expect(data).toEqual(response);
  });

  test("not Found", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({}),
    } as never);

    await expect(fetchUser("subroto18")).rejects.toThrow(/API Failed/i);
  });
});
