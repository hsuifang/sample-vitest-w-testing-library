import { renderHook, waitFor } from "@testing-library/react";
import { useMovies } from "./useMovies";

describe("useMovies", () => {
  it("should fetch movies", async () => {
    const { result } = renderHook(() => useMovies());

    await waitFor(
      () => {
        expect(result.current.movies).toEqual([{ title: "Star Wars" }]);
      },
      {
        timeout: 2000,
      }
    );
  });
});
