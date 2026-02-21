import {useEffect} from "react";
import {fetchSetList} from "../../api/sets/setService";
import {fetchSetsFailure, fetchSetsStart, fetchSetsSuccess} from "../../features/sets/setsSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import type {MtgSet} from "../../types/Sets";

interface UseSetListResult {
    sets: MtgSet[];
    isLoading: boolean;
    error: string | null;
}

/**
 * Hook custom that load the MTG set list once and dispatch to Redux.
 * Should be called only once at the App level.
 * Other components should read directly from the store.
 */
const useSetList = (): UseSetListResult => {
    const dispatch = useAppDispatch();
    const {allSets, isLoading, error} = useAppSelector((state) => state.sets);

    useEffect(() => {
        if (allSets.length > 0) return;

        let cancelled = false;

        dispatch(fetchSetsStart());

        fetchSetList()
            .then((data) => {
                if (!cancelled) dispatch(fetchSetsSuccess(data));
            })
            .catch(() => {
                if (!cancelled) dispatch(fetchSetsFailure("Error when sets fetched"));
            });

        return () => {
            cancelled = true;
        };
    }, [dispatch, allSets.length]);

    return {sets: allSets, isLoading, error};
};

export default useSetList;
