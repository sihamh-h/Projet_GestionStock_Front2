import { useState, useMemo } from "react";


export function useSearch(data = [], fields = []) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return data;

    const terms = search.toLowerCase().split(" ").filter(Boolean);

    return data.filter((item) =>
      terms.every((term) =>
        fields.some((field) =>
          String(item[field] ?? "").toLowerCase().includes(term)
        )
      )
    );
  }, [data, search, fields]);

  return { search, setSearch, filtered };
}
