import {useEffect} from "react";
import {fetchAvailableFilters} from "../../api/filters/filterService";
import {setAvailableFilters} from "../../features/filters/filtersSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import type {AvailableFilter} from "../../types/Filters";

interface UseFilterListResult {
    filters: AvailableFilter[];
    isLoading: boolean;
}

/**
 * Hook custom loads available filters from API (mock),
 * dispatch on redux and return list.
 * Skip fetch if already in store.
 */
const useFilterList = (): UseFilterListResult => {
    const dispatch = useAppDispatch();
    const filters = useAppSelector((state) => state.filters.available);

    useEffect(() => {
        if (filters.length > 0) return;

        fetchAvailableFilters().then((data) => {
            dispatch(setAvailableFilters(data));
        });
    }, [dispatch, filters.length]);

    return {
        filters,
        isLoading: filters.length === 0,
    };
};

export default useFilterList;

