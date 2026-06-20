// hooks/useTablePage.js
import { useState, useMemo, useEffect  } from "react";
import { useSearch } from "./useSearch";

export function useTablePage(initialData, searchFields = [], filterFn = null) {
  const [items, setItems] = useState(initialData);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [activeFilter, setActiveFilter] = useState("TOUS");
  const [createOpen, setCreateOpen]     = useState(false); 

  const { search, setSearch, filtered } = useSearch(items, searchFields);

  useEffect(() => {
    setItems(initialData);
  }, [initialData]);

  const filteredByChip = useMemo(() => {
    if (activeFilter === "TOUS") return filtered;

    if (filterFn) {
      return filtered.filter((item) => filterFn(item, activeFilter));
    }

    return filtered.filter((item) =>
      Object.values(item).some((val) =>
        Array.isArray(val)
          ? val.includes(activeFilter)
          : val === activeFilter
      )
    );
  }, [filtered, activeFilter, filterFn]);

  const handleEdit = (row, transform = (r) => r) => {
    setEditItem(transform(row));
    setEditOpen(true);
  };

  const handleDelete = (row) => {
    setSelectedItem(row);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    setItems((prev) => prev.filter((i) => i.id !== selectedItem.id));
    setDeleteOpen(false);
    setSelectedItem(null);
  };

  const cancelDelete = () => {
    setDeleteOpen(false);
    setSelectedItem(null);
  };

  const saveEdit = (data) => {
    setItems((prev) =>
      prev.map((i) => (i.id === editItem.id ? { ...i, ...data } : i))
    );
  };

  const saveCreate = (data) => {                              
    setItems((prev) => [{ ...data, id: Date.now() }, ...prev]);
  };

  return {
    items,
    filteredByChip,
    search, setSearch,
    activeFilter, setActiveFilter,
    deleteOpen, selectedItem, confirmDelete, cancelDelete,
    editOpen, editItem,
    setEditOpen,
    createOpen, setCreateOpen, saveCreate, 
    handleEdit,
    handleDelete,
    saveEdit,
  };
}