import { useState, useMemo } from "react";

type Item = {
  title: string;
  release_date?: string;
  director?: string;
  opening_crawl?: string;
};

export const useSearch = (items: Item[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [items, searchTerm]
  );
  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  };
};
