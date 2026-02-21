import {useEffect} from "react";
import "./styles/global.css";
import useSetList from "./hooks/useSetList/useSetList";
import useFilterList from "./hooks/useFilterList/useFilterList";
import SetList from "./components/SetList/SetList";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import styles from "./App.module.css";

/**
 * single entry point for data fetching.
 * useSetList and useFilterList are called ONLY here.
 * Child components read data directly from the Redux store.
 */
const App = () => {
    const {sets, isLoading, error} = useSetList();
    const {filters} = useFilterList();

    useEffect(() => {
        if (filters.length > 0) {
            console.log("[App] Available filters :", filters);
        }
    }, [filters]);

    useEffect(() => {
        if (!isLoading && !error) {
            console.log("[App] Sets loaded :", sets);
        }
    }, [sets, isLoading, error]);

    return (
        <div className={styles.layout}>
            <FilterPanel/>
            <main className={styles.mainContent}>
                <SetList/>
            </main>
        </div>
    );
};

export default App;
