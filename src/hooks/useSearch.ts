import { useState, useMemo } from "react";

type Item = {
  title: string;
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
