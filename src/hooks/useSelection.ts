import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type SelectionId = string | number;
type GetId<T, ID extends SelectionId> = (item: T) => ID;

export function useSelection<T, ID extends SelectionId>(
  items: T[],
  getId: GetId<T, ID>,
) {
  const [selectedIds, setSelectedIds] = useState<ID[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const getIdRef = useRef(getId);
  useEffect(() => {
    getIdRef.current = getId;
  }, [getId]);

  const allIds = useMemo(
    () => items.map((it) => getIdRef.current(it)),
    [items],
  );

  const allIdSet = useMemo(() => new Set<ID>(allIds), [allIds]);

  useEffect(() => {
    setSelectedIds((prev) => {
      if (prev.length === 0) return prev;

      const next = prev.filter((id) => allIdSet.has(id));
      if (next.length === prev.length) return prev;

      for (let i = 0; i < next.length; i++) {
        if (next[i] !== prev[i]) return next;
      }
      return prev;
    });
  }, [allIdSet]);

  const enterSelectionMode = useCallback(() => {
    setIsSelectionMode(true);
    setSelectedIds([]);
  }, []);

  const exitSelectionMode = useCallback(() => {
    setIsSelectionMode(false);
    setSelectedIds([]);
  }, []);

  const toggleSelectionMode = useCallback(() => {
    setIsSelectionMode((prev) => {
      setSelectedIds([]);
      return !prev;
    });
  }, []);

  const toggleOne = useCallback((id: ID) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds((prev) => {
      const isAllSelected = prev.length === allIds.length && allIds.length > 0;
      return isAllSelected ? [] : allIds;
    });
  }, [allIds]);

  const clear = useCallback(() => setSelectedIds([]), []);

  const removeFromSelection = useCallback((id: ID) => {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const isSelected = useCallback(
    (id: ID) => selectedIds.includes(id),
    [selectedIds],
  );

  return {
    selectedIds,
    isSelectionMode,
    allIds,
    hasSelection: selectedIds.length > 0,

    enterSelectionMode,
    exitSelectionMode,
    toggleSelectionMode,

    toggleOne,
    selectAll,
    clear,
    removeFromSelection,
    isSelected,
  };
}
