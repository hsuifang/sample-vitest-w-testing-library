import { renderHook, waitFor } from "@testing-library/react";
import { useMovies } from "./useMovies";

describe("useMovies", () => {
  const fetchSpy = vi.spyOn(global, "fetch");
  beforeAll(() => {
    const mockResolveValue = {
      ok: true,
      json: () =>
        new Promise((resolve) => {
          resolve({ results: [{ title: "Star Wars" }] });
        }),
    };
    fetchSpy.mockReturnValue(mockResolveValue as any);
  });

  afterAll(() => {
    fetchSpy.mockRestore();
  });

  it("should fetch movies", async () => {
    const { result } = renderHook(() => useMovies());

    await waitFor(() => {
      expect(result.current.movies).toEqual([{ title: "Star Wars" }]);
    });
  });
});
