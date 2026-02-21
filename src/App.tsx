import {useEffect} from "react";
import "./styles/global.css";
import useSetList from "./hooks/useSetList/useSetList";
import useFilterList from "./hooks/useFilterList/useFilterList";
import CardList from "./components/CardList/CardList";
import FilterPanel from "./components/FilterPanel/FilterPanel";
import styles from "./App.module.css";

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
                <CardList/>
            </main>
        </div>
    );
};

export default App;
