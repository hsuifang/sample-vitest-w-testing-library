import { renderHook, act } from "@testing-library/react";
import { useSearch } from "./useSearch";

describe("useSearch", () => {
  it("should return a default search term and original items", () => {
    const items = [{ title: "Item 1" }];
    const { result } = renderHook(() => useSearch(items));

    expect(result.current.searchTerm).toBe("");
    expect(result.current.filteredItems).toEqual(items);
  });

  it("should return a filtered list of items based on the search term", () => {
    const items = [{ title: "Item 1" }, { title: "Item 2" }];
    const { result } = renderHook(() => useSearch(items));

    act(() => {
      result.current.setSearchTerm("Item 1");
    });

    expect(result.current.searchTerm).toBe("Item 1");
    expect(result.current.filteredItems).toEqual([{ title: "Item 1" }]);
  });
});
