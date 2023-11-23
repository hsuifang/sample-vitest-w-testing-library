import * as useMoviesHooks from "../hooks/useMovies";
import * as useSearchHooks from "../hooks/useSearch";
import { render, fireEvent, act, cleanup } from "@testing-library/react";
import { Movies } from "./Movies";

describe("Movies", () => {
  const useMoviesSpy = vi.spyOn(useMoviesHooks, "useMovies");
  const useSearchSpy = vi.spyOn(useSearchHooks, "useSearch");
  const items = [
    {
      title: "Star Wars",
      release_date: "1977-05-25",
      director: "George Lucas",
      opening_crawl: "It is a period of civil war.",
    },
  ];
  beforeEach(() => {
    useMoviesSpy.mockReturnValue({
      movies: items,
      isLoading: false,
      error: null,
    });

    useSearchSpy.mockReturnValue({
      searchTerm: "",
      setSearchTerm: vi.fn(),
      filteredItems: items,
    });
  });

  afterEach(() => {
    useMoviesSpy.mockClear();
    useSearchSpy.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render correctly", () => {
    expect(render(<Movies />)).toBeTruthy();
  });

  it("should render the the list of movies", () => {
    const { getByTestId } = render(<Movies />);
    expect(getByTestId("movies-list").children.length).toBe(items.length);
  });

  it("should change the filtered items when the search term changes", () => {
    const items = [
      { title: "Star Wars" },
      { title: "Star Trek" },
      { title: "Starship Troopers" },
    ];

    useMoviesSpy.mockReturnValue({
      movies: items,
      isLoading: false,
      error: null,
    });

    const { getByTestId } = render(<Movies />);

    const searchInput = getByTestId("search-input-field");

    act(() => {
      fireEvent.change(searchInput, { target: { value: "Wars" } });
    });

    expect(getByTestId("movies-list").children.length).toBe(1);
  });
});
