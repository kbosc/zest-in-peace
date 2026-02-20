import { useState, useEffect } from "react";
import { fetchSetList } from "../api/setService";
import type { MtgSet } from "../types/Card";

interface UseSetListResult {
  sets: MtgSet[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook custom get list of all MTG set.
 * Manage loading, error and data states.
 */
const useSetList = (): UseSetListResult => {
  const [sets, setSets] = useState<MtgSet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchSetList();
        if (!cancelled) setSets(data);
      } catch {
        if (!cancelled) setError("Error when sets fetched");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();

    return () => { cancelled = true; };
  }, []);

  return { sets, isLoading, error };
};

export default useSetList;

